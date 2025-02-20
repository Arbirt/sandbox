import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../styles/component-styles.css";
import { useRef } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";

const schema = yup.object().shape({
  batchName: yup
    .string()
    .min(3, "Batch message must be at elast 3 letters")
    .max(30, "Batch message must be at most 30 letters")
    .required("Batch name is required"),
  template: yup.string().required("Template selection is required"),
  priority: yup.string().required("Priority selection is required"),
});

const BatchCreateDialog = ({ isOpen, closeModal }) => {
  const defaultValues = { batchName: "", template: "", priority: "" };
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const submitButtonRef = useRef(null); // Ref for the button
  const formattedDate = dayjs().format("YYYY-MM-DD | HH:mm");

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
      creationDate: dayjs(data.creationDate).format("YYYY-MM-DDTHH:mm:ss[Z]"),
    };
    console.log("Form Submitted:", payload);

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
              <h2>Create Batch</h2>
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
                    <option value="template1">Template 1</option>
                    <option value="template2">Template 2</option>
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
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                )}
              />
              {errors.priority && (
                <p className="error-text">{errors.priority.message}</p>
              )}

              {/* Disabled Current Date */}
              <label>Current Date:</label>
              <Controller
                control={control}
                name="creationDate"
                defaultValue={formattedDate}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={formattedDate}
                    readOnly
                  />
                )}
              />

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
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
BatchCreateDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired, // isOpen must be a boolean and is required
  closeModal: PropTypes.func.isRequired, // closeModal must be a function and is required
};

export default BatchCreateDialog;
