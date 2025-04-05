import {
  MAIN_SCREEN,
  TYPER_SCREEN,
  TYPER_SUMMARY_SCREEN,
} from '../constants/screen';
import { MOVIE_QUOTES } from '../constants/quotes';
import { IGNORED_KEYS } from '../constants/keys';
import { useState, useEffect } from 'react';

const getRandomQuote = () =>
  MOVIE_QUOTES[Math.floor(Math.random() * 10) % MOVIE_QUOTES.length];

const useKeyboard = () => {
  const [screen, setScreen] = useState(MAIN_SCREEN);
  const [key, setKey] = useState('');
  const [quote, setQuote] = useState(getRandomQuote());
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    const eventListener = (kpe) => {
      if (IGNORED_KEYS.some((key) => key === kpe.key)) return;
      kpe.preventDefault();

      switch (screen) {
        case MAIN_SCREEN:
          if (kpe.key === 'Enter') setScreen(TYPER_SCREEN);
          break;
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
            setKey('');
            setTimestamps([]);
            setQuote(getRandomQuote());
            setScreen(TYPER_SCREEN);
          }
          break;
      }
    };

    document.addEventListener('keydown', eventListener);

    return () => {
      document.removeEventListener('keydown', eventListener);
    };
  }, [screen, setScreen, setKey, setQuote]);

  useEffect(() => {
    if (key.length >= quote.quote?.length) {
      setScreen(TYPER_SUMMARY_SCREEN);
    }
  }, [setScreen, quote.quote, key]);

  return {
    screen,
    key,
    quote,
    timestamps,
  };
};

export default useKeyboard;
