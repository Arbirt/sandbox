import PropTypes from "prop-types";
import "../styles/component-styles.css";
import "../styles/batch-manager-styles.css";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

const validTemplates = ["Template 1", "Template 2"]; // The values of the templates the exist inside the data base
const validStatuses = ["Ready", "Checked-Out", "In Progress", "Has Error"]; // The values of the templates that exist inside the data base
const validUsers = ["Mohammad", "Ahmad", "Salem", "Ghaith", "Omar", "Judy"]; // The values of teh users that exist inside the data base
const validStages = [
  "Scanning And Acquisition",
  "Automatic Seperation",
  "Automatic Indexing",
  "Manual Document Editing",
  "Automatic Release",
  "Batch Error Handler",
]; // The values of teh users that exist inside the data base

const BatchFilterDialog = ({ isOpen, closeModal }) => {
  /* State Management */
  // const [currentSelectedDatePicker, setCurrentSelectedDatePicker] =
  //   useState(null); // To check which input opened the date picker

  // const selectedInput = {
  //   editDateFrom: 0,
  //   editDateTo: 1,
  //   createDateFrom: 2,
  //   createDateTo: 3,
  // };
  const defaultValues = {
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
  };
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: defaultValues,
  });
  const onSubmit = (data) => {
    console.log("Filter Data : ", data);
    closeModal();
  };
  return (
    <>
      {isOpen && (
        <div
          className="modal-overlay"
          onClick={() => {
            closeModal();
          }}
        >
          <div
            id="modal-content"
            className="modal-content"
            tabIndex={-1}
            onKeyDown={(e) => {
              if (e.code === "Escape") {
                closeModal();
              }
            }}
            style={{ width: "50rem" }}
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Batch Filter</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="filter">
                <div className="filter-container">
                  <p>Template :</p>
                  <Controller
                    name="template"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <>
                        <select {...field}>
                          <option value="" style={{ display: "none" }}></option>
                          {validTemplates.map((template, index) => (
                            <option key={index} value={template}>
                              {template}
                            </option>
                          ))}
                        </select>
                        {field.value && <button>X</button>}
                      </>
                    )}
                  />
                </div>
                <div className="filter-container">
                  <p>User :</p>
                  <Controller
                    name="user"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <select {...field}>
                        <option value="" style={{ display: "none" }}></option>
                        {validUsers.map((user, index) => (
                          <option key={index} value={user}>
                            {user}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>
                <div className="filter-container">
                  <p>Status :</p>
                  <Controller
                    name="status"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <select {...field}>
                        <option value="" style={{ display: "none" }}></option>
                        {validStatuses.map((status, index) => (
                          <option key={index} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>
                <div className="filter-container">
                  <p>Batch Title :</p>
                  <Controller
                    name="batchName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="filter-field"
                        style={{ height: "2.3rem" }}
                      />
                    )}
                  />
                </div>
                <div className="filter-container">
                  <p>From Stage :</p>
                  <Controller
                    name="fromStage"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <select {...field}>
                        <option value="" style={{ display: "none" }}></option>
                        {validStages.map((stage, index) => (
                          <option key={index} value={stage}>
                            {stage}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>
                <div className="filter-container">
                  <p>Stage :</p>
                  <Controller
                    name="stage"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <select {...field}>
                        <option value="" style={{ display: "none" }}></option>
                        {validStages.map((stage, index) => (
                          <option key={index} value={stage}>
                            {stage}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>
                {/* ===== Date Picker ===== */}
                <div className="date-pickers-container">
                  <p>Last Edit Date:</p>
                  <div className="filter-container" style={{ maxWidth: "73%" }}>
                    {/* <p>From :</p> */}
                    <Controller
                      name="editDateFrom"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="filter-field"
                          onFocus={(e) => {
                            console.log("wow", e);
                            setValue("editDateFrom", "LOLOLOLOL");
                          }}
                        />
                      )}
                    />
                    <p>-</p>
                    <Controller
                      name="editDateTo"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="filter-field"
                          onFocus={() => {
                            console.log("wow");
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="date-pickers-container">
                  <p>Create Date:</p>
                  <div className="filter-container" style={{ maxWidth: "73%" }}>
                    <Controller
                      name="createDateFrom"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="filter-field"
                          onFocus={() => {
                            console.log("wow");
                          }}
                        />
                      )}
                    />

                    <p>-</p>
                    <Controller
                      name="createDateTo"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="filter-field"
                          onFocus={() => {
                            console.log("wow");
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* ===== Actions Buttons ===== */}
              <div className="modal-actions" style={{ gap: "1rem" }}>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    closeModal();
                  }}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    reset();
                    closeModal();
                  }}
                >
                  Clear & Close
                </button>
                <button
                  type="button"
                  className="submit-btn"
                  onClick={() => {
                    reset();
                  }}
                >
                  Clear
                </button>
                <button type="submit" className="submit-btn">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
BatchFilterDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default BatchFilterDialog;
