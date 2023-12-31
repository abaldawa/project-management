# project-management

## Author: Abhijit Baldawa

### Description

A fullstack React.js/Node.js/Typescript/GraphQL based project-management app showing full project invoices. The react frontend fetches project invoice details from backend GraphQL server.

The project/phase/cost items details on the backend graphql server is mocked (mimicking real database and is in-memory for exercise purpose) but all the associated calculation necessary to generate invoice details (ex. totalTax, total project cost, phase subtotal cost, phase tax etc.) are real and are happening on the mocked database data. The mocked database data is all relational mimicking real DB relations as much as possible.

Graphql resolvers typescript types on **backend** and graphql query types on **frontend** are generated (and committed in this github repo) from graphql schema using @graphql-codegen/cli as per the docs [here](https://www.apollographql.com/docs/apollo-server/workflow/generate-types/) and [here](https://www.apollographql.com/docs/react/development-testing/static-typing/), so, its 100% typesafe at the code level.

### Tech Stack

1. **Backend:** Node.js (18.x), Typescript, express.js, apollo-server, graphql, jest, ts-jest
2. **Front end:** React.js, Typescript, apollo-client, material-ui
3. **Testing:** Backend unit tests are done using Jest and ts-jest
4. Docker
5. **Graphql types codegen:** @graphql-codegen/cli, @graphql-codegen/typescript, @graphql-codegen/typescript-resolvers, @graphql-codegen/client-preset

### Pre-requisites

1. Docker

### How to run:

1. `git clone https://github.com/abaldawa/project-management.git`
2. `cd project-management`
3. `docker-compose up`
4. go to `http://localhost:3000` to see the UI

### How to run manually

1. Install Node.js 18.16.1
2. `git clone https://github.com/abaldawa/project-management.git`
3. `cd project-management/server`
4. execute `npm i`
5. execute `npm start` (This will start the backend GraphQL server)
6. `cd ..` (or go back to root `project-management` folder)
7. `cd client`
8. execute `npm i`
9. execute `npm start` (This will start the frontend react dev server)
10. Go to `http://localhost:3000` to see the UI

### GraphQL types codegen on backend and frontend
The graphql types on both backend and frontend are already generated using graphql-codegen/cli and committed with the repo. If you change the graphql schema/query then you can auto generate typescript types for graphql on backend/frontend with below available npm script.

For backend:

1. `cd project-management/server`
2. `npm run generate-graphql-types` - This will generate graphql resolvers typescript types based on the graphql schema

For frontend:

1. `cd project-management/client`
2. `npm run generate-graphql-types` - This will generate graphql query typescript types based on the graphql schema and query

### Unit tests

17 Unit tests are added on the backend (under `__tests__` folder) that tests all the core logic which performs tax/total/subtotal calculations on phase/project etc.
To run the unit tests do below:

1. Go to `project-management`
2. `cd server`
3. execute `npm run test:unit`

### Server GraphQL API and GraphQL API query interface:

GraphQL api (and GraphQL API query UI) can be accessed on `/project-management-service/graphql`. Use project id `7225222f-faa2-48c9-bdba-e17fcf21a05b` as `projectId` to query project invoice from graphql backend server.

### NOTES (If I had more time I would have done below)

1. To share reusable typescript types and javascript code on both frontend and backend a monorepo like [NX](https://nx.dev/)
   is a good choice.
2. Graphql [n+1 problem](https://shopify.engineering/solving-the-n-1-problem-for-graphql-through-batching) can be solved using [data-loader](https://github.com/graphql/dataloader). Basically a batching solution.
3. Unit/integration/E2E tests on the frontend using jest, React testing library, Mock Service worker, cypress etc.
4. The frontend is created using CRA. As CRA is sunsetted officially by react team, the official recommended ways to create react project, according to react official docs, are Next.js and Remix. Create Vite App is also a very popular solution to create a client only SPA with react.js but is not highlighted enough on react.js new official docs.

### User interface

Below gif shows how the UI looks like

![Jul-05-2023 12-16-31 PM](https://github.com/abaldawa/project-management/assets/5449692/d365aa27-606b-4eeb-bc0b-38b66dc6075b)
