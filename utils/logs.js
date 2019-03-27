const chalk = require("chalk");

const logListening = (PORT, argv) => {
    console.log( //eslint-disable-line
		"🦄",
		chalk.bgBlueBright("BOOM!!"),
		chalk.green(`\nServerless dev environment running on port ${PORT}`),
		chalk.green(
			argv.port ? "" : "\nUse --port or -p to run on a different port"
		)
	);
};

const logRouteWorking = (PORT, route) => {
    console.log( //eslint-disable-line
		chalk.bgBlueBright("WORKING"),
		chalk.blue(`---> http://localhost:${PORT}/api/${route.routeName}`)
	);
};

const logRouteNotWorking = (PORT, route) => {
    console.log( //eslint-disable-line
		chalk.bgRedBright("FAILING"),
		chalk.red(`---> http://localhost:${PORT}/api/${route.routeName}`),
		chalk.red("---> route does not return a function")
	);
};

const logNowWarning = () => {
    console.log( //eslint-disable-line
		chalk.bgYellow("WARNING"),
		chalk.yellow("now.json file does not exist"),
		" \n"
	);    
};

const logApiError = () => {
    console.log( //eslint-disable-line
		chalk.bgRedBright("ERROR"),
		chalk.red("Directory must contain a folder named 'api'")
	);
};

module.exports = {
	logListening,
	logRouteWorking,
	logRouteNotWorking,
	logNowWarning,
	logApiError
};