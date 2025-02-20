/* global BigInt */
import "./PotModal.css";
import ergIcon from "../../../assets/ergo-icon-white.png";
import cometIcon from "../../../assets/cometIcon.png";
import sigusdIcon from "../../../assets/SigUSD.svg";
import cypxIcon from "../../../assets/cypxIcon.svg";
import egioIcon from "../../../assets/egioIcon.svg";
import fluxIcon from "../../../assets/fluxIcon.svg";
import ergopadIcon from "../../../assets/ergopadIcon.svg";
import paideiaIcon from "../../../assets/paideiaIcon.svg";
import bassIcon from "../../../assets/bassIcon.png";
import ergoneIcon from "../../../assets/ergoneIcon.png";
import loveIcon from "../../../assets/loveIcon.png";
import greasycexIcon from "../../../assets/greasycexIcon.png";
import pepergIcon from "../../../assets/pepergIcon.png";
import boberIcon from "../../../assets/boberIcon.png";
import gifIcon from "../../../assets/gifIcon.png";

import { useState } from "react";
import { fromActualCurrencyValueToLong } from "../../utils";

const ERG_LIMIT = 1000;
const COMET_LIMIT = 3000000;
const SIGUSD_LIMIT = 25;
const CYPX_LIMIT = 8000;
const EGIO_LIMIT = 300000;
const FLUX_LIMIT = 40;
const EPAD_LIMIT = 10000;
const PAIDEIA_LIMIT = 16000;
const BASS_LIMIT = 300000000;
const ERGONE_LIMIT = 10000000000;
const LOVE_LIMIT = 15000;
const GREASYCEX_LIMIT = 1000000;
const PEPERG_LIMIT = 400000;
const BOBER_LIMIT = 50000;
const GIF_LIMIT = 400000000;

const PotModal = ({
	potModal,
	setPotModal,
	handleSubmitDeposit,
	handleRedeemTokens,
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
	ergoPayConnectedAddress,
	connectedAddress,
	ergoWallet,
	setPotFundsLoading,
}) => {
	const [ergModalAmount, setModalErgAmount] = useState(0);
	const [cometModalAmount, setModalCometAmount] = useState(0);
	const [sigusdModalAmount, setModalSigusdAmount] = useState(0);
	const [cypxModalAmount, setModalCypxAmount] = useState(0);
	const [egioModalAmount, setModalEgioAmount] = useState(0);
	const [fluxModalAmount, setModalFluxAmount] = useState(0);
	const [epadModalAmount, setModalEpadAmount] = useState(0);
	const [paideiaModalAmount, setModalPaideiaAmount] = useState(0);
	const [bassModalAmount, setModalBassAmount] = useState(0);
	const [ergoneModalAmount, setModalErgoneAmount] = useState(0);
	const [loveModalAmount, setModalLoveAmount] = useState(0);
	const [greasycexModalAmount, setModalGreasycexAmount] = useState(0);
	const [pepergModalAmount, setModalPepergAmount] = useState(0);
	const [boberModalAmount, setModalBoberAmount] = useState(0);
	const [gifModalAmount, setModalGifAmount] = useState(0);
	const [showQR, setShowQR] = useState(false);

	function handleConfirmPotDeposit() {
		if (connectedAddress && ergoWallet) {
			setPotModal(false);
			handleSubmitDeposit(
				ergModalAmount,
				cometModalAmount,
				sigusdModalAmount,
				cypxModalAmount,
				egioModalAmount,
				fluxModalAmount,
				epadModalAmount,
				paideiaModalAmount,
				bassModalAmount,
				ergoneModalAmount,
				loveModalAmount,
				greasycexModalAmount,
				pepergModalAmount,
				boberModalAmount,
				gifModalAmount
			);
		} else if (ergoPayConnectedAddress) {
			setShowQR("deposit");
		}
	}

	function handleConfirmRedeem() {
		if (connectedAddress && ergoWallet) {
			setPotModal(false);
			handleRedeemTokens();
		} else if (ergoPayConnectedAddress) {
			setShowQR("redeem");
		}
	}

	function ergsToDeposit(ergAmount) {
		if (ergAmount > 0) {
			return BigInt(ergAmount * 1000000000);
		} else return 1000000n;
	}

	function getErgopaySrc() {
		if (showQR === "deposit") {
			return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=ergopay://ergflip-backend-production.up.railway.app/roundTripAddToPot/${ergoPayConnectedAddress}/${ergsToDeposit(
				ergModalAmount
			)}/${fromActualCurrencyValueToLong(cometModalAmount, "COMET")}/${fromActualCurrencyValueToLong(
				sigusdModalAmount,
				"SigUSD"
			)}/${fromActualCurrencyValueToLong(cypxModalAmount, "CYPX")}/${fromActualCurrencyValueToLong(
				egioModalAmount,
				"EGIO"
			)}/${fromActualCurrencyValueToLong(fluxModalAmount, "FLUX")}/${fromActualCurrencyValueToLong(
				epadModalAmount,
				"EPAD"
			)}/${fromActualCurrencyValueToLong(paideiaModalAmount, "PAIDEIA")}/${fromActualCurrencyValueToLong(
				bassModalAmount,
				"BASS"
			)}/${fromActualCurrencyValueToLong(ergoneModalAmount, "ERGONE")}/${fromActualCurrencyValueToLong(
				loveModalAmount,
				"LOVE"
			)}/${fromActualCurrencyValueToLong(greasycexModalAmount, "GREASYCEX")}/${fromActualCurrencyValueToLong(
				pepergModalAmount,
				"PEPERG"
			)}/${fromActualCurrencyValueToLong(boberModalAmount, "BOBER")}/${fromActualCurrencyValueToLong(
				gifModalAmount,
				"GIF"
			)}`;
		} else if (showQR === "redeem") {
			return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=ergopay://ergflip-backend-production.up.railway.app/roundTripRemoveFromTop/${ergoPayConnectedAddress}`;
		}
	}

	function getErgopayHref() {
		if (showQR === "deposit") {
			return `ergopay://ergflip-backend-production.up.railway.app/roundTripAddToPot/${ergoPayConnectedAddress}/${ergsToDeposit(
				ergModalAmount
			)}/${fromActualCurrencyValueToLong(cometModalAmount, "COMET")}/${fromActualCurrencyValueToLong(
				sigusdModalAmount,
				"SigUSD"
			)}/${fromActualCurrencyValueToLong(cypxModalAmount, "CYPX")}/${fromActualCurrencyValueToLong(
				egioModalAmount,
				"EGIO"
			)}/${fromActualCurrencyValueToLong(fluxModalAmount, "FLUX")}/${fromActualCurrencyValueToLong(
				epadModalAmount,
				"EPAD"
			)}/${fromActualCurrencyValueToLong(paideiaModalAmount, "PAIDEIA")}/${fromActualCurrencyValueToLong(
				bassModalAmount,
				"BASS"
			)}/${fromActualCurrencyValueToLong(ergoneModalAmount, "ERGONE")}/${fromActualCurrencyValueToLong(
				loveModalAmount,
				"LOVE"
			)}/${fromActualCurrencyValueToLong(greasycexModalAmount, "GREASYCEX")}
			/${fromActualCurrencyValueToLong(pepergModalAmount, "PEPERG")}/${fromActualCurrencyValueToLong(
				boberModalAmount,
				"BOBER"
			)}/${fromActualCurrencyValueToLong(gifModalAmount, "GIF")}`;
		} else if (showQR === "redeem") {
			return `ergopay://ergflip-backend-production.up.railway.app/roundTripRemoveFromTop/${ergoPayConnectedAddress}`;
		}
	}

	function handleCancelPotDeposit() {
		setPotModal(false);
		setShowQR(false);
	}

	function limitIsFine(value, coin) {
		if (value >= 0 && value <= unfilledPotAmount(coin)) return true;
		else return false;
	}

	function unfilledPotAmount(coin) {
		switch (coin) {
			case "ERG":
				return ERG_LIMIT - ergAmount;

			case "COMET":
				return COMET_LIMIT - cometAmount;

			case "SigUSD":
				return SIGUSD_LIMIT - sigusdAmount;

			case "CYPX":
				return CYPX_LIMIT - cypxAmount;

			case "EGIO":
				return EGIO_LIMIT - egioAmount;

			case "FLUX":
				return FLUX_LIMIT - fluxAmount;

			case "EPAD":
				return EPAD_LIMIT - epadAmount;

			case "PAIDEIA":
				return PAIDEIA_LIMIT - paideiaAmount;
			case "BASS":
				return BASS_LIMIT - bassAmount;
			case "ERGONE":
				return ERGONE_LIMIT - ergoneAmount;
			case "LOVE":
				return LOVE_LIMIT - loveAmount;
			case "GREASYCEX":
				return GREASYCEX_LIMIT - greasycexAmount;
			case "PEPERG":
				return PEPERG_LIMIT - pepergAmount;
			case "BOBER":
				return BOBER_LIMIT - boberAmount;
			case "GIF":
				return GIF_LIMIT - gifAmount;
			default:
				return 0;
		}
	}

	return potModal === "deposit" ? (
		<div className={potModal ? "pot-modal active" : "pot-modal"}>
			<h2>Decide the amount that you want to deposit</h2>
			<div className="pot-modal--inputs">
				<div className="row">
					<div className="input-wrapper">
						<img src={ergIcon} />
						<input
							type="number"
							onChange={(e) => {
								if (limitIsFine(e.target.value, "ERG")) {
									setModalErgAmount(e.target.value);
								}
							}}
							value={ergModalAmount}
						/>
					</div>
					<div className="input-wrapper">
						<img src={gifIcon} />
						<input
							type="number"
							onChange={(e) => {
								if (limitIsFine(e.target.value, "GIF")) {
									setModalGifAmount(e.target.value);
								}
							}}
							value={gifModalAmount}
						/>
					</div>
					<div className="input-wrapper">
						<img src={pepergIcon} />
						<input
							type="number"
							onChange={(e) => {
								if (limitIsFine(e.target.value, "PEPERG")) {
									setModalPepergAmount(e.target.value);
								}
							}}
							value={pepergModalAmount}
						/>
					</div>
					<div className="input-wrapper">
						<img src={boberIcon} />
						<input
							type="number"
							onChange={(e) => {
								if (limitIsFine(e.target.value, "BOBER")) {
									setModalBoberAmount(e.target.value);
								}
							}}
							value={boberModalAmount}
						/>
					</div>
					<div className="input-wrapper">
						<img src={cometIcon} />
						<input
							type="number"
							onChange={(e) => {
								if (limitIsFine(e.target.value, "COMET")) {
									setModalCometAmount(e.target.value);
								}
							}}
							value={cometModalAmount}
						/>
					</div>
					{/* <div className="input-wrapper">
						<img src={bassIcon} />
						<input
							type="number"
							onChange={(e) => {
								if (limitIsFine(e.target.value, "BASS")) {
									setModalBassAmount(e.target.value);
								}
							}}
							value={bassModalAmount}
						/>
					</div> */}
					{/* <div className="input-wrapper">
						<img src={ergoneIcon} />
						<input
							type="number"
							onChange={(e) => {
								if (limitIsFine(e.target.value, "ERGONE")) {
									setModalErgoneAmount(e.target.value);
								}
							}}
							value={ergoneModalAmount}
						/>
					</div> */}
				</div>
				{/* <div className="input-wrapper">
					<img src={loveIcon} />
					<input
						type="number"
						onChange={(e) => {
							if (limitIsFine(e.target.value, "LOVE")) {
								setModalLoveAmount(e.target.value);
							}
						}}
						value={loveModalAmount}
					/>
				</div> */}
				<div className="row">
					<div className="input-wrapper">
						<img src={greasycexIcon} />
						<input
							type="number"
							onChange={(e) => {
								if (limitIsFine(e.target.value, "GREASYCEX")) {
									setModalGreasycexAmount(e.target.value);
								}
							}}
							value={greasycexModalAmount}
						/>
					</div>
					<div className="input-wrapper">
						<img src={sigusdIcon} />
						<input
							type="number"
							onChange={(e) => {
								if (limitIsFine(e.target.value, "SigUSD")) {
									setModalSigusdAmount(e.target.value);
								}
							}}
							value={sigusdModalAmount}
						/>
					</div>
					<div className="input-wrapper">
						<img src={cypxIcon} />
						<input
							type="number"
							onChange={(e) => {
								if (limitIsFine(e.target.value, "CYPX")) {
									setModalCypxAmount(e.target.value);
								}
							}}
							value={cypxModalAmount}
						/>
					</div>
					{/* <div className="input-wrapper">
						<img src={egioIcon} />
						<input
							type="number"
							onChange={(e) => {
								if (limitIsFine(e.target.value, "EGIO")) {
									setModalEgioAmount(e.target.value);
								}
							}}
							value={egioModalAmount}
						/>
					</div> */}
					<div className="input-wrapper">
						<img src={fluxIcon} />
						<input
							type="number"
							onChange={(e) => {
								if (limitIsFine(e.target.value, "FLUX")) {
									setModalFluxAmount(e.target.value);
								}
							}}
							value={fluxModalAmount}
						/>
					</div>
					<div className="input-wrapper">
						<img src={ergopadIcon} />
						<input
							type="number"
							onChange={(e) => {
								if (limitIsFine(e.target.value, "EPAD")) {
									setModalEpadAmount(e.target.value);
								}
							}}
							value={epadModalAmount}
						/>
					</div>
					{/* <div className="input-wrapper">
						<img src={paideiaIcon} />
						<input
							type="number"
							onChange={(e) => {
								if (limitIsFine(e.target.value, "PAIDEIA")) {
									setModalPaideiaAmount(e.target.value);
								}
							}}
							value={paideiaModalAmount}
						/>
					</div> */}
				</div>
			</div>
			{!showQR && (
				<div className="pot-modal--buttons">
					<div className="pot-modal--button-confirm" onClick={() => handleConfirmPotDeposit()}>
						Confirm
					</div>
					<div className="pot-modal--button-cancel" onClick={() => handleCancelPotDeposit()}>
						Cancel
					</div>
				</div>
			)}
			{showQR && (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: "20px",
						width: "100%",
					}}
				>
					<img src={getErgopaySrc()} className="pot-modal-qr-code" />
					<div className="pot-modal--ergopay-buttons">
						<a
							onClick={() => {
								setPotModal(false);
								setShowQR(false);
								setPotFundsLoading(true);
							}}
							href={getErgopayHref()}
							className="pot-modal-launch-wallet--text"
						>
							Sign transaction
						</a>
						<div className="pot-modal--button-cancel" onClick={() => handleCancelPotDeposit()}>
							Cancel
						</div>
					</div>
				</div>
			)}
		</div>
	) : (
		<div className={potModal ? "pot-modal active" : "pot-modal"}>
			<h2>If you continue all of your pot funds will be redeemed</h2>
			{!showQR && (
				<div className="pot-modal--buttons">
					<div className="pot-modal--button-confirm" onClick={() => handleConfirmRedeem()}>
						Confirm
					</div>
					<div className="pot-modal--button-cancel" onClick={() => handleCancelPotDeposit()}>
						Cancel
					</div>
				</div>
			)}
			{showQR === "redeem" && (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: "20px",
						width: "100%",
					}}
				>
					<img src={getErgopaySrc()} className="pot-modal-qr-code" />
					<div className="pot-modal--ergopay-buttons">
						<a
							onClick={() => {
								setPotModal(false);
								setShowQR(false);
								setPotFundsLoading(true);
							}}
							href={getErgopayHref()}
							className="pot-modal-launch-wallet--text"
						>
							Sign to confirm <br />
							withdrawal
						</a>
						<div className="pot-modal--button-cancel" onClick={() => handleCancelPotDeposit()}>
							Cancel
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PotModal;
