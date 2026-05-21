import { useEffect } from 'react';
import './index.css';
import { IGNORED_KEYS } from '../../shared/constants/keys';

const KeyMappingModal = ({
  currentLabel,
  pendingChar,
  onPendingCharChange,
  onAccept,
  onCancel,
}) => {
  useEffect(() => {
    const onKeyDown = (kpe) => {
      if (IGNORED_KEYS.some((key) => key === kpe.key)) return;
      if (kpe.key.length !== 1) return;
      kpe.preventDefault();
      kpe.stopPropagation();
      onPendingCharChange(kpe.key);
    };

    document.addEventListener('keydown', onKeyDown, true);

    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
    };
  }, [onPendingCharChange]);

  return (
    <div className="key_mapping_modal_overlay" onClick={onCancel}>
      <div
        className="key_mapping_modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <p className="key_mapping_modal_prompt">
          Press a key to map this position
        </p>
        <p className="key_mapping_modal_current">
          Current: <strong>{currentLabel}</strong>
        </p>
        <p className="key_mapping_modal_preview">
          {pendingChar ? (
            <>
              Mapped to: <strong>{pendingChar}</strong>
            </>
          ) : (
            'Waiting for key press…'
          )}
        </p>
        <div className="key_mapping_modal_actions">
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            onClick={onAccept}
            disabled={!pendingChar}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeyMappingModal;
