# io-cep
[![NPM version](https://img.shields.io/npm/v/io-cep.svg)](https://www.npmjs.com/package/io-cep)
[![Build Status](https://travis-ci.org/lagden/io-cep.svg?branch=master)](https://travis-ci.org/lagden/io-cep)
[![Dependency Status](https://david-dm.org/lagden/io-cep.svg)](https://david-dm.org/lagden/io-cep) 
[![devDependency Status](https://david-dm.org/lagden/io-cep/dev-status.svg)](https://david-dm.org/lagden/io-cep#info=devDependencies)

> Search address using zip code through Correios


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
      //=> CEP not found or parse error.
    }
  })
  .catch(function(err){
    process.stdout.write(err + '\n');
    //=> CEP must be a string
  });
});
```


## API

### consulta(cep)

#### cep

*Required*  
Type: `string`

zip address


## License

MIT © [Thiago Lagden](http://lagden.in)
