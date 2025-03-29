import { useEffect, useState } from 'react';
import './index.css';
import { MAIN_SCREEN, TYPER_SCREEN } from '../../shared/constants/screen';
import MainScreen from '../../screens/MainScreen';
import TyperScreen from '../../screens/TyperScreen';
import ScreenContext from '../../shared/providers/ScreenContext';

const Screen = () => {
  const [screen, setScreen] = useState(MAIN_SCREEN);
  const [key, setKey] = useState('');

  useEffect(() => {
    const eventListener = (kpe) => {
      kpe.preventDefault();
      console.log(kpe.key);
      switch (screen) {
        case MAIN_SCREEN:
          if (kpe.key === 'Enter') setScreen(TYPER_SCREEN);
          break;
        case TYPER_SCREEN:
          switch (kpe.key) {
            case 'Backspace':
              setKey((prev) => prev.slice(0, -1));
              return;
            case 'Alt':
            case 'Tab':
            case 'Control':
            case 'Meta':
            case 'Shift':
            case 'Escape':
            case 'Enter':
            case 'CapsLock':
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'ArrowUp':
            case 'ArrowDown':
            case 'Delete':
              // noop
              return;
          }
          setKey((prev) => prev + kpe.key);
          break;
      }
    };

    document.addEventListener('keydown', eventListener);

    return () => {
      document.removeEventListener('keydown', eventListener);
      setKey('');
    };
  }, [screen, setScreen, setKey]);

  return (
    <div className="base-screen">
      <ScreenContext.Provider value={{ screen, key }}>
        <MainScreen />
        <TyperScreen />
      </ScreenContext.Provider>
    </div>
  );
};

export default Screen;
