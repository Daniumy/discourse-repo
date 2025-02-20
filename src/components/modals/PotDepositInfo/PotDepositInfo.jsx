import "./PotDepositInfo.css";
import closeIcon from "../../../assets/closeXBlack.svg";

const PotDepositInfo = ({ potDepositLink, setPotDepositLink }) => {
	return (
		<div
			className={
				potDepositLink ? "pot-deposit-info show" : "pot-deposit-info hide"
			}
		>
			<img
				src={closeIcon}
				style={{ width: 30, marginBottom: 10, cursor: "pointer" }}
				onClick={() => setPotDepositLink("")}
			></img>
			<div className="pot-deposit-info-wrapper">
				This{" "}
				<a href={potDepositLink} target="_blank" rel="noreferrer">
					transaction
				</a>{" "}
				you just made has to be confirmed, if it has been confirmed and the
				Speed Pot amounts haven't changed even after refreshing the page,
				contact us
			</div>
		</div>
	);
};

export default PotDepositInfo;
