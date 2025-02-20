import axios from "axios";
import { useState } from "react";
import "./Refund.css";
import { Triangle } from "react-loader-spinner";
import gamblina from "../../assets/gamblina.png";

const renderCases = {
	unexpected: (
		<>
			<h2>
				Looks like an unexpected error was thrown, contact us to find more
				information
			</h2>
			<img src={gamblina} className="refund-gamblina-active"></img>
		</>
	),
	not_found: (
		<>
			<h2>Looks like such transaction is either not found or too old</h2>
			<img src={gamblina} className="refund-gamblina-active"></img>
		</>
	),
	lost: (
		<>
			<h2>
				This transaction was resolved as
				<span style={{ color: "red", fontWeight: "bold" }}> lost</span>
			</h2>
			<img src={gamblina} className="refund-gamblina-active"></img>
		</>
	),
	unexistent: (
		<>
			<h2 style={{ textAlign: "center" }}>
				Looks like this transaction didn't reach our servers<br></br>It should
				have? Contact us and we will manually check and refund
			</h2>
			<img src={gamblina} className="refund-gamblina-active"></img>
		</>
	),
	unknown: (
		<>
			<h2 style={{ textAlign: "center" }}>
				An unexpected error happened, contact us
			</h2>
			<img src={gamblina} className="refund-gamblina-active"></img>
		</>
	),
	paid: (
		<>
			<h2 style={{ textAlign: "center" }}>
				This play was won and paid properly
			</h2>
			<img src={gamblina} className="refund-gamblina-active"></img>
		</>
	),
	potremoval: (
		<>
			<h2 style={{ textAlign: "center" }}>
				This transaction belongs to a pot redeem transaction
			</h2>
			<img src={gamblina} className="refund-gamblina-active"></img>
		</>
	),
	refunded: (
		<>
			<h2 style={{ textAlign: "center" }}>
				Your transaction has been auto refunded!
			</h2>
			<img src={gamblina} className="refund-gamblina-active"></img>
		</>
	),
};

const Refund = ({ handleBackNotAvailable }) => {
	const [txidToRefund, setTxidToRefund] = useState("");
	const [refundResult, setRefundResult] = useState("none");
	const [refundLoading, setRefundLoading] = useState(false);

	function handleRefund() {
		setRefundLoading(true);
		axios
			.get(
				`https://ergflip-backend-production.up.railway.app/refund/${txidToRefund}`
			)
			.then(({ data }) => {
				switch (data) {
					case "not_found":
						setRefundResult("not_found");
						break;
					case "lost":
						setRefundResult("lost");
						break;
					case "unexpected":
						setRefundResult("unexpected");
						break;
					case "unexistent":
						setRefundResult("unexistent");
						break;
					case "unknown":
						setRefundResult("unknown");
						break;
					case "paid":
						setRefundResult("paid");
						break;
					case "potremoval":
						setRefundResult("potremoval");
						break;
					case "refunded":
						setRefundResult("refunded");
						break;
					default:
						setRefundResult("unexpected");
						break;
				}
			})
			.catch((err) => {
				if (err.code === "ERR_NETWORK") handleBackNotAvailable();
				else setRefundResult("unexpected");
			})
			.finally(() => {
				setRefundLoading(false);
			});
	}

	return (
		<div className="refund-wrapper">
			<h2 className="refund-first-text">
				If you've encountered any issues with your play
				<br></br>
				Please paste the transaction ID here
			</h2>
			<input
				className="refund-input"
				type="text"
				id="refund-txid"
				name="refund-txid"
				required
				minLength="64"
				maxLength="64"
				value={txidToRefund}
				onChange={(e) => setTxidToRefund(e.target.value)}
				placeholder="Transaction ID"
			/>
			<div className="refund-buttons">
				<div
					className={
						txidToRefund.length == 64 && !refundLoading
							? "refund-button"
							: "refund-button disabled"
					}
					onClick={() => handleRefund()}
				>
					Submit
				</div>
			</div>
			{refundLoading && (
				<Triangle
					height="150"
					width="200"
					radius="100"
					color="#2f73f0"
					ariaLabel="loading"
					wrapperStyle
					wrapperClass
				/>
			)}
			<div
				className={
					refundResult !== "none"
						? "post-refund-render active"
						: "post-refund-render"
				}
			>
				{renderCases[refundResult]}
			</div>
		</div>
	);
};

export default Refund;
