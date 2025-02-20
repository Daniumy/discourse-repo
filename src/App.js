/* global BigInt */
import "./App.css";
import { useEffect, useState, useRef } from "react";
import Navbar from "./components/navbar/navbar";
import { OutputBuilder, TransactionBuilder, InsufficientInputs } from "@fleet-sdk/core";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import WinnersTable from "./components/WinnersTable/WinnersTable";
import ResultModal from "./components/modals/ResultModal/ResultModal";
import BetAmount from "./components/BetAmount/BetAmount";
// import WelcomeModal from "./components/modals/WelcomeModal/WelcomeModal";
import Confetti from "react-confetti";
import crowdSound from "./assets/crowd.mp3";
import lossSound from "./assets/loss.mp3";
import LossModal from "./components/modals/LossModal/LossModal";
import closeIcon from "./assets/closeModal.svg";
import {
	fromGameToMultiplier,
	tokens,
	addresses,
	fromLongToActualCurrencyValue,
	fromActualCurrencyValueToLong,
} from "./components/utils";
import Coinflip from "./pages/Coinflip/Coinflip";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import GamesRoot from "./pages/GamesRoot/GamesRoot";
import CardWar from "./pages/CardWar/CardWar";
import RussianRoulette from "./pages/RussianRoulette/RussianRoulette";
import DiceRoll from "./pages/DiceRoll/DiceRoll";
import OneToTen from "./pages/OneToTen/OneToTen";
import Roulette from "./pages/Roulette/Roulette";
import { useSubscription } from "react-stomp-hooks";
import Pot from "./pages/Pot/Pot";
import FixedPotInfo from "./components/FixedPotInfo/FixedPotInfo";
import FirstTimeHoveringPot from "./components/modals/FirstTimeHoveringPot/FirstTimeHoveringPot";
import ErrorPopUp from "./components/modals/ErrorPopUp/ErrorPopUp";
import ErgopayAddress from "./components/modals/ErgopayAddress/ErgopayAddress";
import StartNotifications from "./components/StartNotifications/StartNotifications";
import GamblingHelp from "./pages/GamblingHelp/GamblingHelp";
import AddressName from "./pages/AddressName/AddressName";
import Plinko from "./pages/Plinko/Plinko";
import { availableRisks } from "./pages/Plinko/PlinkoUtils";
import ErgoPayTransaction from "./components/ErgoPayTransaction/ErgoPayTransaction";
import gamblina from "./assets/gamblina.png";

function App() {
	const [faceSelected, setFaceSelected] = useState(null);
	const [connectedAddress, setConnectedAddress] = useState(null);
	const [ergoPayConnectedAddress, setErgoPayConnectedAddress] = useState("");
	const [ergoPayConnectedAddressSubmitted, setErgoPayConnectedAddressSubmitted] = useState(false);
	const [selectedBet, setSelectedBet] = useState(null);
	const [selectedCoin, setSelectedCoin] = useState(null);
	const [ergoWallet, setErgoWallet] = useState(null);
	const [ergoPayChoosen, setErgoPayChoosen] = useState(false);
	const [selectErgopayAddressModal, setSelectErgopayAddressModal] = useState(false);
	const [faceResolvedAfterBet, setFaceResolvedAfterBet] = useState(null);
	const [betStarted, setBetStarted] = useState(false);
	const [resultPopUp, setResultPopUp] = useState(null);
	const [nautilusLoading, setNautilusLoading] = useState(false);
	const [faceSelectedAux, setFaceSelectedAux] = useState(null);

	const [backendReachable, setBackendReachable] = useState(true);
	const [notEnoughFundsError, setNotEnoughFundsError] = useState(false);
	const [backendError, setBackendError] = useState(false);
	const [notEnoughInPotError, setNotEnoughInPotError] = useState(false);
	const [backendReachable2, setBackendReachable2] = useState(true);
	const [QRcode, setQRcode] = useState(null);
	const [noAnimationNotification, setNoAnimationNotification] = useState(false);
	const [winningBetInfo, setWinningBetInfo] = useState(null);
	const [insideGame, setInsideGame] = useState(false);
	const [txIdOfCurrentBet, setTxIdOfCurrentBet] = useState(null);
	const [totalRouletteBet, setTotalRouletteBet] = useState(0);

	//pot
	const [ergAmount, setErgAmount] = useState(0);
	const [cometAmount, setCometAmount] = useState(0);
	const [sigusdAmount, setSigusdAmount] = useState(0);
	const [cypxAmount, setCypxAmount] = useState(0);
	const [egioAmount, setEgioAmount] = useState(0);
	const [fluxAmount, setFluxAmount] = useState(0);
	const [epadAmount, setEpadAmount] = useState(0);
	const [paideiaAmount, setPaideiaAmount] = useState(0);
	const [bassAmount, setBassAmount] = useState(0);
	const [ergoneAmount, setErgoneAmount] = useState(0);
	const [loveAmount, setLoveAmount] = useState(0);
	const [greasycexAmount, setGreasycexAmount] = useState(0);
	const [pepergAmount, setPepergAmount] = useState(0);
	const [boberAmount, setBoberAmount] = useState(0);
	const [gifAmount, setGifAmount] = useState(0);
	const [potFundsLoading, setPotFundsLoading] = useState(true);
	const [firstTimeHoveringPot, setFirstTimeHoveringPot] = useState(false);
	const [showExtendedFixed, setShowExtendedFixed] = useState(false);
	const [showFirstTimeHoveringPot, setShowFirstTimeHoveringPot] = useState(false);
	const [refreshPotFromResult, setRefreshPotFromResult] = useState(false);
	const [selectedRisk, setSelectedRisk] = useState(availableRisks[0]);
	const [errorPopUp, setErrorPopUp] = useState("");
	const [ergoPayTransaction, setErgoPayTransaction] = useState([]);

	useEffect(() => {
		requestCurrentPotFunds();
	}, [connectedAddress, ergoPayConnectedAddress]);

	useEffect(() => {
		if (localStorage.getItem("firstTimeHoveringPot") === null) {
			setFirstTimeHoveringPot(true);
		}
	}, []);

	function handleSetPotFunds(data) {
		if (data) {
			setErgAmount(fromLongToActualCurrencyValue(data.erg_amount, "ERG").toFixed(2));
			setCometAmount(fromLongToActualCurrencyValue(data.comet_amount, "COMET"));
			setSigusdAmount(fromLongToActualCurrencyValue(data.sigusd_Amount, "SigUSD").toFixed(2));
			setCypxAmount(fromLongToActualCurrencyValue(data.cypx_amount, "CYPX").toFixed(2));
			setEgioAmount(fromLongToActualCurrencyValue(data.egio_amount, "EGIO").toFixed(2));
			setFluxAmount(fromLongToActualCurrencyValue(data.flux_amount, "FLUX").toFixed(2));
			setEpadAmount(fromLongToActualCurrencyValue(data.epad_amount, "EPAD").toFixed(2));
			setPaideiaAmount(fromLongToActualCurrencyValue(data.paideia_amount, "PAIDEIA").toFixed(2));
			setBassAmount(fromLongToActualCurrencyValue(data.bass_amount, "BASS").toFixed(2));
			setErgoneAmount(fromLongToActualCurrencyValue(data.ergone_amount, "ERGONE").toFixed(2));
			setLoveAmount(fromLongToActualCurrencyValue(data.love_amount, "LOVE").toFixed(2));
			setGreasycexAmount(fromLongToActualCurrencyValue(data.greasycex_amount, "GREASYCEX").toFixed(2));
			setPepergAmount(fromLongToActualCurrencyValue(data.peperg_amount, "PEPERG").toFixed(2));
			setBoberAmount(fromLongToActualCurrencyValue(data.bober_amount, "BOBER").toFixed(2));
			setGifAmount(fromLongToActualCurrencyValue(data.gif_amount, "GIF").toFixed(2));
		}
		setPotFundsLoading(false);
	}

	function requestCurrentPotFunds() {
		setPotFundsLoading(true);
		if (connectedAddress) {
			axios.get(`https://ergflip-backend-production.up.railway.app/getUserPot/${connectedAddress}`).then(({ data }) => {
				handleSetPotFunds(data);
			});
		} else if (ergoPayConnectedAddress) {
			axios
				.get(`https://ergflip-backend-production.up.railway.app/getUserPot/${ergoPayConnectedAddress}`)
				.then(({ data }) => {
					handleSetPotFunds(data);
				});
		}
	}

	useSubscription(`/user/${txIdOfCurrentBet}/private`, ({ body }) => {
		const obj = JSON.parse(body);
		if (obj.txId === "not_enough") handleNotEnoughInPot();
		else if (obj.result) {
			setFaceResolvedAfterBet(faceSelectedAux);
			setTimeout(() => {
				crowd.play();
				setBetStarted(false);
				setResultPopUp("win");
				setWinningBetInfo(obj);
			}, 6000);
		} else {
			setFaceResolvedAfterBet(faceSelectedAux == "heads" ? "tails" : "heads");
			setTimeout(() => {
				loss.play();
				setBetStarted(false);
				setResultPopUp("loss");
			}, 6000);
		}
	});

	useSubscription(`/user/${ergoPayConnectedAddress}/coinflip`, ({ body }) => {
		setBetStarted(true);
		setFaceResolvedAfterBet(null);
		setFaceSelectedAux(faceSelected.slice());
		setTxIdOfCurrentBet(body);
		setQRcode(false);
	});

	async function startPlay(tokenSelected, amountToPlay, multiplierOfAmount = 1, URI, pinRows) {
		const totalAmountToPlay = amountToPlay * multiplierOfAmount;
		if (!isThereEnoughInPot(tokenSelected, fromLongToActualCurrencyValue(totalAmountToPlay, tokenSelected))) {
			setErrorPopUp("You don't have enough funds deposited");
			setNautilusLoading(false);
			return false;
		} else return startPotTransaction(tokenSelected, amountToPlay, multiplierOfAmount, URI, pinRows);
	}

	function startPotTransaction(tokenSelected, amountToPlay, multiplier, URI, pinRows) {
		return new Promise((resolve, reject) => {
			if (connectedAddress && ergoWallet) {
				axios
					.get("https://ergflip-backend-production.up.railway.app/backendReachable")
					.then(async ({ data }) => {
						const creationHeight = await ergoWallet.get_current_height();
						const utxos = await ergoWallet.get_utxos();
						const addressToSend = addresses[data - 1];

						let unsignedTransaction;
						let apiURI;

						apiURI = `https://ergflip-backend-production.up.railway.app/${URI}`;
						unsignedTransaction = new TransactionBuilder(creationHeight)
							.from(utxos)
							.to(new OutputBuilder(1000000n, addressToSend))
							.sendChangeTo(connectedAddress)
							.payMinFee()
							.build("EIP-12");

						setNautilusLoading(false);
						ergoWallet
							.sign_tx(unsignedTransaction)
							.then((signedTx) => {
								ergoWallet.submit_tx(signedTx);
								setBetStarted("pot");
								axios
									.post(
										apiURI,
										{
											txId: signedTx.id,
											bettorAddress: connectedAddress,
											tokenId: tokens[`${tokenSelected}`],
											amount: amountToPlay,
											multiplier: multiplier,
											pinRows: pinRows,
											risk: selectedRisk,
										},
										{ timeout: 1000000 }
									)
									.then((res) => {
										const { data } = res;
										if (data === "") handleBackendError();
										setBetStarted(false);
										if (data.txId === "not_enough") {
											handleNotEnoughInPot();
											setNautilusLoading(false);
											reject("not_enough");
										} else if (data) {
											resolve(data);
										} else {
											setNautilusLoading(false);
											reject("no_data");
											return 0;
										}
									})
									.catch((e) => {
										console.log(e);
										reject("didnt happen");
										return 0;
									});
							})
							.catch(() => {
								reject("sign_cancelled");
								return 0;
							});
					})
					.catch((e) => {
						if (e instanceof InsufficientInputs) handleNotEnoughFunds();
						else handleBackNotAvailable();
						setNautilusLoading(false);
						setBetStarted(false);
						reject("back_error");
						return 0;
					});
			} else if (ergoPayConnectedAddress) {
				setNautilusLoading(false);

				const ergopaySrc = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=ergopay://ergflip-backend-production.up.railway.app/roundTripMakePlinkoBet/${ergoPayConnectedAddress}/${selectedRisk}/${
					tokens[`${tokenSelected}`]
				}/${multiplier}/${amountToPlay}/${pinRows}`;

				const ergopayHref = `ergopay://ergflip-backend-production.up.railway.app/roundTripMakePlinkoBet/${ergoPayConnectedAddress}/${selectedRisk}/${
					tokens[`${tokenSelected}`]
				}/${multiplier}/${amountToPlay}/${pinRows}`;

				setErgoPayTransaction([ergopayHref, ergopaySrc]);
				reject("");
			} else {
				setNautilusLoading(false);
				reject("no_wallet");
			}
		});
	}

	const router = createBrowserRouter([
		{
			path: "/",
			element: <GamesRoot setInsideGame={setInsideGame} />,
			errorElement: <ErrorPage />,
		},
		{
			path: "pot",
			element: (
				<Pot
					connectedAddress={connectedAddress}
					ergoPayConnectedAddress={ergoPayConnectedAddress}
					ergoWallet={ergoWallet}
					setNautilusLoading={setNautilusLoading}
					handleBackNotAvailable={handleBackNotAvailable}
					handleNotEnoughFunds={handleNotEnoughFunds}
					ergAmount={ergAmount}
					cometAmount={cometAmount}
					sigusdAmount={sigusdAmount}
					cypxAmount={cypxAmount}
					egioAmount={egioAmount}
					fluxAmount={fluxAmount}
					epadAmount={epadAmount}
					paideiaAmount={paideiaAmount}
					bassAmount={bassAmount}
					ergoneAmount={ergoneAmount}
					loveAmount={loveAmount}
					greasycexAmount={greasycexAmount}
					pepergAmount={pepergAmount}
					boberAmount={boberAmount}
					gifAmount={gifAmount}
					setErgAmount={setErgAmount}
					setCometAmount={setCometAmount}
					setCypxAmount={setCypxAmount}
					setSigusdAmount={setSigusdAmount}
					setEgioAmount={setEgioAmount}
					setFluxAmount={setFluxAmount}
					setEpadAmount={setEpadAmount}
					setPaideiaAmount={setPaideiaAmount}
					setBassAmount={setBassAmount}
					setErgoneAmount={setErgoneAmount}
					setLoveAmount={setLoveAmount}
					setGreasycexAmount={setGreasycexAmount}
					setPepergAmount={setPepergAmount}
					setBoberAmount={setBoberAmount}
					setGifAmount={setGifAmount}
					potFundsLoading={potFundsLoading}
					setPotFundsLoading={setPotFundsLoading}
				/>
			),
		},
		// {
		// 	path: "refund",
		// 	element: (
		// 		<Refund
		// 			connectedAddress={connectedAddress}
		// 			ergoPayConnectedAddress={ergoPayConnectedAddress}
		// 			ergoWallet={ergoWallet}
		// 			handleBackNotAvailable={handleBackNotAvailable}
		// 		/>
		// 	),
		// },
		{
			path: "game/coinflip",
			element: (
				<Coinflip
					setInsideGame={setInsideGame}
					handleFaceSelected={handleFaceSelected}
					faceResolvedAfterBet={faceResolvedAfterBet}
					faceSelected={faceSelected}
					connectedAddress={connectedAddress}
					ergoPayChoosen={ergoPayChoosen}
					selectedBet={selectedBet}
					betStarted={betStarted}
					resultPopUp={resultPopUp}
					selectedCoin={selectedCoin}
					placeBet={placeBet}
					handleCleanUpBetSelection={handleCleanUpBetSelection}
					setQRcode={setQRcode}
				/>
			),
		},
		{
			path: "game/cardwar",
			element: (
				<CardWar
					connectedAddress={connectedAddress}
					ergoPayChoosen={ergoPayChoosen}
					setInsideGame={setInsideGame}
					selectedBet={selectedBet}
					betStarted={betStarted}
					resultPopUp={resultPopUp}
					selectedCoin={selectedCoin}
					placeBet={placeBetAux}
					setResultPopUp={setResultPopUp}
					setBetStarted={setBetStarted}
					ergoWallet={ergoWallet}
					setNautilusLoading={setNautilusLoading}
					setWinningBetInfo={setWinningBetInfo}
					setBackendReachable2={setBackendReachable2}
					handleBackNotAvailable={handleBackNotAvailable}
					playLossSound={playLossSound}
					playCrowdSound={playCrowdSound}
					handleCleanUpBetSelection={handleCleanUpBetSelection}
					ergoPayConnectedAddress={ergoPayConnectedAddress}
					ergAmount={ergAmount}
					cometAmount={cometAmount}
					sigusdAmount={sigusdAmount}
					cypxAmount={cypxAmount}
					handleNotEnoughInPot={handleNotEnoughInPot}
					handleNotEnoughFunds={handleNotEnoughFunds}
					egioAmount={egioAmount}
					fluxAmount={fluxAmount}
					epadAmount={epadAmount}
					paideiaAmount={paideiaAmount}
					bassAmount={bassAmount}
					ergoneAmount={ergoneAmount}
					loveAmount={loveAmount}
					greasycexAmount={greasycexAmount}
					pepergAmount={pepergAmount}
					boberAmount={boberAmount}
					gifAmount={gifAmount}
					setQRcode={setQRcode}
					setErrorPopUp={setErrorPopUp}
					setRefreshPotFromResult={setRefreshPotFromResult}
				/>
			),
		},
		{
			path: "game/russianroulette",
			element: (
				<RussianRoulette
					connectedAddress={connectedAddress}
					ergoPayChoosen={ergoPayChoosen}
					setInsideGame={setInsideGame}
					selectedBet={selectedBet}
					betStarted={betStarted}
					resultPopUp={resultPopUp}
					selectedCoin={selectedCoin}
					placeBet={placeBetAux}
					setResultPopUp={setResultPopUp}
					setBetStarted={setBetStarted}
					ergoWallet={ergoWallet}
					setNautilusLoading={setNautilusLoading}
					setWinningBetInfo={setWinningBetInfo}
					setBackendReachable2={setBackendReachable2}
					handleBackNotAvailable={handleBackNotAvailable}
					playLossSound={playLossSound}
					playCrowdSound={playCrowdSound}
					handleCleanUpBetSelection={handleCleanUpBetSelection}
					ergoPayConnectedAddress={ergoPayConnectedAddress}
					setQRcode={setQRcode}
					ergAmount={ergAmount}
					cometAmount={cometAmount}
					sigusdAmount={sigusdAmount}
					cypxAmount={cypxAmount}
					handleNotEnoughInPot={handleNotEnoughInPot}
					handleNotEnoughFunds={handleNotEnoughFunds}
					egioAmount={egioAmount}
					fluxAmount={fluxAmount}
					epadAmount={epadAmount}
					paideiaAmount={paideiaAmount}
					bassAmount={bassAmount}
					ergoneAmount={ergoneAmount}
					loveAmount={loveAmount}
					greasycexAmount={greasycexAmount}
					pepergAmount={pepergAmount}
					boberAmount={boberAmount}
					gifAmount={gifAmount}
					setErrorPopUp={setErrorPopUp}
					setRefreshPotFromResult={setRefreshPotFromResult}
				/>
			),
		},
		{
			path: "game/diceroll",
			element: (
				<DiceRoll
					connectedAddress={connectedAddress}
					ergoPayChoosen={ergoPayChoosen}
					setInsideGame={setInsideGame}
					selectedBet={selectedBet}
					betStarted={betStarted}
					resultPopUp={resultPopUp}
					selectedCoin={selectedCoin}
					placeBet={placeBetAux}
					setResultPopUp={setResultPopUp}
					setBetStarted={setBetStarted}
					ergoWallet={ergoWallet}
					setNautilusLoading={setNautilusLoading}
					setWinningBetInfo={setWinningBetInfo}
					setBackendReachable2={setBackendReachable2}
					handleBackNotAvailable={handleBackNotAvailable}
					playLossSound={playLossSound}
					playCrowdSound={playCrowdSound}
					handleCleanUpBetSelection={handleCleanUpBetSelection}
					ergoPayConnectedAddress={ergoPayConnectedAddress}
					setQRcode={setQRcode}
					ergAmount={ergAmount}
					cometAmount={cometAmount}
					sigusdAmount={sigusdAmount}
					cypxAmount={cypxAmount}
					handleNotEnoughInPot={handleNotEnoughInPot}
					handleNotEnoughFunds={handleNotEnoughFunds}
					egioAmount={egioAmount}
					fluxAmount={fluxAmount}
					epadAmount={epadAmount}
					paideiaAmount={paideiaAmount}
					bassAmount={bassAmount}
					ergoneAmount={ergoneAmount}
					loveAmount={loveAmount}
					greasycexAmount={greasycexAmount}
					pepergAmount={pepergAmount}
					boberAmount={boberAmount}
					gifAmount={gifAmount}
					setErrorPopUp={setErrorPopUp}
					setRefreshPotFromResult={setRefreshPotFromResult}
				/>
			),
		},
		{
			path: "game/onetoten",
			element: (
				<OneToTen
					connectedAddress={connectedAddress}
					ergoPayChoosen={ergoPayChoosen}
					setInsideGame={setInsideGame}
					selectedBet={selectedBet}
					betStarted={betStarted}
					resultPopUp={resultPopUp}
					selectedCoin={selectedCoin}
					placeBet={placeBetAux}
					setResultPopUp={setResultPopUp}
					setBetStarted={setBetStarted}
					ergoWallet={ergoWallet}
					setNautilusLoading={setNautilusLoading}
					setWinningBetInfo={setWinningBetInfo}
					setBackendReachable2={setBackendReachable2}
					handleBackNotAvailable={handleBackNotAvailable}
					playLossSound={playLossSound}
					playCrowdSound={playCrowdSound}
					handleCleanUpBetSelection={handleCleanUpBetSelection}
					ergoPayConnectedAddress={ergoPayConnectedAddress}
					setQRcode={setQRcode}
					ergAmount={ergAmount}
					cometAmount={cometAmount}
					sigusdAmount={sigusdAmount}
					cypxAmount={cypxAmount}
					handleNotEnoughInPot={handleNotEnoughInPot}
					handleNotEnoughFunds={handleNotEnoughFunds}
					egioAmount={egioAmount}
					fluxAmount={fluxAmount}
					epadAmount={epadAmount}
					paideiaAmount={paideiaAmount}
					bassAmount={bassAmount}
					ergoneAmount={ergoneAmount}
					loveAmount={loveAmount}
					greasycexAmount={greasycexAmount}
					pepergAmount={pepergAmount}
					boberAmount={boberAmount}
					gifAmount={gifAmount}
					setErrorPopUp={setErrorPopUp}
					setRefreshPotFromResult={setRefreshPotFromResult}
				/>
			),
		},
		{
			path: "game/roulette",
			element: (
				<Roulette
					connectedAddress={connectedAddress}
					ergoPayChoosen={ergoPayChoosen}
					setInsideGame={setInsideGame}
					selectedBet={selectedBet}
					betStarted={betStarted}
					resultPopUp={resultPopUp}
					selectedCoin={selectedCoin}
					placeBet={placeBetAux}
					setResultPopUp={setResultPopUp}
					setBetStarted={setBetStarted}
					ergoWallet={ergoWallet}
					setNautilusLoading={setNautilusLoading}
					setWinningBetInfo={setWinningBetInfo}
					setBackendReachable2={setBackendReachable2}
					handleBackNotAvailable={handleBackNotAvailable}
					playLossSound={playLossSound}
					playCrowdSound={playCrowdSound}
					handleCleanUpBetSelection={handleCleanUpBetSelection}
					ergoPayConnectedAddress={ergoPayConnectedAddress}
					totalBet={totalRouletteBet}
					setTotalBet={setTotalRouletteBet}
					setQRcode={setQRcode}
					ergAmount={ergAmount}
					cometAmount={cometAmount}
					sigusdAmount={sigusdAmount}
					cypxAmount={cypxAmount}
					handleNotEnoughInPot={handleNotEnoughInPot}
					handleNotEnoughFunds={handleNotEnoughFunds}
					egioAmount={egioAmount}
					fluxAmount={fluxAmount}
					epadAmount={epadAmount}
					paideiaAmount={paideiaAmount}
					bassAmount={bassAmount}
					ergoneAmount={ergoneAmount}
					loveAmount={loveAmount}
					greasycexAmount={greasycexAmount}
					pepergAmount={pepergAmount}
					boberAmount={boberAmount}
					gifAmount={gifAmount}
					setErrorPopUp={setErrorPopUp}
					setRefreshPotFromResult={setRefreshPotFromResult}
				/>
			),
		},
		{
			path: "game/plinko",
			element: (
				<Plinko
					connectedAddress={connectedAddress}
					ergoPayConnectedAddress={ergoPayConnectedAddress}
					setSelectedRisk={setSelectedRisk}
					selectedRisk={selectedRisk}
					setInsideGame={setInsideGame}
					selectedBet={selectedBet}
					selectedCoin={selectedCoin}
					// betStarted={betStarted}
					// resultPopUp={resultPopUp}
					// placeBet={placeBetAux}
					// setResultPopUp={setResultPopUp}
					setBetStarted={setBetStarted}
					ergoWallet={ergoWallet}
					setNautilusLoading={setNautilusLoading}
					// setWinningBetInfo={setWinningBetInfo}
					// setBackendReachable2={setBackendReachable2}
					// handleBackNotAvailable={handleBackNotAvailable}
					// playLossSound={playLossSound}
					// playCrowdSound={playCrowdSound}
					// handleCleanUpBetSelection={handleCleanUpBetSelection}
					// ergoPayConnectedAddress={ergoPayConnectedAddress}
					// totalBet={totalRouletteBet}
					// setTotalBet={setTotalRouletteBet}
					// setQRcode={setQRcode}
					startPlay={startPlay}
					// handleNotEnoughInPot={handleNotEnoughInPot}
					// handleNotEnoughFunds={handleNotEnoughFunds}
					setErrorPopUp={setErrorPopUp}
					setRefreshPotFromResult={setRefreshPotFromResult}
				/>
			),
		},
		{
			path: "gambling-help",
			element: <GamblingHelp />,
		},
		{
			path: "address-name",
			element: (
				<AddressName
					ergoWallet={ergoWallet}
					connectedAddress={connectedAddress}
					ergoPayConnectedAddress={ergoPayConnectedAddress}
					isThereEnoughInPot={isThereEnoughInPot}
					setNautilusLoading={setNautilusLoading}
					setBetStarted={setBetStarted}
					handleNotEnoughInPot={handleNotEnoughInPot}
					handleNotEnoughFunds={handleNotEnoughFunds}
				/>
			),
		},
	]);

	const crowd = new Audio(crowdSound);
	const loss = new Audio(lossSound);
	loss.volume = 0.2;
	crowd.volume = 0.2;

	function handleFaceSelected(face) {
		setFaceSelected(face);
	}

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

	async function buildTransaction() {
		if (ergoWallet && connectedAddress) {
			axios
				.get("https://ergflip-backend-production.up.railway.app/backendReachable", {
					timeout: 30000,
				})
				.then(async ({ data }) => {
					const creationHeight = await ergoWallet.get_current_height();
					const utxos = await ergoWallet.get_utxos();
					setFaceSelectedAux(faceSelected.slice());
					const faceSelectedAuxConstant = faceSelected.slice();
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
						setFaceResolvedAfterBet(null);
						setTxIdOfCurrentBet(signedTx.id);
						setBetStarted("pot");
						axios
							.post(
								apiURI,
								{
									txId: signedTx.id,
									bettorAddress: connectedAddress,
									tokenId: tokens[`${selectedCoin}`],
									multiplier: 2,
									amount: selectedBet,
								},
								{ timeout: 1000000 }
							)
							.then(({ data }) => {
								if (data === "") handleBackendError();
								if (data.txId === "not_enough") handleNotEnoughInPot();
								else if (data.result) {
									setFaceResolvedAfterBet(faceSelectedAuxConstant);
									setTimeout(() => {
										crowd.play();
										setBetStarted(false);
										setResultPopUp("win");
										setWinningBetInfo(data);
										setRefreshPotFromResult(true);
									}, 6000);
								} else {
									setFaceResolvedAfterBet(faceSelectedAuxConstant == "heads" ? "tails" : "heads");
									setTimeout(() => {
										loss.play();
										setBetStarted(false);
										setResultPopUp("loss");
										setRefreshPotFromResult(true);
									}, 6000);
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

	function handleCleanUpBetSelection() {
		setSelectedBet(null);
		setSelectedCoin(null);
	}

	function handleBackNotAvailable() {
		setNautilusLoading(false);
		setBackendReachable(false);
		setTimeout(() => {
			setBackendReachable(true);
		}, 6000);
	}

	function handleNotEnoughFunds() {
		setNautilusLoading(false);
		setNotEnoughFundsError(true);
		setTimeout(() => {
			setNotEnoughFundsError(false);
		}, 6000);
	}

	function handleNotEnoughInPot() {
		setBetStarted(false);
		setNotEnoughInPotError(true);
		setTimeout(() => {
			setNotEnoughInPotError(false);
		}, 6000);
	}

	function handleBackendError() {
		setBetStarted(false);
		setBackendError(true);
		setTimeout(() => {
			setBackendError(false);
		}, 6000);
	}

	function playLossSound() {
		loss.play();
	}

	function playCrowdSound() {
		crowd.play();
	}

	function placeBetAux() {
		if (ergoPayChoosen) {
			setQRcode(true);
		} else {
			setNautilusLoading(true);
		}
	}

	function placeBet() {
		if (ergoPayChoosen) {
			setQRcode(true);
		} else {
			setNautilusLoading(true);
			buildTransaction();
		}
	}

	function handleErgoPayAddressSubmitted() {
		localStorage.setItem("ergoPayAddress", ergoPayConnectedAddress);
		localStorage.removeItem("walletAddress");
		setErgoPayConnectedAddressSubmitted(true);
	}

	function handleQRCodeLinkClicked() {
		setQRcode(false);
		setNoAnimationNotification(true);
		setErgoPayConnectedAddressSubmitted(false);
	}

	function handleQRCodeClosed() {
		setQRcode(false);
		setErgoPayConnectedAddressSubmitted(false);
	}

	function rouletteAmountGivenCoin(coin) {
		switch (coin) {
			case "ERG":
				return BigInt(totalRouletteBet * 100) * 10000000n;
			case "SigUSD":
				return BigInt(totalRouletteBet * 100) * 1n;
			case "COMET":
				return BigInt(totalRouletteBet);
			case "CYPX":
				return BigInt(totalRouletteBet) * 10000n;
			case "EGIO":
				return BigInt(totalRouletteBet * 10000);
			case "FLUX":
				return BigInt(totalRouletteBet * 100000000);
			case "EPAD":
				return BigInt(totalRouletteBet * 100);
			case "PAIDEIA":
				return BigInt(totalRouletteBet * 10000);
			case "BASS":
				return BigInt(totalRouletteBet * 10000000);
			case "ERGONE":
				return BigInt(totalRouletteBet * 100000000);
			case "LOVE":
				return BigInt(totalRouletteBet);
			case "GREASYCEX":
				return BigInt(totalRouletteBet);
			case "PEPERG":
				return BigInt(totalRouletteBet);
			case "BOBER":
				return BigInt(totalRouletteBet * 1000);
			case "GIF":
				return BigInt(totalRouletteBet * 1000000);
			default:
				return BigInt(totalRouletteBet);
		}
	}

	function fromSelectedCoinToPotAmount() {
		switch (selectedCoin) {
			case "SigUSD":
				return sigusdAmount;
			case "COMET":
				return cometAmount;
			case "CYPX":
				return cypxAmount;
			case "ERG":
				return ergAmount;
			case "EGIO":
				return egioAmount;
			case "FLUX":
				return fluxAmount;
			case "EPAD":
				return epadAmount;
			case "PAIDEIA":
				return paideiaAmount;
			case "BASS":
				return bassAmount;
			case "ERGONE":
				return ergoneAmount;
			case "LOVE":
				return loveAmount;
			case "GREASYCEX":
				return greasycexAmount;
			case "PEPERG":
				return pepergAmount;
			case "BOBER":
				return boberAmount;
			case "GIF":
				return gifAmount;
			default:
				return 0;
		}
	}

	function getErgopaySrc() {
		if (insideGame === "roulette") {
			if (fromSelectedCoinToPotAmount() >= totalRouletteBet) {
				return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=ergopay://ergflip-backend-production.up.railway.app/roundRouletteTripPot/${ergoPayConnectedAddress}/${rouletteAmountGivenCoin(
					selectedCoin
				)}/${tokens[`${selectedCoin}`]}`;
			} else
				return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=ergopay://ergflip-backend-production.up.railway.app/roundTripRoulette/${ergoPayConnectedAddress}/${rouletteAmountGivenCoin(
					selectedCoin
				)}/${tokens[`${selectedCoin}`]}`;
		}
		if (selectedCoin === "ERG") {
			if (ergAmount >= fromLongToActualCurrencyValue(selectedBet, selectedCoin)) {
				return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=ergopay://ergflip-backend-production.up.railway.app/roundTripPot/${ergoPayConnectedAddress}/${BigInt(
					selectedBet
				)}/${fromGameToMultiplier(insideGame)}/${insideGame}`;
			} else
				return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=ergopay://ergflip-backend-production.up.railway.app/roundTrip/${ergoPayConnectedAddress}/${BigInt(
					selectedBet
				)}/${fromGameToMultiplier(insideGame)}/${insideGame}`;
		} else if (fromSelectedCoinToPotAmount() >= fromLongToActualCurrencyValue(selectedBet, selectedCoin)) {
			return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=ergopay://ergflip-backend-production.up.railway.app/roundTripPot/${ergoPayConnectedAddress}/${BigInt(
				selectedBet
			)}/${tokens[`${selectedCoin}`]}/${fromGameToMultiplier(insideGame)}/${insideGame}`;
		} else {
			return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=ergopay://ergflip-backend-production.up.railway.app/roundTrip/${ergoPayConnectedAddress}/${BigInt(
				selectedBet
			)}/${tokens[`${selectedCoin}`]}/${fromGameToMultiplier(insideGame)}/${insideGame}`;
		}
	}

	function getErgopayHref() {
		if (insideGame === "roulette") {
			if (fromSelectedCoinToPotAmount() >= totalRouletteBet) {
				return `ergopay://ergflip-backend-production.up.railway.app/roundRouletteTripPot/${ergoPayConnectedAddress}/${rouletteAmountGivenCoin(
					selectedCoin
				)}/${tokens[`${selectedCoin}`]}`;
			} else
				return `ergopay://ergflip-backend-production.up.railway.app/roundTripRoulette/${ergoPayConnectedAddress}/${rouletteAmountGivenCoin(
					selectedCoin
				)}/${tokens[`${selectedCoin}`]}`;
		}
		if (selectedCoin === "ERG") {
			if (ergAmount >= fromLongToActualCurrencyValue(selectedBet, selectedCoin)) {
				return `ergopay://ergflip-backend-production.up.railway.app/roundTripPot/${ergoPayConnectedAddress}/${BigInt(
					selectedBet
				)}/${fromGameToMultiplier(insideGame)}/${insideGame}`;
			} else
				return `ergopay://ergflip-backend-production.up.railway.app/roundTrip/${ergoPayConnectedAddress}/${BigInt(
					selectedBet
				)}/${fromGameToMultiplier(insideGame)}/${insideGame}`;
		} else if (fromSelectedCoinToPotAmount() >= fromLongToActualCurrencyValue(selectedBet, selectedCoin)) {
			return `ergopay://ergflip-backend-production.up.railway.app/roundTripPot/${ergoPayConnectedAddress}/${BigInt(
				selectedBet
			)}/${tokens[`${selectedCoin}`]}/${fromGameToMultiplier(insideGame)}/${insideGame}`;
		} else {
			return `ergopay://ergflip-backend-production.up.railway.app/roundTrip/${ergoPayConnectedAddress}/${BigInt(
				selectedBet
			)}/${tokens[`${selectedCoin}`]}/${fromGameToMultiplier(insideGame)}/${insideGame}`;
		}
	}

	function handleStartingAplay() {
		setBetStarted("pot");
		setErgoPayTransaction([]);
	}

	return (
		<div className="App">
			<Navbar
				connectedAddress={connectedAddress}
				setConnectedAddress={setConnectedAddress}
				ergoWallet={ergoWallet}
				setErgoWallet={setErgoWallet}
				ergoPayChoosen={ergoPayChoosen}
				setErgoPayChoosen={setErgoPayChoosen}
				setSelectErgopayAddressModal={setSelectErgopayAddressModal}
				setErgoPayConnectedAddress={setErgoPayConnectedAddress}
				ergoPayConnectedAddress={ergoPayConnectedAddress}
			/>
			<div className="main-content-wrapper" style={insideGame ? null : { height: "auto", marginBottom: 80 }}>
				<StartNotifications />
				{resultPopUp === "win" && (
					<div style={{ zIndex: 3 }}>
						<Confetti numberOfPieces={50} />
					</div>
				)}
				{selectErgopayAddressModal && (
					<ErgopayAddress
						show={selectErgopayAddressModal}
						setShow={setSelectErgopayAddressModal}
						ergoPayConnectedAddress={ergoPayConnectedAddress}
						setErgoPayConnectedAddress={setErgoPayConnectedAddress}
						setErgopayChoosen={setErgoPayChoosen}
					/>
				)}
				{ergoPayTransaction.length != 0 && (
					<ErgoPayTransaction
						setModal={setErgoPayTransaction}
						ergopayHref={ergoPayTransaction[0]}
						ergopaySrc={ergoPayTransaction[1]}
						setBetStarted={setBetStarted}
						setOnClick1={handleStartingAplay}
					/>
				)}
				<ErrorPopUp errorPopUp={errorPopUp} setErrorPopUp={setErrorPopUp} />
				{resultPopUp === "win" && (
					<ResultModal
						connectedAddress={connectedAddress}
						ergopayConnectedAddress={ergoPayConnectedAddress}
						setResultPopUp={setResultPopUp}
						setWinningBetInfo={setWinningBetInfo}
						winningBetInfo={winningBetInfo}
						setRefreshPotFromResult={setRefreshPotFromResult}
						potFundsLoading={potFundsLoading}
					/>
				)}
				{resultPopUp === "loss" && <LossModal setResultPopUp={setResultPopUp} />}
				{firstTimeHoveringPot && showFirstTimeHoveringPot && (
					<FirstTimeHoveringPot setFirstTimeHoveringPot={setFirstTimeHoveringPot} />
				)}
				<FixedPotInfo
					ergAmount={ergAmount}
					cometAmount={cometAmount}
					cypxAmount={cypxAmount}
					sigusdAmount={sigusdAmount}
					egioAmount={egioAmount}
					fluxAmount={fluxAmount}
					epadAmount={epadAmount}
					paideiaAmount={paideiaAmount}
					bassAmount={bassAmount}
					ergoneAmount={ergoneAmount}
					loveAmount={loveAmount}
					greasycexAmount={greasycexAmount}
					pepergAmount={pepergAmount}
					boberAmount={boberAmount}
					gifAmount={gifAmount}
					setErgAmount={setErgAmount}
					setCometAmount={setCometAmount}
					setCypxAmount={setCypxAmount}
					setSigusdAmount={setSigusdAmount}
					setEgioAmount={setEgioAmount}
					setFluxAmount={setFluxAmount}
					setEpadAmount={setEpadAmount}
					setPaideiaAmount={setPaideiaAmount}
					setBassAmount={setBassAmount}
					setErgoneAmount={setErgoneAmount}
					setLoveAmount={setLoveAmount}
					setGreasycexAmount={setGreasycexAmount}
					setPepergAmount={setPepergAmount}
					setBoberAmount={setBoberAmount}
					setGifAmount={setGifAmount}
					requestCurrentPotFunds={requestCurrentPotFunds}
					show={showExtendedFixed}
					setShow={setShowExtendedFixed}
					setShowFirstTimeHoveringPot={setShowFirstTimeHoveringPot}
					connectedAddress={connectedAddress}
					ergoPayConnectedAddress={ergoPayConnectedAddress}
					refreshPotFromResult={refreshPotFromResult}
					setRefreshPotFromResult={setRefreshPotFromResult}
					potFundsLoading={potFundsLoading}
				/>
				{!backendReachable && (
					<div className="backend-unreachable">
						<span>
							Backend unreachable. There might be many people playing or Ergo Node is down, be patient. If the error
							persists please contact me through my socials.
						</span>
					</div>
				)}
				{notEnoughFundsError && (
					<div className="backend-unreachable" style={{ width: "fit-content" }}>
						<span>Not enough funds to place the bet.</span>
					</div>
				)}
				{backendError && (
					<div className="backend-unreachable" style={{ width: "fit-content" }}>
						<span>
							There was an error detecting the transaction, the play did not happen, your funds did not change
						</span>
					</div>
				)}
				{notEnoughInPotError && (
					<div className="backend-unreachable">
						<span>
							Looks like you didn't have enough balance in the speed pot.
							<br></br>You may want to refresh your pot funds at your screen's bottom left corner.
							<br></br>If this is a mistake please contact me through my socials.
						</span>
					</div>
				)}
				{!backendReachable2 && (
					<div className="backend-unreachable-two">
						<span>
							Looks like blockchain is taking longer than expected to confirm the tx, however backend received the bet,
							flipping animation will be stopped, but you will receive your winning ERGs if it is indeed a winning bet.
							I suggest you to not play again until your last bet has been confirmed.{" "}
							<a
								target="_blank"
								rel="noreferrer"
								href={`https://explorer.ergoplatform.com/addresses/${connectedAddress}`}
							>
								Click here to see your wallet's latest transactions
							</a>
						</span>
						<img
							src={closeIcon}
							width={40}
							onClick={() => setBackendReachable2(true)}
							style={{ cursor: "pointer" }}
						></img>
					</div>
				)}
				<div className={betStarted ? "blockchain-loading-notification active" : "blockchain-loading-notification"}>
					<div className="notification-text">
						<div>
							Transaction is being confirmed, be patient.<br></br>
							{betStarted === "normal" && (
								<span>
									For faster results click{" "}
									<a href="https://grandgambit.io/pot" target="_blank" rel="noreferrer">
										here
									</a>
								</span>
							)}
						</div>
						<Oval height="30" width="30" radius="9" strokeWidth={5} color="#91e1f9" secondaryColor="black" />
					</div>
					<a
						target="_blank"
						rel="noreferrer"
						href={`https://explorer.ergoplatform.com/addresses/${connectedAddress}`}
						className="result-transactions-a"
					>
						<div className="result-transactions-div">Transactions</div>
					</a>
				</div>
				{nautilusLoading && (
					<div className="nautilus-loading">
						<Oval height="60" width="60" radius="9" strokeWidth={5} color="#91e1f9" secondaryColor="black" />
					</div>
				)}
				{QRcode && (
					<div className="qrcode-wrapper">
						<img src={closeIcon} id="close-icon" onClick={() => handleQRCodeClosed()} />
						<label htmlFor="ergoPayAddress">ErgoWallet address:</label>
						<input
							type="text"
							id="ergoPayAddress"
							name="ergoPayAddress"
							required
							minLength="51"
							maxLength="51"
							onChange={(e) => setErgoPayConnectedAddress(e.target.value)}
							value={ergoPayConnectedAddress}
						/>
						<div
							style={
								ergoPayConnectedAddress.length == 51 && !ergoPayConnectedAddressSubmitted
									? null
									: {
											backgroundColor: "#828a8a",
											opacity: "0.5",
											cursor: "not-allowed",
											pointerEvents: "none",
									  }
							}
							id="submit-button"
							onClick={() => handleErgoPayAddressSubmitted()}
						>
							Submit
						</div>
						{ergoPayConnectedAddressSubmitted ? (
							<>
								<img src={getErgopaySrc()} />
								<a onClick={() => handleQRCodeLinkClicked()} href={getErgopayHref()} style={{ fontSize: "1.2em" }}>
									Click here to launch Ergo Wallet
								</a>
							</>
						) : (
							<span style={{ fontWeight: "bold", fontSize: "1.3em" }}>
								Once there is a valid address and submit is pressed, a QR code will be shown
							</span>
						)}
					</div>
				)}
				{/* <WelcomeModal /> */}

				{insideGame && (
					<BetAmount
						setSelectedBet={setSelectedBet}
						setSelectedCoin={setSelectedCoin}
						selectedCoin={selectedCoin}
						insideGame={insideGame}
						selectedRisk={selectedRisk}
						selectedBet={selectedBet}
					/>
				)}

				<RouterProvider router={router} />
			</div>
			{!insideGame && <WinnersTable backendReachable={backendReachable} />}
		</div>
	);

	// return (
	// 	<div className="maintenance">
	// 		Maintenance
	// 		<img src={gamblina} />
	// 		Try again soon!
	// 	</div>
	// );
}

export default App;
