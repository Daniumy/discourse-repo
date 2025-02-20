import { useEffect, useState } from "react";
import "./AddressName.css";
import plusIcon from "../../assets/plusIcon.svg";
import { fromActualCurrencyValueToLong } from "../../components/utils";
import axios from "axios";
import {
	TransactionBuilder,
	OutputBuilder,
	InsufficientInputs,
} from "@fleet-sdk/core";
import { addresses } from "../../components/utils";
import { Triangle } from "react-loader-spinner";
import { useSubscription } from "react-stomp-hooks";
import ErgoPayTransaction from "../../components/ErgoPayTransaction/ErgoPayTransaction";

const regex = /^[a-zA-Z0-9]+$/;

const AddressName = ({
	connectedAddress,
	ergoPayConnectedAddress,
	isThereEnoughInPot,
	setBetStarted,
	handleNotEnoughInPot,
	handleNotEnoughFunds,
	setNautilusLoading,
	ergoWallet,
	handleBackNotAvailable,
}) => {
	const [addressName, setAddressName] = useState([""]);
	const [somethingWentWrong, setSomethingWentWrong] = useState("");
	const [currentUserNames, setCurrentUserNames] = useState(null);
	const [userPlayed5Times, setUserPlayed5Times] = useState(null);
	const [addingNewNames, setAddingNewNames] = useState(false);
	const [mainNameLoading, setMainNameLoading] = useState(false);
	const [ergoPayTransaction, setErgoPayTransaction] = useState([]);

	function getWalletAddress() {
		if (ergoPayConnectedAddress) return ergoPayConnectedAddress;
		else if (connectedAddress) return connectedAddress;
		else return "";
	}

	useSubscription(`/user/${getWalletAddress()}/names_added`, ({ body }) => {
		const arrayOfNames = body.split(",");
		handleResponseNames(arrayOfNames);
	});

	useEffect(() => {
		if (connectedAddress) {
			axios
				.get(
					`https://ergflip-backend-production.up.railway.app/getNames/${connectedAddress}`
				)
				.then(({ data }) => {
					setCurrentUserNames(data);
				});
			axios
				.get(
					`https://ergflip-backend-production.up.railway.app/hasPlayed5Games/${connectedAddress}`
				)
				.then(({ data }) => {
					if (data) {
						setUserPlayed5Times(true);
					} else {
						setUserPlayed5Times(false);
					}
				});
		} else if (ergoPayConnectedAddress) {
			axios
				.get(
					`https://ergflip-backend-production.up.railway.app/getNames/${ergoPayConnectedAddress}`
				)

				.then(({ data }) => {
					setCurrentUserNames(data);
				});
			axios
				.get(
					`https://ergflip-backend-production.up.railway.app/hasPlayed5Games/${ergoPayConnectedAddress}`
				)
				.then(({ data }) => {
					if (data) {
						setUserPlayed5Times(true);
					} else {
						setUserPlayed5Times(false);
					}
				});
		} else {
			setCurrentUserNames(null);
			setUserPlayed5Times(false);
		}
	}, [connectedAddress, ergoPayConnectedAddress]);

	function handleSubmitAddressName() {
		setNautilusLoading(true);
		const addressNameCopy = [...addressName];

		for (let i = 0; i < addressNameCopy.length; i++) {
			if (addressNameCopy[i] === "") {
				setSomethingWentWrong("Please fill all the fields");
				setTimeout(() => {
					setSomethingWentWrong("");
				}, 5000);
				setNautilusLoading(false);
				return;
			}
		}

		axios
			.post(
				"https://ergflip-backend-production.up.railway.app/checkIfNameExistsAlready",
				addressNameCopy
			)
			.then(({ data }) => {
				if (data) {
					setSomethingWentWrong("Username is not available");
					setTimeout(() => {
						setSomethingWentWrong("");
					}, 5000);
					setNautilusLoading(false);
				} else {
					buildTransaction(addressNameCopy);
				}
			});
	}

	function handleChangeMainName(name) {
		setMainNameLoading(true);
		if (!name.mainName) {
			axios
				.post(
					"https://ergflip-backend-production.up.railway.app/changeMainName",
					name,
					{
						timeout: 1000000,
					}
				)
				.then(({ data }) => {
					setCurrentUserNames(data);
					setMainNameLoading(false);
				})
				.catch(() => {
					setMainNameLoading(false);
				});
		}
	}

	function handleResponseNames(data) {
		data = data.map((name) => {
			return { name, address: getWalletAddress(), mainName: false };
		});
		if (data) setCurrentUserNames(currentUserNames.concat(data));
		setAddingNewNames(false);
		setBetStarted(false);
	}

	function buildTransaction(addressNameCopy) {
		if (ergoWallet && connectedAddress) {
			axios
				.get(
					"https://ergflip-backend-production.up.railway.app/backendReachable",
					{
						timeout: 30000,
					}
				)
				.then(async ({ data }) => {
					//wallet related
					const creationHeight = await ergoWallet.get_current_height();
					const utxos = await ergoWallet.get_utxos();
					const addressToSend = addresses[data - 1];

					const addressHasNoUsernames = currentUserNames.length === 0;
					let totalAmountToSend = addressHasNoUsernames
						? (addressNameCopy.length - 1) * 3
						: addressNameCopy.length * 3;

					const enoughPot = isThereEnoughInPot("ERG", totalAmountToSend);

					const apiURI =
						"https://ergflip-backend-production.up.railway.app/sendAddressNames";
					let unsignedTransaction;

					const outputBuilderNormal =
						totalAmountToSend > 0
							? new OutputBuilder(
									fromActualCurrencyValueToLong(totalAmountToSend, "ERG"),
									addressToSend
							  )
							: new OutputBuilder(1000000n, addressToSend);

					if (enoughPot) {
						unsignedTransaction = new TransactionBuilder(creationHeight)
							.from(utxos)
							.to(new OutputBuilder(1000000n, addressToSend))
							.sendChangeTo(connectedAddress)
							.payMinFee()
							.build("EIP-12");
					} else {
						unsignedTransaction = new TransactionBuilder(creationHeight)
							.from(utxos)
							.to(outputBuilderNormal)
							.sendChangeTo(connectedAddress)
							.payMinFee()
							.build("EIP-12");
					}

					setNautilusLoading(false);
					ergoWallet.sign_tx(unsignedTransaction).then((signedTx) => {
						setAddingNewNames(true);
						ergoWallet.submit_tx(signedTx);
						if (enoughPot) {
							setBetStarted("pot");
							axios
								.post(
									apiURI,
									{
										txId: signedTx.id,
										bettorAddress: connectedAddress,
										names: addressNameCopy,
										isPotTx: true,
										amountReceived: fromActualCurrencyValueToLong(
											totalAmountToSend,
											"ERG"
										),
										freeUsername: addressHasNoUsernames,
									},
									{ timeout: 1000000 }
								)
								.then(({ data }) => {
									//add to current users the new ones coming in data variable
									handleResponseNames(data);
								});
						} else {
							setBetStarted("normal");
							axios.post(
								apiURI,
								{
									txId: signedTx.id,
									bettorAddress: connectedAddress,
									names: addressNameCopy,
									isPotTx: false,
									amountReceived: fromActualCurrencyValueToLong(
										totalAmountToSend,
										"ERG"
									),
									freeUsername: addressHasNoUsernames,
								},
								{ timeout: 1000000 }
							);
						}
					});
				})
				.catch((e) => {
					console.log(e);
					if (e instanceof InsufficientInputs) handleNotEnoughFunds();
					else handleBackNotAvailable();
					setBetStarted(false);
				});
		} else if (ergoPayConnectedAddress) {
			setNautilusLoading(false);
			const addressHasNoUsernames = currentUserNames.length === 0;
			let totalAmountToSend = addressHasNoUsernames
				? (addressNameCopy.length - 1) * 3
				: addressNameCopy.length * 3;
			const names = addressNameCopy.join("-");
			const enoughPot = isThereEnoughInPot("ERG", totalAmountToSend);

			const ergopaySrc = enoughPot
				? `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=ergopay://ergflip-backend-production.up.railway.app/roundTripPotSendAddressNames/${ergoPayConnectedAddress}/${names}`
				: `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=ergopay://ergflip-backend-production.up.railway.app/roundTripSendAddressNames/${ergoPayConnectedAddress}/${names}`;

			const ergopayHref = enoughPot
				? `ergopay://ergflip-backend-production.up.railway.app/roundTripPotSendAddressNames/${ergoPayConnectedAddress}/${names}`
				: `ergopay://ergflip-backend-production.up.railway.app/roundTripSendAddressNames/${ergoPayConnectedAddress}/${names}`;

			setErgoPayTransaction([ergopayHref, ergopaySrc]);
		}
	}

	function handleChangeRespectiveAddress(value, index) {
		if (regex.test(value) || value === "") {
			let addressNameCopy = [...addressName];
			addressNameCopy[index] = value;
			setAddressName(addressNameCopy);
		}
	}

	function handleAddNewAddressName() {
		let addressNameCopy = [...addressName];
		addressNameCopy.push("");
		setAddressName(addressNameCopy);
	}

	return (
		<div className="address-name-wrapper">
			{ergoPayTransaction.length != 0 && (
				<ErgoPayTransaction
					setModal={setErgoPayTransaction}
					ergopayHref={ergoPayTransaction[0]}
					ergopaySrc={ergoPayTransaction[1]}
					setBetStarted={setBetStarted}
					setOnClick1={setAddingNewNames}
				/>
			)}
			<h1 className="address-name-wrapper-title">
				Choose your desired username!
			</h1>
			<div className="address-name-explanation">
				You can claim as many as you want, they are{" "}
				<span className="cyan-color">unique</span>, you need to have played at
				least 2 times
				<br />
				First username is free, the rest cost 3 ERG.
				<br />
				You can buy multiple usernames by pressing the "+" button
			</div>
			{!connectedAddress && !ergoPayConnectedAddress ? (
				<span className="fixedPot-nowallet" style={{ color: "red" }}>
					Connect a wallet first
				</span>
			) : (
				addressName.map((name, index) => {
					return (
						<div className="address-name-input" key={index}>
							<input
								type="text"
								pattern="[a-zA-Z0-9]+" // only letters and numbers
								id="addressName"
								name="addressName"
								placeholder="Type your desired username"
								maxLength={30}
								required
								onChange={(e) =>
									handleChangeRespectiveAddress(e.target.value, index)
								}
								value={name}
							/>
							{index === addressName.length - 1 && (
								<img src={plusIcon} onClick={() => handleAddNewAddressName()} />
							)}
						</div>
					);
				})
			)}
			<div
				className={
					(!connectedAddress && !ergoPayConnectedAddress) ||
					currentUserNames == null ||
					!userPlayed5Times
						? "address-name-button disabled"
						: "address-name-button"
				}
				onClick={() => handleSubmitAddressName()}
			>
				Submit
			</div>
			{somethingWentWrong && (
				<div className="error-message-atsubmit">{somethingWentWrong}</div>
			)}
			{userPlayed5Times == null || currentUserNames == null ? (
				<Triangle
					height="45"
					width="60"
					radius="100"
					color="#2f73f0"
					ariaLabel="loading"
					wrapperStyle
					wrapperClass
				/>
			) : (
				<>
					{!userPlayed5Times &&
						(connectedAddress || ergoPayConnectedAddress) && (
							<div className="error-message-atsubmit">
								Address must have played 2 times or more
							</div>
						)}
					{currentUserNames != null && currentUserNames.length <= 0 && (
						<div className="current-user-names">
							You have no address usernames yet!{" "}
							{addingNewNames && (
								<span className="adding-new-names-span">
									Unless..{" "}
									<Triangle
										height="45"
										width="60"
										radius="100"
										color="#2f73f0"
										ariaLabel="loading"
										wrapperStyle
										wrapperClass
									/>
								</span>
							)}
						</div>
					)}
					{currentUserNames != null && currentUserNames.length > 0 && (
						<div className="current-user-names-wrapper">
							<div>
								Your current address usernames are:
								<br />
								<span className="current-user-names-text">
									{mainNameLoading ? (
										<Triangle
											height="45"
											width="60"
											radius="100"
											color="#2f73f0"
											ariaLabel="loading"
											wrapperStyle
											wrapperClass
										/>
									) : (
										currentUserNames.map((address, index) => {
											return (
												<span
													className={
														address.mainName
															? "main-username"
															: "normal-username"
													}
													key={index}
													onClick={() => handleChangeMainName(address)}
												>
													{address.name}
												</span>
											);
										})
									)}
								</span>
								{addingNewNames && (
									<span className="adding-new-names-span">
										and..{" "}
										<Triangle
											height="45"
											width="60"
											radius="100"
											color="#2f73f0"
											ariaLabel="loading"
											wrapperStyle
											wrapperClass
										/>
									</span>
								)}
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default AddressName;
