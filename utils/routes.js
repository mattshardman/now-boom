const fs = require("fs");
const logs = require("./logs");

const logRoutes = (routes, PORT) => {
	routes.forEach(route => {
		if (typeof route.routeFunction === "function") {
			logs.logRouteWorking(PORT, route);
		} else {
			logs.logRouteNotWorking(PORT, route);
		}
	});
};

const createRoutes = (routes, app) => {
	routes.forEach(({ routeName, routeFunction }) => {
		if (typeof routeFunction === "function") {
			app.post(`/api/${routeName}`, routeFunction);
		}
	});
};

const createRoutesArray = (api) => 
	fs.readdirSync(api).reduce((acc, file) => {
		const importedFile = require(process.cwd() + `/api/${file}`);

		fs.readdirSync(`./api/${file}`).forEach(innerFile => {
			if (!innerFile.includes(".js")) {
				const importedFileInner = require(process.cwd() +
					`/api/${file}/${innerFile}`);
				acc.push({
					routeName: `${file}/${innerFile}`,
					routeFunction: importedFileInner
				});
			}
		});

		acc.push({
			routeName: file,
			routeFunction: importedFile
		});

		return acc;
	}, []);

module.exports = { logRoutes, createRoutes, createRoutesArray };