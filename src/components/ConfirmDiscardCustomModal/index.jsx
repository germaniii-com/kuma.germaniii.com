import './index.css';

const ConfirmDiscardCustomModal = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="confirm_discard_overlay" onClick={onCancel}>
      <div
        className="confirm_discard_modal"
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-discard-title"
      >
        <h3 id="confirm-discard-title">Discard custom key changes?</h3>
        <p>
          You have unsaved custom key mappings. Switching layouts will discard
          those changes.
        </p>
        <div className="confirm_discard_actions">
          <button type="button" className="wizard_secondary_button" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="wizard_button" onClick={onConfirm}>
            Switch anyway
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDiscardCustomModal;
