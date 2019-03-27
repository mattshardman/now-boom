const mapEnvsToProcessEnv = () => {
	const { env } = require(process.cwd() + "/now.json");
	if (env) {
		Object.entries(env).forEach(([key, value]) => process.env[key] = value);
	}
};

module.exports = { mapEnvsToProcessEnv };