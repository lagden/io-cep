'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _request = require('request');
var _request2 = _interopRequireDefault(_request);
var _iconvLite = require('iconv-lite');
var _iconvLite2 = _interopRequireDefault(_iconvLite);
var _libUtility = require('./lib/utility');

function consulta(cep) {
  return new Promise(function p(resolve, reject) {
    if (typeof cep !== 'string') {
      throw new Error('Must be a string');
    }
    if (/^(\d{5})\-?(\d{3})$/.test(cep) === false) {
      throw new Error('Invalid format');
    }
    var formData = {
      form: {
        cepEntrada: cep,
        tipoCep: '',
        cepTemp: '',
        metodo: 'buscarCep',
      },
      encoding: null,
      timeout: 4500,
    };
    _request2.default.post(
      'http://m.correios.com.br/movel/buscaCepConfirma.do',
      formData, function r(err, res, body) {
      if (!err && res.statusCode === 200) {
        var data = _libUtility.parse(
          _iconvLite2.default.decode(body, 'ISO-8859-1')
        );
        if (data) {
          data.success = true;
          data = _libUtility.cleanup(data, 'logradouro');
          data = _libUtility.cleanup(data, 'endereço');
          if (data.hasOwnProperty('endereço')) {
            data.logradouro = data['endereço'];
          }
          resolve(data);
        } else {
          resolve({
            success: false,
            message: 'CEP not found or parse error',
          });
        }
      } else {
        reject(err);
      }
    });
  });
}

exports.default = consulta;
module.exports = exports.default;
