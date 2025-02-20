import "./ErgopayAddress.css";

const ErgopayAddress = ({
	show,
	setShow,
	ergoPayConnectedAddress,
	setErgoPayConnectedAddress,
	setErgopayChoosen,
}) => {
	return (
		<div
			className={show ? "ergopayAddress-modal show" : "ergopayAddress-modal"}
		>
			<h2>Type here your mobile wallet address</h2>
			<input
				type="text"
				id="ergoPayAddress"
				name="ergoPayAddress"
				required
				minLength="51"
				maxLength="51"
				onChange={(e) => setErgoPayConnectedAddress(e.target.value)}
				value={ergoPayConnectedAddress}
				placeholder="Wallet Address"
			/>
			<div className="ergopay-modal-buttons">
				<div
					className={
						ergoPayConnectedAddress.length !== 51
							? "ergopay-modal-button-confirm disabled"
							: "ergopay-modal-button-confirm"
					}
					onClick={() => {
						setShow(false);
						localStorage.setItem("ergoPayAddress", ergoPayConnectedAddress);
						setErgoPayConnectedAddress(ergoPayConnectedAddress);
						setErgopayChoosen(true);
					}}
				>
					Confirm
				</div>
				<div
					className={"ergopay-modal-button-cancel"}
					onClick={() => {
						setShow(false);
						setErgoPayConnectedAddress("");
					}}
				>
					Cancel
				</div>
			</div>
		</div>
	);
};

export default ErgopayAddress;
