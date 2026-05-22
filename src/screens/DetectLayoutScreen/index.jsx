import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import './index.css';
import PhraseDisplay from '../../components/PhraseDisplay';
import useLayoutDetection from '../../shared/hooks/useLayoutDetection';
import { detectKeyboardLayout } from '../../shared/utils/detectKeyboardLayout';
import {
  PRESET_KEYBOARD_LAYOUT_OPTIONS,
} from '../../shared/constants/keyboardLayouts';
import { KEYBOARD_CONFIG_SCREEN } from '../../shared/constants/screen';
import ScreenContext from '../../shared/providers/ScreenContext';
import { useKeyboardMapContext } from '../../shared/providers/KeyboardMapProvider';

const DetectLayoutScreen = () => {
  const { setScreen } = useContext(ScreenContext);
  const { setSourceLayout } = useKeyboardMapContext();
  const [showFallback, setShowFallback] = useState(false);
  const [manualSource, setManualSource] = useState('qwerty');
  const [fallbackMessage, setFallbackMessage] = useState(null);

  const continueRef = useRef(null);

  const { phrase, typed, codeToChar, isComplete } = useLayoutDetection(
    true,
    () => continueRef.current?.()
  );

  const detectionResult = useMemo(
    () => detectKeyboardLayout(codeToChar),
    [codeToChar]
  );

  const handleContinue = useCallback(() => {
    if (detectionResult && !showFallback) {
      setSourceLayout(detectionResult.layoutId);
      setScreen(KEYBOARD_CONFIG_SCREEN);
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
    setScreen(KEYBOARD_CONFIG_SCREEN);
  }, [
    detectionResult,
    showFallback,
    manualSource,
    setSourceLayout,
    setScreen,
  ]);

  useEffect(() => {
    continueRef.current = () => {
      if (typed.length === 0) return;
      handleContinue();
    };
  }, [handleContinue, typed.length]);

  return (
    <div className="detect_layout_screen">
      <h2>Type your current layout</h2>
      <p className="detect_layout_screen_hint">
        Type the phrase below using your normal keyboard. We use physical key
        positions to guess your layout. Press Enter to continue.
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
