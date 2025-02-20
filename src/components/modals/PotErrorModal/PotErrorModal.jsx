import "./PotErrorModal.css";
import closeIcon from "../../../assets/closeXBlack.svg";

const PotErrorModal = ({ potErrorModal, setPotErrorModal }) => {
	return (
		<div
			className={
				potErrorModal ? "pot-error-modal show" : "pot-error-modal hide"
			}
		>
			<img
				src={closeIcon}
				style={{ width: 30, marginBottom: 10, cursor: "pointer" }}
				onClick={() => setPotErrorModal(false)}
			></img>
			<br></br>

			<div className="pot-error-modal-wrapper">
				Something went wrong, try again and if the error persists contact us
				through our socials
			</div>
		</div>
	);
};

export default PotErrorModal;
