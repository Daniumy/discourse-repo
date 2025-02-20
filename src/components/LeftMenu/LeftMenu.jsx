import "./LeftMenu.css";
import closeCross from "../../assets/closeCross.svg";
import SocialMedia from "../SocialMedia/SocialMedia";
import gamblina from "../../assets/gamblina.png";
import { Link } from "react-router-dom";

function LeftMenu({
	menuClicked,
	ergoPayConnectedAddress,
	connectedAddress,
	setInfoModal,
	setMenuClicked,
}) {
	return (
		<div className={menuClicked ? "left-menu active" : "left-menu"}>
			<img
				src={closeCross}
				className="close-icon"
				onClick={() => setMenuClicked(!menuClicked)}
			/>

			<div className="navigation-links-wrapper">
				<a
					target="_blank"
					rel="noreferrer"
					href={
						ergoPayConnectedAddress
							? `https://explorer.ergoplatform.com/addresses/${ergoPayConnectedAddress}`
							: connectedAddress
							? `https://explorer.ergoplatform.com/addresses/${connectedAddress}`
							: null
					}
					className="transactions-hyperlink"
				>
					Transactions
				</a>
				<a href="https://grandgambit.io/" className="home-hyperlink">
					Home
				</a>
				<div className="faq-nav" onClick={() => setInfoModal(true)}>
					FAQ
				</div>
				<a
					href="https://grandgambit.io/pot"
					rel="noreferrer"
					className="pot-hyperlink"
				>
					Deposit
				</a>
				<a
					href="https://grandgambit.io/gambling-help"
					rel="noreferrer"
					className="gambling-hyperlink"
				>
					Gambling addiction
				</a>
				{/* <a
					href="https://grandgambit.io/refund"
					rel="noreferrer"
					className="refund-hyperlink"
				>
					Refund
				</a> */}
				<a
					href="https://grandgambit.io/address-name"
					rel="noreferrer"
					className="contact-hyperlink"
				>
					Address name
				</a>
			</div>
			<img
				src={gamblina}
				className="gamblina-connections"
				style={{ display: menuClicked ? "block" : "hidden" }}
			/>
			<div className="social-media-left">
				<SocialMedia />
			</div>
		</div>
	);
}

export default LeftMenu;
