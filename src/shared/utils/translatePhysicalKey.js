import { KEYMAP_KEY_CODES } from '../constants/keyPositions';

const CODE_TO_INDEX = new Map(
  KEYMAP_KEY_CODES.map((code, index) => [code, index])
);

export const getKeyIndexFromCode = (code) =>
  CODE_TO_INDEX.get(code) ?? null;

/**
 * Maps a physical key press to the character on the target layout.
 * Uses key code first; falls back to source-printed character position only
 * for keys outside the 30-key alpha block.
 */
export const getTargetCharFromPhysicalKey = (
  code,
  key,
  targetKeymap,
  sourceKeymap = null
) => {
  if (key === 'Backspace') return { type: 'backspace' };
  if (code === 'Space' || key === ' ') return { type: 'char', value: ' ' };

  const index = getKeyIndexFromCode(code);
  if (index !== null) {
    return { type: 'char', value: targetKeymap[index], index };
  }

  if (sourceKeymap && key?.length === 1) {
    const normalized =
      /[a-z]/i.test(key) && key.length === 1 ? key.toUpperCase() : key;
    const sourceIndex = sourceKeymap.findIndex(
      (c) =>
        (/[a-z]/i.test(c) ? c.toUpperCase() : c) === normalized || c === key
    );
    if (sourceIndex !== -1) {
      return {
        type: 'char',
        value: targetKeymap[sourceIndex],
        index: sourceIndex,
      };
    }
  }

  return null;
};
