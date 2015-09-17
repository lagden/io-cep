'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _got = require('got');

var _got2 = _interopRequireDefault(_got);

var _iconvLite = require('iconv-lite');

var _iconvLite2 = _interopRequireDefault(_iconvLite);

var _libUtility = require('./lib/utility');

function getData(message, cep) {
	var success = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	return { success: success, message: message, cep: cep };
}

function sucesso(res, cep) {
	var data = getData('Status code is ' + res.statusCode, cep);
	if (res.statusCode === 200) {
		var newData = (0, _libUtility.parse)(_iconvLite2['default'].decode(res._buffer, 'iso-8859-1'));
		if (newData) {
			newData.success = true;
			newData.req = cep;
			newData = (0, _libUtility.cleanup)(newData, 'logradouro');
			newData = (0, _libUtility.cleanup)(newData, 'endereço');
			if (newData.hasOwnProperty('endereço')) {
				newData.logradouro = newData['endereço'];
			}
			data = newData;
		} else {
			data.message = 'CEP not found or parse error';
		}
	}
	return Promise.resolve(data);
}

function falha(err, cep) {
	return Promise.resolve(getData(err, cep));
}

function consulta(cep) {
	var timeout = arguments.length <= 1 || arguments[1] === undefined ? 10000 : arguments[1];

	if (typeof cep !== 'string') {
		return Promise.reject('Must be a string');
	}
	if (/^(\d{5})\-?(\d{3})$/.test(cep) === false) {
		return Promise.reject('Invalid format');
	}
	var formData = {
		body: {
			cepEntrada: cep,
			tipoCep: '',
			cepTemp: '',
			metodo: 'buscarCep'
		},
		timeout: timeout
	};
	return _got2['default'].post('http://m.correios.com.br/movel/buscaCepConfirma.do', formData).then(function (res) {
		return sucesso(res, cep);
	})['catch'](function (err) {
		return falha(err, cep);
	});
}

exports['default'] = consulta;
module.exports = exports['default'];