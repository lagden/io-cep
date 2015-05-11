# io-cep [![Build Status](https://travis-ci.org/lagden/io-cep.svg?branch=master)](https://travis-ci.org/lagden/io-cep)

> Search address using zip code through Correios's form


## Install

```
$ npm install --save io-cep
```


## Usage

```js
var ioCep = require('io-cep');

ioCep('01310-940', function(err, res){
  if(err)
    throw err;
  process.stdout.write(res.logradouro + '\n');
  //=> Avenida Paulista
});
```


## API

### ioCep(input, callback)

#### input

*Required*  
Type: `string`

zip code the desired address.

#### callback

*Required*  
Type: `function`  


## License

MIT © [Thiago Lagden](http://lagden.in)
