# now-boom

Node.js cli to mimic Zeit's serverless enviroment locally.

Install:
```npm i now-boom```

or:
```yarn add now-boom```

To run:
```boom```

This creates a server listening on ```port 8000```.

To use a different port use ```boom --port <port-number>``` or ```boom -p <port-number>```

**Implimentation:**

```now-boom``` requires a folder called api.

Each subfolder will create an API endpoint.

The subfolder must contain an index.js file.

E.g.

```
|-- api
      |-- send
            | index.js
      |-- add
            |-- index.js
 ```
 
 Maps to:
 ```
  http://localhost:8000/api/send
  http://localhost:8000/api/add
 ```
**Viewing endpoints:**

To view end points run ```boom -map``` or ```boom -m```

This will return a list of each endpoint.
Each endpoint is flagged to identify whether it returns a function.
