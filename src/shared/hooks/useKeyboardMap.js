import { useCallback, useEffect, useState } from 'react';
import {
  CUSTOM_LAYOUT_ID,
  WIZARD_STORAGE_KEY,
} from '../constants/keyboardLayouts';
import {
  loadCustomKeymap,
  saveCustomKeymap as persistCustomKeymap,
} from '../utils/customKeymapStorage';

const loadWizardState = () => {
  try {
    const raw = sessionStorage.getItem(WIZARD_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      typeof parsed.sourceLayout === 'string' &&
      typeof parsed.targetLayout === 'string'
    ) {
      return parsed;
    }
  } catch {
    /* ignore */
  }
  return null;
};

const useKeyboardMap = () => {
  const saved = loadWizardState();

  const [isMappingKey, setIsMappingKey] = useState(false);
  const [sourceLayout, setSourceLayoutState] = useState(
    saved?.sourceLayout ?? null
  );
  const [targetLayout, setTargetLayoutState] = useState(
    saved?.targetLayout ?? 'qwerty'
  );
  const [customKeymap, setCustomKeymap] = useState(loadCustomKeymap);
  const [isEditingKeymap, setIsEditingKeymap] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  useEffect(() => {
    sessionStorage.setItem(
      WIZARD_STORAGE_KEY,
      JSON.stringify({ sourceLayout, targetLayout })
    );
  }, [sourceLayout, targetLayout]);

  const setSourceLayout = useCallback((layout) => {
    setSourceLayoutState(layout);
  }, []);

  const setTargetLayout = useCallback((layout) => {
    if (layout !== CUSTOM_LAYOUT_ID) {
      setIsEditingKeymap(false);
      setIsMappingKey(false);
    }
    setTargetLayoutState(layout);
  }, []);

  const startEditMode = useCallback(() => {
    setTargetLayoutState(CUSTOM_LAYOUT_ID);
    setIsEditingKeymap(true);
  }, []);

  const stopEditMode = useCallback(() => {
    persistCustomKeymap(customKeymap);
    setIsEditingKeymap(false);
  }, [customKeymap]);

  const isCustomEditable =
    isEditingKeymap && targetLayout === CUSTOM_LAYOUT_ID;

  const openExportModal = useCallback(() => setIsExportModalOpen(true), []);
  const closeExportModal = useCallback(() => setIsExportModalOpen(false), []);

  return {
    isMappingKey,
    setIsMappingKey,
    sourceLayout,
    setSourceLayout,
    targetLayout,
    setTargetLayout,
    keyboardLayout: targetLayout,
    setKeyboardLayout: setTargetLayout,
    customKeymap,
    setCustomKeymap,
    isEditingKeymap,
    isCustomEditable,
    startEditMode,
    stopEditMode,
    isExportModalOpen,
    openExportModal,
    closeExportModal,
  };
};

export default useKeyboardMap;
