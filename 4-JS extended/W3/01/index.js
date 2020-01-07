/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function (operations, callback) {

	var result = [];

	
	if (operations.length > 0) {
		operations[0](nextF);	
	}
	else {
		callback(null, result);
	} 
	


	function nextF (err, data) {

        result.push(data);

        
        if (err) {
        	callback(err);
        }
        else {
        	operations.shift();
	        
	        if (operations.length > 0) {
	        	operations[0](nextF);
	        }
	        else {
	        	callback(null, result);
	        }
        }   
	};

};