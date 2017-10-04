export const getFontSize = (population, maxPopulation) => {
	const fontSize = (population/maxPopulation)*50;
	if (fontSize<1) {
		return 10;
	}
	if (fontSize<12) {
		return fontSize*5;
	} else {
		return fontSize;
	}
};