import './index.css';
import MainScreen from '../../screens/MainScreen';
import TyperScreen from '../../screens/TyperScreen';
import TyperSummaryScreen from '../../screens/TypeSummaryScreen';

const Screen = () => {
  return (
    <div className="base-screen">
      <MainScreen />
      <TyperScreen />
      <TyperSummaryScreen />
    </div>
  );
};

export default Screen;
