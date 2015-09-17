'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function parse(html) {
	var $ = _cheerio2['default'].load(html);
	var $respostas = $('.resposta');

	var respostas = Array.prototype.slice.call($respostas);
	var tmp = {};

	respostas.forEach(function (resposta) {
		var $el = $(resposta);
		var key = $el.text().trim().replace(':', '').replace('/', '-');
		var value = $el.next('.respostadestaque').text().trim();
		if (key.indexOf('Localidade') !== -1) {
			var keys = key.split('-');
			var values = value.replace(/[\n\t]+/g, '').split('/');
			tmp[keys[0].trim().toLowerCase()] = values[0].trim();
			tmp[keys[1].trim().toLowerCase()] = values[1].trim();
		} else {
			tmp[key.toLowerCase()] = value;
		}
	});

	var tmpKeys = Object.keys(tmp);
	return tmpKeys.length > 0 ? tmp : null;
}

function cleanup(data, key) {
	if (data.hasOwnProperty(key)) {
		data[key] = data[key].split(/(, [\d]+)|( - de )|( - lado )/)[0];
	}
	return data;
}

exports.parse = parse;
exports.cleanup = cleanup;