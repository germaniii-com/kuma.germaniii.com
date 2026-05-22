import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import './index.css';
import PhraseDisplay from '../../components/PhraseDisplay';
import useLayoutDetection from '../../shared/hooks/useLayoutDetection';
import { detectKeyboardLayout } from '../../shared/utils/detectKeyboardLayout';
import {
  PRESET_KEYBOARD_LAYOUT_OPTIONS,
} from '../../shared/constants/keyboardLayouts';
import {
  DETECT_LAYOUT_SCREEN,
  KEYBOARD_CONFIG_SCREEN,
} from '../../shared/constants/screen';
import ScreenContext from '../../shared/providers/ScreenContext';
import { useKeyboardMapContext } from '../../shared/providers/KeyboardMapProvider';

const DetectLayoutScreen = () => {
  const { setScreen, goToTyper } = useContext(ScreenContext);
  const { setSourceLayout } = useKeyboardMapContext();
  const [showFallback, setShowFallback] = useState(false);
  const [manualSource, setManualSource] = useState('qwerty');
  const [fallbackMessage, setFallbackMessage] = useState(null);

  const continueRef = useRef(null);

  const { phrase, typed, codeToChar, isPhraseCorrect } = useLayoutDetection(
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

  const handleSkipToTyper = useCallback(() => {
    const source =
      detectionResult?.layoutId ??
      (showFallback ? manualSource : null) ??
      'qwerty';
    setSourceLayout(source);
    goToTyper(DETECT_LAYOUT_SCREEN);
  }, [
    detectionResult,
    showFallback,
    manualSource,
    setSourceLayout,
    goToTyper,
  ]);

  useEffect(() => {
    continueRef.current = () => {
      if (!showFallback && !isPhraseCorrect) return;
      handleContinue();
    };
  }, [handleContinue, showFallback, isPhraseCorrect]);

  return (
    <div className="detect_layout_screen">
      <h2>Type your current layout</h2>
      <p className="detect_layout_screen_hint">
        Type the phrase below exactly using your normal keyboard. We use
        physical key positions to guess your layout. Press Enter when it
        matches.
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
      <div className="detect_layout_screen_actions">
        <button
          type="button"
          className="wizard_button"
          onClick={handleContinue}
          disabled={!showFallback && !isPhraseCorrect}
        >
          Continue
        </button>
        <button
          type="button"
          className="wizard_secondary_button"
          onClick={handleSkipToTyper}
        >
          Try it out
        </button>
      </div>
    </div>
  );
};

export default DetectLayoutScreen;
