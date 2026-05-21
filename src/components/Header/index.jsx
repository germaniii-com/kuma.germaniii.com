import { KEYBOARD_LAYOUT_OPTIONS } from '../../shared/constants/keyboardLayouts';
import { useKeyboardMapContext } from '../../shared/providers/KeyboardMapProvider';
import './index.css';
import { FaKeyboard } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';

const Header = () => {
  const {
    keyboardLayout,
    setKeyboardLayout,
    toggleShowKeyboard,
    isEditingKeymap,
    startEditMode,
    stopEditMode,
  } = useKeyboardMapContext();

  const onChangeKeyboardLayout = (e) => {
    setKeyboardLayout(e.target.value);
  };

  const onClickEditKeyboard = () => {
    if (isEditingKeymap) {
      stopEditMode();
    } else {
      startEditMode();
    }
  };

  return (
    <div className="header">
      <span>Keyboard Utility/Mapper Application</span>
      <FaKeyboard onClick={toggleShowKeyboard} />
      <FaEdit
        className={isEditingKeymap ? 'header_edit--active' : ''}
        onClick={onClickEditKeyboard}
      />
      <select value={keyboardLayout} onChange={onChangeKeyboardLayout}>
        {KEYBOARD_LAYOUT_OPTIONS.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Header;
