# io-cep [![Build Status](https://travis-ci.org/lagden/io-cep.svg?branch=master)](https://travis-ci.org/lagden/io-cep)

> Search address using zip code through Correios's form

**io-cep** is supported in all versions of [io.js](https://iojs.org/) without any flags.

To use **io-cep** with [node.js](https://nodejs.org/), you must be running 
node 0.12 or higher for generator and promise support, and must run 
node with the `--harmony` flag.


## Install

```
$ npm install --save io-cep
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
    process.stdout.write(err.message + '\n');
    //=> CEP must be a string
  });
});
```


## API

### consulta(cep)

#### cep

*Required*  
Type: `string`

CEP of the address desired.


## Dev

The code was written in ES6 and converted to ES5 
via [babel](https://babeljs.io/).

### Build

```
$ npm test && npm run build
```


## License

MIT © [Thiago Lagden](http://lagden.in)
