import { useEffect, useState } from "react";
import "./WinnersTable.css";
import axios from "axios";
import { truncate } from "../utils";
import receiptIcon from "../../assets/receiptIcon.svg";
import Select from "react-select";
import { Triangle } from "react-loader-spinner";

const offsetOptions = [
	{ value: 0, label: "10" },
	{ value: 10, label: "11..20" },
	{ value: 20, label: "21..30" },
	{ value: 30, label: "31..40" },
];

const customStyles = {
	option: (provided, state) => ({
		...provided,
		color: "black",
		backgroundColor: state.isFocused ? "#91e1f9" : "white",
		fontWeight: "bold",
		fontSize: "0.7em",
	}),
	container: (provided) => ({
		...provided,
		"@media only screen and (max-width: 600px)": {
			...provided["@media only screen and (max-width: 600px)"],
			fontSize: "0.6em",
		},
	}),
};

const WinnersTable = ({ backendReachable }) => {
	const [biggestSingleWinners, setBiggestSingleWinners] = useState([]);
	const [biggestWinners, setBiggestWinners] = useState([]);
	const [selectedOffset1, setSelectedOffset1] = useState(0);
	const [selectedOffset2, setSelectedOffset2] = useState(0);
	const [loading1, setLoading1] = useState(true);
	const [loading2, setLoading2] = useState(true);

	const tokenOptionLabel = ({ value, label, img }) => (
		<div
			style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
		>
			<div>{img}</div>
			<div style={{ marginLeft: "10px", color: "black", fontWeight: "bold" }}>
				{label}
			</div>
		</div>
	);

	function fetchBiggestSingleWinners(offsetValue) {
		const apiURL = `https://ergflip-backend-production.up.railway.app/biggestSingleWinnersWithOffset/${offsetValue}`;
		axios
			.get(apiURL)
			.then(({ data }) => {
				setBiggestSingleWinners(data);
				setLoading1(false);
			})
			.catch(() => {
				setLoading1(false);
			});
	}

	function fetchBiggestWinners(offsetValue) {
		const apiURL = `https://ergflip-backend-production.up.railway.app/biggestWinnersWithOffset/${offsetValue}`;

		axios
			.get(apiURL)
			.then(({ data }) => {
				setBiggestWinners(data);
				setLoading2(false);
			})
			.catch(() => {
				setLoading2(false);
			});
	}

	useEffect(() => {
		if (backendReachable) {
			fetchBiggestSingleWinners(selectedOffset1);
		}
	}, [backendReachable]);

	useEffect(() => {
		if (backendReachable) {
			fetchBiggestWinners(selectedOffset2);
		}
	}, [backendReachable]);

	function handleSelectOffset(value, ntable) {
		if (ntable == 1) {
			setLoading1(true);
			setSelectedOffset1(value);
			fetchBiggestSingleWinners(value);
		} else {
			setLoading2(true);
			setSelectedOffset2(value);
			fetchBiggestWinners(value);
		}
	}
	return (
		<div className="winners-table-wrapper">
			<div className="winners-table">
				<h2 className="winners-tables-header">
					TOP{" "}
					<Select
						className="select-winners-table"
						onChange={({ value }) => handleSelectOffset(value, 1)}
						options={offsetOptions}
						formatOptionLabel={tokenOptionLabel}
						styles={customStyles}
						placeholder={<div>10</div>}
						isSearchable={false}
					/>{" "}
					Biggest ERG Wins
				</h2>
				{!loading1 ? (
					<table>
						<thead>
							<tr>
								<th id="top-left-header">TxId</th>
								<th>Address</th>
								<th id="top-right-header">Amount won</th>
							</tr>
						</thead>
						<tbody>
							{biggestSingleWinners.map((winner, index) => (
								<tr key={winner.txId}>
									<td style={index == 9 ? { borderBottomLeftRadius: 9 } : null}>
										<a
											target="_blank"
											rel="noreferrer"
											href={`https://explorer.ergoplatform.com/en/transactions/${winner.txId}`}
										>
											<img
												src={receiptIcon}
												className="receipt-image"
												alt="receipt-image"
											></img>
										</a>
									</td>
									<td>{truncate(winner.address, 15)}</td>
									<td
										style={index == 9 ? { borderBottomRightRadius: 9 } : null}
									>
										{Math.round((winner.betAmount / 1000000000) * 100) / 100}{" "}
										ERG
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<Triangle
						height="45"
						width="60"
						radius="100"
						color="#2f73f0"
						ariaLabel="loading"
						wrapperStyle
						wrapperClass
					/>
				)}
			</div>
			<div className="winners-table">
				<h2 className="winners-tables-header">
					TOP{" "}
					<Select
						className="select-winners-table"
						onChange={({ value }) => handleSelectOffset(value, 2)}
						options={offsetOptions}
						formatOptionLabel={tokenOptionLabel}
						styles={customStyles}
						placeholder={<div>10</div>}
						isSearchable={false}
					/>{" "}
					Biggest ERG Winners
				</h2>
				{!loading2 ? (
					<table>
						<thead>
							<tr>
								<th id="top-left-header">Address</th>
								<th id="top-right-header">Total Amount won</th>
							</tr>
						</thead>
						<tbody>
							{biggestWinners.map((winner, index) => (
								<tr key={winner.txId}>
									<td style={index == 9 ? { borderBottomLeftRadius: 9 } : null}>
										{truncate(winner.address, 15)}
									</td>
									<td
										style={index == 9 ? { borderBottomRightRadius: 9 } : null}
									>
										{Math.round((winner.betAmount / 1000000000) * 100) / 100}{" "}
										ERG
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<Triangle
						height="45"
						width="60"
						radius="100"
						color="#2f73f0"
						ariaLabel="loading"
						wrapperStyle
						wrapperClass
					/>
				)}
			</div>
		</div>
	);
};

export default WinnersTable;
