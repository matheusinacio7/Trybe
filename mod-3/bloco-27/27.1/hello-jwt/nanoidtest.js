const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');

const secret = 'vamonessa';

const baseId = nanoid();

const types = {
  'a': 'access',
  'r': 'refresh',
};

let counter = 0;

const blacklist = { };

const firstId = `${baseId}.r.${counter}`;
const firstJwt = jwt.sign(firstId, secret);
const firstPayload = jwt.verify(firstJwt, secret);

console.log({ firstId, firstJwt, firstPayload });

const [fetchedBaseId, type, count] = firstPayload.split('.');
console.log({ fetchedBaseId, type, count});

if(blacklist[fetchedBaseId]) {
  blacklist[fetchedBaseId][type] = parseInt(count);
} else {
  blacklist[fetchedBaseId] = { [type]: parseInt(count) };
}

console.log(blacklist);
