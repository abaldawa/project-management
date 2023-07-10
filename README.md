# project-management
## Author: Abhijit Baldawa

### Description
A fullstack React.js/Node.js/Typescript/GraphQL based project-management app showing full project invoices. The react frontend fetches project invoice details from backend GraphQL server.

The project/phase/cost items details on the backend graphql server is mocked (mimicking real database and is in-memory for exercise purpose) but all the associated calculation necessary to generate invoice details (ex. totalTax, total project cost, phase subtotal cost, phase tax etc.) are real and are happening on the mocked database data. The mocked database data is all relational mimicking real DB relations as much as possible.

### Tech Stack
1. **Backend:** Node.js (18.x), Typescript, express.js, apollo-server, graphql, jest, ts-jest
2. **Front end:** React.js, Typescript, apollo-client, material-ui
3. **Testing**: Backend unit tests are done using Jest and ts-jest
4. Docker

### Pre-requisites
1. Docker

### How to run:
1. `git clone https://github.com/abaldawa/project-management.git`
2. `cd project-management`
3. `docker-compose up`
4. go to `http://localhost:3000` to see the UI

### How to run manually
1. Install Node.js 18.16.1
1. `git clone https://github.com/abaldawa/project-management.git`
2. `cd project-management/server`
3. execute `npm i`
4. execute `npm start` (This will start the backend GraphQL server)
5. `cd ..` (or go back to root `project-management` folder)
6. `cd client`
7. execute `npm i`
8. execute `npm start` (This will start the frontend react dev server)
9. Go to `http://localhost:3000` to see the UI

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
2. Typescript types based on GraphQL schema can be generated using graphql cli code generator as highlighted in official
   apollo docs [here](https://www.apollographql.com/docs/react/development-testing/static-typing/) and [here](https://www.apollographql.com/docs/apollo-server/workflow/generate-types/).
   This helps to avoid typing graphql schema manually in typescript.
3. Graphql [n+1 problem](https://shopify.engineering/solving-the-n-1-problem-for-graphql-through-batching) can be solved using [data-loader](https://github.com/graphql/dataloader). Basically a batching solution.
4. Responsive UI on the frontend which looks well on all screen sizes.
5. Unit/integration/E2E tests  on the frontend using jest, React testing library, Mock Service worker, cypress etc.
6. The frontend is created using CRA. As CRA is sunsetted officially by react team, the official recommended ways to create react project, according to react official docs, are Next.js and Remix. Create Vite App is also a very popular solution to create a client only SPA with react.js but is not highlighted enough on react.js new official docs.
   
### User interface
Below gif shows how the UI looks like

![Jul-05-2023 12-16-31 PM](https://github.com/abaldawa/project-management/assets/5449692/d365aa27-606b-4eeb-bc0b-38b66dc6075b)

