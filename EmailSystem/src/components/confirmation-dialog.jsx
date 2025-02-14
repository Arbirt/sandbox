import PropTypes from "prop-types";

const ConfirmationDialog = ({
  isOpen,
  closeModal,
  onConfirm,
  inProgress = false,
  title,
  message,
  warning = false,
}) => {
  const handleConfirm = () => {
    onConfirm();
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
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>{title}</h2>
            </div>
            <form onSubmit={handleConfirm} className="confirm-form">
              {/* Confirmation Message */}
              {!inProgress && <label>{message}</label>}

              {/* In Progress Message */}
              {inProgress && <label>{message}</label>}

              {/* Action Buttons */}
              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    closeModal();
                  }}
                >
                  No
                </button>
                <button
                  type="submit"
                  className={warning ? "confirm-btn" : "submit-btn"}
                >
                  Yes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
ConfirmationDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired, // isOpen must be a boolean and is required
  closeModal: PropTypes.func.isRequired, // closeModal must be a function and is required
  onConfirm: PropTypes.func.isRequired,
  inProgress: PropTypes.bool,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  warning: PropTypes.bool.isRequired,
};

export default ConfirmationDialog;
