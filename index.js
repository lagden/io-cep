'use strict';

const got = require('got');
const slug = require('slug');
const iconv = require('iconv-lite');
const utility = require('./lib/utility');

const parse = utility.parse;
const cleanup = utility.cleanup;

function getData(message, req, success, dados) {
	success = success || false;
	dados = dados || [];
	return {
		success,
		message,
		req,
		dados
	};
}

function fixData(dado) {
	dado = cleanup(dado, 'logradouro');
	dado = cleanup(dado, 'endere\u00E7o');
	if (dado.hasOwnProperty('endere\u00E7o')) {
		dado.logradouro = dado['endere\u00E7o'];
	}
}

function sucesso(res, req) {
	const data = getData(`Status code is ${res.statusCode}`, req);
	if (res.statusCode === 200) {
		const dados = parse(iconv.decode(res._buffer, 'iso-8859-1'));
		if (dados.length > 0) {
			data.success = true;
			data.req = req;
			for (const dado of dados) {
				fixData(dado);
			}
			data.dados = dados;
		} else {
			data.message = 'Dados não encontrado ou erro de análise';
		}
	}
	return Promise.resolve(data);
}

function falha(err, req) {
	return Promise.reject(getData(err, req));
}

/**
 * Consulta.
 *
 * @param {string} req
 */
function consulta(req, timeout, retries) {
	timeout = timeout || 10000;
	retries = retries || 10;
	if (typeof req !== 'string') {
		return Promise.reject('Utilize string');
	}
	const slugOpts = {
		lowercase: false,
		replacement: ' ',
		remove: /[-]/g
	};
	req = slug(req, slugOpts);
	const formData = {
		body: {
			cepEntrada: req,
			tipoCep: '',
			cepTemp: '',
			metodo: 'buscarCep'
		},
		timeout,
		retries
	};
	return got
		.post('http://m.correios.com.br/movel/buscaCepConfirma.do', formData)
		.then(res => sucesso(res, req))
		.catch(err => falha(err, req));
}

module.exports = consulta;
