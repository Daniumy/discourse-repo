import "./GameCard.css";
import playIcon from "../../assets/playIcon.svg";

export default function GameCard({ img, title, url }) {
	return (
		<div className={`game-card-${url}`}>
			<img src={img} id={`game-card--image-${url}`} />
			<h1 id="game-card--title">{title}</h1>
			<img src={playIcon} className="game-card--play-icon" />
		</div>
	);
}
