# io-cep
[![NPM version](https://img.shields.io/npm/v/io-cep.svg)](https://www.npmjs.com/package/io-cep)
[![Build Status](https://travis-ci.org/lagden/io-cep.svg?branch=1.0.0)](https://travis-ci.org/lagden/io-cep)
[![Coverage Status](https://coveralls.io/repos/lagden/io-cep/badge.svg?branch=master&service=github)](https://coveralls.io/github/lagden/io-cep?branch=master)
[![Dependency Status](https://david-dm.org/lagden/io-cep.svg)](https://david-dm.org/lagden/io-cep)
[![devDependency Status](https://david-dm.org/lagden/io-cep/dev-status.svg)](https://david-dm.org/lagden/io-cep#info=devDependencies)

> Procurar endereço utilizando o código postal(CEP) através Correios


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
      process.stdout.write(res.logradouro + '\n');
      //=> Avenida Paulista
    } else {
      process.stdout.write(res.message + '\n');
      //=> CEP não encontrado ou erro de análise.
    }
  })
  .catch(function(err){
    process.stdout.write(err + '\n');
  });
});
```


## API

### consulta(cep)

#### cep

*Required*  
Type: `string`

Código de Endereçamento Postal (CEP)


## License

MIT © [Thiago Lagden](http://lagden.in)
