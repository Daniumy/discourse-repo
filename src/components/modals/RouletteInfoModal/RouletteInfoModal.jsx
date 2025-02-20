import "./RouletteInfoModal.css";
import closeModal from "../../../assets/closeModal.svg";

const RouletteInfoModal = ({ setInfoModal, infoModal }) => {
	return (
		<div className={infoModal ? "roulette-info show" : "roulette-info hide"}>
			<img
				src={closeModal}
				style={{ width: 30, marginBottom: 10, cursor: "pointer" }}
				onClick={() => setInfoModal(false)}
			></img>
			<br></br>
			If you can't place a chip on a certain spot, it means that you have
			reached the bet limit for that number.
			<br></br>
			<br></br>
			Returns are:
			<ul>
				<li>1:2 on 1/2 chance spots.</li>
				<li>1:3 on 1/3 chance spots.</li>
				<li>1:9 on spots covering 4 numbers.</li>
				<li>1:12 on spots covering 3 numbers.</li>
				<li>1:18 on spots covering 2 numbers.</li>
				<li>1:36 on spots covering 1 number.</li>
			</ul>
			<br></br>
			If you find any bug such as getting paid more/less, animation not
			happening... please let us know, you will be rewarded.
		</div>
	);
};

export default RouletteInfoModal;
