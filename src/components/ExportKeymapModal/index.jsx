import { useState } from 'react';
import './index.css';
import {
  downloadKeymapExport,
  EXPORT_FORMATS,
  getActiveKeymap,
} from '../../shared/utils/exportKeymap';
import { useKeyboardMapContext } from '../../shared/providers/KeyboardMapProvider';

const ExportKeymapModal = () => {
  const {
    isExportModalOpen,
    closeExportModal,
    sourceLayout,
    targetLayout,
    customKeymap,
  } = useKeyboardMapContext();

  const [formatId, setFormatId] = useState('csv');
  const [filenamePrefix, setFilenamePrefix] = useState('kuma-keymap');

  if (!isExportModalOpen) return null;

  const handleDownload = () => {
    const keymap = getActiveKeymap(targetLayout, customKeymap);
    const metadata = {
      sourceLayout,
      targetLayout,
      exportedAt: new Date().toISOString(),
    };
    downloadKeymapExport({
      formatId,
      keymap,
      metadata,
      filenamePrefix: filenamePrefix.trim() || 'kuma-keymap',
    });
    closeExportModal();
  };

  return (
    <div className="export_keymap_modal_overlay" onClick={closeExportModal}>
      <div
        className="export_keymap_modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="export-keymap-title"
      >
        <h3 id="export-keymap-title">Export keyboard layout</h3>
        <p className="export_keymap_modal_note">
          Exports the 30-key alpha block shown in the app. You may need to adapt
          the file to your keyboard&apos;s matrix in QMK or ZMK.
        </p>
        <label className="export_keymap_modal_field">
          Format
          <select value={formatId} onChange={(e) => setFormatId(e.target.value)}>
            {EXPORT_FORMATS.map(({ id, label }) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="export_keymap_modal_field">
          Filename prefix
          <input
            type="text"
            value={filenamePrefix}
            onChange={(e) => setFilenamePrefix(e.target.value)}
            placeholder="kuma-keymap"
          />
        </label>
        <div className="export_keymap_modal_actions">
          <button type="button" className="wizard_secondary_button" onClick={closeExportModal}>
            Cancel
          </button>
          <button type="button" className="wizard_button" onClick={handleDownload}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportKeymapModal;
