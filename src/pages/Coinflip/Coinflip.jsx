import { useEffect } from "react";
import CoinContent from "../../components/CoinContent/CoinContent";
import "./Coinflip.css";

export default function Coinflip({
	setInsideGame,
	handleFaceSelected,
	faceResolvedAfterBet,
	faceSelected,
	connectedAddress,
	ergoPayChoosen,
	selectedBet,
	betStarted,
	resultPopUp,
	selectedCoin,
	placeBet,
	handleCleanUpBetSelection,
}) {
	useEffect(() => {
		setInsideGame("coinflip");
		handleCleanUpBetSelection();
	}, []);

	return (
		<div className="coinflip-wrapper">
			<CoinContent
				handleFaceSelected={handleFaceSelected}
				betStarted={betStarted}
				faceSelected={faceSelected}
				faceResolvedAfterBet={faceResolvedAfterBet}
			/>
			<div
				className="flip-the-coin"
				style={
					!faceSelected ||
					(!connectedAddress && !ergoPayChoosen) ||
					!selectedBet ||
					betStarted ||
					resultPopUp != null ||
					!selectedCoin
						? {
								backgroundColor: "#828a8a",
								opacity: "0.5",
								cursor: "not-allowed",
								pointerEvents: "none",
						  }
						: null
				}
				onClick={() => placeBet()}
			>
				Flip
			</div>
		</div>
	);
}
