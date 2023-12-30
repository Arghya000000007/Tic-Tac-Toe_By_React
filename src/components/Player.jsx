import { useState } from "react";
export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [pName, setName] = useState(initialName);
  let buttonName = "Edit";
  function handleClick() {
    setIsEditing((editing) => !editing);
    if (isEditing) onChangeName(symbol, playerName);
  }
  function handleChange(event) {
    console.log(event.target);
    console.log(event.target.value);
    setName(event.target.value);
  }
  let playerName = <span className="player-name">{pName}</span>;
  if (isEditing) {
    playerName = (
      <input type="text" required value={pName} onChange={handleChange} />
    );
    buttonName = "Save";
  }
  return (
    <>
      <li className={isActive ? "active" : undefined}>
        <span className="player">
          {playerName}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleClick}>{buttonName}</button>
      </li>
    </>
  );
}
