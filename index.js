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

function falha(err, req) {
	err.success = false;
	err.req = req;
	return Promise.reject(err);
}

function sucesso(data) {
	return Promise.resolve(data);
}

function fixData(dado) {
	dado = cleanup(dado, 'logradouro');
	dado = cleanup(dado, 'endere\u00E7o');
	if (dado.hasOwnProperty('endere\u00E7o')) {
		dado.logradouro = dado['endere\u00E7o'];
	}
}

function before(res, req) {
	const data = getData('Falha na requisição', req);
	data.code = res.statusCode;
	if (res.statusCode === 200) {
		const dados = parse(iconv.decode(res._buffer, 'iso-8859-1'));
		if (dados.length > 0) {
			data.success = true;
			data.req = req;
			for (const dado of dados) {
				fixData(dado);
			}
			data.dados = dados;
			data.message = 'OK';
			return sucesso(data);
		}
		data.message = 'Dados não encontrado ou erro de análise';
	}
	return falha(data, req, true);
}

/**
 * Consulta.
 *
 * @param {string} req
 */
function consulta(req, timeout, retries) {
	timeout = timeout || 2500;
	retries = retries || 2;
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
		.then(res => before(res, req))
		.catch(err => falha(err, req));
}

module.exports = consulta;
