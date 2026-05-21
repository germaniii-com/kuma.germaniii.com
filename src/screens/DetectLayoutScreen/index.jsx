import { useContext, useMemo, useState } from 'react';
import './index.css';
import PhraseDisplay from '../../components/PhraseDisplay';
import useLayoutDetection from '../../shared/hooks/useLayoutDetection';
import { detectKeyboardLayout } from '../../shared/utils/detectKeyboardLayout';
import {
  PRESET_KEYBOARD_LAYOUT_OPTIONS,
} from '../../shared/constants/keyboardLayouts';
import { SELECT_TARGET_SCREEN } from '../../shared/constants/screen';
import ScreenContext from '../../shared/providers/ScreenContext';
import { useKeyboardMapContext } from '../../shared/providers/KeyboardMapProvider';

const DetectLayoutScreen = () => {
  const { setScreen } = useContext(ScreenContext);
  const { setSourceLayout } = useKeyboardMapContext();
  const { phrase, typed, codeToChar, isComplete } = useLayoutDetection(true);
  const [showFallback, setShowFallback] = useState(false);
  const [manualSource, setManualSource] = useState('qwerty');
  const [fallbackMessage, setFallbackMessage] = useState(null);

  const detectionResult = useMemo(
    () => detectKeyboardLayout(codeToChar),
    [codeToChar]
  );

  const handleContinue = () => {
    if (detectionResult && !showFallback) {
      setSourceLayout(detectionResult.layoutId);
      setScreen(SELECT_TARGET_SCREEN);
      return;
    }

    if (!detectionResult && !showFallback) {
      setShowFallback(true);
      setFallbackMessage(
        'Could not detect your layout. Choose your current layout below.'
      );
      return;
    }

    setSourceLayout(manualSource);
    setScreen(SELECT_TARGET_SCREEN);
  };

  return (
    <div className="detect_layout_screen">
      <h2>Type your current layout</h2>
      <p className="detect_layout_screen_hint">
        Type the phrase below using your normal keyboard. We use physical key
        positions to guess your layout.
      </p>
      <PhraseDisplay phrase={phrase} typed={typed} />
      {fallbackMessage && (
        <p className="detect_layout_screen_message">{fallbackMessage}</p>
      )}
      {showFallback && (
        <label className="detect_layout_screen_fallback">
          Current layout:
          <select
            value={manualSource}
            onChange={(e) => setManualSource(e.target.value)}
          >
            {PRESET_KEYBOARD_LAYOUT_OPTIONS.map(({ id, label }) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
      )}
      <button
        type="button"
        className="wizard_button"
        onClick={handleContinue}
        disabled={typed.length === 0}
      >
        {showFallback
          ? 'Continue'
          : isComplete
            ? 'Continue'
            : 'Continue anyway'}
      </button>
    </div>
  );
};

export default DetectLayoutScreen;
