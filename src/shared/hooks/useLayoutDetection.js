import { useCallback, useEffect, useState } from 'react';
import { IGNORED_KEYS } from '../constants/keys';
import {
  LAYOUT_DETECTION_PHRASE,
  TRACKED_KEY_CODES,
} from '../constants/keyPositions';

const normalizeChar = (char) => {
  if (!char || char.length !== 1) return char;
  return /[a-zA-Z]/.test(char) ? char.toUpperCase() : char;
};

const useLayoutDetection = (isActive = true, onEnter) => {
  const [typed, setTyped] = useState('');
  const [codeToChar, setCodeToChar] = useState(() => new Map());

  const reset = useCallback(() => {
    setTyped('');
    setCodeToChar(new Map());
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const onKeyDown = (kpe) => {
      if (IGNORED_KEYS.some((key) => key === kpe.key)) return;

      if (kpe.key === 'Enter') {
        kpe.preventDefault();
        if (typed.length > 0) {
          onEnter?.();
        }
        return;
      }

      kpe.preventDefault();

      if (kpe.key === 'Backspace') {
        setTyped((prev) => prev.slice(0, -1));
        return;
      }

      if (kpe.key.length !== 1) return;

      if (TRACKED_KEY_CODES.has(kpe.code)) {
        setCodeToChar((prev) => {
          const next = new Map(prev);
          next.set(kpe.code, normalizeChar(kpe.key));
          return next;
        });
      }

      setTyped((prev) => {
        if (prev.length >= LAYOUT_DETECTION_PHRASE.length) return prev;
        return prev + kpe.key;
      });
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isActive, onEnter, typed.length]);

  const isComplete = typed.length >= LAYOUT_DETECTION_PHRASE.length;

  return {
    phrase: LAYOUT_DETECTION_PHRASE,
    typed,
    codeToChar,
    isComplete,
    reset,
  };
};

export default useLayoutDetection;
