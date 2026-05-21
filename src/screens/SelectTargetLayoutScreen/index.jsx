import { useContext, useState } from 'react';
import './index.css';
import {
  PRESET_KEYBOARD_LAYOUT_OPTIONS,
} from '../../shared/constants/keyboardLayouts';
import {
  KEYBOARD_CONFIG_SCREEN,
} from '../../shared/constants/screen';
import ScreenContext from '../../shared/providers/ScreenContext';
import { useKeyboardMapContext } from '../../shared/providers/KeyboardMapProvider';

const layoutLabel = (id) =>
  PRESET_KEYBOARD_LAYOUT_OPTIONS.find((o) => o.id === id)?.label ?? id;

const SelectTargetLayoutScreen = () => {
  const { setScreen } = useContext(ScreenContext);
  const { sourceLayout, targetLayout, setTargetLayout } = useKeyboardMapContext();
  const [selectedTarget, setSelectedTarget] = useState(targetLayout);

  const sourceLabel = sourceLayout
    ? layoutLabel(sourceLayout)
    : 'Not set';

  const handleContinue = () => {
    setTargetLayout(selectedTarget);
    setScreen(KEYBOARD_CONFIG_SCREEN);
  };

  return (
    <div className="select_target_screen">
      <h2>Choose your target layout</h2>
      <p className="select_target_screen_source">
        Current layout: <strong>{sourceLabel}</strong>
      </p>
      <label className="select_target_screen_field">
        Target layout:
        <select
          value={selectedTarget}
          onChange={(e) => setSelectedTarget(e.target.value)}
        >
          {PRESET_KEYBOARD_LAYOUT_OPTIONS.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        className="wizard_button"
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
};

export default SelectTargetLayoutScreen;
