const pick = (colors, keys, fallback) => {
  for (const key of keys) {
    const v = colors[key];
    if (typeof v === 'string' && v.length > 0) return v;
  }
  return fallback;
};

const hexToRgb = (hex) => {
  const h = hex.replace('#', '').trim();
  if (h.length === 3) {
    return [
      parseInt(h[0] + h[0], 16),
      parseInt(h[1] + h[1], 16),
      parseInt(h[2] + h[2], 16),
    ];
  }
  if (h.length >= 6) {
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
    ];
  }
  return null;
};

const withAlpha = (color, alpha) => {
  if (!color) return `rgba(0, 0, 0, ${alpha})`;
  if (color.startsWith('rgba') || color.startsWith('rgb')) {
    return color.replace(/[\d.]+\)$/, `${alpha})`);
  }
  const rgb = hexToRgb(color);
  if (rgb) return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
  return color;
};

export const validateVsCodeTheme = (json) => {
  if (!json || typeof json !== 'object') return null;
  if (typeof json.name !== 'string' || !json.name.trim()) return null;
  if (!json.colors || typeof json.colors !== 'object') return null;
  return {
    name: json.name.trim(),
    type: json.type === 'light' || json.type === 'dark' ? json.type : undefined,
    colors: json.colors,
  };
};

export const vscodeColorsToCssVars = (colors) => {
  const bg = pick(colors, ['editor.background'], '#1e1e1e');
  const fg = pick(colors, ['editor.foreground'], '#d4d4d4');
  const surface = pick(
    colors,
    ['sideBar.background', 'editor.background'],
    '#252526'
  );
  const border = pick(
    colors,
    ['editorGroup.border', 'panel.border', 'contrastBorder'],
    '#3c3c3c'
  );
  const accent = pick(
    colors,
    ['focusBorder', 'button.background', 'activityBar.activeBorder'],
    '#007acc'
  );
  const muted = pick(
    colors,
    ['descriptionForeground', 'editorLineNumber.foreground'],
    '#858585'
  );
  const inputBg = pick(colors, ['input.background'], surface);
  const error = pick(colors, ['errorForeground', 'terminal.ansiRed'], '#f48771');
  const success = pick(
    colors,
    ['terminal.ansiGreen', 'gitDecoration.addedResourceForeground'],
    '#4ec9b0'
  );
  const selection = pick(colors, ['editor.selectionBackground'], accent);
  const warning = pick(
    colors,
    ['terminal.ansiYellow', 'editorWarning.foreground'],
    '#cca700'
  );

  const elevated = pick(
    colors,
    ['titleBar.activeBackground', 'tab.activeBackground'],
    surface
  );

  return {
    '--color-bg': bg,
    '--color-fg': fg,
    '--color-surface': surface,
    '--color-surface-elevated': elevated,
    '--color-border': border,
    '--color-border-muted': border,
    '--color-muted': muted,
    '--color-accent': accent,
    '--color-accent-muted': withAlpha(selection, 0.35),
    '--color-success': success,
    '--color-error': error,
    '--color-warning': warning,
    '--color-overlay': withAlpha(bg, 0.75),
    '--color-input-bg': inputBg,
  };
};

export const applyThemeToDocument = (cssVars, colorScheme = 'dark') => {
  const root = document.documentElement;
  Object.entries(cssVars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  root.style.setProperty('color-scheme', colorScheme);
};

export const parseThemeFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result);
        const theme = validateVsCodeTheme(json);
        if (!theme) {
          reject(new Error('Invalid VS Code theme: requires name and colors.'));
          return;
        }
        resolve(theme);
      } catch {
        reject(new Error('Could not parse theme file as JSON.'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read theme file.'));
    reader.readAsText(file);
  });
