import { charToZmkBinding } from './charToQmkKeycode';

export const formatKeymapZmk = (keymap, metadata) => {
  const bindings = keymap.map((char) => charToZmkBinding(char)).join(' ');

  const keysYaml = keymap
    .map((char, index) => `      - { position: ${index}, binding: "${charToZmkBinding(char)}" }`)
    .join('\n');

  return `# Kuma keymap export — 30-key alpha block (adapt to your board matrix)
# source_layout: ${metadata.sourceLayout ?? 'unknown'}
# target_layout: ${metadata.targetLayout ?? 'unknown'}
# exported_at: ${metadata.exportedAt}

layers:
  - name: default
    keys:
${keysYaml}

# Devicetree fragment (paste into your keymap file)
/ {
    keymap {
        compatible = "zmk,keymap";
        default_layer {
            display-name = "Default";
            bindings = <
                ${bindings}
            >;
        };
    };
};
`;

};
