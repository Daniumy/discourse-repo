import "./PlinkoResults.css";

const PlinkoResults = ({ results, setResults }) => {
	function handleRefreshResults() {
		setResults([]);
	}

	return (
		<div className="plinko-results-wrapper">
			{results.length > 0 && (
				<div
					className="refresh-plinko-results"
					onClick={() => handleRefreshResults()}
				>
					Clean
				</div>
			)}
			{results.map((result, index) => {
				return (
					<div className="plinko-result" key={index}>
						<div className="plinko-result-column">
							<span>Bet</span>
							<span>{result.bet}</span>
						</div>
						<div className="plinko-result-column">
							<span>Payout</span>
							<span>{result.payout}</span>
						</div>
						<div className="plinko-result-column">
							<span>Profit</span>
							<span>{result.profit}</span>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default PlinkoResults;
