#!/usr/bin/env node

const chalk = require("chalk");
const fs = require("fs");
const express = require("express");
const argv = require("yargs").alias("p", "port").argv;

const api = "./api/";

const init = () => {
	const app = express();

	const routes = fs.readdirSync(api).reduce((acc, file) => {
		const importedFile = require(process.cwd() + `/api/${file}`);

		fs.readdirSync(`./api/${file}`).forEach(innerFile => {
			if (!innerFile.includes(".js")) {
				const importedFileInner = require(process.cwd() + `/api/${file}/${innerFile}`);
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

	routes.forEach(({ routeName, routeFunction }) => {
		app.post(`/api/${routeName}`, routeFunction);
	});

	const PORT = argv.port || 8000;
	app.listen(PORT, () =>
		console.log( //eslint-disable-line
			chalk.bgBlueBright("BOOM!!"),
			chalk.green(`\nServerless dev environment running on port ${PORT}`),
			chalk.green(!argv.port && "\nUse --port or -p to run on a different port")
		)
	);
};

const run = () => {
	init();
};

run();
