import { charToQmkKeycode } from './charToQmkKeycode';

export const formatKeymapQmk = (keymap, metadata) => {
  const layer = keymap.map((char) => charToQmkKeycode(char));

  return JSON.stringify(
    {
      keyboard: 'kuma_custom',
      keymap: 'default',
      layout: 'LAYOUT_kuma_alpha',
      author: 'kuma.germaniii.com',
      notes: `Exported ${metadata.exportedAt}. Source: ${metadata.sourceLayout ?? 'unknown'}, Target: ${metadata.targetLayout ?? 'unknown'}. Covers 30-key alpha block only.`,
      layers: [layer],
    },
    null,
    2
  );
};
