/* global BigInt */
import "./RussianRoulette.css";
import React, { useState, useEffect } from "react";
import gunPointing from "../../assets/gunPointingg.png";
import dryfireSound from "../../assets/dryfireSound.mp3";
import shotSound from "../../assets/shotSound.mp3";
import revolverReload from "../../assets/revolverReload.mp3";
import revolverCockSound from "../../assets/revolverCockSound.mp3";
import armImage from "../../assets/armImage.png";
import axios from "axios";
import {
	OutputBuilder,
	TransactionBuilder,
	InsufficientInputs,
} from "@fleet-sdk/core";
import crowdSound from "../../assets/crowd.mp3";
import lossSound from "../../assets/loss.mp3";
import {
	tokens,
	addresses,
	fromLongToActualCurrencyValue,
} from "../../components/utils";
import { useSubscription } from "react-stomp-hooks";

export default function RussianRoulette({
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
	playCrowdSound,
	playLossSound,
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
	const [win, setWin] = useState(false);
	const [loadGun, setLoadGun] = useState(false);
	const [txIdOfCurrentBet, setTxIdOfCurrentBet] = useState(null);
	const [animationStarted, setAnimationStarted] = useState(false);

	useSubscription(`/user/${txIdOfCurrentBet}/private`, ({ body }) => {
		const obj = JSON.parse(body);
		if (obj.txId === "not_enough") handleNotEnoughInPot();
		else if (obj.result) {
			handleShotFired(true);
			setWinningBetInfo(obj);
		} else {
			handleShotFired(false);
		}
	});

	useSubscription(`/user/${ergoPayConnectedAddress}/russianroulette`, ({ body }) => {
		setBetStarted(true);
		setTxIdOfCurrentBet(body);
		setQRcode(false);
	});

	const dryfire = new Audio(dryfireSound);
	const shot = new Audio(shotSound);
	const reload = new Audio(revolverReload);
	const revolverCock = new Audio(revolverCockSound);
	const crowd = new Audio(crowdSound);
	const loss = new Audio(lossSound);
	loss.volume = 0.2;
	crowd.volume = 0.2;

	useEffect(() => {
		setInsideGame("russianroulette");
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

	async function buildRussianRouletteTransaction() {
		placeBet();
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
						setAnimationStarted(true);
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
									handleShotFired(true);
									setWinningBetInfo(data);
								} else {
									handleShotFired(false);
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

	function handleShotFired(win) {
		setLoadGun(true);
		setAnimationStarted(false);
		setTimeout(() => {
			reload.play();
			setTimeout(() => {
				revolverCock.play();
				setLoadGun(false);
				setTimeout(() => {
					triggerShootingAnimation(win);
				}, 1500);
			}, 3300 /*reloading time*/);
		}, 500);
	}

	function triggerShootingAnimation(win) {
		setWin(win);
		setTimeout(() => {
			win ? shot.play() : dryfire.play();
			setTimeout(() => {
				setWin(false);
				setTimeout(() => {
					//here we set the winning notifications.
					if (win) {
						playCrowdSound();
						setBetStarted(false);
						setResultPopUp("win");
					} else {
						playLossSound();
						setBetStarted(false);
						setResultPopUp("loss");
					}
					setRefreshPotFromResult(true);
				}, 800);
			}, 200);
		}, 1000);
	}

	return (
		<div className="russian-wrapper">
			<img src={gunPointing} className={animationStarted ? "gun-shot loading" : win ? "gun-shot active" : "gun-shot"} />
			<img src={armImage} className={loadGun ? "arm-image active" : "arm-image"} />
			<div
				className="play-rroulette-button"
				onClick={buildRussianRouletteTransaction}
				style={
					(!connectedAddress && !ergoPayChoosen) || !selectedBet || betStarted || resultPopUp != null || !selectedCoin
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
