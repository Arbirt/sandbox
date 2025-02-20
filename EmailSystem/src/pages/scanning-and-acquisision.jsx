import {
  RiCloseLine,
  RiMenu5Line,
  RiMoonLine,
  RiSunLine,
  RiPrinterLine,
  RiImportFill,
  RiRefreshFill,
  RiRefreshLine,
  RiDeleteBackLine,
  RiFileReduceLine,
  RiFileChart2Line,
  RiArrowRightBoxLine,
  RiCloseCircleLine,
  RiCircleLine,
  RiCircleFill,
  RiRadioButtonFill,
} from "@remixicon/react";

import { getBatches } from "../database/batchesDatabase";

import "../styles/scanning-styles.css";
import { useEffect, useState } from "react";
import { useToast } from "../components/toast-notification";
import DraggableTreeItem from "../components/draggable-tree-item";
import { getBatchPages } from "../database/batchesDatabase";

import dayjs from "dayjs";

const ScanningAndAcquisition = () => {
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
  const [batchPages, setBatchPages] = useState([]); //The data that is mapped to the table
  const [isDarkMode, setIsDarkMode] = useState(false); //Handles dark mode toggle
  const [selectedRows, setSelectedRows] = useState([]); //Selected rows from the table

  const toast = useToast(); //Used to show error messages

  //Fetches data from local js code
  useEffect(() => {
    const { data } = getBatchPages();
    setBatchPages(data);
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
      className="scan-container"
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
      <aside className="scan-aside">
        <div className="toggle">
          {/* <div className="logo"> */}
          <h1>
            Scanning <span style={{ color: "#f99500" }}> &</span> Acquisition
          </h1>
          {/* </div> */}
          <div className="close" id="close-btn">
            <RiCloseLine />
          </div>
          <div className="sidebar">
            <div className="scan-aside-button-group">
              <button className="">
                <span>
                  <RiPrinterLine />
                </span>
                <h3>Scanner</h3>
              </button>
              <button>
                <span>
                  <RiImportFill />
                </span>
                <h3>Import</h3>
              </button>
            </div>
            <div className="scan-details-group">
              <div className="scan-details-group-child">
                <h3>Total Scanned Pages</h3>
                <h3>55</h3>
              </div>
              <div className="scan-details-group-child">
                <h3>Session Scanned Pages</h3>
                <h3>55</h3>
              </div>
              <div className="scan-details-group-child">
                <h3>Last Scanned Pages</h3>
                <h3>55</h3>
              </div>
            </div>
            <div className="scan-modes-group">
              <div className="scan-modes-group-child">
                <RiCircleLine />
                <h3>Insert at End</h3>
              </div>
              <div className="scan-modes-group-child">
                <RiRadioButtonFill style={{ color: "#f99500" }} />
                <h3>Insert at Current Location</h3>
              </div>

              <div className="scan-modes-group-child">
                <RiCircleLine />
                <h3>Replace Selected Image</h3>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main>
        <div className="header">
          <div className="scan-search">
            {/* Toolbar */}
            <button className="toolbar-btn">
              <RiRefreshLine  className="toolbar-icon" /> Reload
            </button>
            <button className="toolbar-btn">
              <RiFileReduceLine className="toolbar-icon" /> Delete Page
            </button>
            <button className="toolbar-btn">
              <RiFileChart2Line className="toolbar-icon" /> Batch Properties
            </button>
            <button className="toolbar-btn">
              <RiArrowRightBoxLine className="toolbar-icon" /> Next Stage
            </button>
            <button className="toolbar-btn">
              <RiCloseCircleLine className="toolbar-icon" /> Close
            </button>
          </div>
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

        <div className="scan-container-secondary" style={{ margin: "0px 5px" }}>
          <div
            className="sidebar"
            style={{ marginTop: "-3px", overflow: "hidden" }}
          >
            <div style={{ overflow: "auto", padding: "15px 15px" }}>
              {batchPages.map((file, index) => (
                <DraggableTreeItem file={file} index={index} />
              ))}
            </div>
          </div>
          <div className="sidebar" style={{ marginTop: "-3px" }}></div>
        </div>
      </main>
    </div>
  );
};

export default ScanningAndAcquisition;
