/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */

function cloneCollection(collection){
	
	function cloneAtributes(item){
		
		var cloneItem = {};

		for (key in item){
			cloneItem[key] = item[key]; 
		}

		return cloneItem;
	}

	return collection.map(cloneAtributes);

}


function query(collection) {
	var result = cloneCollection(collection);
	var selectList = [];
	var arr = [].slice.call(arguments);

	for (var i = 1; i < arr.length; i++) {
		if (arr[i][0] == 'select') {
			selectList.push(arr[i][1]);
		}
		else {
			result = arr[i](result);
		}
	}

	for (var i = 0; i < selectList.length; i++) {		
		result = selectList[i](result);
	}

	return result;
}

/**
 * @params {String[]}
 */
function select() {
	var fields = [].slice.call(arguments);

	function deleteFields (item) {

		for (key in item){
			if (!fields.includes(key)){
				delete item[key];
			}
		}
		return item;
	}

	return ['select',
			function (collection) {
				return collection.map(deleteFields);	
			}	
	]
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
	return function (collection) {

		var newCollection = [];

		for (var i = 0; i < collection.length; i++) {
			if (values.includes(collection[i][property])) {
				newCollection.push(collection[i]);
			}	
		}

		return newCollection;		
	}
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};

/*var lib = module.exports;

var friends = [
    {
    	partners: 1,
        name: 'Сэм',
        gender: 'Мужской',
        email: 'luisazamora@example.com',
        favoriteFruit: 'Картофель',
    },
    {
    	partners: 2,
        name: 'Эмили',
        gender: 'Женский',
        email: 'example@example.com',
        favoriteFruit: 'Яблоко'
    },
    {
    	partners: 1,
        name: 'Мэт',
        gender: 'Мужской',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Яблоко'
    },
    {
    	partners: 2,
        name: 'Брэд',
        gender: 'Мужской',
        email: 'newtonwilliams@example.com',
        favoriteFruit: 'Банан'
    },
    {
    	partners: 1,
        name: 'Шерри',
        gender: 'Женский',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Картофель'
    },
    {
    	partners: 2,
        name: 'Керри',
        gender: 'Женский',
        email: 'danamcgee@example.com',
        favoriteFruit: 'Апельсин'
    },
    {
    	//partners: 1,
        name: 'Стелла',
        gender: 'Женский',
        email: 'waltersguzman@example.com',
        favoriteFruit: 'Картофель'
    }
];

var result = lib.query(
    friends,
    //lib.select('name','gender','partners'),
    lib.filterIn('partners', [1]),
    lib.filterIn('favoriteFruit', ['Картофель'])
);

console.log(result);
*/