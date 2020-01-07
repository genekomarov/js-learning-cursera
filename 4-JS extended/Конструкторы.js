// Самодельный констуктор объектов
///////////////////////////////////
function createStudent(name) {
	return {
		name: name,
		sleep: function () {
			console.info('zzzZZ ...');
		}
	};
}
var billy = createStudent('Billy');
var willy = createStudent('Willy');










// Решение
/////////////////////////////////////
// Выносим функцию sleep() в прототип
var studentProto = {
	sleep: function () {
		console.info('zzzZZ ...');
	}
};
// Создаем самодельный конструктор
function createStudent(name) {
	var student = {
		name: name
	};
	// Подключаем прототип
	Object.setPrototypeOf(student, studentProto);
	// Возвращаем объект
	return student;
}
































// Цепочки прототипов
///////////////////////////////////////
//
Student.prototype = Person.prototype;
// Теперь ссылка на один объект находится
// в хранилищах двух разных конструкторов
// При добавлении свойств в один, они появятся в другом. 













































// Дублирование кода в конструкторах
/////////////////////////////////////////
//
function Student(name) {
	this.name = name;
}

function Lecturer(name) {
	this.name = name;
}

function Person() {
	this.type = 'human';
}




// Вызов затеняемого метода в затеняющем
/////////////////////////////////////////
// Неправильное решение. Рекурсивный вызов
Student.prototype = Object.create(Person.prototype);

Student.prototype.getName = function () {
	return 'Student ' + this.getName();
};

var billy = new Student('Billy');

billy.getName(); // RangeError: Maximum call stack size exceeded


// Вариант решения через метод с другим именем
function Person(name) {
	this.name = name;
}

Person.prototype.getName = function () {
	return this.name;
}

Student.prototype = Object.create(Person.prototype);

Student.prototype.getStudentName = function () {
	return 'Student ' + this.getName();
};

var billy = new Student('Billy');

billy.getStudentName();


// Фабрика объектов
/////////////////////////////////
// Подход только через Object.create()
var personProto = {
	getName: function () {
		return this.name;
	}
};
var studentProto = Object.create(personProto);

studentProto.sleep = function () {};

var billy =
Object.create(studentProto);

billy.name = 'Billy';