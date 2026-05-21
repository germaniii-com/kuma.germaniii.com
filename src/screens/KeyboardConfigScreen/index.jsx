import { useContext } from 'react';
import './index.css';
import KeyboardKeys from '../../components/KeyboardKeys';
import ScreenContext from '../../shared/providers/ScreenContext';

const KeyboardConfigScreen = () => {
  const { goToTyper } = useContext(ScreenContext);

  return (
    <div className="keyboard_config_screen">
      <p className="keyboard_config_screen_hint">
        Your target layout is shown below. Edit keys or try typing practice.
      </p>
      <KeyboardKeys />
      <button type="button" className="wizard_button" onClick={goToTyper}>
        Try it out
      </button>
    </div>
  );
};

export default KeyboardConfigScreen;
