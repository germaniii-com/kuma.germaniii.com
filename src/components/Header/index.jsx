import {
  DETECT_LAYOUT_SCREEN,
  SELECT_TARGET_SCREEN,
  KEYBOARD_CONFIG_SCREEN,
  TYPER_SCREEN,
  TYPER_SUMMARY_SCREEN,
  WIZARD_STEP_LABELS,
} from '../../shared/constants/screen';
import {
  CUSTOM_LAYOUT_ID,
  KEYBOARD_LAYOUT_OPTIONS,
} from '../../shared/constants/keyboardLayouts';
import { useKeyboardMapContext } from '../../shared/providers/KeyboardMapProvider';
import ScreenContext from '../../shared/providers/ScreenContext';
import './index.css';
import { FaEdit, FaFileExport } from 'react-icons/fa';
import { useContext } from 'react';

const layoutLabel = (id) => {
  if (!id) return 'Unknown';
  if (id === CUSTOM_LAYOUT_ID) return 'Custom';
  return KEYBOARD_LAYOUT_OPTIONS.find((o) => o.id === id)?.label ?? id;
};

const Header = () => {
  const { screen, goToKeyboard } = useContext(ScreenContext);
  const {
    sourceLayout,
    targetLayout,
    isEditingKeymap,
    startEditMode,
    stopEditMode,
    openExportModal,
  } = useKeyboardMapContext();

  const onClickEditKeyboard = () => {
    if (isEditingKeymap) {
      stopEditMode();
    } else {
      startEditMode();
    }
  };

  const isWizardStep =
    screen === DETECT_LAYOUT_SCREEN || screen === SELECT_TARGET_SCREEN;
  const isConfig = screen === KEYBOARD_CONFIG_SCREEN;
  const isTyper =
    screen === TYPER_SCREEN || screen === TYPER_SUMMARY_SCREEN;

  return (
    <div className="header">
      <span className="header_title">Keyboard Utility/Mapper Application</span>

      {isWizardStep && (
        <span className="header_step">{WIZARD_STEP_LABELS[screen]}</span>
      )}

      {isConfig && (
        <>
          <span className="header_layouts">
            {layoutLabel(sourceLayout)} → {layoutLabel(targetLayout)}
          </span>
          <FaEdit
            className={isEditingKeymap ? 'header_edit--active' : ''}
            title="Edit keys"
            onClick={onClickEditKeyboard}
          />
          <FaFileExport title="Export layout" onClick={openExportModal} />
        </>
      )}

      {isTyper && (
        <button
          type="button"
          className="header_back_button"
          onClick={goToKeyboard}
        >
          Back to keyboard
        </button>
      )}
    </div>
  );
};

export default Header;
