/* global BigInt */
import "./CardWar.css";
import { useEffect, useState } from "react";
import cardStack from "../../assets/cardStack.png";
import cardPlaced from "../../assets/cardPlaced.mp3";
import { cards, getRandomLetter } from "./CardWarUtils";
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
import { useSubscription } from "react-stomp-hooks";

export default function CardWar({
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
	const [userCard, setUserCard] = useState(null);
	const [enemyCard, setEnemyCard] = useState(null);
	const [txIdOfCurrentBet, setTxIdOfCurrentBet] = useState(null);
	const [animationStarted, setAnimationStarted] = useState(false);

	useSubscription(`/user/${txIdOfCurrentBet}/private`, ({ body }) => {
		const obj = JSON.parse(body);
		if (obj.txId === "not_enough") handleNotEnoughInPot();
		else if (obj.result) {
			handleDealingCards(true);
			setWinningBetInfo(obj);
		} else {
			handleDealingCards(false);
		}
	});

	useSubscription(`/user/${ergoPayConnectedAddress}/cardwar`, ({ body }) => {
		setBetStarted(true);
		setTxIdOfCurrentBet(body);
		setQRcode(false);
	});

	const cardSound = new Audio(cardPlaced);

	useEffect(() => {
		setInsideGame("cardwar");
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
			case "BOBER":
				return boberAmount >= amount;
			case "GIF":
				return gifAmount >= amount;
			default:
				return false;
		}
	}
	// async function buildCardWarTransaction() {
	// 	if (ergoWallet && connectedAddress) {
	// 		axios
	// 			.get(
	// 				"https://ergflip-backend-production.up.railway.app/backendReachable",
	// 				{
	// 					timeout: 30000,
	// 				}
	// 			)
	// 			.then(async ({ data }) => {
	// 				const creationHeight = await ergoWallet.get_current_height();
	// 				const utxos = await ergoWallet.get_utxos();
	// 				const addressToSend = addresses[data - 1];
	// 				let unsignedTransaction;
	// 				let apiURI;

	// 				const enoughPot = isThereEnoughInPot(
	// 					selectedCoin,
	// 					fromLongToActualCurrencyValue(selectedBet, selectedCoin)
	// 				);
	// 				if (!enoughPot) {
	// 					setErrorPopUp("You don't have enough funds deposited");
	// 					setNautilusLoading(false);
	// 					return;
	// 				}
	// 				if (selectedCoin !== "ERG" /*native tokens*/) {
	// 					apiURI =
	// 						"https://ergflip-backend-production.up.railway.app/receiveTokenPotBet";
	// 					unsignedTransaction = new TransactionBuilder(creationHeight)
	// 						.from(utxos)
	// 						.to(new OutputBuilder(1000000n, addressToSend))
	// 						.sendChangeTo(connectedAddress)
	// 						.payMinFee()
	// 						.build("EIP-12");
	// 				} else {
	// 					apiURI =
	// 						"https://ergflip-backend-production.up.railway.app/receivePotBet";
	// 					unsignedTransaction = new TransactionBuilder(creationHeight)
	// 						.from(utxos)
	// 						.to(new OutputBuilder(1000000n, addressToSend))
	// 						.sendChangeTo(connectedAddress)
	// 						.payMinFee()
	// 						.build("EIP-12");
	// 				}

	// 				setNautilusLoading(false);
	// 				ergoWallet.sign_tx(unsignedTransaction).then((signedTx) => {
	// 					ergoWallet.submit_tx(signedTx);
	// 					setAnimationStarted(true);
	// 					setTxIdOfCurrentBet(signedTx.id);
	// 					setBetStarted("pot");
	// 					axios
	// 						.post(
	// 							apiURI,
	// 							{
	// 								txId: signedTx.id,
	// 								bettorAddress: connectedAddress,
	// 								tokenId: tokens[`${selectedCoin}`],
	// 								multiplier: 2,
	// 								amount: selectedBet,
	// 							},
	// 							{ timeout: 1000000 }
	// 						)
	// 						.then(({ data }) => {
	// 							if (data.txId === "not_enough") handleNotEnoughInPot();
	// 							else if (data.result) {
	// 								handleDealingCards(true);
	// 								setWinningBetInfo(data);
	// 							} else {
	// 								handleDealingCards(false);
	// 							}
	// 						});
	// 				});
	// 			})
	// 			.catch((e) => {
	// 				console.log(e);
	// 				if (e instanceof InsufficientInputs) handleNotEnoughFunds();
	// 				else handleBackNotAvailable();
	// 			});
	// 	}
	// }

	async function auxCall(dataa) {
		const creationHeight = await ergoWallet.get_current_height();
		const utxos = await ergoWallet.get_utxos();
		const addressToSend = addresses[dataa - 1];
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
			setTimeout(() => {
				auxCall(dataa);
			}, 3500);
		});
	}
	async function buildCardWarTransaction() {
		if (ergoWallet && connectedAddress) {
			axios
				.get("https://ergflip-backend-production.up.railway.app/backendReachable", {
					timeout: 30000,
				})
				.then(async ({ data }) => {
					auxCall(data);
				})
				.catch((e) => {
					console.log(e);
					if (e instanceof InsufficientInputs) handleNotEnoughFunds();
					else handleBackNotAvailable();
				});
		}
	}

	async function handlePlay() {
		placeBet();
		buildCardWarTransaction();
	}

	function handleDealingCards(win) {
		setAnimationStarted(false);
		if (win) {
			const userCard = Math.floor(Math.random() * 11 + 3);
			const enemyCard = Math.floor(Math.random() * (userCard - 1 - 2) + 2);
			const userCardLetter = "-" + getRandomLetter();
			const enemyCardLetter = "-" + getRandomLetter();
			setUserCard(userCard.toString() + userCardLetter);
			cardSound.play();
			cardSound.currentTime = 0;
			setTimeout(() => {
				setEnemyCard(enemyCard.toString() + enemyCardLetter);
				cardSound.play();
				setTimeout(() => {
					playCrowdSound();
					setBetStarted(false);
					setResultPopUp("win");
					setRefreshPotFromResult(true);
				}, 1000);
			}, 1400);
		} else {
			const userCard = Math.floor(Math.random() * 11 + 2);
			const enemyCard = Math.floor(Math.random() * (14 - (userCard + 1)) + (userCard + 1));
			const userCardLetter = "-" + getRandomLetter();
			const enemyCardLetter = "-" + getRandomLetter();
			setUserCard(userCard.toString() + userCardLetter);
			cardSound.play();
			cardSound.currentTime = 0;
			setTimeout(() => {
				setEnemyCard(enemyCard.toString() + enemyCardLetter);
				cardSound.play();
				setTimeout(() => {
					playLossSound();
					setBetStarted(false);
					setResultPopUp("loss");
					setRefreshPotFromResult(true);
				}, 1000);
			}, 1400);
		}
	}

	return (
		<div className="card-war-wrapper">
			<div className="card-war--table">
				<div className="table-enemy">Rival's Card</div>
				<img src={cards[`${enemyCard}`]} className={enemyCard ? "enemy-card active" : "enemy-card"} />
				<div className="table-player">Your Card</div>
				<img src={cards[`${userCard}`]} className={userCard ? "player-card active" : "player-card"} />
				<div className="mid-row">
					<img src={cardStack} className={animationStarted ? "back-card loading" : "back-card"} />
					<div
						className="play-button"
						onClick={handlePlay}
						style={
							(!connectedAddress && !ergoPayChoosen) ||
							!selectedBet ||
							betStarted ||
							resultPopUp != null ||
							!selectedCoin
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
			</div>
		</div>
	);
}
