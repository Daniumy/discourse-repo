import "./ResultModal.css";
import React from "react";
import closeModal from "../../../assets/closeModal.svg";
import { fromLongToActualCurrencyValue } from "../../utils.js";

const ResultModal = ({
	connectedAddress,
	ergopayConnectedAddress,
	setResultPopUp,
	winningBetInfo,
	setWinningBetInfo,
	setRefreshPotFromResult,
	potFundsLoading,
}) => {
	// const fakeWinningBetInfo = {
	// 	amount: 100000000,
	// 	coin: "ERG",
	// 	txId: "",
	// 	potPlay: true,
	// };
	const totalValue = fromLongToActualCurrencyValue(
		winningBetInfo.amount,
		winningBetInfo.coin
	);

	return (
		<div className="result-popup">
			<span>
				You have won {totalValue} {winningBetInfo.coin}!
			</span>

			{/* <div className="result-transactions-a">
				<div className="amount-received-at-pot">
					Amount sent to your <a href="https://grandgambit.io/pot">speed pot</a>
					<br></br>
					<br></br>
					<span
						className="refresh-at-result"
						onClick={() => setRefreshPotFromResult(true)}
						style={
							potFundsLoading
								? { pointerEvents: "none", backgroundColor: "grey" }
								: null
						}
					>
						Refresh pot amounts
					</span>
				</div>
			</div> */}

			<img
				src={closeModal}
				style={{ width: 50, cursor: "pointer" }}
				onClick={() => {
					setResultPopUp(null);
					setWinningBetInfo(null);
				}}
			></img>
		</div>
	);
};

export default ResultModal;
