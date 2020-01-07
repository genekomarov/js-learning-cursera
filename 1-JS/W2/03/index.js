// Телефонная книга
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
 	
 	var commandDataArr = command.split(' ');

 	switch (commandDataArr[0]) {
 	 	case 'ADD':
 	 		//console.log('Команда ADD');
 	 		
 	 		var commandObj = {};
 	 		commandObj.name = commandDataArr[1];

 	 		var telephonesArr = commandDataArr[2].split(',');
 	 		commandObj.telephones = [];
 	 		for (var i = 0 ; i < telephonesArr.length; i++) {
 	 			commandObj.telephones.push(telephonesArr[i]);
 	 		}

 	 		if (!Object.keys(phoneBook).includes(commandObj.name)) {
 	 			phoneBook[commandObj.name] = [];
 	 		}

	 		for (var i = 0; i < commandObj.telephones.length; i++) {
	 			if (!phoneBook[commandObj.name].includes(commandObj.telephones[i])) {
	 				phoneBook[commandObj.name].push(commandObj.telephones[i]);
	 			}
	 		}

 	 		//console.log(phoneBook);

 	 		break;

		case 'REMOVE_PHONE':
 	 		//console.log('Команда REMOVE_PHONE');

 	 		var telephon = commandDataArr[1];

 	 		for (key in phoneBook) {
 	 			if (phoneBook[key].indexOf(telephon) >= 0) {
 	 				phoneBook[key].splice(phoneBook[key].indexOf(telephon), 1);

 	 				if (phoneBook[key].length == 0) {
 	 					delete phoneBook[key];
 	 				}

 	 				return true;
 	 			}
 	 		}

 	 		return false;

 	 		break;

 	 	case 'SHOW':
 	 		//console.log('Команда SHOW');
 	 		var showArr = [];
 	 		
 	 		for (name in phoneBook) {
 	 			showArr.push(name + ': ');
 	 			for (var i = 0; i < phoneBook[name].length; i++) {
 	 				showArr[showArr.length - 1] += phoneBook[name][i];
 	 				if (i != phoneBook[name].length - 1) {
 	 					showArr[showArr.length - 1] += ', ';
 	 				}
 	 			}
 	 		}

 	 		return showArr.sort();

 	 		//console.log(showArr);

 	 		break;

 	 	default:
 	 		//console.log('bad command');
 	 		break;
 	 }

}

//module.exports('ADD ivan 11,12-42');
//module.exports('ADD ivan 10');
//module.exports('ADD alexander 44');

//module.exports('SHOW');

//module.exports('REMOVE_PHONE 10');

//module.exports('SHOW');