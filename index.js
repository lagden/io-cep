'use strict';

const got = require('got');
const iconv = require('iconv-lite');
const utility = require('./lib/utility');

const parse = utility.parse;
const cleanup = utility.cleanup;

function getData(message, cep, success) {
	success = success || false;
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
			data.message = 'CEP não encontrado ou erro de análise';
		}
	}
	return Promise.resolve(data);
}

function falha(err, cep) {
	return Promise.reject(getData(err, cep));
}

/**
 * Consulta.
 *
 * @param {string} cep
 */
function consulta(cep, timeout, retries) {
	timeout = timeout || 10000;
	retries = retries || 10;
	if (typeof cep !== 'string') {
		return Promise.reject('Utilize string');
	}
	if (/^(\d{5})\-?(\d{3})$/.test(cep) === false) {
		return Promise.reject('Formato inválido');
	}
	const formData = {
		body: {
			cepEntrada: cep,
			tipoCep: '',
			cepTemp: '',
			metodo: 'buscarCep'
		},
		timeout,
		retries
	};
	return got
		.post('http://m.correios.com.br/movel/buscaCepConfirma.do', formData)
		.then(res => sucesso(res, cep))
		.catch(err => falha(err, cep));
}

module.exports = consulta;
