import { useEffect, useState } from "react";
import "./StartNotifications.css";
import closeX from "../../assets/closeX.svg";
import notificationsBell from "../../assets/notificationsBell.svg";

const StartNotifications = () => {
	const [showNotifications, setShowNotifications] = useState(false);

	useEffect(() => {
		const isFirstTime = localStorage.getItem("firstTimeShowingNotifications");
		if (!isFirstTime) {
			setShowNotifications(true);
			localStorage.setItem("firstTimeShowingNotifications", true);
		}
	}, []);

	return (
		<>
			<div
				className={
					showNotifications
						? "start-notifications-container show"
						: "start-notifications-container hide"
				}
			>
				<div className="notifications-header">
					<img src={closeX} onClick={() => setShowNotifications(false)} />
					<span>Notifications</span>
				</div>
				<div className="notifications-wrapper">
					{/* <div className="notification-item">
						The top 3 biggest winners within the next 30 days will receive 15%
						of Grand Gambit's revenue
						<a
							href="https://twitter.com/Grand_Gambit/status/1627693547859091456"
							target="_blank"
							rel="noreferrer"
						>
							Announcement tweet
						</a>
					</div>
					<div
						className="notification-item"
						style={{ display: "inline-block" }}
					>
						Now you have a 50% chance of receiving 10k $COMET in your{" "}
						<a href="https://grandgambit.io/pot">Speed Pot</a> everytime you
						make a play in any game, doesn't matter if you win or lose
						<a
							href="https://twitter.com/Grand_Gambit/status/1628734716898598913"
							target="_blank"
							rel="noreferrer"
							style={{ display: "block", textAlign: "center" }}
						>
							Announcement tweet
						</a>
					</div> */}
					<div className="notification-item">
						Play the new game, Plinko!
						<a
							href="https://grandgambit.io/game/plinko"
							target="_blank"
							rel="noreferrer"
						>
							PLAY!
						</a>
					</div>
					<div className="notification-item">
						You can now get a username for your wallet address!
						<a
							href="https://grandgambit.io/address-name"
							target="_blank"
							rel="noreferrer"
						>
							HERE!
						</a>
					</div>
				</div>
			</div>
			<div
				className={
					!showNotifications
						? "notifications-bell show"
						: "notifications-bell hide"
				}
			>
				<img
					src={notificationsBell}
					onClick={() => setShowNotifications(true)}
				/>
			</div>
		</>
	);
};

export default StartNotifications;
