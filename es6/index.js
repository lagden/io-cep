'use strict';

import got from 'got';
import iconv from 'iconv-lite';
import {parse, cleanup} from './lib/utility';

function sucesso(cep, res) {
  let data;
  if (res.statusCode === 200) {
    data = parse(iconv.decode(res._buffer, 'iso-8859-1'));
    if (data) {
      data.success = true;
      data = cleanup(data, 'logradouro');
      data = cleanup(data, 'endere\u00E7o');
      if (data.hasOwnProperty('endere\u00E7o')) {
        data.logradouro = data['endere\u00E7o'];
      }
    } else {
      data = {
        success: false,
        message: 'CEP not found or parse error',
        cep: cep,
      };
    }
  } else {
    data = {
      success: false,
      message: `Status code is ${res.statusCode}`,
      cep: cep,
    };
  }
  return Promise.resolve(data);
}

function falha(cep, err) {
  return Promise.resolve({
    success: false,
    message: err,
    cep: cep,
  });
}

/**
 * Consulta.
 *
 * @param {string} cep - Zip code of the location.
 */
function consulta(cep) {
  if (typeof cep !== 'string') {
    Promise.reject('Must be a string');
  }
  if (/^(\d{5})\-?(\d{3})$/.test(cep) === false) {
    Promise.reject('Invalid format');
  }
  let formData = {
    body: {
      cepEntrada: cep,
      tipoCep: '',
      cepTemp: '',
      metodo: 'buscarCep',
    },
    timeout: 10000,
  };
  return got
    .post('http://m.correios.com.br/movel/buscaCepConfirma.do', formData)
    .then(sucesso.bind(sucesso, cep))
    .catch(falha.bind(falha, cep));
}

export default consulta;
