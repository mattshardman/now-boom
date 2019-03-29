# now-boom

Cli to mimic Zeit's serverless environment locally (for node apis).

(https://zeit.co/docs/v2/getting-started/introduction-to-now/)

**Installation**

Install:
```npm i now-boom --save-dev```

or:
```yarn add -D now-boom```

To run:
```boom```

This creates a server listening on ```port 8000```.

To use a different port use ```boom --port <port-number>``` or ```boom -p <port-number>```

**Implementation:**

```now-boom``` requires a folder called api.

Each sub-folder will create an API endpoint.

The sub-folder must contain an index.js file.

E.g.

```
|-- api
      |-- send
            |-- index.js
      |-- add
            |-- index.js
 ```
 
 Maps to:
 ```
  http://localhost:8000/api/send
  http://localhost:8000/api/add
 ```

Nested folders will also create endpoints.

E.g.

```
|-- api
      |-- send
            |-- inner-send
                  |-- index.js
```

Maps to;
```
  http://localhost:8000/api/send/inner-send
```

**Methods**

Each endpoint can be accessed with:

```GET POST PUT DELETE & PATCH```

methods.

**Viewing endpoints:**

To view end points run ```boom -map``` or ```boom -m```

This will return a list of endpoints.

Each endpoint is flagged to identify whether it returns a function.

**Environment variables:**

```now-boom``` checks to see if the project has a ```now.json``` file.

If ```now.json``` does not exist a warning will be displayed.

To add env variables to your project simply add them to the ```now.json``` file as per zeit documentation (https://zeit.co/docs/v2/deployments/environment-variables-and-secrets/). 

```now.boom``` will add each env variable listed in ```now.json``` to ```process.env```

E.g.

```javascript
//now.json

{
      "env": {
            "API_KEY": "value",
       }
}
```

Can be accessed in the relevant function using:

```javascript
const dotEnv = require("dotenv");

dotEnv.config();

const { API_KEY } = process.env;

module.exports = (req, res) => {
      console.log(API_KEY)
      // => value
}
```

This allows for a single source of truth for env variables, and solves the problem of having to use a separate .env file in development.
