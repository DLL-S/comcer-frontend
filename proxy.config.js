const proxy = [
	{
		context: '/api',
		target: 'http://189.63.74.198:5000/api',
		pathRewrite: {
			'^/api': ''
		},
		"changeOrigin": true,
		"logLevel": "debug",
		"secure": false,
		"strictSSL": true,
		"rejectUnauthorzied": false,
	}
];
module.exports = proxy;
