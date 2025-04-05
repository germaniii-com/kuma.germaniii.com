import { KEYBOARD_LAYOUTS } from '../../shared/constants/keyboardLayouts';
import './index.css';
import { FaKeyboard } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';

const Header = ({ setShowKeyboard, keyboardLayout, setKeyboardLayout }) => {
  const onClickShowKeyboard = () => {
    setShowKeyboard((prev) => !prev);
  };

  const onChangeKeyboardLayout = (e) => {
    setKeyboardLayout(e.target.value);
  };

  const onClickEditKeyboard = () => {
    alert(
      'Hi, thanks for checking out KUMA. This button is still a work in progress.'
    );
  };

  return (
    <div className="header">
      <span>Keyboard Utility/Mapper Application</span>
      <FaKeyboard onClick={onClickShowKeyboard} />
      <FaEdit onClick={onClickEditKeyboard} />
      <select value={keyboardLayout} onChange={onChangeKeyboardLayout}>
        {KEYBOARD_LAYOUTS.map((kl) => (
          <option key={kl}>{kl}</option>
        ))}
      </select>
    </div>
  );
};

export default Header;
