import {
  RiArrowDownSLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCheckboxBlankLine,
  RiCheckboxIndeterminateLine,
  RiCheckboxLine,
  RiCheckDoubleLine,
  RiCloseLine,
  RiDeleteBin2Line,
  RiDeleteBin5Line,
  RiEqualizerFill,
  RiEqualizerLine,
  RiLogoutCircleRLine,
  RiMenu5Line,
  RiMoonLine,
  RiPlayLine,
  RiResetRightLine,
  RiSearch2Line,
  RiSkipLeftLine,
  RiSkipRightLine,
  RiSunLine,
} from "@remixicon/react";
import ArcmateLogo from "../../public/ArcMateCapture.png";
import {
  batchDocumentsNames,
  getBatchDocuments,
  getBatches,
} from "../database/batchesDatabase";
import { priorityMapping, statusMapping } from "../utilities/enum";
import "../styles/manual-document-editing-styles.css";
import { useEffect, useState } from "react";
import { useToast } from "../components/toast-notification";
import BatchCreateDialog from "../components/batch-create-dialog";
import BatchUpdateDialog from "../components/batch-update-dialog";
import ConfirmationDialog from "../components/confirmation-dialog";
import CustomDatePicker from "../components/custom-date-picker";
import dayjs from "dayjs";
import BatchFilterDialog from "../components/batch-filter-dialog";
import FilterBubbles from "../components/filter-bubbles";

const ManualDocumentEditing = () => {
  /* ===== Dilaogs ===== */
  const [batchUpdateDialog, setBatchUpdateDialog] = useState(false); // Batch-update dialog
  const [batchCreateDialog, setBatchCreateDialog] = useState(false); // Batch-create dialog
  const [batchDeleteDialog, setBatchDeleteDialog] = useState(false); // Batch-delete dialog
  const [batchFilterDialog, setBatchFilterDialog] = useState(false); // Batch-filter dialog
  /* ===== ===== */

  const [filter, setFilter] = useState({
    batchName: "",
    template: "",
    user: "",
    status: "",
    stage: "",
    fromStage: "",
    editDateFrom: "",
    editDateTo: "",
    createDateFrom: "",
    createDateTo: "",
  });
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [contextMenu, setContextMenu] = useState(null); //For right click
  const [batchDocumentsData, setBatchDocumentsData] = useState([]); //The data that is mapped to the table
  const [isDarkMode, setIsDarkMode] = useState(false); //Handles dark mode toggle
  const [selectedRows, setSelectedRows] = useState([]); //Selected rows from the table

  const toast = useToast(); //Used to show error messages

  //Fetches data from local js code
  useEffect(() => {
    const { data } = getBatchDocuments();
    setBatchDocumentsData(data);
  }, []);

  useEffect(() => {
    console.log("Filter's value : ", filter);
  }, [filter]);
  // Toggle row selection with the entire batch object
  const handleRowClick = (batch) => {
    setSelectedRows((prevSelectedRows) => {
      const isSelected = prevSelectedRows.some(
        (selectedBatch) => selectedBatch.id === batch.id
      );

      if (isSelected) {
        // If already selected, remove the batch from the selected rows
        return prevSelectedRows.filter(
          (selectedBatch) => selectedBatch.id !== batch.id
        );
      } else {
        // Otherwise, add the batch to the selected rows
        return [...prevSelectedRows, batch];
      }
    });
  };

  const isSelected = (batch) => {
    // Check if the row is selected by comparing the batch object
    return selectedRows.some((selectedBatch) => selectedBatch.id === batch.id);
  };

  // Right-click handler
  const handleContextMenu = (event, row) => {
    event.preventDefault(); // Prevent default browser context menu

    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      row, // Store row data
    });
  };

  // Close menu when clicking anywhere
  const handleCloseMenu = () => {
    setContextMenu(null);
  };

  // Handle menu actions
  const handleMenuClick = (action) => {
    if (!contextMenu) return;

    if (action === "edit") {
      console.log(`Editing: ${selectedRows[0].title}`);
      setBatchUpdateDialog(true);
    } else if (action === "properties") {
      console.log(`Properties of: ${selectedRows[0].title}`);
    }

    setContextMenu(null);
  };

  const handleBatchDelete = () => {
    selectedRows.forEach((row) => {
      console.log("Deleted this row: ", row);
    });
  };
  const removeFilter = (field) => {
    setFilter((prevFilters) => ({ ...prevFilters, [field]: "" }));
  };

  return (
    <div
      tabIndex={0}
      className="mde-container"
      onClick={handleCloseMenu}
      onKeyDown={(e) => {
        if (e.code === "Escape") {
          setBatchDeleteDialog(false);
          setBatchUpdateDialog(false);
          setBatchCreateDialog(false);
          handleCloseMenu();
        }
      }}
    >
      <aside className="mde-aside">
        <div className="toggle" style={{ maxHeight: "96dvh" }}>
          <div className="mde-logo">Manual Document Editing</div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <button className="create">Add document</button>
          </div>

          <div className="documents-table">
            <div className="actions-bar" style={{ padding: "1rem 0.8rem" }}>
              <select className="document-form-filter">
                <option value="" style={{ display: "none" }}>
                  filter by form
                </option>
                {batchDocumentsNames.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <div
                style={{
                  height: "30px",
                  width: "1px",
                  backgroundColor: "transparent",
                  padding: "1px",
                  margin: "5px 30px",
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <RiSkipLeftLine />
                <RiArrowLeftSLine />
                <input
                  type="text"
                  style={{
                    width: "5rem",
                    height: "1.6rem",
                    borderRadius: "10px",
                    border: "1px solid #ffc107",
                    textAlign: "center",
                  }}
                  maxLength={7}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                    if (e.target.value.startsWith("0")) {
                      e.target.value = e.target.value.replace(/^0+/, ""); // Remove leading zeros
                    }
                  }}
                />

                <RiArrowRightSLine />
                <RiSkipRightLine />
              </div>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Document Title</th>
                    <th>Page Count</th>
                  </tr>
                </thead>
                <tbody>
                  {batchDocumentsData?.map((document, index) => (
                    <tr
                      key={index}
                      onClick={(e) => {
                        //Left click
                        if (e.ctrlKey) handleRowClick(document);
                        else console.log(document.title);
                      }}
                      onContextMenu={(e) => {
                        setSelectedRows([document]);
                        handleContextMenu(e, document);
                      }} //Right click
                      className={
                        isSelected(document)
                          ? "selectedRow-active"
                          : "selectedRow"
                      }
                    >
                      <td>
                        <button className="expand-arrow">
                          <RiArrowDownSLine />
                        </button>
                      </td>
                      <td>{document.title}</td>
                      <td>{document.pageCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="actions-bar" style={{ padding: "1rem 0.8rem" }}>
              <div
                style={{
                  height: "30px",
                  width: "1px",
                  backgroundColor: "transparent",
                  padding: "1px",
                  margin: "5px 30px",
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <RiSkipLeftLine />
                <RiArrowLeftSLine />
                <input
                  type="text"
                  style={{
                    width: "5rem",
                    height: "1.6rem",
                    borderRadius: "10px",
                    border: "1px solid #ffc107",
                    textAlign: "center",
                  }}
                  maxLength={7}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                    if (e.target.value.startsWith("0")) {
                      e.target.value = e.target.value.replace(/^0+/, ""); // Remove leading zeros
                    }
                  }}
                />

                <RiArrowRightSLine />
                <RiSkipRightLine />
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main>
        <div className="header">
          <div className="search">
            <button className="filter-btn">
              <RiSearch2Line />
            </button>

            <input
              type="text"
              className="search-bar"
              placeholder="Search Batch"
            />
            <button
              className="filter-btn"
              onClick={() => {
                setBatchFilterDialog(true);
              }}
            >
              {batchFilterDialog ? <RiEqualizerFill /> : <RiEqualizerLine />}
            </button>
          </div>
          <div className="mde-right-section">
            <div className="mde-nav">
              <button id="menu-btn">
                <span>
                  <RiMenu5Line />
                </span>
              </button>
              <div className="dark-mode">
                <span
                  className={!isDarkMode ? "active" : ""}
                  onClick={() => {
                    setIsDarkMode(false);
                    document.body.classList.remove("dark-mode-variables");
                  }}
                >
                  <RiSunLine />
                </span>
                <span
                  className={isDarkMode ? "active" : ""}
                  onClick={() => {
                    setIsDarkMode(true);
                    document.body.classList.add("dark-mode-variables");
                  }}
                >
                  <RiMoonLine />
                </span>
              </div>
              <div className="profile">
                <div className="info">
                  <p>
                    Hey, <b>Ahmad</b>
                  </p>
                  <small className="text-muted">Admin</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <FilterBubbles filters={filter} onRemoveFilter={removeFilter} /> */}
      </main>
      {contextMenu && contextMenu.visible && (
        <ul
          className="context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <li>Delete</li>
          <li onClick={() => handleMenuClick("properties")}>Properties</li>
          <li onClick={() => handleMenuClick("Change Form")}>Change Form</li>
        </ul>
      )}
      <BatchCreateDialog
        isOpen={batchCreateDialog}
        closeModal={() => {
          setBatchCreateDialog(false);
        }}
      />
      <BatchUpdateDialog
        isOpen={batchUpdateDialog}
        closeModal={() => {
          setBatchUpdateDialog(false);
        }}
        batchUpdateData={selectedRows[0]}
      />
      <BatchFilterDialog
        isOpen={batchFilterDialog}
        closeModal={setBatchFilterDialog}
        setFilter={setFilter}
        filter={filter}
      />
      <ConfirmationDialog
        isOpen={batchDeleteDialog}
        closeModal={() => {
          setBatchDeleteDialog(false);
        }}
        onConfirm={handleBatchDelete}
        title={"Batch Delete"}
        message={`Are you sure you want to delete ${selectedRows.length} Batch${
          selectedRows.length === 1 ? "" : "es"
        } ?`}
        inProgress={false}
        warning={true}
      />
    </div>
  );
};

export default ManualDocumentEditing;
