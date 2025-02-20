/* global BigInt */
import { useEffect, useState } from "react";
import "./DiceRoll.css";
import axios from "axios";
import {
	tokens,
	addresses,
	fromLongToActualCurrencyValue,
} from "../../components/utils";
import {
	OutputBuilder,
	TransactionBuilder,
	InsufficientInputs,
} from "@fleet-sdk/core";
import diceThrow1 from "../../assets/diceThrow.mp3";
import diceThrow2 from "../../assets/diceThrow2.mp3";
import dices from "../../assets/Dices/dices";
import { useSubscription } from "react-stomp-hooks";

export default function DiceRoll({
	setInsideGame,
	selectedBet,
	betStarted,
	setBetStarted,
	setResultPopUp,
	resultPopUp,
	selectedCoin,
	placeBet,
	connectedAddress,
	ergoPayChoosen,
	ergoWallet,
	setNautilusLoading,
	setWinningBetInfo,
	setBackendReachable2,
	handleBackNotAvailable,
	playLossSound,
	playCrowdSound,
	handleCleanUpBetSelection,
	ergoPayConnectedAddress,
	setQRcode,
	ergAmount,
	cometAmount,
	sigusdAmount,
	cypxAmount,
	handleNotEnoughInPot,
	handleNotEnoughFunds,
	egioAmount,
	fluxAmount,
	epadAmount,
	paideiaAmount,
	bassAmount,
	ergoneAmount,
	loveAmount,
	greasycexAmount,
	pepergAmount,
	boberAmount,
	gifAmount,
	setErrorPopUp,
	setRefreshPotFromResult,
}) {
	const [selectedNumber, setSelectedNumber] = useState(null);
	const [diceAnimation, setDiceAnimation] = useState(null);
	const [diceRotations, setDiceRotations] = useState(null);
	const [txIdOfCurrentBet, setTxIdOfCurrentBet] = useState(null);
	const [chosenNumber, setChosenNumber] = useState(null);

	useSubscription(`/user/${ergoPayConnectedAddress}/diceroll`, ({ body }) => {
		setBetStarted(true);
		diceThrow1Sound.play();
		setDiceAnimation("rollingAux 6000s");
		setTxIdOfCurrentBet(body);
		setQRcode(false);
	});

	useSubscription(`/user/${txIdOfCurrentBet}/private`, ({ body }) => {
		const obj = JSON.parse(body);
		if (obj.txId === "not_enough") handleNotEnoughInPot();
		else if (obj.result) {
			randomDice(true, chosenNumber);
			setWinningBetInfo(obj);
		} else {
			randomDice(false, chosenNumber);
		}
	});

	function isThereEnoughInPot(token, amount) {
		switch (token) {
			case "CYPX":
				return cypxAmount >= amount;
			case "COMET":
				return cometAmount >= amount;
			case "SigUSD":
				return sigusdAmount >= amount;
			case "ERG":
				return ergAmount >= amount;
			case "EGIO":
				return egioAmount >= amount;
			case "FLUX":
				return fluxAmount >= amount;
			case "EPAD":
				return epadAmount >= amount;
			case "PAIDEIA":
				return paideiaAmount >= amount;
			case "BASS":
				return bassAmount >= amount;
			case "ERGONE":
				return ergoneAmount >= amount;
			case "LOVE":
				return loveAmount >= amount;
			case "GREASYCEX":
				return greasycexAmount >= amount;
			case "PEPERG":
				return pepergAmount >= amount;
			case "BOBER":
				return boberAmount >= amount;
			case "GIF":
				return gifAmount >= amount;
			default:
				return false;
		}
	}

	const diceThrow1Sound = new Audio(diceThrow1);
	const diceThrow2Sound = new Audio(diceThrow2);

	useEffect(() => {
		setInsideGame("diceroll");
		handleCleanUpBetSelection();
	}, []);

	async function buildDiceRollTransaction() {
		placeBet();
		setChosenNumber(selectedNumber);
		if (ergoWallet && connectedAddress) {
			axios
				.get("https://ergflip-backend-production.up.railway.app/backendReachable", {
					timeout: 30000,
				})
				.then(async ({ data }) => {
					const creationHeight = await ergoWallet.get_current_height();
					const utxos = await ergoWallet.get_utxos();
					const addressToSend = addresses[data - 1];
					let unsignedTransaction;
					let apiURI;
					const enoughPot = isThereEnoughInPot(selectedCoin, fromLongToActualCurrencyValue(selectedBet, selectedCoin));
					if (!enoughPot) {
						setErrorPopUp("You don't have enough funds deposited");
						setNautilusLoading(false);
						return;
					}
					if (selectedCoin !== "ERG" /*native tokens*/) {
						apiURI = "https://ergflip-backend-production.up.railway.app/receiveTokenPotBet";
						unsignedTransaction = new TransactionBuilder(creationHeight)
							.from(utxos)
							.to(new OutputBuilder(1000000n, addressToSend))
							.sendChangeTo(connectedAddress)
							.payMinFee()
							.build("EIP-12");
					} else {
						apiURI = "https://ergflip-backend-production.up.railway.app/receivePotBet";
						unsignedTransaction = new TransactionBuilder(creationHeight)
							.from(utxos)
							.to(new OutputBuilder(1000000n, addressToSend))
							.sendChangeTo(connectedAddress)
							.payMinFee()
							.build("EIP-12");
					}

					setNautilusLoading(false);
					ergoWallet.sign_tx(unsignedTransaction).then((signedTx) => {
						ergoWallet.submit_tx(signedTx);
						diceThrow1Sound.play();
						setDiceAnimation("rollingAux 6000s");
						setTxIdOfCurrentBet(signedTx.id);

						setBetStarted("pot");
						axios
							.post(
								apiURI,
								{
									txId: signedTx.id,
									bettorAddress: connectedAddress,
									tokenId: tokens[`${selectedCoin}`],
									multiplier: 6,
									amount: selectedBet,
								},
								{ timeout: 1000000 }
							)
							.then(({ data }) => {
								if (data.txId === "not_enough") handleNotEnoughInPot();
								else if (data.result) {
									randomDice(true, chosenNumber);
									setWinningBetInfo(data);
								} else {
									randomDice(false, chosenNumber);
								}
							});
					});
				})
				.catch((e) => {
					if (e instanceof InsufficientInputs) handleNotEnoughFunds();
					else handleBackNotAvailable();
				});
		}
	}

	const randomDice = (win, chosenNumber) => {
		if (win) rollDice(win, chosenNumber);
		else {
			let random = Math.floor(Math.random() * 5 + 1);
			while (random == chosenNumber) {
				random = Math.floor(Math.random() * 5 + 1);
			}
			rollDice(win, random);
		}
	};

	const rollDice = (win, random) => {
		setDiceAnimation("rolling 4s");
		diceThrow2Sound.play();
		setTimeout(() => {
			switch (random) {
				case 1:
					setDiceRotations("rotateX(0deg) rotateY(0deg)");
					break;

				case 6:
					setDiceRotations("rotateX(180deg) rotateY(0deg)");
					break;

				case 2:
					setDiceRotations("rotateX(-90deg) rotateY(0deg)");
					break;

				case 5:
					setDiceRotations("rotateX(90deg) rotateY(0deg)");
					break;

				case 3:
					setDiceRotations("rotateX(0deg) rotateY(90deg)");
					break;

				case 4:
					setDiceRotations("rotateX(0deg) rotateY(-90deg)");
					break;

				default:
					break;
			}
			setDiceAnimation("none");
			setTimeout(() => {
				setBetStarted(false);
				win ? setResultPopUp("win") : setResultPopUp("loss");
				win ? playCrowdSound() : playLossSound();
				setRefreshPotFromResult(true);
			}, 2000);
		}, 4050);
	};

	return (
		<div className="diceroll-wrapper">
			<div className="dice-selector-container">
				{dices.map((dice, index) => (
					<img
						src={dice}
						key={index}
						className="dice-selector"
						onClick={() => (diceAnimation ? null : setSelectedNumber(index + 1))}
						style={
							selectedNumber - 1 === index
								? {
										transform: "translateY(-10px)",
										WebkitTransform: "translateY(-10px)",
										margin: "0px 5px",
										backgroundColor: "#91e1f9",
								  }
								: null
						}
					/>
				))}
			</div>
			<div className="container">
				<div className="dice" style={{ animation: diceAnimation, transform: diceRotations }}>
					<div className="face front"></div>
					<div className="face back"></div>
					<div className="face top"></div>
					<div className="face bottom"></div>
					<div className="face right"></div>
					<div className="face left"></div>
				</div>
			</div>
			<div
				className="play-diceroll-button"
				onClick={buildDiceRollTransaction}
				style={
					(!connectedAddress && !ergoPayChoosen) ||
					!selectedBet ||
					betStarted ||
					resultPopUp != null ||
					!selectedCoin ||
					!selectedNumber
						? {
								backgroundColor: "#828a8a",
								opacity: "0.8",
								cursor: "not-allowed",
								pointerEvents: "none",
						  }
						: null
				}
			>
				Play
			</div>
		</div>
	);
}
