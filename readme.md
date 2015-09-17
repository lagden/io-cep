# io-cep [![Build Status](https://travis-ci.org/lagden/io-cep.svg?branch=master)](https://travis-ci.org/lagden/io-cep) [![Awesome](http://cdn.lagden.in/awesome/badge.svg)](https://github.com/lagden/awesome-nodejs)

> Search address using zip code through Correios


## Install

```
$ npm i -S io-cep
```


## Usage

```js
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
