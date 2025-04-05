import { useContext } from 'react';
import Key from '../Key';
import './index.css';
import KeyboardMapContext from '../../shared/providers/KeyboardMapContext';
import { KEYBOARD_LAYOUT_TO_MAP } from '../../shared/constants/keyboardLayouts';

const KeyboardKeys = () => {
  const { showKeyboard, keyboardLayout, key } = useContext(KeyboardMapContext);
  const keyboardKeysClassName = showKeyboard
    ? 'visible keyboard_keys'
    : 'invisible';
  return (
    <div className={keyboardKeysClassName}>
      {KEYBOARD_LAYOUT_TO_MAP[keyboardLayout].map((c) => (
        <Key
          key={c}
          keyChar={c}
          isCurrent={c.toLowerCase() === key.at(-1)?.toLowerCase()}
        />
      ))}
    </div>
  );
};

export default KeyboardKeys;
