const proxy = [
	{
		context: '/api',
		target: 'http://comcer-api-dev.herokuapp.com/api',
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
