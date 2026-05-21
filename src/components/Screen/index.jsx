import './index.css';
import DetectLayoutScreen from '../../screens/DetectLayoutScreen';
import SelectTargetLayoutScreen from '../../screens/SelectTargetLayoutScreen';
import KeyboardConfigScreen from '../../screens/KeyboardConfigScreen';
import TyperScreen from '../../screens/TyperScreen';
import TyperSummaryScreen from '../../screens/TypeSummaryScreen';
import { useContext } from 'react';
import ScreenContext from '../../shared/providers/ScreenContext';
import {
  DETECT_LAYOUT_SCREEN,
  SELECT_TARGET_SCREEN,
  KEYBOARD_CONFIG_SCREEN,
  TYPER_SCREEN,
  TYPER_SUMMARY_SCREEN,
} from '../../shared/constants/screen';

const Screen = () => {
  const { screen } = useContext(ScreenContext);

  return (
    <div className="base-screen">
      {screen === DETECT_LAYOUT_SCREEN && <DetectLayoutScreen />}
      {screen === SELECT_TARGET_SCREEN && <SelectTargetLayoutScreen />}
      {screen === KEYBOARD_CONFIG_SCREEN && <KeyboardConfigScreen />}
      {screen === TYPER_SCREEN && <TyperScreen />}
      {screen === TYPER_SUMMARY_SCREEN && <TyperSummaryScreen />}
    </div>
  );
};

export default Screen;
