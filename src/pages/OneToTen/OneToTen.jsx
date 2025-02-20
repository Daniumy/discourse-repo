/* global BigInt */
import "./OneToTen.css";
import { useState, useEffect } from "react";
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
import drumroll from "../../assets/drumroll.mp3";
import { useSubscription } from "react-stomp-hooks";

const numbersArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export default function OneToTen({
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
	const [rotation, setRotation] = useState(false);
	const [vibration, setVibration] = useState(false);
	const [winnerNumber, setWinnerNumber] = useState(null);
	const [txIdOfCurrentBet, setTxIdOfCurrentBet] = useState(null);
	const [chosenNumber, setChosenNumber] = useState(null);

	useSubscription(`/user/${txIdOfCurrentBet}/private`, ({ body }) => {
		const obj = JSON.parse(body);
		if (obj.txId === "not_enough") handleNotEnoughInPot();
		else if (obj.result) {
			randomNumber(true, chosenNumber);
			setWinningBetInfo(obj);
		} else {
			randomNumber(false, chosenNumber);
		}
	});

	useSubscription(`/user/${ergoPayConnectedAddress}/onetoten`, ({ body }) => {
		setBetStarted(true);
		setRotation(true); //we set the loading animation
		setTxIdOfCurrentBet(body);
		setQRcode(false);
	});

	const drumrollSound = new Audio(drumroll);
	drumrollSound.volume = 0.5;
	useEffect(() => {
		setInsideGame("onetoten");
		handleCleanUpBetSelection();
	}, []);

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
			default:
				return false;
		}
	}

	async function buildOneToTenTransaction() {
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
						// diceThrow1Sound.play(); //we set the loading sound
						setRotation(true); //we set the loading animation
						setTxIdOfCurrentBet(signedTx.id);

						setBetStarted("pot");
						axios
							.post(
								apiURI,
								{
									txId: signedTx.id,
									bettorAddress: connectedAddress,
									tokenId: tokens[`${selectedCoin}`],
									multiplier: 10,
									amount: selectedBet,
								},
								{ timeout: 1000000 }
							)
							.then(({ data }) => {
								if (data.txId === "not_enough") handleNotEnoughInPot();
								else if (data.result) {
									randomNumber(true, chosenNumber);
									setWinningBetInfo(data);
								} else {
									randomNumber(false, chosenNumber);
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

	const randomNumber = (win, chosenNumber) => {
		setRotation(true);
		if (win) showSelectedNumber(win, chosenNumber);
		else {
			let random = Math.floor(Math.random() * 10 + 1);
			while (random == chosenNumber) {
				random = Math.floor(Math.random() * 10 + 1);
			}
			showSelectedNumber(win, random);
		}
	};

	const showSelectedNumber = (win, winningNumber) => {
		setRotation(false);
		drumrollSound.play();
		setVibration(true);
		setTimeout(() => {
			setVibration(false);
			setWinnerNumber(winningNumber);
			setTimeout(() => {
				setWinnerNumber(null);
				setBetStarted(false);
				win ? setResultPopUp("win") : setResultPopUp("loss");
				win ? playCrowdSound() : playLossSound();
				setRefreshPotFromResult(true);
			}, 4000);
		}, 2000);
	};

	return (
		<div className="one-to-ten-wrapper">
			<div className="number-selector-wrapper">
				{numbersArray.map((number, index) => (
					<span
						className={rotation ? "number rotating" : vibration ? "number vibrating" : "number"}
						onClick={() => (rotation ? null : setSelectedNumber(index + 1))}
						key={index}
						style={
							winnerNumber
								? { opacity: 0 }
								: selectedNumber == index + 1
								? {
										transform: "translateY(-5px)",
										WebkitTransform: "translateY(-5px)",
										margin: "0px 5px",
										backgroundColor: "#91e1f9",
										animationDelay: `${index}s`,
								  }
								: { animationDelay: `${index}s` }
						}
					>
						{number}
					</span>
				))}

				<div className={winnerNumber ? "winning-number active" : "winning-number"}>{winnerNumber}</div>
			</div>
			<div
				className="play-diceroll-button"
				onClick={buildOneToTenTransaction}
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
