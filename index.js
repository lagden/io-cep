'use strict';

const got = require('got');
const iconv = require('iconv-lite');
const utility = require('./lib/utility');

const parse = utility.parse;
const cleanup = utility.cleanup;

function getData(message, cep, success = false) {
	return {success, message, cep};
}

function sucesso(res, cep) {
	let data = getData(`Status code is ${res.statusCode}`, cep);
	if (res.statusCode === 200) {
		let newData = parse(iconv.decode(res._buffer, 'iso-8859-1'));
		if (newData) {
			newData.success = true;
			newData.req = cep;
			newData = cleanup(newData, 'logradouro');
			newData = cleanup(newData, 'endere\u00E7o');
			if (newData.hasOwnProperty('endere\u00E7o')) {
				newData.logradouro = newData['endere\u00E7o'];
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

/**
 * Consulta.
 *
 * @param {string} cep
 */
function consulta(cep, timeout = 10000) {
	if (typeof cep !== 'string') {
		return Promise.reject('Must be a string');
	}
	if (/^(\d{5})\-?(\d{3})$/.test(cep) === false) {
		return Promise.reject('Invalid format');
	}
	const formData = {
		body: {
			cepEntrada: cep,
			tipoCep: '',
			cepTemp: '',
			metodo: 'buscarCep'
		},
		timeout
	};
	return got
		.post('http://m.correios.com.br/movel/buscaCepConfirma.do', formData)
		.then(res => sucesso(res, cep))
		.catch(err => falha(err, cep));
}

module.exports = consulta;
