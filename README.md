# project-management
## Author: Abhijit Baldawa

### Description
A fullstack React.js/Node.js/Typescript/GraphQL based project-management app showing full project invoices. The react frontend fetches project invoice details from backend GraphQL server.

The project/phase/cost items details on the backend graphql server is mocked (mimicking real database and is in-memory for exercise purpose) but all the associated calculation necessary to generate invoice details (ex. totalTax, total project cost, phase subtotal cost, phase tax etc.) are real and are happening on the mocked database data. The mocked database data is all relational mimicking real DB relations as much as possible.

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
GraphQL api (and GraphQL API query UI) can be accessed on `/project-management-service/graphql`. Use project id `7225222f-faa2-48c9-bdba-e17fcf21a05b` as `projectId` to query project invoice from graphql backend server. 

### NOTES (If I had more time I would have done below)
1. To share reusable typescript types and javascript code on both frontend and backend a monorepo like [NX](https://nx.dev/)
   is a good choice.
2. Typescript types based on GraphQL schema can be generated using graphql cli code generator as highlighted in official
   apollo docs [here](https://www.apollographql.com/docs/react/development-testing/static-typing/) and [here](https://www.apollographql.com/docs/apollo-server/workflow/generate-types/).
   This helps to avoid typing graphql schema manually in typescript.
3. Graphql [n+1 problem](https://shopify.engineering/solving-the-n-1-problem-for-graphql-through-batching) can be solved using [data-loader](https://github.com/graphql/dataloader). Basically a batching solution.
4. Responsive UI on the frontend which looks well on all screen sizes.
5. Unit/integration/E2E tests using jest, React testing library, Mock Service worker, cypress etc.
6. The frontend is created using CRA. As CRA is sunsetted officially by react team, the official recommended ways to create react project, according to react official docs, are Next.js and Remix. Create Vite App is also a very popular solution to create a client only SPA with react.js but is not highlighted enough on react.js new official docs.
   
### User interface
Below gif shows how the UI looks like

![Jul-04-2023 4-25-30 PM](https://github.com/abaldawa/project-management/assets/5449692/cef6129b-358f-406b-8210-4a7912815461)
