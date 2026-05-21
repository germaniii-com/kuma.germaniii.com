import {
  CUSTOM_LAYOUT_ID,
  KEYBOARD_LAYOUT_TO_MAP,
} from '../../constants/keyboardLayouts';
import { formatKeymapCsv } from './csv';
import { formatKeymapQmk } from './qmk';
import { formatKeymapZmk } from './zmk';

export const EXPORT_FORMATS = [
  { id: 'csv', label: 'CSV', extension: 'csv', mimeType: 'text/csv' },
  { id: 'qmk', label: 'QMK', extension: 'json', mimeType: 'application/json' },
  { id: 'zmk', label: 'ZMK', extension: 'yaml', mimeType: 'text/yaml' },
];

export const getActiveKeymap = (targetLayout, customKeymap) =>
  targetLayout === CUSTOM_LAYOUT_ID
    ? customKeymap
    : KEYBOARD_LAYOUT_TO_MAP[targetLayout];

export const formatKeymapExport = (formatId, keymap, metadata) => {
  switch (formatId) {
    case 'csv':
      return formatKeymapCsv(keymap, metadata);
    case 'qmk':
      return formatKeymapQmk(keymap, metadata);
    case 'zmk':
      return formatKeymapZmk(keymap, metadata);
    default:
      throw new Error(`Unknown export format: ${formatId}`);
  }
};

export const downloadKeymapExport = ({
  formatId,
  keymap,
  metadata,
  filenamePrefix = 'kuma-keymap',
}) => {
  const format = EXPORT_FORMATS.find((f) => f.id === formatId);
  if (!format) return;

  const content = formatKeymapExport(formatId, keymap, metadata);
  const blob = new Blob([content], { type: format.mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${filenamePrefix}.${format.extension}`;
  anchor.click();
  URL.revokeObjectURL(url);
};
