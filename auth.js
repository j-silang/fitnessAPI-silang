const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.createAccessToken = (user) => {
	const data = {
		id: user._id,
		email: user.email
	};
	return jwt.sign(data, process.env.JWT_SECRET_KEY, {});
};

module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization;
	if(!token) {
		return res.status(401).json({ auth: "Failed. No Token" });
	}else{
		token = token.slice(7, token.length);
		jwt.verify(token, process.env.JWT_SECRET_KEY, function(error, decodedToken) {
			if(error){
				return res.status(403).json({
					auth: "Failed",
					message: error.message
				})
			}else{
				req.user = decodedToken;
				next();
			}
		})
	} 
};

module.exports.errorHandler = (error, req, res, next) => {
	console.error(error);
	const statusCode = error.status || 500;
	const errorMessage = error.message || 'Internal Server Error';
	res.status(statusCode).json({
		error: {
			message: errorMessage,
			errorCode: error.code || 'SERVER_ERROR',
			details: error.details || null
		}
	});
};