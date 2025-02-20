import "./RouletteErrorModal.css";
import closeModal from "../../../assets/closeModal.svg";

const RouletteErrorModal = ({ setBackendError }) => {
	return (
		<div className="roulette-error-modal">
			<img
				src={closeModal}
				style={{ width: 30, marginBottom: 10, cursor: "pointer" }}
				onClick={() => setBackendError(false)}
			></img>
			<br></br>
			Something went wrong, please join the telegram chat{" "}
			<a href="https://t.me/+Zb8XibNRKB4xZjk0" target="_blank" rel="noreferrer">
				here
			</a>{" "}
			and report it, or message me privately via twitter or telegram
			@GrandGambit.
		</div>
	);
};

export default RouletteErrorModal;
