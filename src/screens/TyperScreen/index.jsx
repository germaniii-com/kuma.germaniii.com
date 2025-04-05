import { useContext } from 'react';
import './index.css';
import ScreenContext from '../../shared/providers/ScreenContext';

const TyperScreen = ({}) => {
  const { key, quote } = useContext(ScreenContext);

  const getKeyClassName = (c, index) =>
    key.length === index
      ? 'cursor'
      : key.length <= index
        ? 'pending'
        : c === key[index]
          ? 'correct'
          : 'wrong';

  return (
    <div>
      <p>
        {quote.quote.split('').map((c, index) => (
          <span key={index} className={getKeyClassName(c, index)}>
            {c}
          </span>
        ))}
      </p>
      <p>- {quote.from}</p>
    </div>
  );
};

export default TyperScreen;
