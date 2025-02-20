import { useState } from "react";
import "./AddPotErgopay.css";

const AddPotErgopay = ({
	show,
	setShow,
	ergoPayConnectedAddress,
	setErgoPayConnectedAddress,
}) => {
	const [
		ergoPayConnectedAddressSubmitted,
		setErgoPayConnectedAddressSubmitted,
	] = useState(false);

	function handleErgoPayAddressSubmitted() {
		localStorage.setItem("ergoPayAddress", ergoPayConnectedAddress);
		localStorage.removeItem("walletAddress");
		setErgoPayConnectedAddressSubmitted(true);
	}

	function handleQRCodeLinkClicked() {
		setShow(false);
		setErgoPayConnectedAddressSubmitted(false);
	}

	function getErgopaySrc() {
		return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=ergopay://ergflip-backend-production.up.railway.app/roundTripAddToPot/${ergoPayConnectedAddress}/`;
	}

	return (
		<div
			className={show ? "AddPotErgopay-modal show" : "AddPotErgopay-modal"}
		></div>
	);
};

export default AddPotErgopay;
