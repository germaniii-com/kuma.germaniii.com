import {
  DETECT_LAYOUT_SCREEN,
  KEYBOARD_CONFIG_SCREEN,
  WIZARD_STEP_LABELS,
} from '../../shared/constants/screen';
import {
  CUSTOM_LAYOUT_ID,
  KEYBOARD_LAYOUT_OPTIONS,
} from '../../shared/constants/keyboardLayouts';
import { useKeyboardMapContext } from '../../shared/providers/KeyboardMapProvider';
import { useThemeContext } from '../../shared/providers/ThemeProvider';
import './index.css';
import { FaPalette, FaTrash } from 'react-icons/fa';
import { useContext } from 'react';
import ScreenContext from '../../shared/providers/ScreenContext';

const layoutLabel = (id) => {
  if (!id) return 'Unknown';
  if (id === CUSTOM_LAYOUT_ID) return 'Custom';
  return KEYBOARD_LAYOUT_OPTIONS.find((o) => o.id === id)?.label ?? id;
};

const Header = () => {
  const { screen } = useContext(ScreenContext);
  const { sourceLayout, targetLayout } = useKeyboardMapContext();
  const {
    presets,
    customTheme,
    selectValue,
    onSelectChange,
    fileInputRef,
    onThemeFileChange,
    openThemeFilePicker,
    removeCustomTheme,
    themeError,
  } = useThemeContext();

  const isDetectStep = screen === DETECT_LAYOUT_SCREEN;
  const isConfig = screen === KEYBOARD_CONFIG_SCREEN;

  return (
    <div className="header">
      <span className="header_title">Keyboard Utility/Mapper Application</span>

      {isDetectStep && (
        <span className="header_step">{WIZARD_STEP_LABELS[screen]}</span>
      )}

      {isConfig && (
        <span className="header_layouts">
          {layoutLabel(sourceLayout)} → {layoutLabel(targetLayout)}
        </span>
      )}

      <div className="header_theme_controls">
        <select
          className="header_theme_select"
          value={selectValue}
          onChange={onSelectChange}
          aria-label="Color theme"
        >
          {presets.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
          {customTheme && (
            <option value="__custom__">Custom: {customTheme.name}</option>
          )}
        </select>
        {customTheme && (
          <span className="header_theme_custom_label" title={customTheme.name}>
            {customTheme.name}
          </span>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          className="invisible"
          aria-hidden
          onChange={onThemeFileChange}
        />
        <button
          type="button"
          className="header_theme_btn"
          title="Import VS Code theme"
          onClick={openThemeFilePicker}
        >
          <FaPalette aria-hidden />
        </button>
        {customTheme && (
          <button
            type="button"
            className="header_theme_btn"
            title="Remove custom theme"
            onClick={removeCustomTheme}
          >
            <FaTrash aria-hidden />
          </button>
        )}
        {themeError && (
          <p className="header_theme_error" role="alert">
            {themeError}
          </p>
        )}
      </div>
    </div>
  );
};

export default Header;
