import {
  RiArrowDownWideLine,
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
  RiSunLine,
} from "@remixicon/react";
import ArcmateLogo from "../../public/ArcMateCapture.png";
import { getBatches } from "../database/batchesDatabase";
import { priorityMapping, statusMapping } from "../utilities/enum";
import "../styles/batch-manager-styles.css";
import { useEffect, useState } from "react";
import { useToast } from "../components/toast-notification";
import BatchCreateDialog from "../components/batch-create-dialog";
import BatchUpdateDialog from "../components/batch-update-dialog";

const BatchManager = () => {
  const [batchUpdateDialog, setBatchUpdateDialog] = useState(false); // Batch-update dialog
  const [batchCreateDialog, setBatchCreateDialog] = useState(false); // Batch-create dialog
  const [contextMenu, setContextMenu] = useState(null); //For right click
  const [batchesData, setBatchesData] = useState([]); //The data that is mapped to the table
  const [isFilterOpen, setIsFilterOpen] = useState(false); //Handles filter component rendering
  const [isDarkMode, setIsDarkMode] = useState(false); //Handles dark mode toggle
  const [selectedRows, setSelectedRows] = useState([]); //Selected rows from the table

  const toast = useToast(); //Used to show error messages

  //Fetches data from local js code
  useEffect(() => {
    const { data } = getBatches();
    setBatchesData(data);
  }, []);

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

  return (
    <div
      tabIndex={0}
      className="container"
      onClick={handleCloseMenu}
      onKeyDown={(e) => {
        if (e.code === "Escape") {
          setBatchUpdateDialog(false);
          setBatchCreateDialog(false);
          handleCloseMenu();
        }
      }}
    >
      <aside>
        <div className="toggle">
          <div className="logo">
            <img src={ArcmateLogo} alt="ArcMateLogo" />
            <h2>
              Work<span className="secondary">Space</span>
            </h2>
          </div>
          <div className="close" id="close-btn">
            <RiCloseLine />
          </div>
          <div className="sidebar">
            <button className="active">
              <span>
                <RiPlayLine />
              </span>
              <h3>Running</h3>
            </button>
            <button>
              <span>
                <RiCheckDoubleLine />
              </span>
              <h3>Finished</h3>
            </button>
            <button>
              <span>
                <RiDeleteBin5Line />
              </span>
              <h3>Deleted</h3>
            </button>
            <button>
              <span>
                <RiLogoutCircleRLine />
              </span>
              <h3>Logout</h3>
            </button>
          </div>
        </div>
      </aside>

      <main>
        <div className="header">
          <h1>Running</h1> {/*Current Tab*/}
          <div className="right-section">
            <div className="nav">
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

        <div className="top-section">
          <button
            className="create"
            onClick={() => {
              toast.addToast("Example Error");
              setBatchCreateDialog(true);
            }}
          >
            Create
          </button>
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
                setIsFilterOpen((prev) => !prev);
              }}
            >
              {isFilterOpen ? <RiEqualizerFill /> : <RiEqualizerLine />}
            </button>
          </div>
          {isFilterOpen && (
            <>
              <button className="apply">Apply</button>
              <button className="reset">Reset</button>
            </>
          )}
        </div>
        {isFilterOpen && (
          <div className="filter">
            <div className="filter-container">
              <p>Template</p>
              <input type="text" className="filter-field" />
            </div>
            <div className="filter-container">
              <p>User</p>
              <input type="text" className="filter-field" />
            </div>
            <div className="filter-container">
              <p>Status</p>
              <input type="text" className="filter-field" />
            </div>
            <div className="filter-container">
              <p>From</p>
              <input type="date" className="filter-field" />
            </div>
            <div className="filter-container">
              <p>From</p>
              <input type="date" className="filter-field" />
            </div>
            <div className="filter-container">
              <p>Batch Title</p>
              <input type="text" className="filter-field" />
            </div>
            <div className="filter-container">
              <p>From Stage</p>
              <input type="text" className="filter-field" />
            </div>
            <div className="filter-container">
              <p>Stage</p>
              <input type="text" className="filter-field" />
            </div>
            <div className="filter-container">
              <p>To</p>
              <input type="date" className="filter-field" />
            </div>
            <div className="filter-container">
              <p>To</p>
              <input type="date" className="filter-field" />
            </div>
          </div>
        )}
        <div className="batches">
          <div className="actions-bar">
            <div className="actions1">
              {/* <input type="checkbox" className="checked action-btn" /> */}
              {selectedRows.length === 0 && (
                <div
                  className="action-btn"
                  onClick={() => {
                    setSelectedRows([...batchesData]);
                  }}
                >
                  <RiCheckboxBlankLine className="acition-btn-icon" />
                </div>
              )}
              {selectedRows.length !== batchesData.length &&
                selectedRows.length !== 0 && (
                  <div
                    className="action-btn"
                    onClick={() => {
                      setSelectedRows([]);
                    }}
                  >
                    <RiCheckboxIndeterminateLine className="acition-btn-icon" />
                  </div>
                )}
              {selectedRows.length === batchesData.length && (
                <div
                  className="action-btn"
                  onClick={() => {
                    setSelectedRows([]);
                  }}
                >
                  <RiCheckboxLine className="acition-btn-icon" />
                </div>
              )}

              <button className="action-btn refetch">
                <RiResetRightLine
                  className="acition-btn-icon"
                  style={{
                    transform: "rotate(120deg)",
                  }}
                />
              </button>

              <button
                disabled={
                  selectedRows.length <= 0 ||
                  selectedRows.some((batch) => batch.b_Status === 1)
                }
                className={
                  selectedRows.length <= 0
                    ? "action-btn no-opacity"
                    : "action-btn"
                }
                onClick={() => {
                  console.log(
                    "Sending these data to delete request :",
                    selectedRows
                  );
                }}
              >
                <RiDeleteBin2Line className="acition-btn-icon" />
              </button>
            </div>
            <div className="actions2">
              <span style={{ textWrap: "nowrap" }}>1 out of 10</span>
              <div className="action-btn">
                <RiArrowLeftSLine className="acition-btn-icon" />
              </div>
              <div className="action-btn">
                <RiArrowRightSLine className="acition-btn-icon" />
              </div>
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Batch Title</th>
                  <th>Batch Template</th>
                  <th>Creator</th>
                  <th>Current Stage</th>
                  <th>Current User</th>
                  <th>Status</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                {batchesData?.map((batch, index) => (
                  <tr
                    key={index}
                    onClick={(e) => {
                      //Left click
                      if (e.ctrlKey) handleRowClick(batch);
                      else console.log(batch.b_CurrentStageTitle);
                    }}
                    onContextMenu={(e) => {
                      setSelectedRows([batch]);
                      handleContextMenu(e, batch);
                    }} //Right click
                    className={
                      isSelected(batch) ? "selectedRow-active" : "selectedRow"
                    }
                  >
                    <td>
                      <button className="expand-arrow">
                        <RiArrowDownWideLine />
                      </button>
                    </td>
                    <td>{batch.title}</td>
                    <td>{batch.b_TemplateName}</td>
                    <td>{batch.creationUserName}</td>
                    <td>{batch.b_CurrentStageTitle}</td>
                    <td>{batch.b_CheckOutUserName}</td>
                    <td
                      className={
                        batch.b_Status === 0
                          ? "success td-span"
                          : batch.b_Status === 1
                          ? "warning td-span"
                          : batch.b_Status === 2
                          ? "primary td-span"
                          : "error td-span"
                      }
                    >
                      <span className={`status-${batch.b_Status}`}>
                        {statusMapping[batch.b_Status]}
                      </span>
                    </td>
                    <td>{priorityMapping[batch.priority]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      {contextMenu && contextMenu.visible && (
        <ul
          className="context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <li
            className={selectedRows[0].b_Status !== 1 ? "" : "disabled"}
            onClick={() => {
              if (selectedRows[0].b_Status !== 1) handleMenuClick("edit");
            }}
          >
            Edit
          </li>
          <li onClick={() => handleMenuClick("properties")}>Properties</li>
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
    </div>
  );
};

export default BatchManager;
