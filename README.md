# now-boom

Node.js cli to mimic Zeit's serverless enviroment locally.

Install:
```npm i now-boom```

or:
```yarn add now-boom```

To run:
```boom```

This creates a server listening on ```port 8000```.
To use a different port use ```boom -p <port-number>```

Implimentation:
```now-boom``` requires a folder called api.
Each subfolder will create an API endpoint.
Each subfolder must contain an index.js file.
e.g.

```
|-- api
      |-- send
            | index.js
      |-- add
            |-- index.js
 ```
 
 maps to:
 ```
  http://localhost:8000/api/send
  http://localhost:8000/api/add
 ```
