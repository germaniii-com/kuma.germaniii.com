const CHAR_TO_QMK = {
  A: 'KC_A',
  B: 'KC_B',
  C: 'KC_C',
  D: 'KC_D',
  E: 'KC_E',
  F: 'KC_F',
  G: 'KC_G',
  H: 'KC_H',
  I: 'KC_I',
  J: 'KC_J',
  K: 'KC_K',
  L: 'KC_L',
  M: 'KC_M',
  N: 'KC_N',
  O: 'KC_O',
  P: 'KC_P',
  Q: 'KC_Q',
  R: 'KC_R',
  S: 'KC_S',
  T: 'KC_T',
  U: 'KC_U',
  V: 'KC_V',
  W: 'KC_W',
  X: 'KC_X',
  Y: 'KC_Y',
  Z: 'KC_Z',
  ';': 'KC_SCLN',
  "'": 'KC_QUOT',
  ',': 'KC_COMM',
  '.': 'KC_DOT',
  '/': 'KC_SLSH',
  '-': 'KC_MINS',
  ':': 'KC_COLN',
};

export const charToQmkKeycode = (char) => {
  const upper = char?.length === 1 && /[a-z]/i.test(char) ? char.toUpperCase() : char;
  return CHAR_TO_QMK[upper] ?? `KC_${upper}`;
};

export const charToZmkBinding = (char) => {
  const upper =
    char?.length === 1 && /[a-z]/i.test(char) ? char.toUpperCase() : char;
  return `&kp ${upper}`;
};
