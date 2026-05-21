import { useCallback, useState } from 'react';
import { CUSTOM_LAYOUT_ID } from '../constants/keyboardLayouts';
import {
  loadCustomKeymap,
  saveCustomKeymap as persistCustomKeymap,
} from '../utils/customKeymapStorage';

const useKeyboardMap = () => {
  const [isMappingKey, setIsMappingKey] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [keyboardLayout, setKeyboardLayoutState] = useState('qwerty');
  const [customKeymap, setCustomKeymap] = useState(loadCustomKeymap);
  const [isEditingKeymap, setIsEditingKeymap] = useState(false);

  const setKeyboardLayout = useCallback((layout) => {
    if (layout !== CUSTOM_LAYOUT_ID) {
      setIsEditingKeymap(false);
      setIsMappingKey(false);
    }
    setKeyboardLayoutState(layout);
  }, []);

  const toggleShowKeyboard = useCallback(() => {
    setShowKeyboard((prev) => !prev);
  }, []);

  const startEditMode = useCallback(() => {
    setKeyboardLayoutState(CUSTOM_LAYOUT_ID);
    setShowKeyboard(true);
    setIsEditingKeymap(true);
  }, []);

  const stopEditMode = useCallback(() => {
    persistCustomKeymap(customKeymap);
    setIsEditingKeymap(false);
  }, [customKeymap]);

  const isCustomEditable =
    isEditingKeymap && keyboardLayout === CUSTOM_LAYOUT_ID;

  return {
    isMappingKey,
    setIsMappingKey,
    showKeyboard,
    keyboardLayout,
    customKeymap,
    setCustomKeymap,
    isEditingKeymap,
    isCustomEditable,
    setKeyboardLayout,
    toggleShowKeyboard,
    startEditMode,
    stopEditMode,
  };
};

export default useKeyboardMap;
