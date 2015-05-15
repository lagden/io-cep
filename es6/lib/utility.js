'use strict';

import cheerio from 'cheerio';

function parse(html) {
  let $, $respostas, tmp, tmpKeys;

  $ = cheerio.load(html);
  tmp = {};
  $respostas = $('.resposta');

  Array.prototype.forEach.call($respostas, (resposta) => {
    let keys, values;
    let $el = $(resposta);
    let key = $el.text().trim().replace(':', '').replace('/', '-');
    let value = $el.next('.respostadestaque').text().trim();
    if (key.indexOf('Localidade') !== -1) {
      keys = key.split('-');
      values = value.replace(/[\n\t]+/g, '').split('/');
      tmp[keys[0].trim().toLowerCase()] = values[0].trim();
      tmp[keys[1].trim().toLowerCase()] = values[1].trim();
    } else {
      tmp[key.toLowerCase()] = value;
    }
  });

  tmpKeys = Object.keys(tmp);
  return (tmpKeys.length > 0) ? tmp : null;
}

function cleanup(data, key) {
  if (data.hasOwnProperty(key)) {
    data[key] = data[key].split(/(, [\d]+)|( - de )/)[0];
  }
  return data;
}

export {parse, cleanup};
