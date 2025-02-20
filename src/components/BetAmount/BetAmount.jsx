import "./BetAmount.css";
import React from "react";
import Select from "react-select";
import {
	selectOptions2xReversed,
	selectOptions6xReversed,
	tokenOptions,
	customStyles,
	selectOptions10xReversed,
} from "./BetAmountUtils";

const tokenOptionLabel = ({ value, label, img }) => (
	<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
		<div>{img}</div>
		<div style={{ marginLeft: "10px", color: "black", fontWeight: "bold" }}>
			{label}
		</div>
	</div>
);

const BetAmount = ({
	setSelectedBet,
	setSelectedCoin,
	selectedCoin,
	insideGame,
	selectedRisk,
	selectedBet,
}) => {
	function returnPlinkoOptions() {
		if (selectedRisk === "Low") {
			return selectOptions2xReversed[`${selectedCoin}`];
		} else if (selectedRisk === "Normal") {
			return selectOptions6xReversed[`${selectedCoin}`];
		} else {
			return selectOptions10xReversed[`${selectedCoin}`];
		}
	}

	return (
		<div className="bet-amount">
			<div className="bet-amount-column">
				{/* <label className="bet-amount-text">Coin to bet:</label> */}
				<Select
					className="select"
					onChange={({ value }) => setSelectedCoin(value)}
					options={tokenOptions}
					formatOptionLabel={tokenOptionLabel}
					styles={customStyles}
					placeholder={<div>Choose a token</div>}
					isSearchable={false}
				/>
			</div>
			{insideGame !== "roulette" && (
				<div className="bet-amount-column">
					{/* <label className="bet-amount-text">Bet amount:</label> */}
					<Select
						className="select"
						onChange={({ value }) => setSelectedBet(value)}
						options={
							insideGame === "plinko"
								? returnPlinkoOptions()
								: insideGame === "russianroulette" || insideGame === "diceroll"
								? selectOptions6xReversed[`${selectedCoin}`]
								: insideGame === "onetoten" || insideGame === "roulette"
								? selectOptions10xReversed[`${selectedCoin}`]
								: selectOptions2xReversed[`${selectedCoin}`]
						}
						styles={customStyles}
						placeholder={<div>Choose an amount</div>}
						key={selectedRisk + selectedCoin}
						isSearchable={false}
					/>
				</div>
			)}
		</div>
	);
};

export default BetAmount;
