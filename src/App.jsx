import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Screen from './components/Screen';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const eventListener = (kpe) => {
      kpe.preventDefault();
      console.log(kpe.code);
      console.log(kpe.key);
      console.log('shift key pressed: ', kpe.shiftKey); // shift
      console.log('ctrl key pressed: ', kpe.ctrlKey); // ctrl
      console.log('alt key pressed: ', kpe.altKey); // alt
      console.log('meta key pressed: ', kpe.metaKey); // command/windows (meta) key
      setCount((prev) => prev + 1);
    };

    document.addEventListener('keydown', eventListener);

    return () => {
      document.removeEventListener('keydown', eventListener);
    };
  }, []);

  return (
    <>
      <Header />
      <Screen />
      <Footer />
    </>
  );
}

export default App;
