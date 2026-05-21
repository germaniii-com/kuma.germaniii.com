import { useState, useCallback, useEffect } from 'react';
import Key from '../Key';
import './index.css';
import { useKeyboardMapContext } from '../../shared/providers/KeyboardMapProvider';
import {
  CUSTOM_LAYOUT_ID,
  KEYBOARD_LAYOUT_TO_MAP,
} from '../../shared/constants/keyboardLayouts';
import KeyMappingModal from '../KeyMappingModal';

const KeyboardKeys = () => {
  const {
    showKeyboard,
    keyboardLayout,
    typedKey,
    customKeymap,
    setCustomKeymap,
    isCustomEditable,
    setIsMappingKey,
  } = useKeyboardMapContext();

  const [mappingKeyIndex, setMappingKeyIndex] = useState(null);
  const [pendingChar, setPendingChar] = useState(null);

  const activeMap =
    keyboardLayout === CUSTOM_LAYOUT_ID
      ? customKeymap
      : KEYBOARD_LAYOUT_TO_MAP[keyboardLayout];

  const openMappingModal = (index) => {
    setMappingKeyIndex(index);
    setPendingChar(null);
    setIsMappingKey(true);
  };

  const closeMappingModal = useCallback(() => {
    setMappingKeyIndex(null);
    setPendingChar(null);
    setIsMappingKey(false);
  }, [setIsMappingKey]);

  useEffect(() => {
    if (!isCustomEditable) {
      closeMappingModal();
    }
  }, [isCustomEditable, closeMappingModal]);

  const onAccept = () => {
    if (mappingKeyIndex === null || !pendingChar) return;
    setCustomKeymap((prev) => {
      const next = [...prev];
      next[mappingKeyIndex] = pendingChar;
      return next;
    });
    closeMappingModal();
  };

  const keyboardKeysClassName = [
    showKeyboard ? 'visible' : 'invisible',
    'keyboard_keys',
    isCustomEditable ? 'keyboard_keys--editing' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <div className={keyboardKeysClassName}>
        {activeMap.map((c, i) => (
          <Key
            key={i}
            keyChar={c}
            isCurrent={
              !isCustomEditable &&
              c.toLowerCase() === typedKey.at(-1)?.toLowerCase()
            }
            isEditable={isCustomEditable}
            isSelected={mappingKeyIndex === i}
            onClick={() => openMappingModal(i)}
          />
        ))}
      </div>
      {mappingKeyIndex !== null && (
        <KeyMappingModal
          currentLabel={activeMap[mappingKeyIndex]}
          pendingChar={pendingChar}
          onPendingCharChange={setPendingChar}
          onAccept={onAccept}
          onCancel={closeMappingModal}
        />
      )}
    </>
  );
};

export default KeyboardKeys;
