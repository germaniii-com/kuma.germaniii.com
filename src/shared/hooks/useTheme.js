import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_PRESET_ID } from '../constants/theme';
import { getPresetById, THEME_PRESETS } from '../themes/presets';
import {
  applyThemeToDocument,
  parseThemeFile,
  vscodeColorsToCssVars,
} from '../utils/vscodeTheme';
import {
  clearCustomTheme,
  loadCustomTheme,
  loadThemeSelection,
  saveCustomTheme,
  saveThemeSelection,
} from '../utils/themeStorage';

const applyColors = (colors, type) => {
  const cssVars = vscodeColorsToCssVars(colors);
  applyThemeToDocument(cssVars, type === 'light' ? 'light' : 'dark');
};

const useTheme = () => {
  const initial = useMemo(() => loadThemeSelection(), []);
  const initialCustom = useMemo(() => loadCustomTheme(), []);
  const [presetId, setPresetId] = useState(initial.presetId);
  const [useCustom, setUseCustom] = useState(
    () => initial.useCustom && Boolean(initialCustom)
  );
  const [customTheme, setCustomTheme] = useState(initialCustom);
  const [themeError, setThemeError] = useState(null);
  const fileInputRef = useRef(null);

  const activePreset = getPresetById(presetId);

  const resolveType = useCallback(() => {
    if (useCustom && customTheme) {
      return customTheme.type ?? 'dark';
    }
    return activePreset.type;
  }, [useCustom, customTheme, activePreset.type]);

  const applyActiveTheme = useCallback(() => {
    if (useCustom && customTheme) {
      applyColors(customTheme.colors, resolveType());
      return;
    }
    applyColors(activePreset.colors, activePreset.type);
  }, [useCustom, customTheme, activePreset, resolveType]);

  useEffect(() => {
    applyActiveTheme();
  }, [applyActiveTheme]);

  useEffect(() => {
    saveThemeSelection({ presetId, useCustom });
  }, [presetId, useCustom]);

  const selectPreset = useCallback((id) => {
    setPresetId(id);
    setUseCustom(false);
    setThemeError(null);
  }, []);

  const selectCustom = useCallback(() => {
    if (!customTheme) return;
    setUseCustom(true);
    setThemeError(null);
  }, [customTheme]);

  const uploadThemeFile = useCallback(async (file) => {
    if (!file) return;
    try {
      const theme = await parseThemeFile(file);
      saveCustomTheme(theme);
      setCustomTheme(theme);
      setUseCustom(true);
      setThemeError(null);
    } catch (err) {
      setThemeError(err.message ?? 'Failed to import theme.');
    }
  }, []);

  const removeCustomTheme = useCallback(() => {
    clearCustomTheme();
    setCustomTheme(null);
    setUseCustom(false);
    setThemeError(null);
  }, []);

  const openThemeFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const onThemeFileChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file) uploadThemeFile(file);
      e.target.value = '';
    },
    [uploadThemeFile]
  );

  const onSelectChange = useCallback(
    (e) => {
      const value = e.target.value;
      if (value === '__custom__') {
        selectCustom();
      } else {
        selectPreset(value);
      }
    },
    [selectCustom, selectPreset]
  );

  return {
    presets: THEME_PRESETS,
    presetId,
    useCustom,
    customTheme,
    activePreset,
    themeError,
    fileInputRef,
    selectPreset,
    selectCustom,
    uploadThemeFile,
    removeCustomTheme,
    openThemeFilePicker,
    onThemeFileChange,
    onSelectChange,
    selectValue: useCustom && customTheme ? '__custom__' : presetId,
  };
};

export default useTheme;
