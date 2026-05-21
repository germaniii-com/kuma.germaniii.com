import './index.css';

const getKeyClassName = (expectedChar, typed, index) =>
  typed.length === index
    ? 'cursor'
    : typed.length <= index
      ? 'pending'
      : expectedChar.toLowerCase() === typed[index]?.toLowerCase()
        ? 'correct'
        : 'wrong';

const PhraseDisplay = ({ phrase, typed }) => (
  <p className="phrase_display">
    {phrase.split('').map((c, index) => (
      <span key={index} className={getKeyClassName(c, typed, index)}>
        {c}
      </span>
    ))}
  </p>
);

export default PhraseDisplay;
