import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Screen from './components/Screen';
import KeyboardMapContext from './shared/providers/KeyboardMapContext';
import { useState } from 'react';
import KeyboardKeys from './components/KeyboardKeys';

function App() {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [keyboardLayout, setKeyboardLayout] = useState('qwerty');
  return (
    <KeyboardMapContext.Provider value={{ showKeyboard, keyboardLayout }}>
      <Header
        keyboardLayout={keyboardLayout}
        setKeyboardLayout={setKeyboardLayout}
        setShowKeyboard={setShowKeyboard}
      />
      <Screen />
      <KeyboardKeys />
      <Footer />
    </KeyboardMapContext.Provider>
  );
}

export default App;
