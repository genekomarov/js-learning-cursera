/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */
module.exports = function (hours, minutes, interval) {
	var newMinutes = minutes + interval;
	var newHours;
	var addHours;

	if (newMinutes >= 60) {
		addHours = Math.floor(newMinutes / 60);
		newMinutes %= 60;
		newHours = hours + addHours;
	}
	else {
		newHours = hours;
	}

	if (newHours >= 24) {
		newHours %= 24 
	}

	if (newHours < 10) {
		newHours = '0' + newHours;
	}

	if (newMinutes < 10) {
		newMinutes = '0' + newMinutes;
	}

	return newHours + ':' + newMinutes;
};
