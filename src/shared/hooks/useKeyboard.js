import {
  DETECT_LAYOUT_SCREEN,
  KEYBOARD_CONFIG_SCREEN,
  TYPER_SCREEN,
  TYPER_SUMMARY_SCREEN,
} from '../constants/screen';
import { MOVIE_QUOTES } from '../constants/quotes';
import { IGNORED_KEYS } from '../constants/keys';
import { useState, useEffect, useCallback } from 'react';

const getRandomQuote = () =>
  MOVIE_QUOTES[Math.floor(Math.random() * 10) % MOVIE_QUOTES.length];

const useKeyboard = (isMappingKey = false) => {
  const [screen, setScreen] = useState(DETECT_LAYOUT_SCREEN);
  const [key, setKey] = useState('');
  const [quote, setQuote] = useState(getRandomQuote());
  const [timestamps, setTimestamps] = useState([]);

  const resetTyperState = useCallback(() => {
    setKey('');
    setTimestamps([]);
    setQuote(getRandomQuote());
  }, []);

  const goToTyper = useCallback(() => {
    resetTyperState();
    setScreen(TYPER_SCREEN);
  }, [resetTyperState]);

  const goToKeyboard = useCallback(() => {
    setScreen(KEYBOARD_CONFIG_SCREEN);
  }, []);

  useEffect(() => {
    const eventListener = (kpe) => {
      if (isMappingKey) return;
      if (IGNORED_KEYS.some((ignored) => ignored === kpe.key)) return;

      const typerOrSummary =
        screen === TYPER_SCREEN || screen === TYPER_SUMMARY_SCREEN;
      if (typerOrSummary) {
        kpe.preventDefault();
      }

      switch (screen) {
        case TYPER_SCREEN:
          if (kpe.key === 'Enter') break;

          setTimestamps((prev) => [
            ...prev,
            {
              timestamp: Date.now(),
              key: kpe.key,
            },
          ]);

          if (kpe.key === 'Backspace') setKey((prev) => prev.slice(0, -1));
          else setKey((prev) => prev + kpe.key);
          break;
        case TYPER_SUMMARY_SCREEN:
          if (kpe.key === 'Enter') {
            resetTyperState();
            setScreen(TYPER_SCREEN);
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', eventListener);

    return () => {
      document.removeEventListener('keydown', eventListener);
    };
  }, [screen, isMappingKey, resetTyperState]);

  useEffect(() => {
    if (screen === TYPER_SCREEN && key.length >= quote.quote?.length) {
      setScreen(TYPER_SUMMARY_SCREEN);
    }
  }, [screen, quote.quote, key]);

  return {
    screen,
    setScreen,
    key,
    quote,
    timestamps,
    goToTyper,
    goToKeyboard,
    resetTyperState,
  };
};

export default useKeyboard;
