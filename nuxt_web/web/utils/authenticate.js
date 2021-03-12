//const bcrypt = require('bcrypt-nodejs');
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';
const ACCESS_KEY = 'dpdptmflow_netcoretech#ghazlvk11';
const REFRESH_KEY = 'flvmffptnlflow_netcoretech#ghazlvk11';

exports.authCheck = async (req, res, next) => {
	const token = req.headers['x-access-token'];

	try {
		console.info("ttt : " + token);
		let ss = await this.certifyAccessToken(token);
		console.info(ss);

		return next();
	} catch (err) {
		//console.info(err);
		res.status(401).json({ msg: "fail" });
	}
};

exports.certifyPassword = (requestPassword, storedPassword) => {
	//return  bcrypt.compareSync(requestPassword,storedPassword);
	//this.encryptPassword(

	return bcrypt.compareSync(requestPassword, storedPassword);
};

exports.encryptPassword = (password) => {
	return bcrypt.hashSync(password, 5);
};

exports.generateAccessToken = (information, time) => {
	//return jwt.sign(information, secretKey, { expiresIn: '1m' });
	return jwt.sign(information, ACCESS_KEY, { expiresIn: time });
};

exports.certifyAccessToken = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, ACCESS_KEY, (err, decoded) => {
			if (err) {
				reject(err);
			} else {
				resolve(decoded);
			}
		})
	});
};

exports.generateRefreshToken = (information, time) => {
	const { uid, pass } = information;

	return jwt.sign({ uid }, REFRESH_KEY + pass, { expiresIn: time });
};

exports.certifyRefreshToken = (token, password) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, REFRESH_KEY, (err, decoded) => {
			if (err) {
				reject(err);
			} else {
				resolve(decoded);
			}
		})
	});
};

exports.decodedToken = (token) => {
	return new Promise((resolve, reject) => {
		try {
			const decoded = jwt.decode(token);
			resolve(decoded);
		} catch (e) {
			reject(e);
		}
	});
};
