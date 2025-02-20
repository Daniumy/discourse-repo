const availableRows = [8, 9, 10, 11, 12, 13, 14, 15, 16];
const availableRisks = ["Low", "Normal", "High"];

const bucketColors = [
	"#5fff55",
	"#AAFF55",
	"#B7FF55",
	"#dcd400",
	"#f5a200",
	"#faa21f",
	"#ff6e3e",
	"#fa5a6f",
	"#f5466f",
];

function getBucketColor(index, total) {
	const middleIndex = Math.ceil(total / 2);
	const diff = Math.abs(middleIndex - index);
	return bucketColors[diff];
}

function getRiskColor(row) {
	switch (row) {
		case "Low":
			return "#86fd7d";
		case "Normal":
			return "#d9f758";
		case "High":
			return "#f57082";
		default:
			return "#86fd7d";
	}
}

const lowRiskNumbers = {
	8: [5.6, 2.1, 1.1, 1, 0.5, 1, 1.1, 2.1, 5.6],
	9: [5.6, 2, 1.6, 1, 0.7, 0.7, 1, 1.6, 2, 5.6],
	10: [8.9, 3, 1.4, 1.1, 1, 0.5, 1, 1.1, 1.4, 3, 8.9],
	11: [8.4, 3, 1.9, 1.3, 1, 0.7, 0.7, 1, 1.3, 1.9, 3, 8.4],
	12: [10, 3, 1.6, 1.4, 1.1, 1, 0.5, 1, 1.1, 1.4, 1.6, 3, 10],
	13: [8.1, 4, 3, 1.9, 1.2, 0.9, 0.7, 0.7, 0.9, 1.2, 1.9, 3, 4, 8.1],
	14: [7.1, 4, 1.9, 1.4, 1.3, 1.1, 1, 0.5, 1, 1.1, 1.3, 1.4, 1.9, 4, 7.1],
	15: [15, 8, 3, 2, 1.5, 1.1, 1, 0.7, 0.7, 1, 1.1, 1.5, 2, 3, 8, 15],
	16: [16, 9, 2, 1.4, 1.4, 1.2, 1.1, 1, 0.5, 1, 1.1, 1.2, 1.4, 1.4, 2, 9, 16],
};
const normalRiskNumbers = {
	8: [13, 3, 1.3, 0.7, 0.4, 0.7, 1.3, 3, 13],
	9: [18, 4, 1.7, 0.9, 0.5, 0.5, 0.9, 1.7, 4, 18],
	10: [22, 5, 2, 1.4, 0.6, 0.4, 0.6, 1.4, 2, 5, 22],
	11: [24, 6, 3, 1.8, 0.7, 0.5, 0.5, 0.7, 1.8, 3, 6, 24],
	12: [33, 11, 4, 2, 1.1, 0.6, 0.3, 0.6, 1.1, 2, 4, 11, 33],
	13: [43, 13, 6, 3, 1.3, 0.7, 0.4, 0.4, 0.7, 1.3, 3, 6, 13, 43],
	14: [58, 15, 7, 4, 1.9, 1, 0.5, 0.2, 0.5, 1, 1.9, 4, 7, 15, 58],
	15: [88, 18, 11, 5, 3, 1.3, 0.5, 0.3, 0.3, 0.5, 1.3, 3, 5, 11, 18, 88],
	16: [110, 41, 10, 5, 3, 1.5, 1, 0.5, 0.3, 0.5, 1, 1.5, 3, 5, 10, 41, 110],
};

const highRiskNumbers = {
	8: [29, 4, 1.5, 0.3, 0.2, 0.3, 1.5, 4, 29],
	9: [43, 7, 2, 0.6, 0.2, 0.2, 0.6, 2, 7, 43],
	10: [76, 10, 3, 0.9, 0.3, 0.2, 0.3, 0.9, 3, 10, 76],
	11: [120, 14, 5.2, 1.4, 0.4, 0.2, 0.2, 0.4, 1.4, 5.2, 14, 120],
	12: [170, 24, 8.1, 2, 0.7, 0.2, 0.2, 0.2, 0.7, 2, 8.1, 24, 170],
	13: [260, 37, 11, 4, 1, 0.2, 0.2, 0.2, 0.2, 1, 4, 11, 37, 260],
	14: [420, 56, 18, 5, 1.9, 0.3, 0.2, 0.2, 0.2, 0.3, 1.9, 5, 18, 56, 420],
	15: [620, 83, 27, 8, 3, 0.5, 0.2, 0.2, 0.2, 0.2, 0.5, 3, 8, 27, 83, 620],
	16: [1000, 130, 26, 9, 4, 2, 0.2, 0.2, 0.2, 0.2, 0.2, 2, 4, 9, 26, 130, 1000],
};

function getBucketText(index, totalAmount, selectedRisk) {
	switch (selectedRisk) {
		case "Low":
			return lowRiskNumbers[totalAmount][index];
		case "Normal":
			return normalRiskNumbers[totalAmount][index];
		case "High":
			return highRiskNumbers[totalAmount][index];
		default:
			return [];
	}
}

const ballsOptions = [
	{ value: 1, label: "1" },
	{ value: 2, label: "2" },
	{ value: 3, label: "3" },
	{ value: 4, label: "4" },
	{ value: 5, label: "5" },
	{ value: 6, label: "6" },
	{ value: 7, label: "7" },
	{ value: 8, label: "8" },
	{ value: 9, label: "9" },
	{ value: 10, label: "10" },
];

const simulationSpeedValues = [
	{ value: 0, label: "1" },
	{ value: 1, label: "1.25" },
	{ value: 2, label: "1.5" },
];

const simulationSpeedMobileArray = [0.5, 0.625, 0.75];

const simulationSpeedDesktopArray = [1, 1.25, 1.5];

const placeholderStyles = {
	placeholder: (defaultStyles) => {
		return {
			...defaultStyles,
			color: "#000",
		};
	},
	input: (provided) => ({
		...provided,
		// Set the inputMode to "none"
		inputMode: "none",
	}),
	dropdownIndicator: (provided) => {
		let style = {
			...provided,
			// Set the size of the arrow
			padding: 4,
			width: 30,
			height: 30,
		};

		if (window.innerWidth < 768) {
			style = {
				...style,
				// Set the size of the arrow icon for smaller screens
				padding: 1,
				width: 20,
				height: 20,
			};
		}

		return style;
	},
};

function getBallSize(cw) {
	if (cw > 1500) return 8;
	if (cw < 1500 && cw > 1000) return 7.2;
	if (cw < 1000) return 5;
}

function getPinSize(cw) {
	if (cw > 1500) return 6;
	if (cw < 1500 && cw > 1000) return 5;
	if (cw < 1000) return 3.7;
}

function getPinGap(cw) {
	if (cw > 1500) return 30;
	if (cw < 1500 && cw > 1000) return 24;
	if (cw < 1000) return 20;
}

function getFriction(windowWidth) {
	if (windowWidth > 1000) return 0.35;
	return 0.6;
}

function getFrictionAir(windowWidth) {
	if (windowWidth > 1000) return 0.1;
	return 0.15;
}

export {
	getBallSize,
	getPinSize,
	getPinGap,
	availableRows,
	bucketColors,
	getBucketColor,
	availableRisks,
	getRiskColor,
	getBucketText,
	ballsOptions,
	placeholderStyles,
	getFrictionAir,
	getFriction,
	simulationSpeedValues,
	simulationSpeedMobileArray,
	simulationSpeedDesktopArray,
};
