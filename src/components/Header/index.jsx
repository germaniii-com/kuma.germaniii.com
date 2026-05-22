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
import './index.css';
import { FaFileExport } from 'react-icons/fa';
import { useContext } from 'react';
import ScreenContext from '../../shared/providers/ScreenContext';

const layoutLabel = (id) => {
  if (!id) return 'Unknown';
  if (id === CUSTOM_LAYOUT_ID) return 'Custom';
  return KEYBOARD_LAYOUT_OPTIONS.find((o) => o.id === id)?.label ?? id;
};

const Header = () => {
  const { screen } = useContext(ScreenContext);
  const { sourceLayout, targetLayout, openExportModal } =
    useKeyboardMapContext();

  const isDetectStep = screen === DETECT_LAYOUT_SCREEN;
  const isConfig = screen === KEYBOARD_CONFIG_SCREEN;

  return (
    <div className="header">
      <span className="header_title">Keyboard Utility/Mapper Application</span>

      {isDetectStep && (
        <span className="header_step">{WIZARD_STEP_LABELS[screen]}</span>
      )}

      {isConfig && (
        <>
          <span className="header_layouts">
            {layoutLabel(sourceLayout)} → {layoutLabel(targetLayout)}
          </span>
          <FaFileExport title="Export layout" onClick={openExportModal} />
        </>
      )}
    </div>
  );
};

export default Header;
