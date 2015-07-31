'use strict';

import got from 'got';
import iconv from 'iconv-lite';
import {parse, cleanup} from './lib/utility';

function getData(msg, cep, success = false) {
  return {
    success: success,
    message: msg,
    cep: cep,
  };
}

function sucesso(res, cep) {
  let data = getData(`Status code is ${res.statusCode}`, cep);
  if (res.statusCode === 200) {
    let newData = parse(iconv.decode(res._buffer, 'iso-8859-1'));
    if (newData) {
      newData.success = true;
      newData.reqCep = cep;
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
    .then((res) => sucesso(res, cep))
    .catch((err) => falha(err, cep));
}

export default consulta;
