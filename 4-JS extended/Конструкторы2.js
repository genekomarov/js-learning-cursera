// Конструкторы из коробки
//////////////////////////////////
function Student(name) {
	this.name = name;
}
var billy = new Student('Billy');
var willy = new Student('Willy');

// Изменение работы интерпретатора
//////////////////////////////////
// Явно возвращаем объект из конструктора
function Student(name) {
	this.name = name;
	return {
		name: 'Muahahahahaha!'
	};
}
var billy = new Student('Billy');
console.info(billy.name); // Muahahahahaha
// НО! При попытке вернуть примитивное значение
return null; // Вернется примитивный объект

// Решение
//////////////////////////////////
// Выносим функцию sleep() в прототип
Student.prototype = {      //Помещаем прототив в хранилище.
	sleep: function () {}
};
// При создании объекта, конструктор автоматически свяжет
// прототип с новым объектом

function Student(name) {
	// var this = {};
	this.name = name;
	// Object.setPrototypeOf(this, Student.prototype);
	// return this;
}

var billy = new Student('Billy');
// Эквивалентно
var billy {
	name: 'Billy';
	[[Prototype]]: <Student.prototype>;
}
// Сравнение литеральной записи и через конструктор
/////////////////////////////////////
var billy = {name: 'Billy'};
// Эквивалентно
var billy = new Object({name: 'Billy'});
//
var billy {
	name: 'Billy';
	[[Prototype]]: <Object.prototype>;
}

//
///////////////////////////////////
// Поле .prototype.constructor - хранит ссылку на конструктор
function Student(name) {
	this.name = name;
}
Student.prototype.constructor === Student; // true
var billy = new Student('Billy');
console.info(billy.constructor.name); // Student

// Пример правильного добавления функции в прототип
///////////////////////////////////
Person.prototype.getName = function () {
	return this.name;
}


// Цепочки прототипов
///////////////////////////////////////
//
Student.prototype = Object.create(Person.prototype);
// Это правильно. Теперь в хранилище находится объект
// созданный на основе прототипа


// Как работает Object.create()
var apple = Object.create(fruitProto);

Object.create = function(prototype) {
// Простейший конструктор пустых объектов
	function EmptyFunction() {};
	EmptyFunction.prototype = prototype;
	return new EmptyFunction();
};


// Восстановление ссылки на функцию конструктора
function Student(name) {
	this.name = name;
}
Student.prototype = Object.create(Person.prototype);
Student.prototype.sleep = function () {};

Student.prototype.constructor = Student;


// ИТОГОВОЕ РЕШЕНИЕ ЗАДАЧИ
//////////////////////////////////////////
function Person() {
	this.type = 'human';
}

Person.prototype.getName = function () {
	return this.name;
};

function Student(name) {
	this.name = name;
}

Student.prototype = Object.create(Person.prototype);

Student.prototype.sleep = function () {};

Student.prototype.constructor = Student;

var billy = new Student('Billy');


// Дублирование кода в конструкторах
/////////////////////////////////////////
//
function Person() {
	this.type = 'human';
	this.name = name;
}

function Student(name) {
// this ссылается на новый объект студента
	Person.call(this, name);
}

var billy = new Student('Billy');

console.info(billy.name); // Billy


// Вызов затеняемого метода в затеняющем
/////////////////////////////////////////
//











// Вариант решения через Call()
function Person(name) {
	this.type = 'human';
	this.name = name;
}

Person.prototype.getName = function () {
	return this.name;
}

Student.prototype = Object.create(Person.prototype);

Student.prototype.getName = function () {
	return 'Student ' + Person.prototype.getName.call(this);
};





// Фабрика объектов
/////////////////////////////////
// Сокращение записи с помощью второго аргумента Object.create()
var apple = Object.create(fruit, {
	shape: { value: 'round', writable: false },
	color: { value: 'Green' },
	amount: { writable: true }
});

apple.amount = 'half';

// Фабрика объектов. Вспомогательная функция create()
/////////////////////////////////////
var personProto = {};

personProto.getName = function () { return this.name; }

var studentProto = Object.create(personProto);

studentProto.sleep = function () {};

studentProto.create = function (name) {
	return Object.create(this, {
		name: { value: name }
	})
}

var billy = studentProto.create('Billy');
