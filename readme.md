# io-cep

[![NPM version][npm-img]][npm]
[![Build Status][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]
[![devDependency Status][devDep-img]][devDep]
[![XO code style][xo-img]][xo]

[npm-img]:       https://img.shields.io/npm/v/io-cep.svg
[npm]:           https://www.npmjs.com/package/io-cep
[ci-img]:        https://travis-ci.org/lagden/io-cep.svg
[ci]:            https://travis-ci.org/lagden/io-cep
[coveralls-img]: https://coveralls.io/repos/github/lagden/io-cep/badge.svg?branch=master
[coveralls]:     https://coveralls.io/github/lagden/io-cep?branch=master
[devDep-img]:    https://david-dm.org/lagden/io-cep/dev-status.svg
[devDep]:        https://david-dm.org/lagden/io-cep#info=devDependencies
[xo-img]:        https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:            https://github.com/sindresorhus/xo


Busca por informações de uma localidade através do endereço ou CEP utilizando os [Correios](http://www.correios.com.br/)


## Install

```
$ npm i -S io-cep
```


## Usage

```javascript
const consulta = require('io-cep')

consulta(01310940)
  .then(res => {
    if (res.success) {
      console.log(res.dados[0].logradouro) // Avenida Paulista
    } else {
      console.log(res.message) // Dados não encontrado ou erro de análise.
    }
  })
  .catch(err => {
    console.log(err)
  })
```


## API

### consulta(input)

#### input

*Required*  
Type: `string`

Utilize o endereço ou o Código de Endereçamento Postal (CEP)


## License

MIT © [Thiago Lagden](http://lagden.in)
