const proxy = [
	{
		context: '/api',
		target: 'https://comcer-api-dev.herokuapp.com/api',
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
