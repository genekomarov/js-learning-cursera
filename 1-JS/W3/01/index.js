/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {

	var re = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/;
	var dateArr = date.match(re);
	//console.log(dateArr);

	dateObj = {
		_date: new Date(dateArr[1],dateArr[2]-1,dateArr[3],dateArr[4],dateArr[5])
	}
	
	// Увеличение времени
	Object.defineProperty(dateObj, 'add', {
		value: function(value, str) {
			
			if (value < 0) {throw new TypeError('Отрицательное значение');}

			switch (str) {
				case 'years':
					this._date.setFullYear(this._date.getFullYear() + value);
					break;
				case 'months':
					this._date.setMonth(this._date.getMonth() + value);
					break;
				case 'days':
					this._date.setDate(this._date.getDate() + value);
					break;
				case 'hours':
					this._date.setHours(this._date.getHours() + value);
					break;
				case 'minutes':
					this._date.setMinutes(this._date.getMinutes() + value);
					break;
				default:
					throw new TypeError('Неверная единица измерения');
					break;
			}

			return this;
		},
		writable: true,
		enumerable: true,
	})

	//Уменьшение времени
	Object.defineProperty(dateObj, 'subtract', {
		value: function(value, str) {
			
			if (value < 0) {throw new TypeError('Отрицательное значение');}

			switch (str) {
				case 'years':
					this._date.setFullYear(this._date.getFullYear() - value);
					break;
				case 'months':
					this._date.setMonth(this._date.getMonth() - value);
					break;
				case 'days':
					this._date.setDate(this._date.getDate() - value);
					break;
				case 'hours':
					this._date.setHours(this._date.getHours() - value);
					break;
				case 'minutes':
					this._date.setMinutes(this._date.getMinutes() - value);
					break;
				default:
					throw new TypeError('Неверная единица измерения');
					break;
			}

			return this;
		},
		writable: true,
		enumerable: true,
	})

	// Получение текущего времени (_date), это геттер!
	Object.defineProperty(dateObj, 'value', {
		get: function() {
			var date = this._date;
			var years = date.getFullYear();
			var months = date.getMonth() + 1; 
			if (months < 10) {months = '0' + months;}
			var days = date.getDate();
			if (days < 10) {days = '0' + days;}
			var hours = date.getHours();
			if (hours < 10) {hours = '0' + hours;}
			var minutes = date.getMinutes();
			if (minutes < 10) {minutes = '0' + minutes;}

			return years+'-'+months+'-'+days+' '+hours+':'+minutes;
		},
		enumerable: true,
	})


	return dateObj;
};

/*
var time = module.exports('2017-05-16 13:45');
console.log(time.value);
time.subtract(10, 'months');
console.log(time.value);
*/
