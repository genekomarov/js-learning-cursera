'use strict';

// Код валидации формы
function validateForm (params) {
	var formId = params.formId;
	var formValidClass = params.formValidClass;
	var formInvalidClass = params.formInvalidClass;
	var inputErrorClass = params.inputErrorClass;

	
	var form = document.getElementById(formId);
	form.addEventListener('submit', formSubmitEvent);
	form.addEventListener('blur', inputBlurEvent, true);
	form.addEventListener('focus', inputFocusEvent, true);

	var inputs = Array.from(document.querySelectorAll('#' + formId + ' > input'));
	
	function inputBlurEvent (event) {
		if (event.target.tagName == "INPUT") {
			inputCheck(event.target);
		}
	};

	function inputFocusEvent (event) {
		if (event.target.tagName == "INPUT") {
			event.target.classList.remove(inputErrorClass);
		}
	};

	function formSubmitEvent (event) {
		
		event.preventDefault();

		var err = 0;

		for (var i = 0; i < inputs.length; i++) {
			err += inputCheck(inputs[i]);
		}

		if (err > 0) {
			event.target.classList.add(formInvalidClass);
			event.target.classList.remove(formValidClass);
		}
		else {
			event.target.classList.add(formValidClass);
			event.target.classList.remove(formInvalidClass);
		}
	};


	function inputCheck (e) {
		
		var err = false;

		if (e.dataset.hasOwnProperty('required')) {
			if (e.value == '') {
				e.classList.add(inputErrorClass); err = true;
			};
		};

		if (e.value != "") {

			if (e.dataset.hasOwnProperty('validator')) {
				switch (e.dataset.validator) {
					case 'letters':
						var re = /^[a-zа-я]*$/gi;
						if (re.test(e.value) == false) {e.classList.add(inputErrorClass); err = true;}
						break;
					case 'number':
						var re = /^(0$|-?[1-9]\d*)$/gi;
						if (re.test(e.value) == false) {
							e.classList.add(inputErrorClass); err = true;
						}
						else {
							
							if (e.dataset.hasOwnProperty('validatorMin')) {
								if (e.value < parseInt(e.dataset.validatorMin)) {e.classList.add(inputErrorClass); err = true;}
							}

							if (e.dataset.hasOwnProperty('validatorMax')) {
								if (e.value > parseInt(e.dataset.validatorMax)) {e.classList.add(inputErrorClass); err = true;}
							}

						}
						break;
					case 'regexp':
						console.log(e.dataset.validatorPattern);
						var re = new RegExp(e.dataset.validatorPattern);
						if (re.test(e.value) == false) {e.classList.add(inputErrorClass); err = true;}
						break;
				};

			};

		};

		return err; 
	}
};


