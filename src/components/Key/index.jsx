import './index.css';

const Key = ({ keyChar, isCurrent, isEditable, isSelected, onClick }) => {
  const classNames = [
    'keyboard_key',
    isCurrent && !isEditable ? 'selected-key' : '',
    isEditable ? 'keyboard_key--editable' : '',
    isSelected ? 'keyboard_key--selected' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = () => {
    if (isEditable && onClick) onClick();
  };

  return (
    <div
      className={classNames}
      onClick={handleClick}
      role={isEditable ? 'button' : undefined}
      tabIndex={isEditable ? 0 : undefined}
    >
      {keyChar}
    </div>
  );
};

export default Key;
