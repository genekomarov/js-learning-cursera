'use strict';

// Код валидации формы
function validateForm (params) {
	var formId = params.formId;
	var formValidClass = params.formValidClass;
	var formInvalidClass = params.formInvalidClass;
	var inputErrorClass = params.inputErrorClass;

	
	var form = document.getElementById(formId);
	form.addEventListener('submit', formSubmitEvent);


	
	var input = Array.from(document.querySelectorAll('#' + formId + ' > input'));
	
	input.forEach((element) => {
		element.addEventListener('blur', inputBlurEvent, true);
		element.addEventListener('focus', inputFocusEvent, true);
	});
	
	function inputBlurEvent (event) {

		var e = event.target;

		console.log(e.dataset.hasOwnProperty('required'));
		
		if (e.dataset.hasOwnProperty('required')) {
			if (e.value == '') {
				e.classList.add(inputErrorClass);
			};
		};

		if (e.dataset.hasOwnProperty('validator')) {
			switch (e.dataset.validator) {
				case 'letters':
					var re = /^[a-zа-я]*$/gi;
					if (re.test(e.value) == false) {e.classList.add(inputErrorClass);}
					break;
				case 'number':
					var re = /^(0$|-?[1-9]\d*)$/gi;
					if (re.test(e.value) == false) {e.classList.add(inputErrorClass);}
					else {
						if (e.value < 0 || e.value > 100) {e.classList.add(inputErrorClass);}
					}
					break;
				case 'regexp':
					console.log(e.dataset.validatorPattern);
					var re = new RegExp(e.dataset.validatorPattern);
					if (re.test(e.value) == false) {e.classList.add(inputErrorClass);}
					break;
			}
		};

	};

	function inputFocusEvent (event) {
		event.target.classList.remove(inputErrorClass);
	};

	function formSubmitEvent (event) {
		event.preventDefault();
	};
};


