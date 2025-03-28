import { useContext, useState } from 'react';
import './index.css';
import ScreenContext from '../../shared/providers/ScreenContext';
import { TYPER_SCREEN } from '../../shared/constants/screen';

const TyperScreen = ({}) => {
  const { screen, key, quote } = useContext(ScreenContext);
  const isVisible = screen === TYPER_SCREEN;

  const getKeyClassName = (c, index) =>
    key.length === index
      ? 'cursor'
      : key.length <= index
        ? 'pending'
        : c === key[index]
          ? 'correct'
          : 'wrong';

  return (
    <div className={isVisible ? 'visible' : 'invisible'}>
      <p>
        {quote.quote.split('').map((c, index) => (
          <span key={index} className={getKeyClassName(c, index)}>
            {c}
          </span>
        ))}
      </p>
    </div>
  );
};

export default TyperScreen;
