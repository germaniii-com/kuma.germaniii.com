import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Screen from './components/Screen';
import KeyboardMapContext from './shared/providers/KeyboardMapContext';
import { useState } from 'react';
import KeyboardKeys from './components/KeyboardKeys';
import ScreenContext from './shared/providers/ScreenContext';
import useKeyboard from './shared/hooks/useKeyboard';

function App() {
  const { screen, key, quote, timestamps } = useKeyboard();
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [keyboardLayout, setKeyboardLayout] = useState('qwerty');

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
