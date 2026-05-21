import {
  CUSTOM_LAYOUT_ID,
  KEYBOARD_LAYOUT_TO_MAP,
} from '../constants/keyboardLayouts';
import { KEYMAP_KEY_CODES } from '../constants/keyPositions';

const MIN_OBSERVATIONS = 8;
const MIN_CONFIDENCE = 0.6;

const normalizeChar = (char) => {
  if (!char || char.length !== 1) return char;
  return /[a-zA-Z]/.test(char) ? char.toUpperCase() : char;
};

const charsMatch = (observed, expected) =>
  normalizeChar(observed) === normalizeChar(expected);

/**
 * @param {Map<string, string>} codeToChar - physical key code → typed character
 * @returns {{ layoutId: string, matchCount: number, totalObserved: number, confidence: number } | null}
 */
export const detectKeyboardLayout = (codeToChar) => {
  if (!codeToChar || codeToChar.size < MIN_OBSERVATIONS) {
    return null;
  }

  const codeToIndex = new Map(
    KEYMAP_KEY_CODES.map((code, index) => [code, index])
  );

  let best = null;

  for (const [layoutId, keymap] of Object.entries(KEYBOARD_LAYOUT_TO_MAP)) {
    if (layoutId === CUSTOM_LAYOUT_ID) continue;

    let matchCount = 0;
    let totalObserved = 0;

    for (const [code, observed] of codeToChar) {
      const index = codeToIndex.get(code);
      if (index === undefined) continue;

      totalObserved += 1;
      if (charsMatch(observed, keymap[index])) {
        matchCount += 1;
      }
    }

    if (totalObserved < MIN_OBSERVATIONS) continue;

    const confidence = matchCount / totalObserved;

    if (
      !best ||
      confidence > best.confidence ||
      (confidence === best.confidence && matchCount > best.matchCount)
    ) {
      best = { layoutId, matchCount, totalObserved, confidence };
    }
  }

  if (!best || best.confidence < MIN_CONFIDENCE) {
    return null;
  }

  return best;
};
