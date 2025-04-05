import './index.css';
import MainScreen from '../../screens/MainScreen';
import TyperScreen from '../../screens/TyperScreen';
import TyperSummaryScreen from '../../screens/TypeSummaryScreen';
import { useContext } from 'react';
import ScreenContext from '../../shared/providers/ScreenContext';
import {
  MAIN_SCREEN,
  TYPER_SCREEN,
  TYPER_SUMMARY_SCREEN,
} from '../../shared/constants/screen';

const Screen = () => {
  const { screen } = useContext(ScreenContext);
  return (
    <div className="base-screen">
      {screen === MAIN_SCREEN && <MainScreen />}
      {screen === TYPER_SCREEN && <TyperScreen />}
      {screen === TYPER_SUMMARY_SCREEN && <TyperSummaryScreen />}
    </div>
  );
};

export default Screen;
