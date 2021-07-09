import React, { useState } from "react";
import Player from "../Player";
import "./styles.css";

export default function Battle({ inputs, updateInputs, playersInfo, updatePlayersInfo, battleResult, updateBattleResult }) {
  const { player1, player2 } = inputs;

  function onChange(event) {
    const { name, value } = event.target;
    updateInputs({
      ...inputs,
      [name]: value,
    });
  }

  const [isInput, setIsInput] = useState({
    isPlayer1Input: false,
    isPlayer2Input: false,
  });

  function onClick(event) {
    const { name } = event.target;

    let player = "";

    if (name === "player1") {
      player = "isPlayer1Input";
    } else if (name === "player2") {
      player = "isPlayer2Input";
    }

    setIsInput({
      ...isInput,
      [player]: true,
    });
  }

  function handleIsInput(value) {
    setIsInput(value);
  }

  function onBattle() {
    const scoreOfPlayer1 = playersInfo.player1.score;
    const scoreOfPlayer2 = playersInfo.player2.score;

    if (scoreOfPlayer1 > scoreOfPlayer2) {
      updateBattleResult("Player 1 Win");
    } else if (scoreOfPlayer1 < scoreOfPlayer2) {
      updateBattleResult("Player 2 Win");
    } else {
      updateBattleResult("Draw");
    }
  }

  return (
    <div className="frame">
      <h1 className="center-text">This is Battle!</h1>
      <div className="battle-container">

        <div className="player1-container">
          <input type="text" name="player1" value={player1} placeholder="player1" onChange={onChange}/>
          <button name="player1" onClick={onClick}>Add Player 1</button>
          {isInput.isPlayer1Input && <Player player="player1" playerId={inputs.player1}  playersInfo={playersInfo} updatePlayersInfo={updatePlayersInfo}
          inputs={inputs}
          updateInputs={updateInputs}
          />}
        </div>

        <div className="middle-container">
          {battleResult && <div className="result-message">{battleResult}</div>}
          {isInput.isPlayer1Input && isInput.isPlayer2Input && <button className="battle-button" onClick={onBattle}>Battle!</button>}
        </div>

        <div className="player2-container">
          <input type="player2" name="player2" value={player2} placeholder="player2" onChange={onChange}/>
          <button name="player2" onClick={onClick}>Add Player 2</button>
          {isInput.isPlayer2Input && <Player player="player2" playerId={inputs.player2} playersInfo={playersInfo} updatePlayersInfo={updatePlayersInfo}
          inputs={inputs}
          updateInputs={updateInputs}
          />}
        </div>

      </div>
    </div>
  );
}
