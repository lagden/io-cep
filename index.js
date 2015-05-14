'use strict';

var request = require('request');
var iconv = require('iconv-lite');
var Promessa = require('promise');
var util = require('./lib/utility');

/**
 * Consulta.
 *
 * @param {string} cep - Zip code of the location.
 */
function consulta(cep) {
  return new Promessa(function(resolve, reject) {
    if (typeof cep !== 'string') {
      throw new TypeError('CEP must be a string');
    }
    var formData = {
      'form': {
        'cepEntrada': cep,
        'tipoCep': '',
        'cepTemp': '',
        'metodo': 'buscarCep'
      },
      'encoding': null,
      'timeout': 4500
    };
    request.post(
      'http://m.correios.com.br/movel/buscaCepConfirma.do',
      formData,
      function(err, res, body) {
        if (!err && res.statusCode === 200) {
          var data = util.parse(iconv.decode(body, 'ISO-8859-1'));
          if (data) {
            data.success = true;
            data = util.cleanup(data, 'logradouro');
            data = util.cleanup(data, 'endere\u00E7o');
            if (data.hasOwnProperty('endere\u00E7o')) {
              data.logradouro = data['endere\u00E7o'];
            }
            resolve(data);
          } else {
            resolve({
              'success': false,
              'message': 'CEP not found or parse error'
            });
          }
        } else {
          reject(err);
        }
      }
    );
  });
}

module.exports = consulta;
