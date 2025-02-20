function truncate(str, length) {
	if (str) {
		if (str.length > length) {
			return str.substring(0, length) + "..";
		}
		return str;
	}
}

function fromGameToMultiplier(game) {
	switch (game) {
		case "russianroulette":
			return "6";
		case "diceroll":
			return "6";
		case "cardwar":
			return "2";
		case "coinflip":
			return "2";
		case "onetoten":
			return "10";
		default:
			return "2";
	}
}

function fromLongToActualCurrencyValue(value, currency) {
	if (value == 0) return value;
	switch (currency) {
		case "ERG":
			return value / 1000000000;
		case "SigUSD":
			return value / 100;
		case "COMET":
			return value;
		case "CYPX":
			return value / 10000;
		case "EGIO":
			return value / 10000;
		case "FLUX":
			return value / 100000000;
		case "EPAD":
			return value / 100;
		case "PAIDEIA":
			return value / 10000;
		case "BASS":
			return value / 10000000;
		case "ERGONE":
			return value / 100000000;
		case "LOVE":
			return value;
		case "GREASYCEX":
			return value;
		case "PEPERG":
			return value;
		case "BOBER":
			return value / 1000;
		case "GIF":
			return value / 1000000;
		default:
			return value;
	}
}

function fromActualCurrencyValueToLong(value, currency) {
	switch (currency) {
		case "ERG":
			return value * 1000000000;
		case "SigUSD":
			return value * 100;
		case "COMET":
			return value;
		case "CYPX":
			return value * 10000;
		case "EGIO":
			return value * 10000;
		case "FLUX":
			return value * 100000000;
		case "EPAD":
			return value * 100;
		case "PAIDEIA":
			return value * 10000;
		case "BASS":
			return value * 10000000;
		case "ERGONE":
			return value * 100000000;
		case "LOVE":
			return value;
		case "GREASYCEX":
			return value;
		case "PEPERG":
			return value;
		case "BOBER":
			return value * 1000;
		case "GIF":
			return value * 1000000;
		default:
			return value;
	}
}

const tokens = {
	SigUSD: "03faf2cb329f2e90d6d23b58d91bbb6c046aa143261cc21f52fbe2824bfcbf04",
	COMET: "0cd8c9f416e5b1ca9f986a7f10a84191dfb85941619e49e53c0dc30ebf83324b",
	CYPX: "01dce8a5632d19799950ff90bca3b5d0ca3ebfa8aaafd06f0cc6dd1e97150e7f",
	EGIO: "00b1e236b60b95c2c6f8007a9d89bc460fc9e78f98b09faec9449007b40bccf3",
	FLUX: "e8b20745ee9d18817305f32eb21015831a48f02d40980de6e849f886dca7f807",
	EPAD: "d71693c49a84fbbecd4908c94813b46514b18b67a99952dc1e6e4791556de413",
	PAIDEIA: "1fd6e032e8476c4aa54c18c1a308dce83940e8f4a28f576440513ed7326ad489",
	BASS: "ba553573f83c61be880d79db0f4068177fa75ab7c250ce3543f7e7aeb471a9d2",
	ERGONE: "fcfca7654fb0da57ecf9a3f489bcbeb1d43b56dce7e73b352f7bc6f2561d2a1b",
	LOVE: "3405d8f709a19479839597f9a22a7553bdfc1a590a427572787d7c44a88b6386",
	GREASYCEX: "d1d2ae2ac0456aa43550dd4fda45e4f866d523be9170d3a3e4cab43a83926334",
	PEPERG: "91289d5cefb9d78e3ea248d4e9c5b0e3c3de54f64bfae85c0070580961995262",
	BOBER: "b0b312cde931c8bbdac0dac5bfd8e2c03bf4611275dc967988c8d15bd5ec20e0",
	GIF: "843b5a2a0658550339c38f29827861fe459ce5206edaf17163113cccafc77af1",
	ERG: "ERG",
};

const addresses = [
	"9g9b9XdDBrvENHiR86cjVdrJxJ7KBDtWbwdQQJvsFqoTTJ5EYte",
	"9fSuzs5tQUSaitGQhurYFfHJUBqQ4pz94BTvwQKL37vT81UcEij",
	"9hkrzEE9TgWBjJn8oNG5FXP5bh5SjaDE6892QkwCfwP3hbXFmnw",
	"9gc3Rb9noL3wd5tu9Fk1663WFF381C8SCkR8LCkJJ8HHXySn4jm",
];

export {
	truncate,
	fromLongToActualCurrencyValue,
	tokens,
	fromGameToMultiplier,
	addresses,
	fromActualCurrencyValueToLong,
};
