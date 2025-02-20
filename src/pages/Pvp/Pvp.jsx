import React from "react";
import "./Pvp.css";
import GameReady from "./GameReady";

const Pvp = () => {
	return (
          <div className="pvp-wrapper">
               <button className="pvp-create-game__button">Create new game</button>
			<div className="pvp-grid-container">
				<GameReady />
				<GameReady />
				<GameReady />
				<GameReady />
				<GameReady />
				<GameReady />
			</div>
		</div>
	);
};

export default Pvp;
