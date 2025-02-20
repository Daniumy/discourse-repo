import "./FirstTimeHoveringPot.css";

const FirstTimeHoveringPot = ({ setFirstTimeHoveringPot }) => {
	return (
		<div className="firstTimeHoveringPot-modal">
			<h1>Welcome to the speed booster pot</h1>
			<p>
				The funds you send to this pot will allow you to have{" "}
				<span style={{ fontWeight: "bold" }}>instant </span>
				play results, it is a free feature.
				<br />
				<br />
				The total amount to send to the pot will be limited for now.
				<br />
				<br />
				This acts just like any other casino, it is not decentralized, you can
				withdraw the funds at any time.
			</p>
			<div className="firstTimeHoveringPot-modal--buttons">
				<div
					className="firstTimeHoveringPot-modal--button-confirm"
					onClick={() => {
						localStorage.setItem("firstTimeHoveringPot", true);
						setFirstTimeHoveringPot(false);
						window.location.href = "https://grandgambit.io/pot";
					}}
				>
					Speed Pot
				</div>
				<div
					className="firstTimeHoveringPot-modal--button-cancel"
					onClick={() => {
						localStorage.setItem("firstTimeHoveringPot", true);
						setFirstTimeHoveringPot(false);
					}}
				>
					No thanks
				</div>
			</div>
		</div>
	);
};

export default FirstTimeHoveringPot;
