'use strict';

import test from 'ava';
import ioCep from '../';

test('ok', async t => {
	const res = await ioCep('04653-055');
	t.true(res.success);
	t.same(res.logradouro, 'Rua Amália Cerelo Godespoti');
});

test('not found', async t => {
	const res = await ioCep('00000-000');
	t.false(res.success);
	t.same(res.message, 'CEP not found or parse error');
});

test('string', async t => {
	try {
		await ioCep(1310940);
	} catch (err) {
		t.is(err, 'Must be a string');
	}
});

test('format', async t => {
	try {
		await ioCep('1310');
	} catch (err) {
		t.is(err, 'Invalid format');
	}
});
