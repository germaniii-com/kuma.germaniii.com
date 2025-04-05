import './index.css';

const Key = ({ keyChar, isCurrent }) => {
  const keyClassName = 'keyboard_key ' + (isCurrent ? 'selected-key' : '');
  return <div className={keyClassName}>{keyChar}</div>;
};

export default Key;
