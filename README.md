# project-management
## Author: Abhijit Baldawa

### Description
A fullstack React.js/Node.js/Typescript/GraphQL based project-management app showing full project invoices.

### Tech Stack
1. **Backend:** Node.js (18.x), Typescript, express.js, apollo-server, graphql
2. **Front end:** React.js, Typescript, apollo-client, material-ui
3. Docker

### How to run:
1. git clone https://github.com/abaldawa/project-management.git
2. cd project-management
3. docker-compose up
4. go to http://localhost:3000 to see the UI

### Server GraphQL API and GraphQL API query interface:
`/project-management-service/graphql`

### NOTES
1. To share reusable typescript types and javascript code on both frontend and backend a monorepo like [NX](https://nx.dev/)
   is a good choice.
2. Typescript types based on GraphQL schema can be generated using graphql cli code generator as highlighted in official
   apollo docs [here](https://www.apollographql.com/docs/react/development-testing/static-typing/) and [here](https://www.apollographql.com/docs/apollo-server/workflow/generate-types/).
   This helps to avoid typing graphql schema manually in typescript.
   
