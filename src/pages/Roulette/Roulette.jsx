/* global BigInt */
import "./Roulette.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { tokens, addresses } from "../../components/utils";
import {
	OutputBuilder,
	TransactionBuilder,
	InsufficientInputs,
} from "@fleet-sdk/core";
// import rouletteImage from "../../assets/rouletteImage.png";
import rouletteImage from "../../assets/americanRouletteWheel.png";
import rouletteBall from "../../assets/rouletteBall.png";
import rouletteLoopmp3 from "../../assets/RouletteSounds/rouletteLoop.mp3";
import {
	firstRow,
	secondRow,
	thirdRow,
	bottomBottomRow,
	bottomTopRow,
	initialTableBets,
	firstRowToDoubleHorizontal,
	secondRowToDoubleHorizontal,
	thirdRowToDoubleHorizontal,
	firstRowToDoubleVertical,
	secondRowToDoubleVertical,
	fromRowToQuadruple,
	ergChips,
	ergChipsAux,
	cypxChipsAux,
	cypxChips,
	cometChips,
	cometChipsAux,
	getAdjacents,
	LIMITS,
	getMaxAmountGivenNumber,
	fromNumberFieldToString,
	egioChipsAux,
	egioChips,
	bassChipsAux,
	bassChips,
} from "./RouletteUtils";
import backIcon from "../../assets/backIcon.svg";
import restartIcon from "../../assets/restartIcon.svg";
import infoLogo from "../../assets/info.svg";
import { rouletteSounds } from "../../assets/RouletteSounds/rouletteSounds";
import RouletteErrorModal from "../../components/modals/RouletteErrorModal/RouletteErrorModal";
import RouletteInfoModal from "../../components/modals/RouletteInfoModal/RouletteInfoModal";
import { useSubscription } from "react-stomp-hooks";
import ReactHowler from "react-howler";

export default function Roulette({
	setInsideGame,
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
	totalBet,
	setTotalBet,
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
	const [chipSelected, setChipSelected] = useState(null);
	const [tableBets, setTableBets] = useState(initialTableBets);
	const [betHistory, setBetHistory] = useState([]);
	const [infiniteRotation, setInfiniteRotation] = useState(false);
	const [winResult, setWinResult] = useState(null);
	const [backendError, setBackendError] = useState(false);
	const [infoModal, setInfoModal] = useState(false);
	const [txIdOfCurrentBet, setTxIdOfCurrentBet] = useState(null);
	const [rouletteLoopSound, setRouletteLoopSound] = useState(false);

	useEffect(() => {
		handleRestartBets();
	}, [selectedCoin]);

	function handleChipPlaced(spot) {
		if (chipSelected) {
			let tableBetsClone = structuredClone(tableBets);
			tableBetsClone[spot]["values"].push(chipSelected);
			setTotalBet(Math.round((totalBet + chipSelected) * 100) / 100);
			setTableBets(tableBetsClone);
			setBetHistory([...betHistory, spot]);
		}
	}

	function handleRestartBets() {
		setTotalBet(0);
		setTableBets(initialTableBets);
		setBetHistory([]);
	}

	function handleRemoveLatestBet() {
		if (betHistory.length > 0) {
			let tableBetsClone = structuredClone(tableBets);
			let betHistoryClone = structuredClone(betHistory);
			let lastBet = betHistoryClone.pop();
			let lastBetAmount = tableBetsClone[lastBet]["values"].pop();
			setTotalBet(Math.round((totalBet - lastBetAmount) * 100) / 100);
			setTableBets(tableBetsClone);
			setBetHistory(betHistoryClone);
		}
	}

	function chipArrayGivenCoin(arrayNumber) {
		switch (selectedCoin) {
			case "ERG":
				return arrayNumber ? ergChipsAux : ergChips;
			case "CYPX":
				return arrayNumber ? cypxChipsAux : cypxChips;
			case "COMET":
				return arrayNumber ? cometChipsAux : cometChips;
			case "SigUSD":
				return arrayNumber ? ergChipsAux : ergChips;
			case "EGIO":
				return arrayNumber ? egioChipsAux : egioChips;
			case "FLUX":
				return arrayNumber ? ergChipsAux : ergChips;
			case "EPAD":
				return arrayNumber ? cypxChipsAux : cypxChips;
			case "PAIDEIA":
				return arrayNumber ? cypxChipsAux : cypxChips;
			case "BASS":
				return arrayNumber ? bassChipsAux : bassChips;
			case "ERGONE":
				return arrayNumber ? cypxChipsAux : cypxChips;
			case "LOVE":
				return arrayNumber ? cypxChipsAux : cypxChips;
			case "GREASYCEX":
				return arrayNumber ? cometChipsAux : cometChips;
			case "PEPERG":
				return arrayNumber ? cypxChipsAux : cypxChips;
			case "BOBER":
				return arrayNumber ? ergChipsAux : ergChips;
			case "GIF":
				return arrayNumber ? cometChipsAux : cometChips;
			default:
				return [];
		}
	}
	useEffect(() => {
		setInsideGame("roulette");
		handleCleanUpBetSelection();
	}, []);

	function changeTableBetsFieldNamesToStrings(tableBets) {
		let tableBetsClone = structuredClone(tableBets);
		let newTableBets = {};
		for (let key in tableBetsClone) {
			if (tableBetsClone[key]["values"].length > 0) {
				newTableBets[fromNumberFieldToString(key)] = tableBetsClone[key];
			}
		}
		return newTableBets;
	}

	// function totalBetGivenTokenSelected() {
	// 	switch (selectedCoin) {
	// 		case "CYPX":
	// 			return totalBet * 10000;
	// 		case "COMET":
	// 			return totalBet;
	// 		case "SigUSD":
	// 			return totalBet * 100;
	// 		case "EGIO":
	// 			return totalBet * 10000;
	// 		case "FLUX":
	// 			return totalBet * 100000000;
	// 		case "EPAD":
	// 			return totalBet * 100;
	// 		case "PAIDEIA":
	// 			return totalBet * 10000;
	// 		case "BASS":
	// 			return totalBet * 10000000;
	// 		case "ERGONE":
	// 			return totalBet * 100000000;
	// 		case "LOVE":
	// 			return totalBet;
	// 		case "GREASYCEX":
	// 			return totalBet;
	// 		default:
	// 			return 0;
	// 	}
	// }

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

	async function buildRouletteTransaction() {
		setWinResult(null);
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
					const enoughPot = isThereEnoughInPot(selectedCoin, totalBet);
					if (!enoughPot) {
						setErrorPopUp("You don't have enough funds deposited");
						setNautilusLoading(false);
						return;
					}
					apiURI = "https://ergflip-backend-production.up.railway.app/receiveRoulettePotBet";
					unsignedTransaction = new TransactionBuilder(creationHeight)
						.from(utxos)
						.to(new OutputBuilder(1000000n, addressToSend))
						.sendChangeTo(connectedAddress)
						.payMinFee()
						.build("EIP-12");

					setNautilusLoading(false);
					ergoWallet.sign_tx(unsignedTransaction).then((signedTx) => {
						ergoWallet.submit_tx(signedTx);
						//here the animation begins
						rouletteSounds.rouletteStart.play();
						setInfiniteRotation(true);
						setTimeout(() => {
							setRouletteLoopSound(true);
						}, 3000);
						const tableBetsClone = structuredClone(tableBets);
						const modifiedTableBets = changeTableBetsFieldNamesToStrings(tableBetsClone);
						setTxIdOfCurrentBet(signedTx.id);
						setBetStarted("pot");
						axios
							.post(
								apiURI,
								{
									txId: signedTx.id,
									bettorAddress: connectedAddress,
									tokenId: tokens[`${selectedCoin}`],
									tableBet: modifiedTableBets,
								},
								{ timeout: 1000000 }
							)
							.then(({ data }) => {
								setRouletteLoopSound(false);
								if (data.result != null) {
									handleRouletteResult(data);
									setWinningBetInfo(data);
								} else {
									if (data.txId === "not_enough") handleNotEnoughInPot();
									else handleBackendError();
								}
							});
					});
				})
				.catch((e) => {
					console.log(e);
					if (e instanceof InsufficientInputs) handleNotEnoughFunds();
					else handleBackNotAvailable();
				});
		}
	}

	function betFinished() {
		setInfiniteRotation(false);
		setBetStarted(false);
		rouletteSounds.rouletteLoop.pause();
		rouletteSounds.rouletteLoop.currentTime = 0;
	}

	function handleBackendError() {
		betFinished();
		setBackendError(true);
	}

	function handleRouletteResult(data) {
		rouletteSounds.rouletteEnd.play();
		setWinResult(data.result);
		setInfiniteRotation(false);
		setBetStarted(false);
		setTimeout(() => {
			if (data.amount > 0) {
				playCrowdSound();
				setResultPopUp("win");
			} else {
				playLossSound();
				setResultPopUp("loss");
			}
			setRefreshPotFromResult(true);
		}, 10000);
	}

	function handleHigherThanLimit(value, limit) {
		const adjacents = getAdjacents(value);
		let higherThanLimit = false;
		adjacents.forEach((adjacent) => {
			let totalSum = chipSelected * tableBets[value]["multiplier"];
			adjacent.forEach((adjacentNumber) => {
				const spot = tableBets[adjacentNumber];
				if (spot["values"].length) {
					const sum = spot["values"].reduce((partialSum, a) => partialSum + a, 0);
					totalSum = totalSum + sum * spot["multiplier"];
				}
			});
			if (totalSum > limit) higherThanLimit = true;
		});

		return higherThanLimit;
	}

	useSubscription(`/user/${txIdOfCurrentBet}/private`, ({ body }) => {
		const obj = JSON.parse(body);
		setRouletteLoopSound(false);
		if (obj.result != null) {
			handleRouletteResult(obj);
			setWinningBetInfo(obj);
		} else {
			handleBackendError();
		}
	});

	useSubscription(`/user/${ergoPayConnectedAddress}/roulette`, ({ body }) => {
		let apiURI = "";
		const isPotPlay = body.substring(body.length - 4) === "_pot";
		let newBody = "";
		// if (!isPotPlay) {
		// 	apiURI = "https://ergflip-backend-production.up.railway.app/receiveRouletteBet";
		// 	newBody = body;
		// } else {
		apiURI = "https://ergflip-backend-production.up.railway.app/receiveRoulettePotBet";
		newBody = body.substring(0, body.length - 4);
		// }
		const tableBetsClone = structuredClone(tableBets);
		const modifiedTableBets = changeTableBetsFieldNamesToStrings(tableBetsClone);
		// if (!isPotPlay) {
		// 	axios.post(
		// 		apiURI,
		// 		{
		// 			txId: newBody,
		// 			bettorAddress: ergoPayConnectedAddress,
		// 			tokenId: tokens[`${selectedCoin}`],
		// 			tableBet: modifiedTableBets,
		// 		},
		// 		{ timeout: 1000000 }
		// 	);
		// } else {
		axios
			.post(
				apiURI,
				{
					txId: newBody,
					bettorAddress: ergoPayConnectedAddress,
					tokenId: tokens[`${selectedCoin}`],
					tableBet: modifiedTableBets,
				},
				{ timeout: 1000000 }
			)
			.then(({ data }) => {
				setRouletteLoopSound(false);
				if (data.result != null) {
					handleRouletteResult(data);
					setWinningBetInfo(data);
				} else {
					if ((data.txId = "not_enough")) {
						handleNotEnoughInPot();
					} else handleBackendError();
				}
			});
		// }
		rouletteSounds.rouletteStart.play();
		setInfiniteRotation(true);
		setTimeout(() => {
			setRouletteLoopSound(true);
		}, 3000);
		setBetStarted(true);
		setQRcode(false);
		setTxIdOfCurrentBet(newBody);
	});

	function handleMouseEntersChip(chip) {
		let tableBetsClone = structuredClone(tableBets);
		tableBetsClone[chip]["hovered"] = true;
		setTableBets(tableBetsClone);
	}

	function handleMouseLeavesChip(chip) {
		let tableBetsClone = structuredClone(tableBets);
		tableBetsClone[chip]["hovered"] = false;
		setTableBets(tableBetsClone);
	}

	function getSumOfAllValues(chip) {
		const sum = tableBets[chip]["values"].reduce((partialSum, a) => partialSum + a, 0);
		return Math.round(sum * 100) / 100;
	}

	return (
		<div className="roulette-wrapper">
			{backendError && <RouletteErrorModal setBackendError={setBackendError} />}
			<div style={{ display: "none" }}>
				<ReactHowler src={rouletteLoopmp3} playing={rouletteLoopSound} loop={true} />
			</div>

			<RouletteInfoModal infoModal={infoModal} setInfoModal={setInfoModal} />
			<div className="roulette-image-wrapper">
				<img src={rouletteImage} className={infiniteRotation ? "roulette-image rotate" : "roulette-image"} />
				<div
					className={infiniteRotation ? "roulette-ball-wrapper rotate" : "roulette-ball-wrapper"}
					spinto={winResult !== null ? winResult : null}
				>
					<img src={rouletteBall} className="roulette-ball-image"></img>
				</div>
			</div>
			<div className="roulette-table-wrapper" style={infiniteRotation ? { pointerEvents: "none" } : null}>
				<div className="roulette-tablent-upper">
					<div className="roulette-tablent-upper-top-left">
						<img src={backIcon} onClick={() => handleRemoveLatestBet()} />
						<img src={restartIcon} onClick={() => handleRestartBets()} />
						<img src={infoLogo} onClick={() => setInfoModal(true)} />
					</div>
					<div className="roulette-tablent-upper-top-right">
						{selectedCoin && <div className="roulette-bet-amount">Bet: {totalBet}</div>}
						<div className="chips">
							{selectedCoin &&
								chipArrayGivenCoin(0).map((chip, index) => {
									return (
										<div key={index} className="chip-selector" onClick={() => setChipSelected(chip.value)}>
											<img src={chip.image} className="chip-image" />
										</div>
									);
								})}
							{!selectedCoin && <div className="select-a-token">Select a coin</div>}
						</div>
					</div>
				</div>
				<div className="roulette-table">
					<div className="upper-part">
						<div className="zpot-0">
							<div
								className="zpot-0-inner"
								style={{ borderTopLeftRadius: 8 }}
								onClick={() => {
									const isHigher = handleHigherThanLimit("00", LIMITS[selectedCoin]);
									if (!isHigher) {
										handleChipPlaced("00");
									}
								}}
							>
								{tableBets["00"]["values"].length ? (
									<>
										<img
											onMouseEnter={() => {
												handleMouseEntersChip("00");
											}}
											onMouseLeave={() => {
												handleMouseLeavesChip("00");
											}}
											src={chipArrayGivenCoin(1)[tableBets["00"]["values"].at(-1)]}
										/>
										{tableBets["00"]["hovered"] && (
											<div className="hovering-roulette-amount">{getSumOfAllValues("00")}</div>
										)}
									</>
								) : (
									"00"
								)}
							</div>
							<div
								className="zpot-00_0"
								onClick={() => {
									const isHigher = handleHigherThanLimit("00_0", LIMITS[selectedCoin]);
									if (!isHigher) {
										handleChipPlaced("00_0");
									}
								}}
							>
								{tableBets["00_0"]["values"].length ? (
									<>
										<img
											onMouseEnter={() => {
												handleMouseEntersChip("00_0");
											}}
											onMouseLeave={() => {
												handleMouseLeavesChip("00_0");
											}}
											src={chipArrayGivenCoin(1)[tableBets["00_0"]["values"].at(-1)]}
										/>
										{tableBets["00_0"]["hovered"] && (
											<div className="hovering-roulette-amount">{getSumOfAllValues("00_0")}</div>
										)}
									</>
								) : null}
							</div>
							<div
								className="zpot-0-inner"
								style={{ borderBottomLeftRadius: 8 }}
								onClick={() => {
									const isHigher = handleHigherThanLimit("0", LIMITS[selectedCoin]);
									if (!isHigher) {
										handleChipPlaced("0");
									}
								}}
							>
								{tableBets["0"]["values"].length ? (
									<>
										<img
											onMouseEnter={() => {
												handleMouseEntersChip("0");
											}}
											onMouseLeave={() => {
												handleMouseLeavesChip("0");
											}}
											src={chipArrayGivenCoin(1)[tableBets["0"]["values"].at(-1)]}
										/>
										{tableBets["0"]["hovered"] && (
											<div className="hovering-roulette-amount">{getSumOfAllValues("0")}</div>
										)}
									</>
								) : (
									"0"
								)}
							</div>
						</div>
						<div className="pure-numbers-wrapper">
							<div className="pure-numbers-row">
								{firstRow.map((number) => {
									return (
										<div className="pure-number-wrapper-column" key={number.value}>
											<div className="pure-number-wrapper-top-row">
												<div
													className="double-zpot"
													style={number.horizontalStyle}
													onClick={() => {
														const realSpot = firstRowToDoubleHorizontal(number.value);
														const isHigher = handleHigherThanLimit(realSpot, LIMITS[selectedCoin]);
														if (!isHigher) {
															handleChipPlaced(realSpot);
														}
													}}
												>
													{tableBets[firstRowToDoubleHorizontal(number.value)]["values"].length ? (
														<>
															<img
																style={{ zIndex: 1 }}
																onMouseEnter={() => {
																	handleMouseEntersChip(number.value);
																}}
																onMouseLeave={() => {
																	handleMouseLeavesChip(number.value);
																}}
																src={
																	chipArrayGivenCoin(1)[
																		tableBets[`${firstRowToDoubleHorizontal(number.value)}`]["values"].at(-1)
																	]
																}
															/>
															{tableBets[number.value]["hovered"] && (
																<div className="hovering-roulette-amount">{getSumOfAllValues(number.value)}</div>
															)}
														</>
													) : null}
												</div>
												<div
													className={`roulette-spot-${number.value}`}
													onClick={() => {
														const isHigher = handleHigherThanLimit(number.value, LIMITS[selectedCoin]);
														if (!isHigher) {
															handleChipPlaced(number.value);
														}
													}}
													style={number.style}
												>
													{tableBets[number.value]["values"].length ? (
														<>
															<img
																style={{ zIndex: 1 }}
																onMouseEnter={() => {
																	handleMouseEntersChip(number.value);
																}}
																onMouseLeave={() => {
																	handleMouseLeavesChip(number.value);
																}}
																src={chipArrayGivenCoin(1)[tableBets[`${number.value}`]["values"].at(-1)]}
															/>
															{tableBets[number.value]["hovered"] && (
																<div className="hovering-roulette-amount">{getSumOfAllValues(number.value)}</div>
															)}
														</>
													) : (
														number.value
													)}
												</div>
											</div>
											<div className="pure-number-wrapper-bottom-row">
												<div
													className="quadruple-zpot"
													style={number.quadrupleStyle}
													onClick={() => {
														const realSpot = fromRowToQuadruple(number.value);
														const isHigher = handleHigherThanLimit(realSpot, LIMITS[selectedCoin]);
														if (!isHigher) {
															handleChipPlaced(realSpot);
														}
													}}
												>
													{tableBets[fromRowToQuadruple(number.value)]["values"].length ? (
														<>
															<img
																style={{ zIndex: 1 }}
																onMouseEnter={() => {
																	handleMouseEntersChip(number.value);
																}}
																onMouseLeave={() => {
																	handleMouseLeavesChip(number.value);
																}}
																src={
																	chipArrayGivenCoin(1)[
																		tableBets[`${fromRowToQuadruple(number.value)}`]["values"].at(-1)
																	]
																}
															/>
															{tableBets[number.value]["hovered"] && (
																<div className="hovering-roulette-amount">{getSumOfAllValues(number.value)}</div>
															)}
														</>
													) : null}
												</div>
												<div
													className="double-vertical-zpot"
													style={number.verticalStyle}
													onClick={() => {
														const realSpot = firstRowToDoubleVertical(number.value);
														const isHigher = handleHigherThanLimit(realSpot, LIMITS[selectedCoin]);
														if (!isHigher) {
															handleChipPlaced(realSpot);
														}
													}}
												>
													{tableBets[firstRowToDoubleVertical(number.value)]["values"].length ? (
														<>
															<img
																style={{ zIndex: 1 }}
																onMouseEnter={() => {
																	handleMouseEntersChip(number.value);
																}}
																onMouseLeave={() => {
																	handleMouseLeavesChip(number.value);
																}}
																src={
																	chipArrayGivenCoin(1)[
																		tableBets[`${firstRowToDoubleVertical(number.value)}`]["values"].at(-1)
																	]
																}
															/>
															{tableBets[number.value]["hovered"] && (
																<div className="hovering-roulette-amount">{getSumOfAllValues(number.value)}</div>
															)}
														</>
													) : null}
												</div>
											</div>
										</div>
									);
								})}
							</div>

							<div className="pure-numbers-row">
								{secondRow.map((number) => {
									return (
										<div className="pure-number-wrapper-column" key={number.value}>
											<div className="pure-number-wrapper-top-row">
												<div
													className="double-zpot"
													style={number.horizontalStyle}
													onClick={() => {
														const realSpot = secondRowToDoubleHorizontal(number.value);
														const isHigher = handleHigherThanLimit(realSpot, LIMITS[selectedCoin]);
														if (!isHigher) {
															handleChipPlaced(realSpot);
														}
													}}
												>
													{tableBets[secondRowToDoubleHorizontal(number.value)]["values"].length ? (
														<>
															<img
																style={{ zIndex: 1 }}
																onMouseEnter={() => {
																	handleMouseEntersChip(number.value);
																}}
																onMouseLeave={() => {
																	handleMouseLeavesChip(number.value);
																}}
																src={
																	chipArrayGivenCoin(1)[
																		tableBets[`${secondRowToDoubleHorizontal(number.value)}`]["values"].at(-1)
																	]
																}
															/>
															{tableBets[number.value]["hovered"] && (
																<div className="hovering-roulette-amount">{getSumOfAllValues(number.value)}</div>
															)}
														</>
													) : null}
												</div>
												<div
													className={`roulette-spot-${number.value}`}
													onClick={() => {
														const isHigher = handleHigherThanLimit(number.value, LIMITS[selectedCoin]);
														if (!isHigher) {
															handleChipPlaced(number.value);
														}
													}}
													style={number.style}
												>
													{tableBets[number.value]["values"].length ? (
														<>
															<img
																style={{ zIndex: 1 }}
																onMouseEnter={() => {
																	handleMouseEntersChip(number.value);
																}}
																onMouseLeave={() => {
																	handleMouseLeavesChip(number.value);
																}}
																src={chipArrayGivenCoin(1)[tableBets[`${number.value}`]["values"].at(-1)]}
															/>
															{tableBets[number.value]["hovered"] && (
																<div className="hovering-roulette-amount">{getSumOfAllValues(number.value)}</div>
															)}
														</>
													) : (
														number.value
													)}
												</div>
											</div>
											<div className="pure-number-wrapper-bottom-row">
												<div
													className="quadruple-zpot"
													style={number.quadrupleStyle}
													onClick={() => {
														const realSpot = fromRowToQuadruple(number.value);
														const isHigher = handleHigherThanLimit(realSpot, LIMITS[selectedCoin]);
														if (!isHigher) {
															handleChipPlaced(realSpot);
														}
													}}
												>
													{tableBets[fromRowToQuadruple(number.value)]["values"].length ? (
														<>
															<img
																style={{ zIndex: 1 }}
																onMouseEnter={() => {
																	handleMouseEntersChip(number.value);
																}}
																onMouseLeave={() => {
																	handleMouseLeavesChip(number.value);
																}}
																src={
																	chipArrayGivenCoin(1)[
																		tableBets[`${fromRowToQuadruple(number.value)}`]["values"].at(-1)
																	]
																}
															/>
															{tableBets[number.value]["hovered"] && (
																<div className="hovering-roulette-amount">{getSumOfAllValues(number.value)}</div>
															)}
														</>
													) : null}
												</div>
												<div
													className="double-vertical-zpot"
													style={number.verticalStyle}
													onClick={() => {
														const realSpot = secondRowToDoubleVertical(number.value);
														const isHigher = handleHigherThanLimit(realSpot, LIMITS[selectedCoin]);
														if (!isHigher) {
															handleChipPlaced(realSpot);
														}
													}}
												>
													{tableBets[secondRowToDoubleVertical(number.value)]["values"].length ? (
														<>
															<img
																style={{ zIndex: 1 }}
																onMouseEnter={() => {
																	handleMouseEntersChip(number.value);
																}}
																onMouseLeave={() => {
																	handleMouseLeavesChip(number.value);
																}}
																src={
																	chipArrayGivenCoin(1)[
																		tableBets[`${secondRowToDoubleVertical(number.value)}`]["values"].at(-1)
																	]
																}
															/>
															{tableBets[number.value]["hovered"] && (
																<div className="hovering-roulette-amount">{getSumOfAllValues(number.value)}</div>
															)}
														</>
													) : null}
												</div>
											</div>
										</div>
									);
								})}
							</div>
							<div className="pure-numbers-row">
								{thirdRow.map((number) => {
									return (
										<div className="pure-number-wrapper-column" key={number.value}>
											<div className="pure-number-wrapper-top-row3">
												<div
													className="double-zpot"
													style={number.horizontalStyle}
													onClick={() => {
														const realSpot = thirdRowToDoubleHorizontal(number.value);
														const isHigher = handleHigherThanLimit(realSpot, LIMITS[selectedCoin]);
														if (!isHigher) {
															handleChipPlaced(realSpot);
														}
													}}
												>
													{tableBets[thirdRowToDoubleHorizontal(number.value)]["values"].length ? (
														<>
															<img
																style={{ zIndex: 1 }}
																onMouseEnter={() => {
																	handleMouseEntersChip(number.value);
																}}
																onMouseLeave={() => {
																	handleMouseLeavesChip(number.value);
																}}
																src={
																	chipArrayGivenCoin(1)[
																		tableBets[`${thirdRowToDoubleHorizontal(number.value)}`]["values"].at(-1)
																	]
																}
															/>
															{tableBets[number.value]["hovered"] && (
																<div className="hovering-roulette-amount">{getSumOfAllValues(number.value)}</div>
															)}
														</>
													) : null}
												</div>
												<div
													className={`roulette-spot-${number.value}`}
													onClick={() => {
														const isHigher = handleHigherThanLimit(number.value, LIMITS[selectedCoin]);
														if (!isHigher) {
															handleChipPlaced(number.value);
														}
													}}
													style={number.style}
												>
													{tableBets[number.value]["values"].length ? (
														<>
															<img
																style={{ zIndex: 1 }}
																onMouseEnter={() => {
																	handleMouseEntersChip(number.value);
																}}
																onMouseLeave={() => {
																	handleMouseLeavesChip(number.value);
																}}
																src={chipArrayGivenCoin(1)[tableBets[`${number.value}`]["values"].at(-1)]}
															/>
															{tableBets[number.value]["hovered"] && (
																<div className="hovering-roulette-amount">{getSumOfAllValues(number.value)}</div>
															)}
														</>
													) : (
														number.value
													)}
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
						<div className="rows-selector">
							<div
								className="zpot-2to1"
								style={{ borderTopRightRadius: 8 }}
								onClick={() => {
									const maxAmountToBet = getMaxAmountGivenNumber("3rd", selectedCoin);

									if (
										chipSelected + tableBets["3rd"]["values"].reduce((partialSum, a) => partialSum + a, 0) <=
										maxAmountToBet
									) {
										handleChipPlaced("3rd");
									}
								}}
							>
								{tableBets["3rd"]["values"].length ? (
									<>
										<img
											style={{ zIndex: 1 }}
											onMouseEnter={() => {
												handleMouseEntersChip("3rd");
											}}
											onMouseLeave={() => {
												handleMouseLeavesChip("3rd");
											}}
											src={chipArrayGivenCoin(1)[tableBets["3rd"]["values"].at(-1)]}
										/>
										{tableBets["3rd"]["hovered"] && (
											<div className="hovering-roulette-amount">{getSumOfAllValues("3rd")}</div>
										)}
									</>
								) : (
									"3rd"
								)}
							</div>
							<div
								className="zpot-2to1"
								onClick={() => {
									const maxAmountToBet = getMaxAmountGivenNumber("2nd", selectedCoin);

									if (
										chipSelected + tableBets["2nd"]["values"].reduce((partialSum, a) => partialSum + a, 0) <=
										maxAmountToBet
									) {
										handleChipPlaced("2nd");
									}
								}}
							>
								{tableBets["2nd"]["values"].length ? (
									<>
										<img
											style={{ zIndex: 1 }}
											onMouseEnter={() => {
												handleMouseEntersChip("2nd");
											}}
											onMouseLeave={() => {
												handleMouseLeavesChip("2nd");
											}}
											src={chipArrayGivenCoin(1)[tableBets["2nd"]["values"].at(-1)]}
										/>
										{tableBets["2nd"]["hovered"] && (
											<div className="hovering-roulette-amount">{getSumOfAllValues("2nd")}</div>
										)}
									</>
								) : (
									"2nd"
								)}
							</div>
							<div
								className="zpot-2to1"
								style={{ borderBottomRightRadius: 8 }}
								onClick={() => {
									const maxAmountToBet = getMaxAmountGivenNumber("1st", selectedCoin);

									if (
										chipSelected + tableBets["1st"]["values"].reduce((partialSum, a) => partialSum + a, 0) <=
										maxAmountToBet
									) {
										handleChipPlaced("1st");
									}
								}}
							>
								{tableBets["1st"]["values"].length ? (
									<>
										<img
											style={{ zIndex: 1 }}
											onMouseEnter={() => {
												handleMouseEntersChip("1st");
											}}
											onMouseLeave={() => {
												handleMouseLeavesChip("1st");
											}}
											src={chipArrayGivenCoin(1)[tableBets["1st"]["values"].at(-1)]}
										/>
										{tableBets["1st"]["hovered"] && (
											<div className="hovering-roulette-amount">{getSumOfAllValues("1st")}</div>
										)}
									</>
								) : (
									"1st"
								)}
							</div>
						</div>
					</div>
					<div className="bottom-part">
						<div className="bottom-left-part"></div>
						<div className="bottom-middle-part-wrapper">
							<div className="bottom-middle-top-row">
								{bottomTopRow.map((number) => {
									return (
										<div
											className="bottom-middle-top-zpot"
											key={number}
											style={
												number === "1st12" ? { paddingRight: 15 } : number === "2nd12" ? { paddingRight: 5 } : null
											}
											onClick={() => {
												const maxAmountToBet = getMaxAmountGivenNumber(number, selectedCoin);

												if (
													chipSelected + tableBets[number]["values"].reduce((partialSum, a) => partialSum + a, 0) <=
													maxAmountToBet
												) {
													handleChipPlaced(number);
												}
											}}
										>
											{tableBets[number]["values"].length ? (
												<>
													<img
														style={{ zIndex: 1 }}
														onMouseEnter={() => {
															handleMouseEntersChip(number);
														}}
														onMouseLeave={() => {
															handleMouseLeavesChip(number);
														}}
														src={chipArrayGivenCoin(1)[tableBets[number]["values"].at(-1)]}
													/>
													{tableBets[number]["hovered"] && (
														<div className="hovering-roulette-amount">{getSumOfAllValues(number)}</div>
													)}
												</>
											) : (
												number
											)}
										</div>
									);
								})}
							</div>
							<div className="bottom-middle-bottom-row">
								{bottomBottomRow.map((number) => {
									return (
										<div
											className="bottom-middle-bottom-zpot"
											style={number.style}
											key={number.value}
											onClick={() => {
												const maxAmountToBet = getMaxAmountGivenNumber(number.value, selectedCoin);

												if (
													chipSelected +
														tableBets[number.value]["values"].reduce((partialSum, a) => partialSum + a, 0) <=
													maxAmountToBet
												) {
													handleChipPlaced(number.value);
												}
											}}
										>
											{tableBets[number.value]["values"].length ? (
												<>
													<img
														style={{ zIndex: 1 }}
														onMouseEnter={() => {
															handleMouseEntersChip(number.value);
														}}
														onMouseLeave={() => {
															handleMouseLeavesChip(number.value);
														}}
														src={chipArrayGivenCoin(1)[tableBets[number.value]["values"].at(-1)]}
													/>
													{tableBets[number.value]["hovered"] && (
														<div className="hovering-roulette-amount">{getSumOfAllValues(number.value)}</div>
													)}
												</>
											) : (
												number.value
											)}
										</div>
									);
								})}
							</div>
						</div>
						<div className="bottom-right-part"></div>
					</div>
				</div>
				<div className="roulette-tablent-bottom">
					<div
						className="spin-button"
						onClick={buildRouletteTransaction}
						style={
							(!connectedAddress && !ergoPayChoosen) || betStarted || resultPopUp != null || !selectedCoin
								? {
										backgroundColor: "#828a8a",
										opacity: "0.8",
										cursor: "not-allowed",
										pointerEvents: "none",
								  }
								: null
						}
					>
						Spin
					</div>
				</div>
			</div>
		</div>
	);
}
