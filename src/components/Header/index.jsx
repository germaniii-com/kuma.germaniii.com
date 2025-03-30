import { useContext } from 'react';
import { KEYBOARD_LAYOUTS } from '../../shared/constants/keyboardLayouts';
import './index.css';
import KeyboardMapContext from '../../shared/providers/KeyboardMapContext';
import { FaKeyboard } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';

const Header = () => {
  const { setShowKeyboard } = useContext(KeyboardMapContext);
  const onClickShowKeyboard = () => {
    setShowKeyboard((prev) => !prev);
    alert(
      'Hi, thanks for checking out KUMA. This button is still a work in progress.'
    );
  };

  const onClickEditKeyboard = () => {
    alert(
      'Hi, thanks for checking out KUMA. This button is still a work in progress.'
    );
  };

  return (
    <div className="header">
      <span>Keyboard Utility/Manager-Application</span>
      <FaKeyboard onClick={onClickShowKeyboard} />
      <FaEdit onClick={onClickEditKeyboard} />
      <select>
        {KEYBOARD_LAYOUTS.map((kl) => (
          <option key={kl}>{kl}</option>
        ))}
      </select>
    </div>
  );
};

export default Header;
