import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CUSTOM_LAYOUT_ID,
  KEYBOARD_LAYOUT_TO_MAP,
  WIZARD_STORAGE_KEY,
} from '../constants/keyboardLayouts';
import {
  loadCustomKeymap,
  saveCustomKeymap as persistCustomKeymap,
} from '../utils/customKeymapStorage';
import { keymapsEqual } from '../utils/keymapUtils';

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
  const [persistedCustomKeymap, setPersistedCustomKeymap] = useState(
    loadCustomKeymap
  );
  const [isEditingKeymap, setIsEditingKeymap] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [pendingTargetLayout, setPendingTargetLayout] = useState(null);
  const [isDiscardConfirmOpen, setIsDiscardConfirmOpen] = useState(false);

  const hasCustomKeymapChanges = useMemo(
    () => !keymapsEqual(customKeymap, persistedCustomKeymap),
    [customKeymap, persistedCustomKeymap]
  );

  useEffect(() => {
    sessionStorage.setItem(
      WIZARD_STORAGE_KEY,
      JSON.stringify({ sourceLayout, targetLayout })
    );
  }, [sourceLayout, targetLayout]);

  const setSourceLayout = useCallback((layout) => {
    setSourceLayoutState(layout);
  }, []);

  const applyTargetLayout = useCallback((layout) => {
    if (layout !== CUSTOM_LAYOUT_ID) {
      setIsEditingKeymap(false);
      setIsMappingKey(false);
    }
    setTargetLayoutState(layout);
  }, []);

  const requestTargetLayout = useCallback(
    (layout) => {
      if (layout === targetLayout) return;

      if (hasCustomKeymapChanges) {
        setPendingTargetLayout(layout);
        setIsDiscardConfirmOpen(true);
        return;
      }

      applyTargetLayout(layout);
    },
    [targetLayout, hasCustomKeymapChanges, applyTargetLayout]
  );

  const confirmDiscardCustomChanges = useCallback(() => {
    if (!pendingTargetLayout) return;

    setCustomKeymap([...persistedCustomKeymap]);
    setIsEditingKeymap(false);
    setIsMappingKey(false);
    applyTargetLayout(pendingTargetLayout);
    setPendingTargetLayout(null);
    setIsDiscardConfirmOpen(false);
  }, [pendingTargetLayout, persistedCustomKeymap, applyTargetLayout]);

  const cancelDiscardCustomChanges = useCallback(() => {
    setPendingTargetLayout(null);
    setIsDiscardConfirmOpen(false);
  }, []);

  const setTargetLayout = requestTargetLayout;

  const startEditMode = useCallback(() => {
    setTargetLayoutState(CUSTOM_LAYOUT_ID);
    setIsEditingKeymap(true);
  }, []);

  const stopEditMode = useCallback(() => {
    persistCustomKeymap(customKeymap);
    setPersistedCustomKeymap([...customKeymap]);
    setIsEditingKeymap(false);
  }, [customKeymap]);

  const cancelCustomKeymapChanges = useCallback(() => {
    setCustomKeymap([...persistedCustomKeymap]);
    setIsEditingKeymap(false);
    setIsMappingKey(false);
  }, [persistedCustomKeymap]);

  const isCustomEditable =
    isEditingKeymap && targetLayout === CUSTOM_LAYOUT_ID;

  const getTargetKeymap = useCallback(
    () =>
      targetLayout === CUSTOM_LAYOUT_ID
        ? customKeymap
        : KEYBOARD_LAYOUT_TO_MAP[targetLayout],
    [targetLayout, customKeymap]
  );

  const getSourceKeymap = useCallback(
    () =>
      sourceLayout ? KEYBOARD_LAYOUT_TO_MAP[sourceLayout] ?? null : null,
    [sourceLayout]
  );

  const openExportModal = useCallback(() => setIsExportModalOpen(true), []);
  const closeExportModal = useCallback(() => setIsExportModalOpen(false), []);

  return {
    isMappingKey,
    setIsMappingKey,
    sourceLayout,
    setSourceLayout,
    targetLayout,
    setTargetLayout,
    requestTargetLayout,
    keyboardLayout: targetLayout,
    setKeyboardLayout: requestTargetLayout,
    customKeymap,
    setCustomKeymap,
    hasCustomKeymapChanges,
    isEditingKeymap,
    isCustomEditable,
    startEditMode,
    stopEditMode,
    cancelCustomKeymapChanges,
    isExportModalOpen,
    openExportModal,
    closeExportModal,
    isDiscardConfirmOpen,
    confirmDiscardCustomChanges,
    cancelDiscardCustomChanges,
    getTargetKeymap,
    getSourceKeymap,
  };
};

export default useKeyboardMap;
