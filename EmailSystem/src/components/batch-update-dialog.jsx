import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../styles/component-styles.css";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { priorityMapping, statusMapping } from "../utilities/enum";

const validTemplates = ["Template 1", "Template 2"]; // The values of the templates the exist inside the data base
const validPriorities = ["High", "Medium", "Low"]; // The values of the templates the exist inside the data base
const validStatuses = ["Ready", "Checked-Out", "In Progress", "Has Error"]; // The values of the templates the exist inside the data base

const schema = yup.object().shape({
  batchName: yup
    .string()
    .min(3, "Batch message must be at elast 3 letters")
    .max(30, "Batch message must be at most 30 letters")
    .required("Batch name is required"),
  template: yup
    .string()
    .oneOf([...validTemplates, ""], "Invalid template selected") // Restrict to valid templates
    .required("Template selection is required"),
  priority: yup
    .string()
    .oneOf([...validPriorities, ""], "Invalid priority selected") // Restrict priority too
    .required("Priority selection is required"),
  status: yup
    .string()
    .oneOf([...validStatuses, ""], "Invalid status selected") // Restrict priority too
    .required("Status selection is required"),
});

const BatchUpdateDialog = ({ isOpen, closeModal, batchUpdateData }) => {
  const defaultValues = {
    batchName: "",
    template: "",
    priority: "",
    status: "",
  };
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (isOpen) {
      reset({
        batchName: batchUpdateData?.title,
        template: batchUpdateData?.b_TemplateName,
        priority: priorityMapping[batchUpdateData?.priority],
        status: statusMapping[batchUpdateData?.b_Status],
      });
      console.log({
        batchName: batchUpdateData?.title,
        template: batchUpdateData?.b_TemplateName,
        priority: priorityMapping[batchUpdateData?.priority],
        status: statusMapping[batchUpdateData?.b_Status],
      });
    } else {
      reset();
    }
  }, [
    batchUpdateData?.b_TemplateName,
    batchUpdateData?.priority,
    batchUpdateData?.title,
    batchUpdateData?.b_Status,
    isOpen,
    reset,
  ]);
  const submitButtonRef = useRef(null); // Ref for the button

  const handleValidationFail = () => {
    const button = submitButtonRef.current;
    if (button) {
      button.classList.remove("shake"); // Remove class to reset animation
      void button.offsetWidth; // Force reflow (this is the key!)
      button.classList.add("shake"); // Re-add class to restart animation
    }
  };

  const onSubmit = (data) => {
    const payload = {
      ...data,
    };
    console.log("Batch Updated with these new values:", payload);

    closeModal();
    reset();
  };
  /* This is useed to lock hitting the 'tab' button inside the dialog when opened*/

  return (
    <>
      {isOpen && (
        <div
          className="modal-overlay"
          onClick={() => {
            reset();
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
                reset();
              }
            }}
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Update Batch</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit, handleValidationFail)}>
              {/* Batch Name Input */}
              <label>Batch Name:</label>
              <Controller
                name="batchName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter batch name"
                    className={errors.batchName ? "error-input" : ""}
                  />
                )}
              />
              {errors.batchName && (
                <p className="error-text">{errors.batchName.message}</p>
              )}

              {/* Select Template */}
              <label>Select Template:</label>
              <Controller
                name="template"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select
                    {...field}
                    className={errors.template ? "error-input" : ""}
                  >
                    <option value="">-- Select Template --</option>
                    <option value="Template 1">Template 1</option>
                    <option value="Template 2">Template 2</option>
                  </select>
                )}
              />
              {errors.template && (
                <p className="error-text">{errors.template.message}</p>
              )}

              {/* Select Priority */}
              <label>Select Priority:</label>
              <Controller
                name="priority"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select
                    {...field}
                    className={errors.priority ? "error-input" : ""}
                  >
                    <option value="">-- Select Priority --</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                )}
              />
              {errors.priority && (
                <p className="error-text">{errors.priority.message}</p>
              )}
              {/* Select Priority */}
              <label>Select Status:</label>
              <Controller
                name="status"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select
                    {...field}
                    className={errors.status ? "error-input" : ""}
                  >
                    <option value="">-- Select Status --</option>
                    {validStatuses.map((status, index) => (
                      <option key={index} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.status && (
                <p className="error-text">{errors.status.message}</p>
              )}
              {/* Action Buttons */}
              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    reset();
                    closeModal();
                  }}
                >
                  Cancel
                </button>
                <button
                  ref={submitButtonRef}
                  type="submit"
                  className="submit-btn"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
BatchUpdateDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired, // isOpen must be a boolean and is required
  closeModal: PropTypes.func.isRequired, // closeModal must be a function and is required
  batchUpdateData: PropTypes.shape({
    title: PropTypes.string,
    b_TemplateName: PropTypes.string,
    priority: PropTypes.string,
    b_Status: PropTypes.string,
  }),
};

export default BatchUpdateDialog;
