import twoC from "./../../assets/Cards/2-C.png";
import twoD from "./../../assets/Cards/2-D.png";
import twoH from "./../../assets/Cards/2-H.png";
import twoS from "./../../assets/Cards/2-S.png";
import threeC from "./../../assets/Cards/3-C.png";
import threeD from "./../../assets/Cards/3-D.png";
import threeH from "./../../assets/Cards/3-H.png";
import threeS from "./../../assets/Cards/3-S.png";
import fourC from "./../../assets/Cards/4-C.png";
import fourD from "./../../assets/Cards/4-D.png";
import fourH from "./../../assets/Cards/4-H.png";
import fourS from "./../../assets/Cards/4-S.png";
import fiveC from "./../../assets/Cards/5-C.png";
import fiveD from "./../../assets/Cards/5-D.png";
import fiveH from "./../../assets/Cards/5-H.png";
import fiveS from "./../../assets/Cards/5-S.png";
import sixC from "./../../assets/Cards/6-C.png";
import sixD from "./../../assets/Cards/6-D.png";
import sixH from "./../../assets/Cards/6-H.png";
import sixS from "./../../assets/Cards/6-S.png";
import sevenC from "./../../assets/Cards/7-C.png";
import sevenD from "./../../assets/Cards/7-D.png";
import sevenH from "./../../assets/Cards/7-H.png";
import sevenS from "./../../assets/Cards/7-S.png";
import eightC from "./../../assets/Cards/8-C.png";
import eightD from "./../../assets/Cards/8-D.png";
import eightH from "./../../assets/Cards/8-H.png";
import eightS from "./../../assets/Cards/8-S.png";
import nineC from "./../../assets/Cards/9-C.png";
import nineD from "./../../assets/Cards/9-D.png";
import nineH from "./../../assets/Cards/9-H.png";
import nineS from "./../../assets/Cards/9-S.png";
import tenC from "./../../assets/Cards/10-C.png";
import tenD from "./../../assets/Cards/10-D.png";
import tenH from "./../../assets/Cards/10-H.png";
import tenS from "./../../assets/Cards/10-S.png";
import elevenC from "./../../assets/Cards/11-C.png";
import elevenD from "./../../assets/Cards/11-D.png";
import elevenH from "./../../assets/Cards/11-H.png";
import elevenS from "./../../assets/Cards/11-S.png";
import twelveC from "./../../assets/Cards/12-C.png";
import twelveD from "./../../assets/Cards/12-D.png";
import twelveH from "./../../assets/Cards/12-H.png";
import twelveS from "./../../assets/Cards/12-S.png";
import thirteenC from "./../../assets/Cards/13-C.png";
import thirteenD from "./../../assets/Cards/13-D.png";
import thirteenH from "./../../assets/Cards/13-H.png";
import thirteenS from "./../../assets/Cards/13-S.png";
import fourteenC from "./../../assets/Cards/14-C.png";
import fourteenD from "./../../assets/Cards/14-D.png";
import fourteenH from "./../../assets/Cards/14-H.png";
import fourteenS from "./../../assets/Cards/14-S.png";

const cards = {
	"2-C": twoC,
	"2-D": twoD,
	"2-H": twoH,
	"2-S": twoS,
	"3-C": threeC,
	"3-D": threeD,
	"3-H": threeH,
	"3-S": threeS,
	"4-C": fourC,
	"4-D": fourD,
	"4-H": fourH,
	"4-S": fourS,
	"5-C": fiveC,
	"5-D": fiveD,
	"5-H": fiveH,
	"5-S": fiveS,
	"6-C": sixC,
	"6-D": sixD,
	"6-H": sixH,
	"6-S": sixS,
	"7-C": sevenC,
	"7-D": sevenD,
	"7-H": sevenH,
	"7-S": sevenS,
	"8-C": eightC,
	"8-D": eightD,
	"8-H": eightH,
	"8-S": eightS,
	"9-C": nineC,
	"9-D": nineD,
	"9-H": nineH,
	"9-S": nineS,
	"10-C": tenC,
	"10-D": tenD,
	"10-H": tenH,
	"10-S": tenS,
	"11-C": elevenC,
	"11-D": elevenD,
	"11-H": elevenH,
	"11-S": elevenS,
	"12-C": twelveC,
	"12-D": twelveD,
	"12-H": twelveH,
	"12-S": twelveS,
	"13-C": thirteenC,
	"13-D": thirteenD,
	"13-H": thirteenH,
	"13-S": thirteenS,
	"14-C": fourteenC,
	"14-D": fourteenD,
	"14-H": fourteenH,
	"14-S": fourteenS,
};

function getRandomLetter() {
	const letters = "CDHS";
	return letters.charAt(Math.floor(Math.random() * letters.length));
}

export { cards, getRandomLetter };
