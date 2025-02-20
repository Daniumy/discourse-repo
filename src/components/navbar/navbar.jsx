import "./navbar.css";
import NautilusLogo from "../../assets/NautilusLogo.png";
import ErgoWallet from "../../assets/ergoWallet.png";
import ergoIcon from "../../assets/ergo-icon.png";
import { useEffect, useState } from "react";
import { truncate } from "../utils";
import InfoModal from "../modals/InfoModal/InfoModal";
import hamburger from "../../assets/menu.svg";
import LeftMenu from "../LeftMenu/LeftMenu";
import logoutIcon from "../../assets/logoutIcon.svg";
import axios from "axios";

const NANOERG_TO_ERG = 1000000000;

function Navbar({
	connectedAddress,
	setConnectedAddress,
	ergoWallet,
	setErgoWallet,
	ergoPayChoosen,
	setErgoPayChoosen,
	setSelectErgopayAddressModal,
	setErgoPayConnectedAddress,
	ergoPayConnectedAddress,
}) {
	const [ergoBalance, setErgoBalance] = useState(null);
	const [seeCurrentBalance, setSeeCurrentBalance] = useState(false);
	const [seeWalletOptions, setSeeWalletOptions] = useState(false);
	const [infoModal, setInfoModal] = useState(false);
	const [menuClicked, setMenuClicked] = useState(false);
	const [navbarBackground, setNavbarBackground] = useState(false);
	const [addressUsername, setAddressUsername] = useState("");

	window.onscroll = function () {
		if (window.pageYOffset > 0) {
			setNavbarBackground(true);
		} else setNavbarBackground(false);
	};

	useEffect(() => {
		if (connectedAddress) {
			axios
				.get(
					`https://ergflip-backend-production.up.railway.app/getMainName/${connectedAddress}`
				)
				.then(({ data }) => {
					setAddressUsername(data);
				});
		}
	}, [connectedAddress]);

	async function handleWalletConnection() {
		console.log(ergoWallet);
		console.log(connectedAddress);
		window.ergoConnector.nautilus
			.connect()
			.then((access_granted) => {
				if (access_granted) {
					window.ergoConnector.nautilus.getContext().then((context) => {
						setErgoWallet(context);
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	window.addEventListener("ergo_wallet_disconnected", () => {
		disconnectWallet();
	});

	function disconnectWallet() {
		if (
			typeof window.ergo_request_read_access !== "undefined" &&
			connectedAddress
		) {
			setConnectedAddress(null);
			setErgoWallet(null);
			setErgoBalance(null);
			setSeeCurrentBalance(!seeCurrentBalance);
			localStorage.removeItem("walletAddress");
			window.ergoConnector.nautilus.disconnect();
		}
	}

	function disconnectErgopay() {
		setSeeCurrentBalance(!seeCurrentBalance);
		setErgoPayConnectedAddress("");
		localStorage.removeItem("ergoPayAddress");
		setErgoPayChoosen(false);
	}
	//check when the user has changed the context of the ergoWallet and then get its address
	useEffect(() => {
		if (ergoWallet) {
			ergoWallet.get_change_address().then((address) => {
				setConnectedAddress(address);
				ergoWallet.get_balance().then(function (balance) {
					setErgoBalance(
						(Math.floor((balance / NANOERG_TO_ERG) * 100) / 100).toFixed(2)
					);
				});
				localStorage.setItem("walletAddress", address);
				localStorage.removeItem("ergoPayAddress");
			});
		}
	}, [ergoWallet]);

	//check if user had previously connected wallet and then connect that one again
	useEffect(() => {
		const address = localStorage.getItem("walletAddress");
		if (address) {
			handleWalletConnection();
		}
		const ergoPayAddress = localStorage.getItem("ergoPayAddress");
		if (ergoPayAddress) {
			setErgoPayConnectedAddress(ergoPayAddress);
			handleErgoPayConnection();
		}
	}, []);

	function handleErgoPayConnection() {
		setSeeCurrentBalance(false);
		const ergoPayAddress = localStorage.getItem("ergoPayAddress");
		if (ergoPayAddress) {
			setErgoPayChoosen(true);
			setErgoPayConnectedAddress(ergoPayAddress);
		} else {
			setSelectErgopayAddressModal(true);
		}
	}

	return (
		<nav
			className="header"
			style={
				navbarBackground
					? {
							backgroundColor: "black",
							boxShadow: "0px 5px 5px 5px rgba(0, 0, 0, 0.3)",
					  }
					: null
			}
		>
			<LeftMenu
				menuClicked={menuClicked}
				setMenuClicked={setMenuClicked}
				ergoPayConnectedAddress={ergoPayConnectedAddress}
				connectedAddress={connectedAddress}
				setInfoModal={setInfoModal}
			/>
			<InfoModal infoModal={infoModal} setInfoModal={setInfoModal} />
			<div className="hamburger-icon-wrapper">
				<img
					src={menuClicked ? null : hamburger}
					className="hamburger-icon"
					style={{ display: menuClicked ? "none" : "block" }}
					onClick={() => setMenuClicked(!menuClicked)}
				/>
			</div>
			<a href="https://grandgambit.io/" className="header-logo-a">
				<div className="header-logo"></div>
			</a>
			<div className="header-wallet-button">
				{!ergoWallet && !ergoPayChoosen ? (
					<>
						<div
							className="header-wallet-button-disconnected"
							onClick={() => setSeeWalletOptions(!seeWalletOptions)}
						>
							<img src={ErgoWallet} alt="Wallet" />
						</div>
						{seeWalletOptions ? (
							<>
								<div
									className="wallet-option-nautilus"
									onClick={handleWalletConnection}
								>
									<img src={NautilusLogo} alt="Nautilus" />
									<span style={{ fontWeight: "bold" }}>Nautilus</span>
								</div>
								<div
									className="wallet-option-ergopay"
									onClick={(e) => {
										handleErgoPayConnection();
									}}
								>
									<img src={ergoIcon} alt="ErgoPay" />
									<span
										style={{ fontWeight: "bold" }}
										className="ergopay-choice"
									>
										Android
									</span>
								</div>
							</>
						) : null}
					</>
				) : ergoPayChoosen ? (
					<>
						<div
							className="header-wallet-button-connected"
							onClick={() => {
								setSeeCurrentBalance(!seeCurrentBalance);
							}}
						>
							<img src={ergoIcon} alt="ErgoPay" style={{ width: 35 }} />
							<span
								className="header-wallet-button-text"
								style={{ fontSize: "0.8em" }}
							>
								ErgoPay (Android)
							</span>
						</div>{" "}
						{seeCurrentBalance ? (
							<div
								className="delete-ergopay-display"
								onClick={disconnectErgopay}
							>
								<span className="logout-text">Disconnect</span>
								<img src={logoutIcon} className="logout-icon"></img>
							</div>
						) : null}
					</>
				) : (
					<>
						<div
							className="header-wallet-button-connected nautilus"
							onClick={() => {
								setSeeCurrentBalance(!seeCurrentBalance);
							}}
						>
							<img src={NautilusLogo} alt="Nautilus Logo" />
							<span className="header-wallet-button-text">
								{addressUsername
									? addressUsername
									: truncate(connectedAddress, 8)}
							</span>
						</div>
						{seeCurrentBalance ? (
							<>
								<div className="balance-display">
									<img src={ergoIcon} alt="ERG" />
									<span>{ergoBalance}</span>
								</div>
								<div
									className="delete-wallet-display"
									onClick={disconnectWallet}
								>
									<span>Disconnect</span>
								</div>
							</>
						) : null}
					</>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
