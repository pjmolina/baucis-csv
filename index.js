// __Dependencies__
var es = require('event-stream');

  // __Module Definition__
var plugin = module.exports = function () {
	var baucis = this;

 	// __Private Methods__
	function getCsvHeaders1(obj) {
		var res = new Array();
		for (prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				res.unshift(prop);
			}
		}
		return res;
	}

	function getCsvHeaders2(model) {
		var res = new Array();
		for (propName in model.properties) {
			res.unshift(propName);
		}
		return res;		
	}

	function isNumber(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	}
	function isObjectId(obj) {
	  return (typeof(obj) == 'object' && obj._bsontype == 'ObjectID');
	}
	function toPascalName(name) {
		 var pascalModel = name.replace(/(\w)(\w*)/g, function(g0,g1,g2){ 
			return g1.toUpperCase() + g2.toLowerCase();
		});
	}


	function csvEncode(data) {
		var text;
		if (data === null) {
			return '';
		}
		if (isObjectId(data)) {
			return data.toString();
		} 	
		text = data.toString();	
		
		if ( (text.indexOf(',') >= 0) ||
		     (text.indexOf('.') >= 0) || 
			 (text.indexOf(' ') >= 0) )  
		{
			return '"' + text + '"';
		}	
		return text;
	}

	function csvEncodeObject(obj, props) {
		var res = '';
		var prefix ='';
		for (prop in props) {
			res += prefix + csvEncode(obj[props[prop]]);
			prefix= ',';
		}
		return res + '\r\n';
	}
	function csvHeaderToString(headers) {
		//build csv headers---
		var prefix='';
		var text = '';
		for (i in headers) {
		    text += prefix + csvEncode(headers[i]);
			prefix=',';
		}
		return text + '\r\n';
	}

	// Default formatter — emit a single CSV object or an array of them.
	function csvFormatter (alwaysArray) {
	var first = false;
	var multiple = false;
	var csvHeaders = [];
	var prefix='';

	return es.through(function (doc) {
	    // Start building the output.  If this is the first document,
	    // store it for a moment.
	    if (!first) {
	      first = doc;
	      return;
	    }
	    // If this is the second document, output array opening and the two documents
	    if (!multiple) {
	      multiple = true;
 		  csvHeaders = getCsvHeaders1(doc._doc);
	      this.emit('data', csvHeaderToString(csvHeaders));
	      this.emit('data', csvEncodeObject(first._doc, csvHeaders));
	      this.emit('data', csvEncodeObject(doc._doc, csvHeaders));
	      return;
	    }
	    this.emit('data', csvEncodeObject(doc._doc, csvHeaders));
	  },
	  function () {
	    // If no documents, simply send header and end the stream.
	    if (!first) {
 		    csvHeaders = getCsvHeaders2(controller.swagger.models[toPascalName(this.query.model)]);
	        this.emit('data', csvHeaderToString(csvHeaders));
			return this.emit('end');
	    } 
	    // If only one document emit it unwrapped, unless always returning an array.
	    if (!multiple && alwaysArray) { this.emit('data',''); }
	    if (!multiple)  { this.emit('data', csvEncodeObject(first._doc, csvHeaders)); }
	    // For greater than one document, emit the closing array.
	    else { this.emit('data',''); }
	    if (!multiple && alwaysArray) { this.emit('data',''); }
	    // Done.  End the stream.
	    this.emit('end');
	  });
	}

  // Add a CSV formatter.
  baucis.setFormatter('text/csv', csvFormatter);
};