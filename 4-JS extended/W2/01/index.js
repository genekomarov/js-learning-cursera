module.exports = Collection;

/**
 * Конструктор коллекции
 * @constructor
 */
function Collection() {
	this.items = [];
}


// Методы коллекции
Collection.prototype.values = function () {
	return this.items;
}

Collection.prototype.at = function (posit) {
	if (this.items[posit-1] != undefined)
		return this.items[posit-1];
	else return null;
}

Collection.prototype.append = function (item) {
	if (item instanceof Collection) {
		this.items = this.items.concat(item.items); 
	}
	else {
		this.items.push(item);	
	}
}

Collection.prototype.removeAt = function (posit) {
	if (posit <= 0 || posit > this.items.length) {
		return false;
	}
	else {
		returnValue = this.items.splice(posit-1, 1);
		return true;	
	}
}

Collection.prototype.count = function () {
	return this.items.length;
}

// другие методы


/**
 * Создание коллекции из массива значений
 */
Collection.from = function (newItems) {
	return Object.create(Collection.prototype, {
		items: {value: newItems} 
	});
}
