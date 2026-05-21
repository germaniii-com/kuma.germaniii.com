import { QWERTY } from '../constants/keymaps';
import { CUSTOM_KEYMAP_STORAGE_KEY } from '../constants/keyboardLayouts';

const KEYMAP_LENGTH = 30;

const isValidKeymap = (map) =>
  Array.isArray(map) &&
  map.length === KEYMAP_LENGTH &&
  map.every((c) => typeof c === 'string' && c.length === 1);

export const loadCustomKeymap = () => {
  try {
    const raw = localStorage.getItem(CUSTOM_KEYMAP_STORAGE_KEY);
    if (!raw) return [...QWERTY];
    const parsed = JSON.parse(raw);
    if (isValidKeymap(parsed)) return parsed;
  } catch {
    /* use fallback */
  }
  return [...QWERTY];
};

export const saveCustomKeymap = (map) => {
  if (!isValidKeymap(map)) return;
  localStorage.setItem(CUSTOM_KEYMAP_STORAGE_KEY, JSON.stringify(map));
};
