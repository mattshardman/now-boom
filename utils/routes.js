const path = require("path");
const fs = require("fs");
const logs = require("./logs");

const logRoutes = (routes, PORT) => 
	routes.forEach(route => {
		if (typeof route.routeFunction === "function") {
			logs.logRouteWorking(PORT, route);
		} else {
			logs.logRouteNotWorking(PORT, route);
		}
	});

const createRoutes = (routes, app) => 
	routes.forEach(({ routeName, routeFunction }) => {
		if (typeof routeFunction === "function") {
			app.get(`${routeName}`, routeFunction);
			app.post(`${routeName}`, routeFunction);
			app.put(`${routeName}`, routeFunction);
			app.delete(`${routeName}`, routeFunction);
			app.patch(`${routeName}`, routeFunction);
		}
	});


function createRoutesArray(initialFolder) {
	let routes = [];

	const readFiles = folder => fs.readdirSync(folder).forEach(file => {
		const pathTo = `${folder}/${file}`;

		if (path.extname(file) === ".js") {
			return;
		}

		readFiles(pathTo);

		if (!file.includes(".js")) {
			const importPath = pathTo.slice(1);
			const importedFile = require(process.cwd() + importPath);
			return routes.push({
				routeName: importPath,
				routeFunction: importedFile
			});
		}
	});

	readFiles(initialFolder);

	return routes;
}
module.exports = { logRoutes, createRoutes, createRoutesArray };
