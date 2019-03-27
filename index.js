#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");
const fs = require("fs");
const express = require("express");
const path = require("path");

const api = "./api/";

const init = () => {
  const app = express();

  const routes = fs.readdirSync(api).map(file => {
    const importedFile = require(process.cwd() + `/api/${file}`);
    return {
      routeName: file,
      routeFunction: importedFile
    };
  });

  routes.forEach(({ routeName, routeFunction }) => {
    app.post(`/api/${routeName}`, routeFunction);
  });

  app.listen(8000, () =>
    console.log(
      chalk.red("BOOM!!"),
      chalk.green("Serverless dev environment running on port 8000")
    )
  );
};

const run = async () => {
  init();
};

run();
