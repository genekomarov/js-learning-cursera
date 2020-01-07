/**
 * @param {String[]} hashtags
 * @returns {String}
 */
var hashtagsUnique;

module.exports = function (hashtags) {
	
	hashtagsUnique = [];
	hashtags.forEach(findUnique);
	return hashtagsUnique.join(', ');

};

function findUnique(hashtag, index){
	
	var hashtagInLowerCase = hashtag.toLowerCase();

	if (!hashtagsUnique.includes(hashtagInLowerCase)) {
		if (hashtagInLowerCase.indexOf(' ') == -1 && hashtagInLowerCase.length > 0) {
			hashtagsUnique.push(hashtagInLowerCase);
		};
	};
};

//console.log(module.exports([]));
//console.log(module.exports(['tag1', '', '  ', 'tag2']));
//console.log(module.exports(['web', 'coursera', 'JavaScript', 'Coursera', 'script', 'programming']));