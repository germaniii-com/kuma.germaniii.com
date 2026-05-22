import { createContext, useContext, useMemo } from 'react';

const KeyboardMapContext = createContext(null);

export const useKeyboardMapContext = () => {
  const context = useContext(KeyboardMapContext);
  if (!context) {
    throw new Error('useKeyboardMapContext must be used within KeyboardMapProvider');
  }
  return context;
};

const KeyboardMapProvider = ({ keyboardMap, pressedKeyIndex, children }) => {
  const value = useMemo(
    () => ({ ...keyboardMap, pressedKeyIndex }),
    [keyboardMap, pressedKeyIndex]
  );

  return (
    <KeyboardMapContext.Provider value={value}>
      {children}
    </KeyboardMapContext.Provider>
  );
};

export default KeyboardMapProvider;
