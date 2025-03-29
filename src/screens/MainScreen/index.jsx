import { useContext } from 'react';
import './index.css';
import ScreenContext from '../../shared/providers/ScreenContext';
import { MAIN_SCREEN } from '../../shared/constants/screen';

const MainScreen = ({}) => {
  const { screen } = useContext(ScreenContext);
  const isVisible = screen === MAIN_SCREEN;

  return (
    <div className={isVisible ? 'blinking visible' : 'invisible'}>
      Press Enter to Start
    </div>
  );
};

export default MainScreen;
