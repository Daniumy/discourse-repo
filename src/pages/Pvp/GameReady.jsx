import React from "react";
import "./GameReady.css";
import plinkoImage from "../../assets/plinkoImage.png";
import cardwarImage from "../../assets/cardwarImage.png";
import coinflipImage from "../../assets/coinflipImage.png";
import dicesImage from "../../assets/dicesImage.png";
import rouletteImage from "../../assets/rouletteImage2.png";
import russianRouletteImage from "../../assets/russianRouletteImage2.png";
import tensideDice from "../../assets/tensideDice3-removebg-preview.png";
import playIcon from "../../assets/playIcon.svg";

const GameReady = () => {
	return (
		<div className="game-ready-wrapper">
			<img src={cardwarImage} className="game-ready--image" />
			<div className="game-ready--info">
				<div>
					<span id="game-ready--info__title">Game:</span> Card War
				</div>
				<div>
					<span id="game-ready--info__title">Bet:</span> 100 $ERG
				</div>
			</div>
			<img src={playIcon} className="game-ready--play-icon" />
		</div>
	);
};

export default GameReady;
