# proto-hapi-server
A mini hapi server for static files and configurable routes -- for prototyping
- Add routes in directory "routes"
- Add socketIo listeners in directory "listeners"

# build and start
- npm i
- gulp
- node start

# check server : 
- http://localhost/ping



# configure this proto-hapi-server into another existing project :

- copy the full directory "root-of-your-project/node_module/proto-hapi-server/server" into the project root directory.
- then move the "root-of-your-project/server/server.js" into the project root directory.