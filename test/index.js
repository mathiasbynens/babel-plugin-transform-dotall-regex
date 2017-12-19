import path from 'path';
import fs from 'fs';
import assert from 'assert';
import { transformFileSync } from 'babel-core';
import plugin from '../src';

describe('babel-plugin-transform-dotall-regex', () => {
	const fixturesDir = path.join(__dirname, 'fixtures');
	fs.readdirSync(fixturesDir).map((caseName) => {
		it(`${caseName.split('-').join(' ')}`, () => {
			const fixtureDir = path.join(fixturesDir, caseName);
			const inputPath = path.join(fixtureDir, 'input.js');
			const actual = transformFileSync(inputPath, {
				'plugins': [
					plugin
				]
			}).code;
			const expected = fs.readFileSync(
				path.join(fixtureDir, 'expected.js')
			).toString();
			assert.equal(actual.trim(), expected.trim());
		});
	});
});
