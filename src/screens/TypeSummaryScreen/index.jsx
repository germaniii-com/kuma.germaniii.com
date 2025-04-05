import { useContext } from 'react';
import './index.css';
import ScreenContext from '../../shared/providers/ScreenContext';
import { useMemo } from 'react';

const TyperSummaryScreen = ({}) => {
  const { key, quote, timestamps } = useContext(ScreenContext);

  const mistakes = useMemo(() => {
    if (!quote.quote || timestamps.length === 0) return 0;

    const typedKeys = key.split('');
    const expectedText = quote.quote.slice(0, typedKeys.length);

    const mistakeCount = typedKeys.reduce(
      (acc, curr, index) => (curr !== expectedText[index] ? acc + 1 : acc),
      0
    );

    const backspaces = timestamps.reduce(
      (acc, curr) => (curr.key === 'Backspace' ? acc + 1 : acc),
      0
    );

    return Math.floor(
      100 - ((mistakeCount + backspaces) / quote.quote.length) * 100
    );
  }, [key, quote.quote]);

  const speed = useMemo(() => {
    if (timestamps.length < 2) return 0;
    const firstTimestamp = timestamps.at(0).timestamp;
    const lastTimestamp = timestamps.at(-1).timestamp;

    if (!firstTimestamp || !lastTimestamp) return 0;

    const totalChars = key.length;
    const totalWords = totalChars / 5; // Assume 5 characters per word
    const elapsedTimeMinutes = (lastTimestamp - firstTimestamp) / 60000;

    return Math.floor(
      elapsedTimeMinutes > 0 ? totalWords / elapsedTimeMinutes : 0
    );
  }, [timestamps, key]);

  return (
    <div className={'blinking'}>
      Speed: <span>{speed} (wpm)</span>
      <br />
      Accuracy: <span>{mistakes}%</span>
      <br />
      Press enter to restart
    </div>
  );
};

export default TyperSummaryScreen;
