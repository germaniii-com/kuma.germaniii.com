import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Screen from './components/Screen';
import KeyboardMapContext from './shared/providers/KeyboardMapContext';
import { useState, useEffect } from 'react';
import KeyboardKeys from './components/KeyboardKeys';
import ScreenContext from './shared/providers/ScreenContext';
import {
  MAIN_SCREEN,
  TYPER_SCREEN,
  TYPER_SUMMARY_SCREEN,
} from './shared/constants/screen';
import { MOVIE_QUOTES } from './shared/constants/quotes';
import { IGNORED_KEYS } from './shared/constants/keys';

const getRandomQuote = () =>
  MOVIE_QUOTES[Math.floor(Math.random() * 10) % MOVIE_QUOTES.length];

function App() {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [keyboardLayout, setKeyboardLayout] = useState('qwerty');
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

  return (
    <ScreenContext.Provider value={{ screen, key, quote, timestamps }}>
      <KeyboardMapContext.Provider
        value={{ showKeyboard, keyboardLayout, key }}
      >
        <Header
          keyboardLayout={keyboardLayout}
          setKeyboardLayout={setKeyboardLayout}
          setShowKeyboard={setShowKeyboard}
        />
        <Screen />
        <KeyboardKeys />
        <Footer />
      </KeyboardMapContext.Provider>
    </ScreenContext.Provider>
  );
}

export default App;
