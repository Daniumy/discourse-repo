import "./ErgoPayTransaction.css";
import closeModal from "../../assets/closeXBlack.svg";

const ErgoPayTransaction = ({
	ergopayHref,
	ergopaySrc,
	setModal,
	setOnClick1,
}) => {
	function handleHrefClicked() {
		setOnClick1(true);
	}

	return (
		<div className="ErgoPayTransaction-wrapper">
			<img
				src={closeModal}
				style={{
					width: 30,
					marginBottom: 10,
					cursor: "pointer",
					alignSelf: "flex-start",
				}}
				onClick={() => setModal([])}
			></img>
			<img src={ergopaySrc} />
			<a
				onClick={handleHrefClicked}
				href={ergopayHref}
				style={{ fontSize: "1.2em" }}
			>
				Click here to launch Ergo Wallet
			</a>
		</div>
	);
};

export default ErgoPayTransaction;
