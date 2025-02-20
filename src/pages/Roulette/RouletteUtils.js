import chips from "../../assets/Chips/chips";

const numbers = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"11",
	"12",
	"13",
	"14",
	"15",
	"16",
	"17",
	"18",
	"19",
	"20",
	"21",
	"22",
	"23",
	"24",
	"25",
	"26",
	"27",
	"28",
	"29",
	"30",
	"31",
	"32",
	"33",
	"34",
	"35",
	"36",
];
const initialTableBets = {
	0: { values: [], multiplier: 36, hovered: false },
	"00": { values: [], multiplier: 36, hovered: false },
	1: { values: [], multiplier: 36, hovered: false },
	2: { values: [], multiplier: 36, hovered: false },
	16: { values: [], multiplier: 36, hovered: false },
	17: { values: [], multiplier: 36, hovered: false },
	18: { values: [], multiplier: 36, hovered: false },
	19: { values: [], multiplier: 36, hovered: false },
	20: { values: [], multiplier: 36, hovered: false },
	21: { values: [], multiplier: 36, hovered: false },
	22: { values: [], multiplier: 36, hovered: false },
	23: { values: [], multiplier: 36, hovered: false },
	24: { values: [], multiplier: 36, hovered: false },
	3: { values: [], multiplier: 36, hovered: false },
	4: { values: [], multiplier: 36, hovered: false },
	5: { values: [], multiplier: 36, hovered: false },
	6: { values: [], multiplier: 36, hovered: false },
	7: { values: [], multiplier: 36, hovered: false },
	8: { values: [], multiplier: 36, hovered: false },
	9: { values: [], multiplier: 36, hovered: false },
	10: { values: [], multiplier: 36, hovered: false },
	11: { values: [], multiplier: 36, hovered: false },
	12: { values: [], multiplier: 36, hovered: false },
	13: { values: [], multiplier: 36, hovered: false },
	14: { values: [], multiplier: 36, hovered: false },
	15: { values: [], multiplier: 36, hovered: false },
	25: { values: [], multiplier: 36, hovered: false },
	26: { values: [], multiplier: 36, hovered: false },
	27: { values: [], multiplier: 36, hovered: false },
	28: { values: [], multiplier: 36, hovered: false },
	29: { values: [], multiplier: 36, hovered: false },
	30: { values: [], multiplier: 36, hovered: false },
	31: { values: [], multiplier: 36, hovered: false },
	32: { values: [], multiplier: 36, hovered: false },
	33: { values: [], multiplier: 36, hovered: false },
	34: { values: [], multiplier: 36, hovered: false },
	35: { values: [], multiplier: 36, hovered: false },
	36: { values: [], multiplier: 36, hovered: false },
	"1to18": { values: [], multiplier: 2, hovered: false },
	"19to36": { values: [], multiplier: 2, hovered: false },
	"1st12": { values: [], multiplier: 3, hovered: false },
	"2nd12": { values: [], multiplier: 3, hovered: false },
	"3rd12": { values: [], multiplier: 3, hovered: false },
	Even: { values: [], multiplier: 2, hovered: false },
	Odd: { values: [], multiplier: 2, hovered: false },
	Red: { values: [], multiplier: 2, hovered: false },
	Black: { values: [], multiplier: 2, hovered: false },
	"1st": { values: [], multiplier: 3, hovered: false },
	"2nd": { values: [], multiplier: 3, hovered: false },
	"3rd": { values: [], multiplier: 3, hovered: false },
	"00_3": { values: [], multiplier: 18, hovered: false },
	"00_0": { values: [], multiplier: 18, hovered: false },
	"3_6": { values: [], multiplier: 18, hovered: false },
	"6_9": { values: [], multiplier: 18, hovered: false },
	"9_12": { values: [], multiplier: 18, hovered: false },
	"12_15": { values: [], multiplier: 18, hovered: false },
	"15_18": { values: [], multiplier: 18, hovered: false },
	"18_21": { values: [], multiplier: 18, hovered: false },
	"21_24": { values: [], multiplier: 18, hovered: false },
	"24_27": { values: [], multiplier: 18, hovered: false },
	"27_30": { values: [], multiplier: 18, hovered: false },
	"30_33": { values: [], multiplier: 18, hovered: false },
	"33_36": { values: [], multiplier: 18, hovered: false },
	"00_3_2": { values: [], multiplier: 12, hovered: false },
	"3_2": { values: [], multiplier: 18, hovered: false },
	"3_6_2_5": { values: [], multiplier: 9, hovered: false }, //9
	"6_5": { values: [], multiplier: 18, hovered: false },
	"6_9_5_8": { values: [], multiplier: 9, hovered: false }, //9
	"9_8": { values: [], multiplier: 18, hovered: false },
	"9_12_8_11": { values: [], multiplier: 9, hovered: false }, //9
	"12_11": { values: [], multiplier: 18, hovered: false },
	"12_15_11_14": { values: [], multiplier: 9, hovered: false }, //9
	"15_14": { values: [], multiplier: 18, hovered: false },
	"15_18_14_17": { values: [], multiplier: 9, hovered: false }, //9
	"18_17": { values: [], multiplier: 18, hovered: false },
	"18_21_17_20": { values: [], multiplier: 9, hovered: false }, //9
	"21_20": { values: [], multiplier: 18, hovered: false },
	"21_24_20_23": { values: [], multiplier: 9, hovered: false }, //9
	"24_23": { values: [], multiplier: 18, hovered: false },
	"24_27_23_26": { values: [], multiplier: 9, hovered: false }, //9
	"27_26": { values: [], multiplier: 18, hovered: false },
	"27_30_26_29": { values: [], multiplier: 9, hovered: false }, //9
	"30_29": { values: [], multiplier: 18, hovered: false },
	"30_33_29_32": { values: [], multiplier: 9, hovered: false }, //9
	"33_32": { values: [], multiplier: 18, hovered: false },
	"33_36_32_35": { values: [], multiplier: 9, hovered: false }, //9
	"36_35": { values: [], multiplier: 18, hovered: false },
	"00_0_2": { values: [], multiplier: 12, hovered: false },
	"2_5": { values: [], multiplier: 18, hovered: false },
	"5_8": { values: [], multiplier: 18, hovered: false },
	"8_11": { values: [], multiplier: 18, hovered: false },
	"11_14": { values: [], multiplier: 18, hovered: false },
	"14_17": { values: [], multiplier: 18, hovered: false },
	"17_20": { values: [], multiplier: 18, hovered: false },
	"20_23": { values: [], multiplier: 18, hovered: false },
	"23_26": { values: [], multiplier: 18, hovered: false },
	"26_29": { values: [], multiplier: 18, hovered: false },
	"29_32": { values: [], multiplier: 18, hovered: false },
	"32_35": { values: [], multiplier: 18, hovered: false },
	"0_2_1": { values: [], multiplier: 12, hovered: false },
	"2_1": { values: [], multiplier: 18, hovered: false },
	"2_5_1_4": { values: [], multiplier: 9, hovered: false },
	"5_4": { values: [], multiplier: 18, hovered: false },
	"5_8_4_7": { values: [], multiplier: 9, hovered: false },
	"8_7": { values: [], multiplier: 18, hovered: false },
	"8_11_7_10": { values: [], multiplier: 9, hovered: false },
	"11_10": { values: [], multiplier: 18, hovered: false },
	"11_14_10_13": { values: [], multiplier: 9, hovered: false },
	"14_13": { values: [], multiplier: 18, hovered: false },
	"14_17_13_16": { values: [], multiplier: 9, hovered: false },
	"17_16": { values: [], multiplier: 18, hovered: false },
	"17_20_16_19": { values: [], multiplier: 9, hovered: false },
	"20_19": { values: [], multiplier: 18, hovered: false },
	"20_23_19_22": { values: [], multiplier: 9, hovered: false },
	"23_22": { values: [], multiplier: 18, hovered: false },
	"23_26_22_25": { values: [], multiplier: 9, hovered: false },
	"26_25": { values: [], multiplier: 18, hovered: false },
	"26_29_25_28": { values: [], multiplier: 9, hovered: false },
	"29_28": { values: [], multiplier: 18, hovered: false },
	"29_32_28_31": { values: [], multiplier: 9, hovered: false },
	"32_31": { values: [], multiplier: 18, hovered: false },
	"32_35_31_34": { values: [], multiplier: 9, hovered: false },
	"35_34": { values: [], multiplier: 18, hovered: false },
	"0_1": { values: [], multiplier: 18, hovered: false },
	"1_4": { values: [], multiplier: 18, hovered: false },
	"4_7": { values: [], multiplier: 18, hovered: false },
	"7_10": { values: [], multiplier: 18, hovered: false },
	"10_13": { values: [], multiplier: 18, hovered: false },
	"13_16": { values: [], multiplier: 18, hovered: false },
	"16_19": { values: [], multiplier: 18, hovered: false },
	"19_22": { values: [], multiplier: 18, hovered: false },
	"22_25": { values: [], multiplier: 18, hovered: false },
	"25_28": { values: [], multiplier: 18, hovered: false },
	"28_31": { values: [], multiplier: 18, hovered: false },
	"31_34": { values: [], multiplier: 18, hovered: false },
};

const adjacents = {
	0: ["00_0_2", "0_2_1", "00_0", "0_1", "0"],
	"00": ["00_0", "00_0_2", "00_3", "00_3_2", "00"],
	1: ["0_2_1", "1_4", "0_1", "2_1", "2_5_1_4", "1"],
	2: ["00_0_2", "0_2_1", "2_1", "2_5_1_4", "2_5", "00_3_2", "3_2", "3_6_2_5", "2"],
	3: ["00_3_2", "3_2", "00_3", "3_6_2_5", "3_6", "3"],
	4: ["1_4", "4_7", "5_4", "2_5_1_4", "5_8_4_7", "4"],
	5: ["2_5", "6_5", "5_8", "5_4", "3_6_2_5", "6_9_5_8", "5_8_4_7", "2_5_1_4", "5"],
	6: ["3_6", "6_9", "6_5", "3_6_2_5", "6_9_5_8", "6"],
	7: ["4_7", "7_10", "8_7", "5_8_4_7", "8_11_7_10", "7"],
	8: ["5_8", "8_11", "9_8", "8_7", "6_9_5_8", "9_12_8_11", "8_11_7_10", "5_8_4_7", "8"],
	9: ["6_9", "9_12", "9_8", "6_9_5_8", "9_12_8_11", "9"],
	10: ["7_10", "10_13", "11_10", "8_11_7_10", "11_14_10_13", "10"],
	11: ["8_11", "11_14", "12_11", "11_10", "9_12_8_11", "12_15_11_14", "11_14_10_13", "8_11_7_10", "11"],
	12: ["9_12", "12_15", "12_11", "9_12_8_11", "12_15_11_14", "12"],
	13: ["10_13", "13_16", "14_13", "11_14_10_13", "14_17_13_16", "13"],
	14: ["11_14", "14_17", "15_14", "14_13", "12_15_11_14", "15_18_14_17", "14_17_13_16", "11_14_10_13", "14"],
	15: ["12_15", "15_18", "15_14", "12_15_11_14", "15_18_14_17", "15"],
	16: ["13_16", "16_19", "17_16", "14_17_13_16", "17_20_16_19", "16"],
	17: ["14_17", "17_20", "18_17", "17_16", "15_18_14_17", "18_21_17_20", "17_20_16_19", "14_17_13_16", "17"],
	18: ["15_18", "18_21", "18_17", "15_18_14_17", "18_21_17_20", "18"],
	19: ["16_19", "19_22", "20_19", "17_20_16_19", "20_23_19_22", "19"],
	20: ["17_20", "20_23", "21_20", "20_19", "18_21_17_20", "21_24_20_23", "20_23_19_22", "17_20_16_19", "20"],
	21: ["18_21", "21_24", "21_20", "18_21_17_20", "21_24_20_23", "21"],
	22: ["19_22", "22_25", "23_22", "20_23_19_22", "23_26_22_25", "22"],
	23: ["20_23", "23_26", "24_23", "23_22", "21_24_20_23", "24_27_23_26", "23_26_22_25", "20_23_19_22", "23"],
	24: ["21_24", "24_27", "24_23", "21_24_20_23", "24_27_23_26", "24"],
	25: ["22_25", "25_28", "26_25", "23_26_22_25", "26_29_25_28", "25"],
	26: ["23_26", "26_29", "27_26", "26_25", "24_27_23_26", "27_30_26_29", "26_29_25_28", "23_26_22_25", "26"],
	27: ["24_27", "27_30", "27_26", "24_27_23_26", "27_30_26_29", "27"],
	28: ["25_28", "28_31", "29_28", "26_29_25_28", "29_32_28_31", "28"],
	29: ["26_29", "29_32", "30_29", "29_28", "27_30_26_29", "30_33_29_32", "29_32_28_31", "26_29_25_28", "29"],
	30: ["27_30", "30_33", "30_29", "27_30_26_29", "30_33_29_32", "30"],
	31: ["28_31", "31_34", "32_31", "29_32_28_31", "32_35_31_34", "31"],
	32: ["29_32", "32_35", "33_32", "32_31", "30_33_29_32", "33_36_32_35", "32_35_31_34", "29_32_28_31", "32"],
	33: ["30_33", "33_36", "33_32", "30_33_29_32", "33_36_32_35", "33"],
	34: ["31_34", "35_34", "32_35_31_34", "34"],
	35: ["32_35", "36_35", "35_34", "33_36_32_35", "32_35_31_34", "35"],
	36: ["33_36", "36_35", "33_36_32_35", "36"],
};

//esto es lo MÁXIMO que supuestamente me van a poder pagar unicamente con los numeros individuales y sus adyacentes en el mejor de los casos para el usuario.
const LIMITS = {
	ERG: 100,
	CYPX: 8000,
	COMET: 1500000,
	SigUSD: 18,
	EGIO: 200000,
	FLUX: 27,
	EPAD: 6500,
	PAIDEIA: 10000,
	BASS: 10,
	ERGONE: 800,
	LOVE: 7500,
	GREASYCEX: 700000,
	PEPERG: 40000,
	BOBER: 50,
	GIF: 200000000,
};

function getAdjacents(str) {
	const arr = str.split("_");
	const arrayOfAdjacents = [];
	arr.forEach((element) => {
		arrayOfAdjacents.push(adjacents[element]);
	});
	return arrayOfAdjacents;
}

const ergChips = [
	{ image: chips.ceroOne, value: 0.1 },
	{ image: chips.cero25, value: 0.25 },
	{ image: chips.cero50, value: 0.5 },
	{ image: chips.cero75, value: 0.75 },
	{ image: chips.one, value: 1 },
];

const ergChipsAux = {
	0.1: chips.ceroOne,
	0.25: chips.cero25,
	0.5: chips.cero50,
	0.75: chips.cero75,
	1: chips.one,
};

const bassChips = [
	{ image: chips.ceroCeroOne, value: 0.01 },
	{ image: chips.ceroCero25, value: 0.25 },
	{ image: chips.ceroCeroFive, value: 0.5 },
	{ image: chips.ceroCero75, value: 0.75 },
	{ image: chips.ceroOneFirst, value: 1 },
];

const bassChipsAux = {
	0.01: chips.ceroCeroOne,
	0.25: chips.ceroCero25,
	0.5: chips.ceroCeroFive,
	0.75: chips.ceroCero75,
	1: chips.ceroOneFirst,
};

const cypxChips = [
	{ image: chips.ten_2, value: 10 },
	{ image: chips.twenty5, value: 25 },
	{ image: chips.fifty, value: 50 },
	{ image: chips.seventy5, value: 75 },
	{ image: chips.hundred, value: 100 },
];

const cypxChipsAux = {
	10: chips.ten_2,
	25: chips.twenty5,
	50: chips.fifty,
	75: chips.seventy5,
	100: chips.hundred,
};

const cometChips = [
	{ image: chips.tenThousand_2, value: 10000 },
	{ image: chips.twentyFiveThousand, value: 25000 },
	{ image: chips.fiftyThousand, value: 50000 },
	{ image: chips.seventyFiveThousand, value: 75000 },
	{ image: chips.hundredThousand, value: 100000 },
];

const cometChipsAux = {
	10000: chips.tenThousand_2,
	25000: chips.twentyFiveThousand,
	50000: chips.fiftyThousand,
	75000: chips.seventyFiveThousand,
	100000: chips.hundredThousand,
};

const egioChips = [
	{ image: chips.thousand_2, value: 1000 },
	{ image: chips.twothousand50, value: 2500 },
	{ image: chips.fivethousand, value: 5000 },
	{ image: chips.seventhousand50, value: 7500 },
	{ image: chips.tenThousand, value: 10000 },
];

const egioChipsAux = {
	1000: chips.thousand_2,
	2500: chips.twothousand50,
	5000: chips.fivethousand,
	7500: chips.seventhousand50,
	10000: chips.tenThousand,
};

function firstRowToDoubleHorizontal(number) {
	switch (number) {
		case "3":
			return "00_3";
		case "6":
			return "3_6";
		case "9":
			return "6_9";
		case "12":
			return "9_12";
		case "15":
			return "12_15";
		case "18":
			return "15_18";
		case "21":
			return "18_21";
		case "24":
			return "21_24";
		case "27":
			return "24_27";
		case "30":
			return "27_30";
		case "33":
			return "30_33";
		case "36":
			return "33_36";
		default:
			return "";
	}
}

function firstRowToDoubleVertical(number) {
	switch (number) {
		case "3":
			return "3_2";
		case "6":
			return "6_5";
		case "9":
			return "9_8";
		case "12":
			return "12_11";
		case "15":
			return "15_14";
		case "18":
			return "18_17";
		case "21":
			return "21_20";
		case "24":
			return "24_23";
		case "27":
			return "27_26";
		case "30":
			return "30_29";
		case "33":
			return "33_32";
		case "36":
			return "36_35";
		default:
			return "";
	}
}

function secondRowToDoubleVertical(number) {
	switch (number) {
		case "2":
			return "2_1";
		case "5":
			return "5_4";
		case "8":
			return "8_7";
		case "11":
			return "11_10";
		case "14":
			return "14_13";
		case "17":
			return "17_16";
		case "20":
			return "20_19";
		case "23":
			return "23_22";
		case "26":
			return "26_25";
		case "29":
			return "29_28";
		case "32":
			return "32_31";
		case "35":
			return "35_34";
		default:
			return "";
	}
}

function secondRowToDoubleHorizontal(number) {
	switch (number) {
		case "2":
			return "00_0_2";
		case "5":
			return "2_5";
		case "8":
			return "5_8";
		case "11":
			return "8_11";
		case "14":
			return "11_14";
		case "17":
			return "14_17";
		case "20":
			return "17_20";
		case "23":
			return "20_23";
		case "26":
			return "23_26";
		case "29":
			return "26_29";
		case "32":
			return "29_32";
		case "35":
			return "32_35";
		default:
			return "";
	}
}

function thirdRowToDoubleHorizontal(number) {
	switch (number) {
		case "1":
			return "0_1";
		case "4":
			return "1_4";
		case "7":
			return "4_7";
		case "10":
			return "7_10";
		case "13":
			return "10_13";
		case "16":
			return "13_16";
		case "19":
			return "16_19";
		case "22":
			return "19_22";
		case "25":
			return "22_25";
		case "28":
			return "25_28";
		case "31":
			return "28_31";
		case "34":
			return "31_34";
		default:
			return "";
	}
}

function fromRowToQuadruple(number) {
	switch (number) {
		case "3":
			return "00_3_2";
		case "6":
			return "3_6_2_5";
		case "9":
			return "6_9_5_8";
		case "12":
			return "9_12_8_11";
		case "15":
			return "12_15_11_14";
		case "18":
			return "15_18_14_17";
		case "21":
			return "18_21_17_20";
		case "24":
			return "21_24_20_23";
		case "27":
			return "24_27_23_26";
		case "30":
			return "27_30_26_29";
		case "33":
			return "30_33_29_32";
		case "36":
			return "33_36_32_35";
		case "2":
			return "0_2_1";
		case "5":
			return "2_5_1_4";
		case "8":
			return "5_8_4_7";
		case "11":
			return "8_11_7_10";
		case "14":
			return "11_14_10_13";
		case "17":
			return "14_17_13_16";
		case "20":
			return "17_20_16_19";
		case "23":
			return "20_23_19_22";
		case "26":
			return "23_26_22_25";
		case "29":
			return "26_29_25_28";
		case "32":
			return "29_32_28_31";
		case "35":
			return "32_35_31_34";
		default:
			return "";
	}
}

const ergoChips = ["ceroOne"];
const firstRow = [
	{
		value: "3",
		style: { backgroundColor: "red" },
		verticalStyle: {
			background: "linear-gradient(180deg, red 50%, black 50%)",
		},
		horizontalStyle: {
			backgroundColor: "red",
		},
		quadrupleStyle: {
			background: "linear-gradient(180deg, red 50%, black 50%)",
		},
	},
	{
		value: "6",
		style: { backgroundColor: "black" },
		verticalStyle: {
			background: "linear-gradient(180deg, black 50%, red 50%)",
		},
		horizontalStyle: {
			background: "linear-gradient(90deg, red 50%, black 50%)",
		},
		quadrupleStyle: {
			background: "conic-gradient(black 90deg,red 90deg 180deg,black 180deg 271deg,red 270deg 360deg)",
		},
	},
	{
		value: "9",
		style: { backgroundColor: "red" },
		verticalStyle: {
			background: "linear-gradient(180deg, red 50%, black 50%)",
		},
		horizontalStyle: {
			background: "linear-gradient(90deg, black 50%, red 50%)",
		},
		quadrupleStyle: {
			background: "conic-gradient(red 90deg,black 90deg 180deg,red 180deg 271deg,black 270deg 360deg)",
		},
	},
	{
		value: "12",
		style: { backgroundColor: "red" },
		verticalStyle: {
			background: "linear-gradient(180deg, red 50%, black 50%)",
		},
		horizontalStyle: {
			background: "linear-gradient(90deg, red 50%, red 50%)",
		},
		quadrupleStyle: {
			background: "conic-gradient(red 90deg,black 90deg 180deg,black 180deg 271deg,red 270deg 360deg)",
		},
	},
	{
		value: "15",
		style: { backgroundColor: "black" },
		verticalStyle: {
			background: "linear-gradient(180deg, black 50%, red 50%)",
		},
		horizontalStyle: {
			background: "linear-gradient(90deg, red 50%, black 50%)",
		},
		quadrupleStyle: {
			background: "conic-gradient(black 90deg,red 90deg 180deg,black 180deg 271deg,red 270deg 360deg)",
		},
	},
	{
		value: "18",
		style: { backgroundColor: "red" },
		verticalStyle: {
			background: "linear-gradient(180deg, red 50%, black 50%)",
		},
		horizontalStyle: {
			background: "linear-gradient(90deg, black 50%, red 50%)",
		},
		quadrupleStyle: {
			background: "conic-gradient(red 90deg,black 90deg 180deg,red 180deg 271deg,black 270deg 360deg)",
		},
	},
	{
		value: "21",
		style: { backgroundColor: "red" },
		verticalStyle: {
			background: "linear-gradient(180deg, red 50%, black 50%)",
		},
		horizontalStyle: {
			background: "linear-gradient(90deg, red 50%, red 50%)",
		},
		quadrupleStyle: {
			background: "conic-gradient(red 90deg,black 90deg 180deg,black 180deg 271deg,red 270deg 360deg)",
		},
	},
	{
		value: "24",
		style: { backgroundColor: "black" },
		verticalStyle: {
			background: "linear-gradient(180deg, black 50%, red 50%)",
		},
		horizontalStyle: {
			background: "linear-gradient(90deg, red 50%, black 50%)",
		},
		quadrupleStyle: {
			background: "conic-gradient(black 90deg,red 90deg 180deg,black 180deg 271deg,red 270deg 360deg)",
		},
	},
	{
		value: "27",
		style: { backgroundColor: "red" },
		verticalStyle: {
			background: "linear-gradient(180deg, red 50%, black 50%)",
		},
		horizontalStyle: {
			background: "linear-gradient(90deg, black 50%, red 50%)",
		},
		quadrupleStyle: {
			background: "conic-gradient(red 90deg,black 90deg 180deg,red 180deg 271deg,black 270deg 360deg)",
		},
	},
	{
		value: "30",
		style: { backgroundColor: "red" },
		verticalStyle: {
			background: "linear-gradient(180deg, red 50%, black 50%)",
		},
		horizontalStyle: {
			background: "linear-gradient(90deg, red 50%, red 50%)",
		},
		quadrupleStyle: {
			background: "conic-gradient(red 90deg,black 90deg 180deg,black 180deg 271deg,red 270deg 360deg)",
		},
	},
	{
		value: "33",
		style: { backgroundColor: "black" },
		verticalStyle: {
			background: "linear-gradient(180deg, black 50%, red 50%)",
		},
		horizontalStyle: {
			background: "linear-gradient(90deg, red 50%, black 50%)",
		},
		quadrupleStyle: {
			background: "conic-gradient(black 90deg,red 90deg 180deg,black 180deg 271deg,red 270deg 360deg)",
		},
	},
	{
		value: "36",
		style: { backgroundColor: "red" },
		verticalStyle: {
			background: "linear-gradient(180deg, red 50%, black 50%)",
		},
		horizontalStyle: {
			background: "linear-gradient(90deg, black 50%, red 50%)",
		},
		quadrupleStyle: {
			background: "conic-gradient(red 90deg,black 90deg 180deg,red 180deg 271deg,black 270deg 360deg)",
		},
	},
];
const secondRow = [
	{
		value: "2",
		style: { backgroundColor: "black" },
		verticalStyle: {
			background: "linear-gradient(180deg, black 50%, red 50%)",
		},
		horizontalStyle: {
			backgroundColor: "black",
		},
		quadrupleStyle: {
			background: "linear-gradient(180deg, black 50%, red 50%)",
		},
	},
	{
		value: "5",
		style: { backgroundColor: "red" },
		verticalStyle: {
			background: "linear-gradient(180deg, red 50%, black 50%)",
		},
		horizontalStyle: {
			background: "linear-gradient(90deg, black 50%, red 50%)",
		},
		quadrupleStyle: {
			background: "conic-gradient(red 90deg,black 90deg 180deg,red 180deg 271deg,black 270deg 360deg)",
		},
	},
	{
		value: "8",
		style: { backgroundColor: "black" },
		verticalStyle: {
			background: "linear-gradient(180deg, black 50%, red 50%)",
		},
		horizontalStyle: {
			background: "linear-gradient(90deg, red 50%, black 50%)",
		},
		quadrupleStyle: {
			background: "conic-gradient(black 90deg,red 90deg 180deg,black 180deg 271deg,red 270deg 360deg)",
		},
	},
	{
		value: "11",
		style: { backgroundColor: "black" },
		verticalStyle: {
			background: "linear-gradient(180deg, black 50%, black 50%)",
		},
		horizontalStyle: {
			background: "linear-gradient(90deg, black 50%, black 50%)",
		},
		quadrupleStyle: {
			background: "conic-gradient(black 90deg,black 90deg 180deg,red 180deg 271deg,black 270deg 360deg)",
		},
	},
	{
		value: "14",
		style: { backgroundColor: "red" },
		verticalStyle: {
			background: "linear-gradient(180deg, red 50%, black 50%)",
		},
		horizontalStyle: {
			background: "linear-gradient(90deg, black 50%, red 50%)",
		},
		quadrupleStyle: {
			background: "conic-gradient(red 90deg,black 90deg 180deg,black 180deg 271deg,black 270deg 360deg)",
		},
	},
	{
		value: "17",
		style: { backgroundColor: "black" },
		verticalStyle: {
			background: "linear-gradient(180deg, black 50%, red 50%)",
		},
		horizontalStyle: {
			background: "linear-gradient(90deg, red 50%, black 50%)",
		},
		quadrupleStyle: {
			background: "conic-gradient(black 90deg,red 90deg 180deg,black 180deg 271deg,red 270deg 360deg)",
		},
	},
	{
		value: "20",
		style: { backgroundColor: "black" },
		verticalStyle: {
			background: "linear-gradient(180deg, black 50%, red 50%)",
		},
		horizontalStyle: {
			background: "linear-gradient(90deg, black 50%, black 50%)",
		},
		quadrupleStyle: {
			background: "conic-gradient(black 90deg,red 90deg 180deg,red 180deg 271deg,black 270deg 360deg)",
		},
	},
	{
		value: "23",
		style: { backgroundColor: "red" },
		verticalStyle: {
			background: "linear-gradient(180deg, red 50%, black 50%)",
		},
		horizontalStyle: {
			background: "linear-gradient(90deg, black 50%, red 50%)",
		},
		quadrupleStyle: {
			background: "conic-gradient(red 90deg,black 90deg 180deg,red 180deg 271deg,black 270deg 360deg)",
		},
	},
	{
		value: "26",
		style: { backgroundColor: "black" },
		verticalStyle: {
			background: "linear-gradient(180deg, black 50%, red 50%)",
		},
		horizontalStyle: {
			background: "linear-gradient(90deg, red 50%, black 50%)",
		},
		quadrupleStyle: {
			background: "conic-gradient(black 90deg,red 90deg 180deg,black 180deg 271deg,red 270deg 360deg)",
		},
	},
	{
		value: "29",
		style: { backgroundColor: "black" },
		verticalStyle: {
			background: "linear-gradient(180deg, black 50%, black 50%)",
		},
		horizontalStyle: {
			background: "linear-gradient(90deg, black 50%, black 50%)",
		},
		quadrupleStyle: {
			background: "conic-gradient(black 90deg,black 90deg 180deg,red 180deg 271deg,black 270deg 360deg)",
		},
	},
	{
		value: "32",
		style: { backgroundColor: "red" },
		verticalStyle: {
			background: "linear-gradient(180deg, red 50%, black 50%)",
		},
		horizontalStyle: {
			background: "linear-gradient(90deg, black 50%, red 50%)",
		},
		quadrupleStyle: {
			background: "conic-gradient(red 90deg,black 90deg 180deg,black 180deg 271deg,black 270deg 360deg)",
		},
	},
	{
		value: "35",
		style: { backgroundColor: "black" },
		verticalStyle: {
			background: "linear-gradient(180deg, black 50%, red 50%)",
		},
		horizontalStyle: {
			background: "linear-gradient(90deg, red 50%, black 50%)",
		},
		quadrupleStyle: {
			background: "conic-gradient(black 90deg,red 90deg 180deg,black 180deg 271deg,red 270deg 360deg)",
		},
	},
];
const thirdRow = [
	{
		value: "1",
		style: { backgroundColor: "red" },
		horizontalStyle: {
			backgroundColor: "red",
		},
	},
	{
		value: "4",
		style: { backgroundColor: "black" },
		horizontalStyle: {
			background: "linear-gradient(90deg, red 50%, black 50%)",
		},
	},
	{
		value: "7",
		style: { backgroundColor: "red" },
		horizontalStyle: {
			background: "linear-gradient(90deg, black 50%, red 50%)",
		},
	},
	{
		value: "10",
		style: { backgroundColor: "black" },
		horizontalStyle: {
			background: "linear-gradient(90deg, red 50%, black 50%)",
		},
	},
	{
		value: "13",
		style: { backgroundColor: "black" },
		horizontalStyle: {
			background: "linear-gradient(90deg, black 50%, black 50%)",
		},
	},
	{
		value: "16",
		style: { backgroundColor: "red" },
		horizontalStyle: {
			background: "linear-gradient(90deg, black 50%, red 50%)",
		},
	},
	{
		value: "19",
		style: { backgroundColor: "red" },
		horizontalStyle: {
			background: "linear-gradient(90deg, red 50%, red 50%)",
		},
	},
	{
		value: "22",
		style: { backgroundColor: "black" },
		horizontalStyle: {
			background: "linear-gradient(90deg, red 50%, black 50%)",
		},
	},
	{
		value: "25",
		style: { backgroundColor: "red" },
		horizontalStyle: {
			background: "linear-gradient(90deg, black 50%, red 50%)",
		},
	},
	{
		value: "28",
		style: { backgroundColor: "black" },
		horizontalStyle: {
			background: "linear-gradient(90deg, red 50%, black 50%)",
		},
	},
	{
		value: "31",
		style: { backgroundColor: "black" },
		horizontalStyle: {
			background: "linear-gradient(90deg, black 50%, black 50%)",
		},
	},
	{
		value: "34",
		style: { backgroundColor: "red" },
		horizontalStyle: {
			background: "linear-gradient(90deg, black 50%, red 50%)",
		},
	},
];
const bottomTopRow = ["1st12", "2nd12", "3rd12"];
const bottomBottomRow = [
	{ value: "1to18", style: { borderBottomLeftRadius: 8 } },
	{ value: "Even", style: { paddingRight: 15 } },
	{ value: "Red", style: { backgroundColor: "red" } },
	{
		value: "Black",
		style: { backgroundColor: "black", color: "white", paddingRight: 5 },
	},
	{ value: "Odd", style: null },
	{ value: "19to36", style: { borderBottomRightRadius: 8 } },
];

const multipliers = [2, 3, 9, 12, 18, 36];

function isChipInMultiplier(tableBets, multiplier) {
	for (const number in tableBets) {
		const tableSpot = tableBets[number];
		if (tableSpot["values"].length > 0 && tableSpot.multiplier === multiplier) {
			return true;
		}
	}
}

function maxBetPerMultiplier(multiplier) {
	switch (multiplier) {
		case 2:
			return 18;
		case 3:
			return 12;
		case 9:
			return 4;
		case 12:
			return 3;
		case 18:
			return 2;
		case 36:
			return 1;
		default:
			return 0;
	}
}

const maxAmountPerToken = {
	ERG: [10, 5],
	COMET: [400000, 200000],
	CYPX: [2000, 1000],
	SigUSD: [4, 2],
	EGIO: [40000, 20000],
	FLUX: [5.25, 2.75],
	EPAD: [1700, 850],
	PAIDEIA: [2300, 1150],
	BASS: [3, 1.5],
	ERGONE: [200, 100],
	LOVE: [2500, 1250],
	GREASYCEX: [100000, 50000],
	PEPERG: [6000, 3000],
	BOBER: [7.5, 3.75],
	GIF: [40000000, 20000000],
};

function getMaxAmountGivenNumber(number, selectedCoin) {
	const multiplier = initialTableBets[number].multiplier;
	switch (multiplier) {
		case 2:
			return maxAmountPerToken[selectedCoin][0];
		case 3:
			return maxAmountPerToken[selectedCoin][1];
		default:
			return maxAmountPerToken[selectedCoin][1];
	}
}

function fromNumberFieldToString(field) {
	switch (field) {
		case "0":
			return "zero";
		case "00":
			return "doubleZero";
		case "1":
			return "one";
		case "2":
			return "two";
		case "3":
			return "three";
		case "4":
			return "four";
		case "5":
			return "five";
		case "6":
			return "six";
		case "7":
			return "seven";
		case "8":
			return "eight";
		case "9":
			return "nine";
		case "10":
			return "ten";
		case "11":
			return "eleven";
		case "12":
			return "twelve";
		case "13":
			return "thirteen";
		case "14":
			return "fourteen";
		case "15":
			return "fifteen";
		case "16":
			return "sixteen";
		case "17":
			return "seventeen";
		case "18":
			return "eighteen";
		case "19":
			return "nineteen";
		case "20":
			return "twenty";
		case "21":
			return "twentyOne";
		case "22":
			return "twentyTwo";
		case "23":
			return "twentyThree";
		case "24":
			return "twentyFour";
		case "25":
			return "twentyFive";
		case "26":
			return "twentySix";
		case "27":
			return "twentySeven";
		case "28":
			return "twentyEight";
		case "29":
			return "twentyNine";
		case "30":
			return "thirty";
		case "31":
			return "thirtyOne";
		case "32":
			return "thirtyTwo";
		case "33":
			return "thirtyThree";
		case "34":
			return "thirtyFour";
		case "35":
			return "thirtyFive";
		case "36":
			return "thirtySix";
		case "1to18":
			return "oneToEighteen";
		case "19to36":
			return "nineteenToThirtySix";
		case "1st12":
			return "firstTwelve";
		case "2nd12":
			return "secondTwelve";
		case "3rd12":
			return "thirdTwelve";
		case "Even":
			return "even";
		case "Odd":
			return "odd";
		case "Red":
			return "red";
		case "Black":
			return "black";
		case "1st":
			return "first";
		case "2nd":
			return "second";
		case "3rd":
			return "third";
		case "00_0":
			return "doubleZeroZero";
		case "00_3":
			return "doubleZeroThree";
		case "3_6":
			return "threeSix";
		case "6_9":
			return "sixNine";
		case "9_12":
			return "nineTwelve";
		case "12_15":
			return "twelveFifteen";
		case "15_18":
			return "fifteenEighteen";
		case "18_21":
			return "eighteenTwentyOne";
		case "21_24":
			return "twentyOneTwentyFour";
		case "24_27":
			return "twentyFourTwentySeven";
		case "27_30":
			return "twentySevenThirty";
		case "30_33":
			return "thirtyThirtyThree";
		case "33_36":
			return "thirtyThreeThirtySix";
		case "00_3_2":
			return "doubleZeroThreeTwo";
		case "3_2":
			return "threeTwo";
		case "3_6_2_5":
			return "threeSixTwoFive";
		case "6_5":
			return "sixFive";
		case "6_9_5_8":
			return "sixNineFiveEight";
		case "9_8":
			return "nineEight";
		case "9_12_8_11":
			return "nineTwelveEightEleven";
		case "12_11":
			return "twelveEleven";
		case "12_15_11_14":
			return "twelveFifteenElevenFourteen";
		case "15_14":
			return "fifteenFourteen";
		case "15_18_14_17":
			return "fifteenEighteenFourteenSeventeen";
		case "18_17":
			return "eighteenSeventeen";
		case "18_21_17_20":
			return "eighteenTwentyOneSeventeenTwenty";
		case "21_20":
			return "twentyOneTwenty";
		case "21_24_20_23":
			return "twentyOneTwentyFourTwentyTwentyThree";
		case "24_23":
			return "twentyFourTwentyThree";
		case "24_27_23_26":
			return "twentyFourTwentySevenTwentyThreeTwentySix";
		case "27_26":
			return "twentySevenTwentySix";
		case "27_30_26_29":
			return "twentySevenThirtyTwentySixTwentyNine";
		case "30_29":
			return "thirtyTwentyNine";
		case "30_33_29_32":
			return "thirtyThirtyThreeTwentyNineThirtyTwo";
		case "33_32":
			return "thirtyThreeThirtyTwo";
		case "33_36_32_35":
			return "thirtyThreeThirtySixThirtyTwoThirtyFive";
		case "36_35":
			return "thirtySixThirtyFive";
		case "00_0_2":
			return "doubleZeroZeroTwo";
		case "2_5":
			return "twoFive";
		case "5_8":
			return "fiveEight";
		case "8_11":
			return "eightEleven";
		case "11_14":
			return "elevenFourteen";
		case "14_17":
			return "fourteenSeventeen";
		case "17_20":
			return "seventeenTwenty";
		case "20_23":
			return "twentyTwentyThree";
		case "23_26":
			return "twentyThreeTwentySix";
		case "26_29":
			return "twentySixTwentyNine";
		case "29_32":
			return "twentyNineThirtyTwo";
		case "32_35":
			return "thirtyTwoThirtyFive";
		case "0_2_1":
			return "zeroTwoOne";
		case "2_1":
			return "twoOne";
		case "2_5_1_4":
			return "twoFiveOneFour";
		case "5_4":
			return "fiveFour";
		case "5_8_4_7":
			return "fiveEightFourSeven";
		case "8_7":
			return "eightSeven";
		case "8_11_7_10":
			return "eightElevenSevenTen";
		case "11_10":
			return "elevenTen";
		case "11_14_10_13":
			return "elevenFourteenTenThirteen";
		case "14_13":
			return "fourteenThirteen";
		case "14_17_13_16":
			return "fourteenSeventeenThirteenSixteen";
		case "17_16":
			return "seventeenSixteen";
		case "17_20_16_19":
			return "seventeenTwentySixteenNineteen";
		case "20_19":
			return "twentyNineteen";
		case "20_23_19_22":
			return "twentyTwentyThreeNineteenTwentyTwo";
		case "23_22":
			return "twentyThreeTwentyTwo";
		case "23_26_22_25":
			return "twentyThreeTwentySixTwentyTwoTwentyFive";
		case "26_25":
			return "twentySixTwentyFive";
		case "26_29_25_28":
			return "twentySixTwentyNineTwentyFiveTwentyEight";
		case "29_28":
			return "twentyNineTwentyEight";
		case "29_32_28_31":
			return "twentyNineThirtyTwoTwentyEightThirtyOne";
		case "32_31":
			return "thirtyTwoThirtyOne";
		case "32_35_31_34":
			return "thirtyTwoThirtyFiveThirtyOneThirtyFour";
		case "35_34":
			return "thirtyFiveThirtyFour";
		case "0_1":
			return "zeroOne";
		case "1_4":
			return "oneFour";
		case "4_7":
			return "fourSeven";
		case "7_10":
			return "sevenTen";
		case "10_13":
			return "tenThirteen";
		case "13_16":
			return "thirteenSixteen";
		case "16_19":
			return "sixteenNineteen";
		case "19_22":
			return "nineteenTwentyTwo";
		case "22_25":
			return "twentyTwoTwentyFive";
		case "25_28":
			return "twentyFiveTwentyEight";
		case "28_31":
			return "twentyEightThirtyOne";
		case "31_34":
			return "thirtyOneThirtyFour";
	}
}

export {
	numbers,
	firstRow,
	secondRow,
	thirdRow,
	bottomBottomRow,
	bottomTopRow,
	ergoChips,
	initialTableBets,
	firstRowToDoubleHorizontal,
	secondRowToDoubleHorizontal,
	thirdRowToDoubleHorizontal,
	firstRowToDoubleVertical,
	secondRowToDoubleVertical,
	fromRowToQuadruple,
	ergChips,
	ergChipsAux,
	cypxChipsAux,
	cypxChips,
	cometChips,
	cometChipsAux,
	egioChips,
	egioChipsAux,
	isChipInMultiplier,
	multipliers,
	maxBetPerMultiplier,
	getAdjacents,
	LIMITS,
	getMaxAmountGivenNumber,
	fromNumberFieldToString,
	bassChipsAux,
	bassChips,
};
