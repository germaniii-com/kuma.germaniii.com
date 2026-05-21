import { createContext, useContext, useMemo } from 'react';

const KeyboardMapContext = createContext(null);

export const useKeyboardMapContext = () => {
  const context = useContext(KeyboardMapContext);
  if (!context) {
    throw new Error('useKeyboardMapContext must be used within KeyboardMapProvider');
  }
  return context;
};

const KeyboardMapProvider = ({ keyboardMap, typedKey, children }) => {
  const value = useMemo(
    () => ({ ...keyboardMap, typedKey }),
    [keyboardMap, typedKey]
  );

  return (
    <KeyboardMapContext.Provider value={value}>
      {children}
    </KeyboardMapContext.Provider>
  );
};

export default KeyboardMapProvider;
