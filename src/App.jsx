import './App.css';
import './shared/styles/wizard.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Screen from './components/Screen';
import KeyboardMapProvider from './shared/providers/KeyboardMapProvider';
import ScreenContext from './shared/providers/ScreenContext';
import ExportKeymapModal from './components/ExportKeymapModal';
import useKeyboard from './shared/hooks/useKeyboard';
import useKeyboardMap from './shared/hooks/useKeyboardMap';

function App() {
  const keyboardMap = useKeyboardMap();
  const keyboard = useKeyboard(keyboardMap.isMappingKey);

  return (
    <ScreenContext.Provider value={keyboard}>
      <KeyboardMapProvider keyboardMap={keyboardMap} typedKey={keyboard.key}>
        <Header />
        <Screen />
        <ExportKeymapModal />
        <Footer />
      </KeyboardMapProvider>
    </ScreenContext.Provider>
  );
}

export default App;
