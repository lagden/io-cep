'use strict';

const cheerio = require('cheerio');

function parse(html) {
	const $ = cheerio.load(html);
	const $respostas = $('.resposta');

	// Futuro
	// const respostas = Reflect.apply(Array.prototype.slice, undefined, $respostas);
	const respostas = Array.prototype.slice.call($respostas);
	const tmp = {};

	respostas.forEach(resposta => {
		const $el = $(resposta);
		const key = $el.text().trim().replace(':', '').replace('/', '-');
		const value = $el.next('.respostadestaque').text().trim();
		if (key.indexOf('Localidade') > -1) {
			const keys = key.split('-');
			const values = value.replace(/[\n\t]+/g, '').split('/');
			tmp[keys[0].trim().toLowerCase()] = values[0].trim();
			tmp[keys[1].trim().toLowerCase()] = values[1].trim();
		} else {
			tmp[key.toLowerCase()] = value;
		}
	});

	const tmpKeys = Object.keys(tmp);
	return (tmpKeys.length > 0) ? tmp : null;
}

function cleanup(data, key) {
	if (data.hasOwnProperty(key)) {
		data[key] = data[key].split(/(, [\d]+)|( - de )|( - lado )/)[0];
	}
	return data;
}

exports.parse = parse;
exports.cleanup = cleanup;
