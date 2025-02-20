/* global BigInt */
import "./Pot.css";
import ergIcon from "../../assets/ergo-icon-white.png";
import cometIcon from "../../assets/cometIcon.png";
import sigusdIcon from "../../assets/SigUSD.svg";
import cypxIcon from "../../assets/cypxIcon.svg";
import egioIcon from "../../assets/egioIcon.svg";
import fluxIcon from "../../assets/fluxIcon.svg";
import ergopadIcon from "../../assets/ergopadIcon.svg";
import paideiaIcon from "../../assets/paideiaIcon.svg";
import bassIcon from "../../assets/bassIcon.png";
import ergoneIcon from "../../assets/ergoneIcon.png";
import loveIcon from "../../assets/loveIcon.png";
import greasycexIcon from "../../assets/greasycexIcon.png";
import pepergIcon from "../../assets/pepergIcon.png";
import boberIcon from "../../assets/boberIcon.png";
import gifIcon from "../../assets/gifIcon.png";

import { useState } from "react";
import PotModal from "../../components/modals/PotModal/PotModal";
import axios from "axios";
import { addresses, fromLongToActualCurrencyValue } from "../../components/utils";
import { TransactionBuilder, OutputBuilder, InsufficientInputs } from "@fleet-sdk/core";
import { tokens, fromActualCurrencyValueToLong } from "../../components/utils";
import { Triangle } from "react-loader-spinner";
import { useSubscription } from "react-stomp-hooks";
import PotErrorModal from "../../components/modals/PotErrorModal/PotErrorModal";
// import PotDepositInfo from "../../components/modals/PotDepositInfo/PotDepositInfo";

const Pot = ({
	ergoWallet,
	connectedAddress,
	ergoPayConnectedAddress,
	setNautilusLoading,
	handleBackNotAvailable,
	ergAmount,
	cometAmount,
	sigusdAmount,
	cypxAmount,
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
	setErgAmount,
	setCometAmount,
	setSigusdAmount,
	setCypxAmount,
	setEgioAmount,
	setFluxAmount,
	setEpadAmount,
	setPaideiaAmount,
	setBassAmount,
	setErgoneAmount,
	setLoveAmount,
	setGreasycexAmount,
	setPepergAmount,
	setBoberAmount,
	setGifAmount,
	potFundsLoading,
	setPotFundsLoading,
	handleNotEnoughFunds,
}) => {
	const [potModal, setPotModal] = useState(false);
	const [potErrorModal, setPotErrorModal] = useState(false);

	function getWalletAddress() {
		if (ergoPayConnectedAddress) return ergoPayConnectedAddress;
		else if (connectedAddress) return connectedAddress;
		else return "";
	}

	useSubscription(`/user/${getWalletAddress()}/pot_action`, ({ body }) => {
		const obj = JSON.parse(body);
		if (obj) {
			setCometAmount(fromLongToActualCurrencyValue(obj.comet_amount, "COMET"));
			setErgAmount(fromLongToActualCurrencyValue(obj.erg_amount, "ERG"));
			setSigusdAmount(fromLongToActualCurrencyValue(obj.sigusd_Amount, "SigUSD"));
			setCypxAmount(fromLongToActualCurrencyValue(obj.cypx_amount, "CYPX"));
			setEgioAmount(fromLongToActualCurrencyValue(obj.egio_amount, "EGIO"));
			setFluxAmount(fromLongToActualCurrencyValue(obj.flux_amount, "FLUX"));
			setEpadAmount(fromLongToActualCurrencyValue(obj.epad_amount, "EPAD"));
			setPaideiaAmount(fromLongToActualCurrencyValue(obj.paideia_amount, "PAIDEIA"));
			setBassAmount(fromLongToActualCurrencyValue(obj.bass_amount, "BASS"));
			setErgoneAmount(fromLongToActualCurrencyValue(obj.ergone_amount, "ERGONE"));
			setLoveAmount(fromLongToActualCurrencyValue(obj.love_amount, "LOVE"));
			setGreasycexAmount(fromLongToActualCurrencyValue(obj.greasycex_amount, "GREASYCEX"));
			setPepergAmount(fromLongToActualCurrencyValue(obj.peperg_amount, "PEPERG"));
			setBoberAmount(fromLongToActualCurrencyValue(obj.bober_amount, "BOBER"));
			setGifAmount(fromLongToActualCurrencyValue(obj.gif_amount, "GIF"));
			setPotFundsLoading(false);
		} else {
			triggerErrorModal();
		}
	});

	function triggerErrorModal() {
		setPotFundsLoading(false);
		setPotErrorModal(true);
	}

	const tokensDisplayed = [
		{ img: ergIcon, name: "ERG", amount: ergAmount },
		{ img: pepergIcon, name: "PEPERG", amount: pepergAmount },
		{ img: boberIcon, name: "BOBER", amount: boberAmount },
		{ img: gifIcon, name: "GIF", amount: gifAmount },
		{ img: cometIcon, name: "COMET", amount: cometAmount },
		{ img: sigusdIcon, name: "SigUSD", amount: sigusdAmount },
		{ img: cypxIcon, name: "CYPX", amount: cypxAmount },
		{ img: egioIcon, name: "EGIO", amount: egioAmount },
		{ img: fluxIcon, name: "FLUX", amount: fluxAmount },
		{ img: ergopadIcon, name: "ErgoPad", amount: epadAmount },
		{ img: paideiaIcon, name: "Paideia", amount: paideiaAmount },
		{ img: bassIcon, name: "BASS", amount: bassAmount },
		{ img: ergoneIcon, name: "ERGONE", amount: ergoneAmount },
		// { img: loveIcon, name: "LOVE", amount: loveAmount },
		{ img: greasycexIcon, name: "GREASYCEX", amount: greasycexAmount },
	];
	function ergsToDeposit(ergAmount) {
		if (ergAmount > 0) {
			return BigInt(ergAmount * 1000000000);
		} else return 1000000n;
	}

	function cleanAllBalances() {
		setPotFundsLoading(false);
		setErgAmount(0);
		setCometAmount(0);
		setSigusdAmount(0);
		setCypxAmount(0);
		setEgioAmount(0);
		setFluxAmount(0);
		setEpadAmount(0);
		setPaideiaAmount(0);
		setBassAmount(0);
		setErgoneAmount(0);
		setLoveAmount(0);
		setGreasycexAmount(0);
		setPepergAmount(0);
		setBoberAmount(0);
		setGifAmount(0);
	}

	function handleFundsRedeemed() {
		setPotFundsLoading(true);
	}

	function handleSubmitDeposit(
		ergAmount,
		cometAmount,
		sigusdAmount,
		cypxAmount,
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
		gifAmount
	) {
		if (ergoWallet && connectedAddress) {
			setNautilusLoading(true);

			axios
				.get("https://ergflip-backend-production.up.railway.app/backendReachable", {
					timeout: 30000,
				})
				.then(async ({ data }) => {
					const creationHeight = await ergoWallet.get_current_height();
					const utxos = await ergoWallet.get_utxos();
					const addressToSend = addresses[data - 1];
					const apiURI = "https://ergflip-backend-production.up.railway.app/addToUserPot";
					const tokensToAdd = [];

					if (cypxAmount > 0) {
						tokensToAdd.push({
							tokenId: tokens.CYPX,
							amount: BigInt(fromActualCurrencyValueToLong(cypxAmount, "CYPX")),
						});
					}
					if (cometAmount > 0) {
						tokensToAdd.push({
							tokenId: tokens.COMET,
							amount: BigInt(fromActualCurrencyValueToLong(cometAmount, "COMET")),
						});
					}
					if (sigusdAmount > 0) {
						tokensToAdd.push({
							tokenId: tokens.SigUSD,
							amount: BigInt(fromActualCurrencyValueToLong(sigusdAmount, "SigUSD")),
						});
					}
					if (egioAmount > 0) {
						tokensToAdd.push({
							tokenId: tokens.EGIO,
							amount: BigInt(fromActualCurrencyValueToLong(egioAmount, "EGIO")),
						});
					}
					if (fluxAmount > 0) {
						tokensToAdd.push({
							tokenId: tokens.FLUX,
							amount: BigInt(fromActualCurrencyValueToLong(fluxAmount, "FLUX")),
						});
					}
					if (epadAmount > 0) {
						tokensToAdd.push({
							tokenId: tokens.EPAD,
							amount: BigInt(fromActualCurrencyValueToLong(epadAmount, "EPAD")),
						});
					}
					if (paideiaAmount > 0) {
						tokensToAdd.push({
							tokenId: tokens.PAIDEIA,
							amount: BigInt(fromActualCurrencyValueToLong(paideiaAmount, "PAIDEIA")),
						});
					}
					if (bassAmount > 0) {
						tokensToAdd.push({
							tokenId: tokens.BASS,
							amount: BigInt(fromActualCurrencyValueToLong(bassAmount, "BASS")),
						});
					}
					if (ergoneAmount > 0) {
						tokensToAdd.push({
							tokenId: tokens.ERGONE,
							amount: BigInt(fromActualCurrencyValueToLong(ergoneAmount, "ERGONE")),
						});
					}
					if (loveAmount > 0) {
						tokensToAdd.push({
							tokenId: tokens.LOVE,
							amount: BigInt(fromActualCurrencyValueToLong(loveAmount, "LOVE")),
						});
					}
					if (greasycexAmount > 0) {
						tokensToAdd.push({
							tokenId: tokens.GREASYCEX,
							amount: BigInt(fromActualCurrencyValueToLong(greasycexAmount, "GREASYCEX")),
						});
					}
					if (pepergAmount > 0) {
						tokensToAdd.push({
							tokenId: tokens.PEPERG,
							amount: BigInt(fromActualCurrencyValueToLong(pepergAmount, "PEPERG")),
						});
					}
					if (boberAmount > 0) {
						tokensToAdd.push({
							tokenId: tokens.BOBER,
							amount: BigInt(fromActualCurrencyValueToLong(boberAmount, "BOBER")),
						});
					}
					if (gifAmount > 0) {
						tokensToAdd.push({
							tokenId: tokens.GIF,
							amount: BigInt(fromActualCurrencyValueToLong(gifAmount, "GIF")),
						});
					}
					const unsignedTransaction = new TransactionBuilder(creationHeight)
						.from(utxos)
						.to(new OutputBuilder(ergsToDeposit(ergAmount), addressToSend).addTokens(tokensToAdd))
						.sendChangeTo(connectedAddress)
						.payMinFee()
						.build("EIP-12");
					setNautilusLoading(false);
					ergoWallet.sign_tx(unsignedTransaction).then((signedTx) => {
						setPotFundsLoading(true);
						ergoWallet.submit_tx(signedTx);
						axios
							.post(
								apiURI,
								{
									address: connectedAddress,
									erg_amount: ergsToDeposit(ergAmount).toString(),
									comet_amount: fromActualCurrencyValueToLong(cometAmount, "COMET"),
									sigusd_Amount: fromActualCurrencyValueToLong(sigusdAmount, "SigUSD"),
									cypx_amount: fromActualCurrencyValueToLong(cypxAmount, "CYPX"),
									egio_amount: fromActualCurrencyValueToLong(egioAmount, "EGIO"),
									flux_amount: fromActualCurrencyValueToLong(fluxAmount, "FLUX"),
									epad_amount: fromActualCurrencyValueToLong(epadAmount, "EPAD"),
									paideia_amount: fromActualCurrencyValueToLong(paideiaAmount, "PAIDEIA"),
									bass_amount: fromActualCurrencyValueToLong(bassAmount, "BASS"),
									ergone_amount: fromActualCurrencyValueToLong(ergoneAmount, "ERGONE"),
									love_amount: fromActualCurrencyValueToLong(loveAmount, "LOVE"),
									greasycex_amount: fromActualCurrencyValueToLong(greasycexAmount, "GREASYCEX"),
									peperg_amount: fromActualCurrencyValueToLong(pepergAmount, "PEPERG"),
									bober_amount: fromActualCurrencyValueToLong(boberAmount, "BOBER"),
									gif_amount: fromActualCurrencyValueToLong(gifAmount, "GIF"),
									latest_tx: signedTx.id,
								},
								{ timeout: 300000 }
							)
							.catch((error) => {
								if (!error.code === "ECONNABORTED") triggerErrorModal();
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

	function handleRedeemTokens() {
		if (ergoWallet && connectedAddress) {
			setNautilusLoading(true);
			axios
				.get("https://ergflip-backend-production.up.railway.app/backendReachable", {
					timeout: 30000,
				})
				.then(async ({ data }) => {
					const creationHeight = await ergoWallet.get_current_height();
					const utxos = await ergoWallet.get_utxos();
					const addressToSend = addresses[data - 1];

					const unsignedTransaction = new TransactionBuilder(creationHeight)
						.from(utxos)
						.to(new OutputBuilder(1000000n, addressToSend))
						.sendChangeTo(connectedAddress)
						.payMinFee()
						.build("EIP-12");
					setNautilusLoading(false);
					ergoWallet.sign_tx(unsignedTransaction).then((signedTx) => {
						handleFundsRedeemed();
						const apiURI = `https://ergflip-backend-production.up.railway.app/removeFromUserPot/${connectedAddress}/${signedTx.id}`;
						ergoWallet.submit_tx(signedTx);
						axios
							.post(apiURI, { timeout: 300000 })
							.then(({ data }) => {
								if (data) {
									cleanAllBalances();
								}
							})
							.catch(() => {
								triggerErrorModal();
							});
					});
				})
				.catch((e) => {
					console.log(e);
					handleBackNotAvailable();
				});
		}
	}

	return (
		<div className="pot-wrapper">
			<PotModal
				setPotModal={setPotModal}
				potModal={potModal}
				connectedAddress={connectedAddress}
				handleSubmitDeposit={handleSubmitDeposit}
				handleRedeemTokens={handleRedeemTokens}
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
				ergoPayConnectedAddress={ergoPayConnectedAddress}
				ergoWallet={ergoWallet}
				setPotFundsLoading={setPotFundsLoading}
			/>
			<PotErrorModal potErrorModal={potErrorModal} setPotErrorModal={setPotErrorModal} />
			{/* <PotDepositInfo
				potDepositLink={potDepositLink}
				setPotDepositLink={setPotDepositLink}
			/> */}
			{/* {addToPotErgopayModal && (
				<AddPotErgopay
					show={addToPotErgopayModal}
					setShow={setAddToPotErgopayModal}
					ergoPayConnectedAddress={ergoPayConnectedAddress}
					setErgoPayConnectedAddress={setErgoPayConnectedAddress}
				/>
			)} */}
			<div className="pot-holdings">
				<h1>Your current pot balance</h1>
				<div className="pot-holdings-amount">
					{tokensDisplayed.map((token, index) => {
						return (
							<div className="coin-pot" key={index}>
								<img
									src={token.img}
									className="coin-pot--img"
									style={token.name === "COMET" ? { height: "100%" } : null}
								/>
								<span className="coin-pot--amount">
									{token.name}:{" "}
									{!connectedAddress && !ergoPayConnectedAddress ? (
										<span
											style={{
												fontSize: "0.8em",
												color: "red",
												fontWeight: "500",
											}}
										>
											{" "}
											No Wallet
										</span>
									) : potFundsLoading ? (
										<Triangle
											height="45"
											width="60"
											radius="100"
											color="#2f73f0"
											ariaLabel="loading"
											wrapperStyle
											wrapperClass
										/>
									) : (
										token.amount
									)}
								</span>
							</div>
						);
					})}
				</div>
			</div>
			<div className="pot-explanation">
				<h1 className="pot-explanation--title">
					How does the <span style={{ color: "#91e1f9" }}>speed pot / deposits</span> work?
				</h1>
				<p className="pot-explanation--text">
					Transactions take 2+ minutes to be confirmed, which causes a bad user experience. The deposits fix that.
					<br></br>
					<br></br>
					Deposit amounts will be{" "}
					<span style={{ color: "#91e1f9", fontWeight: "600" }}>limited</span> to 100 ERG, 3M COMET, 25 SigUSD, 8000
					CYPX, 300k EGIO, 40 FLUX, 10k ErgoPad, 16k Paideia, 30 BASS, 100 ErgOne, 1M GreasyCex, 200k PEPERG and 50
					BOBER.{/* and 50 GIF.*/}
				</p>
			</div>
			<div className="pot-buttons">
				<div className={potFundsLoading ? "pot-button disabled" : "pot-button"} onClick={() => setPotModal("deposit")}>
					Deposit
				</div>
				<div className={potFundsLoading ? "pot-button disabled" : "pot-button"} onClick={() => setPotModal("redeem")}>
					Redeem
				</div>
			</div>
		</div>
	);
};

export default Pot;
