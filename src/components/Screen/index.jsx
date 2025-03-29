import { useEffect, useState } from 'react';
import './index.css';
import {
  MAIN_SCREEN,
  TYPER_SCREEN,
  TYPER_SUMMARY_SCREEN,
} from '../../shared/constants/screen';
import MainScreen from '../../screens/MainScreen';
import TyperScreen from '../../screens/TyperScreen';
import ScreenContext from '../../shared/providers/ScreenContext';
import { MOVIE_QUOTES } from '../../shared/constants/quotes';
import { IGNORED_KEYS } from '../../shared/constants/keys';
import TyperSummaryScreen from '../../screens/TypeSummaryScreen';

const getRandomQuote = () => MOVIE_QUOTES[Math.ceil(Math.random() * 10)];

const Screen = () => {
  const [screen, setScreen] = useState(MAIN_SCREEN);
  const [key, setKey] = useState('');
  const [quote, setQuote] = useState(getRandomQuote());
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    const eventListener = (kpe) => {
      if (IGNORED_KEYS.some((key) => key === kpe.key)) return;
      console.log(kpe.key);
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

  return (
    <div className="base-screen">
      <ScreenContext.Provider value={{ screen, key, quote, timestamps }}>
        <MainScreen />
        <TyperScreen />
        <TyperSummaryScreen />
      </ScreenContext.Provider>
    </div>
  );
};

export default Screen;
