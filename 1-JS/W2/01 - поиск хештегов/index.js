/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
	
	stringArr = tweet.split('#');

	for (var i = 1; i < stringArr.length; i++) {
		
		if (stringArr[i].indexOf(' ') >= 0){
			stringArr[i] = stringArr[i].slice(0, stringArr[i].indexOf(' '));	
		}
	}
	stringArr.shift();
	return stringArr;
	//console.log(stringArr);
}

//module.exports('Прохожу курс на coursera по javascript');