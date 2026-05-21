import { KEYMAP_KEY_CODES } from '../../constants/keyPositions';

export const formatKeymapCsv = (keymap, metadata) => {
  const header = 'index,row,col,code,character';
  const rows = keymap.map((character, index) => {
    const row = Math.floor(index / 10);
    const col = index % 10;
    const code = KEYMAP_KEY_CODES[index];
    return `${index},${row},${col},${code},${character}`;
  });

  const metaLines = [
    `# source_layout: ${metadata.sourceLayout ?? 'unknown'}`,
    `# target_layout: ${metadata.targetLayout ?? 'unknown'}`,
    `# exported_at: ${metadata.exportedAt}`,
  ];

  return [...metaLines, header, ...rows].join('\n');
};
