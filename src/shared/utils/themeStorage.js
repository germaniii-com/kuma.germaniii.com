import {
  CUSTOM_THEME_STORAGE_KEY,
  DEFAULT_PRESET_ID,
  THEME_STORAGE_KEY,
} from '../constants/theme';

export const loadThemeSelection = () => {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    if (!raw) return { presetId: DEFAULT_PRESET_ID, useCustom: false };
    const parsed = JSON.parse(raw);
    return {
      presetId:
        typeof parsed.presetId === 'string'
          ? parsed.presetId
          : DEFAULT_PRESET_ID,
      useCustom: Boolean(parsed.useCustom),
    };
  } catch {
    return { presetId: DEFAULT_PRESET_ID, useCustom: false };
  }
};

export const saveThemeSelection = ({ presetId, useCustom }) => {
  localStorage.setItem(
    THEME_STORAGE_KEY,
    JSON.stringify({ presetId, useCustom: Boolean(useCustom) })
  );
};

export const loadCustomTheme = () => {
  try {
    const raw = localStorage.getItem(CUSTOM_THEME_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed.name === 'string' &&
      parsed.colors &&
      typeof parsed.colors === 'object'
    ) {
      return parsed;
    }
  } catch {
    /* ignore */
  }
  return null;
};

export const saveCustomTheme = (theme) => {
  localStorage.setItem(CUSTOM_THEME_STORAGE_KEY, JSON.stringify(theme));
};

export const clearCustomTheme = () => {
  localStorage.removeItem(CUSTOM_THEME_STORAGE_KEY);
};
