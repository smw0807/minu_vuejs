const authUtil = require('../util/authenticate');

let ket = authUtil.encryptPassword('bbbb');
console.info(ket);

//let eee = authUtil.certifyPassword('aaaa', ket);

//console.info(eee);
console.info("-------------------------");