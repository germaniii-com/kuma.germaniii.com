import { useContext, useState } from 'react';
import './index.css';
import PhraseDisplay from '../../components/PhraseDisplay';
import KeyboardKeys from '../../components/KeyboardKeys';
import { KEYBOARD_CONFIG_SCREEN } from '../../shared/constants/screen';
import ScreenContext from '../../shared/providers/ScreenContext';
import { FaKeyboard } from 'react-icons/fa6';

const TyperScreen = () => {
  const { key, quote, typerReturnScreen, goBackFromTyper } =
    useContext(ScreenContext);
  const canBackToKeyboard = typerReturnScreen === KEYBOARD_CONFIG_SCREEN;
  const [showKeyboardKeys, setShowKeyboardKeys] = useState(true);

  return (
    <div className="typer_screen">
      <p className="typer_screen_hint">
        Keys are translated from your physical keyboard to the target layout.
      </p>
      <PhraseDisplay phrase={quote.quote} typed={key} />
      <p className="typer_screen_attribution">- {quote.from}</p>
      <button
        type="button"
        className={`typer_screen_keyboard_toggle${showKeyboardKeys ? ' typer_screen_keyboard_toggle--active' : ''}`}
        onClick={() => setShowKeyboardKeys((prev) => !prev)}
        aria-pressed={showKeyboardKeys}
      >
        <FaKeyboard aria-hidden />
        {showKeyboardKeys ? 'Hide keyboard' : 'Show keyboard'}
      </button>
      {showKeyboardKeys && <KeyboardKeys />}
      <button
        type="button"
        className="wizard_secondary_button"
        onClick={goBackFromTyper}
      >
        {canBackToKeyboard ? 'Back to keyboard' : 'Back to detect layout'}
      </button>
    </div>
  );
};

export default TyperScreen;
