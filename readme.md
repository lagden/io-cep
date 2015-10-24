# io-cep
[![NPM version](https://img.shields.io/npm/v/io-cep.svg)](https://www.npmjs.com/package/io-cep)
[![Build Status](https://travis-ci.org/lagden/io-cep.svg?branch=2.0.0)](https://travis-ci.org/lagden/io-cep)
[![Coverage Status](https://coveralls.io/repos/lagden/io-cep/badge.svg?branch=master&service=github)](https://coveralls.io/github/lagden/io-cep?branch=master)
[![Dependency Status](https://david-dm.org/lagden/io-cep.svg)](https://david-dm.org/lagden/io-cep)
[![devDependency Status](https://david-dm.org/lagden/io-cep/dev-status.svg)](https://david-dm.org/lagden/io-cep#info=devDependencies)

> Busca por endereço ou Código de Endereçamento Postal(CEP) através dos Correios


## Install

```
$ npm i --save-dev io-cep
```


## Usage

```javascript
var consulta = require('io-cep');

consulta('01310-940')
  .then(function(res){
    if(res.success) {
      process.stdout.write(res.dados[0].logradouro + '\n');
      //=> Avenida Paulista
    } else {
      process.stdout.write(res.message + '\n');
      //=> Dados não encontrado ou erro de análise.
    }
  })
  .catch(function(err){
    process.stdout.write(err + '\n');
  });
});
```


## API

### consulta(input)

#### input

*Required*  
Type: `string`

Pode ser o endereço ou o Código de Endereçamento Postal (CEP)


## License

MIT © [Thiago Lagden](http://lagden.in)
