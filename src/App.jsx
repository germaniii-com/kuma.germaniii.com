import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Screen from './components/Screen';
import KeyboardMapContext from './shared/providers/KeyboardMapContext';
import { useState } from 'react';

function App() {
  const [showKeyboard, setShowKeyboard] = useState(false);
  return (
    <KeyboardMapContext.Provider value={{ showKeyboard, setShowKeyboard }}>
      <Header />
      <Screen />
      <Footer />
    </KeyboardMapContext.Provider>
  );
}

export default App;
