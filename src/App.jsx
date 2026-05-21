import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Screen from './components/Screen';
import KeyboardMapProvider from './shared/providers/KeyboardMapProvider';
import KeyboardKeys from './components/KeyboardKeys';
import ScreenContext from './shared/providers/ScreenContext';
import useKeyboard from './shared/hooks/useKeyboard';
import useKeyboardMap from './shared/hooks/useKeyboardMap';

function App() {
  const keyboardMap = useKeyboardMap();
  const { screen, key, quote, timestamps } = useKeyboard(keyboardMap.isMappingKey);

  return (
    <ScreenContext.Provider value={{ screen, key, quote, timestamps }}>
      <KeyboardMapProvider keyboardMap={keyboardMap} typedKey={key}>
        <Header />
        <Screen />
        <KeyboardKeys />
        <Footer />
      </KeyboardMapProvider>
    </ScreenContext.Provider>
  );
}

export default App;
