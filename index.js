#!/usr/bin/env node

const fs = require("fs");
const express = require("express");
const cors = require("cors");
const dotEnv = require("dotenv");
const argv = require("yargs").alias({ p: "port", m: "map" }).argv;

const api = "./api";
const nowJson = "./now.json";

const logs = require("./utils/logs");
const env = require("./utils/env");
const { logRoutes, createRoutes, createRoutesArray } = require("./utils/routes");

dotEnv.config();

const init = (nowJson) => {
	// initiate express
	const app = express();
	app.use(cors());

	// set port to 8000 unless -p or --port flags are provided
	const PORT = argv.port || 8000;
	
	// if now.json file exists add each environment variable to process.env
	if (nowJson) {
		env.mapEnvsToProcessEnv();
	}

	// map each function exported from api folder system to an endpoint then create post method for each endpoint
	const routes = createRoutesArray(api);
	createRoutes(routes, app);

	// start server
	app.listen(PORT, () => logs.logListening(PORT, argv));

	// if -m or --map flag provided log all routes
	if (argv.map) {
		logRoutes(routes, PORT);
	}
};

const run = () => {
	// check is api folder exists
	if (fs.existsSync(api)) { 
		// check if now.json exists
		if (fs.existsSync(nowJson)) { 
			// if now.json exists call init with path to now.json
			return init(nowJson);
		}     

		// if now.json does not exist log warning
		logs.logNowWarning();  
		// call init without path
		return init();
	}
	
	// if api folder does not exist log error
	return logs.logApiError();
};

run();
