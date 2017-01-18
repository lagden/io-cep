'use strict'

const cheerio = require('cheerio')

function _eachGroup($grupo, $) {
	const respostas = Array.from($grupo)
	const tmp = {}
	for (const resposta of respostas) {
		const $el = $(resposta)
		const key = $el.text().trim().replace(':', '').replace('/', '-')
		const value = $el.next('.respostadestaque').text().trim()
		if (key.indexOf('Localidade') > -1) {
			const keys = key.split('-')
			const values = value.replace(/[\n\t]+/g, '').split('/')
			tmp[keys[0].trim().toLowerCase()] = values[0].trim()
			tmp[keys[1].trim().toLowerCase()] = values[1].trim()
		} else {
			tmp[key.toLowerCase()] = value
		}
	}
	return tmp
}

function parse(html) {
	const $ = cheerio.load(html)
	const finds = [
		$('.caixacampobranco').find('.resposta'),
		$('.caixacampoazul').find('.resposta')
	]
	const dados = []
	for (const $item of finds) {
		if ($item.length > 0) {
			dados.push(_eachGroup($item, $))
		}
	}
	return dados
}

function cleanup(data, key) {
	if (data[key]) {
		data[key] = data[key].split(/(, [\d]+)|( - de )|( - até )|( - lado )/)[0]
	}
	return data
}

exports.parse = parse
exports.cleanup = cleanup
