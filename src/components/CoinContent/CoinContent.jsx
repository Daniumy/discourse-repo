import "./CoinContent.css";
import heads from "../../assets/heads.svg";
import tails from "../../assets/tails.svg";

const CoinContent = ({
	handleFaceSelected,
	betStarted,
	infoModal,
	faceSelected,
	faceResolvedAfterBet,
}) => {
	return (
		<div className="main">
			<div
				className="select-heads"
				onClick={() => handleFaceSelected("heads")}
				style={
					betStarted || infoModal
						? {
								backgroundColor: "#828a8a",
								opacity: "0.5",
								cursor: "not-allowed",
								pointerEvents: "none",
						  }
						: {
								backgroundColor: faceSelected === "heads" ? "#91e1f9" : "white",
						  }
				}
			>
				HEADS
			</div>
			<div
				className="coin-flip-wrapper"
				style={
					betStarted && !faceResolvedAfterBet
						? { animation: `spin 1000s forwards` }
						: betStarted && faceResolvedAfterBet
						? { animation: `spin-${faceResolvedAfterBet} 7s forwards` }
						: { animation: `spin-${faceResolvedAfterBet} 1s forwards` }
				}
			>
				<img src={heads} alt="Heads" className="heads" />
				<img src={tails} alt="Tails" className="tails" />
			</div>
			<div
				className="select-tails"
				onClick={() => handleFaceSelected("tails")}
				style={
					betStarted || infoModal
						? {
								backgroundColor: "#828a8a",
								opacity: "0.5",
								cursor: "not-allowed",
								pointerEvents: "none",
						  }
						: {
								backgroundColor: faceSelected === "tails" ? "#91e1f9" : "white",
						  }
				}
			>
				TAILS
			</div>
		</div>
	);
};

export default CoinContent;
