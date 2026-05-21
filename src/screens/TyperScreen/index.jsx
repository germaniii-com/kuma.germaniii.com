import { useContext } from 'react';
import './index.css';
import PhraseDisplay from '../../components/PhraseDisplay';
import ScreenContext from '../../shared/providers/ScreenContext';

const TyperScreen = () => {
  const { key, quote, goToKeyboard } = useContext(ScreenContext);

  return (
    <div className="typer_screen">
      <PhraseDisplay phrase={quote.quote} typed={key} />
      <p className="typer_screen_attribution">- {quote.from}</p>
      <button
        type="button"
        className="wizard_secondary_button"
        onClick={goToKeyboard}
      >
        Back to keyboard
      </button>
    </div>
  );
};

export default TyperScreen;
