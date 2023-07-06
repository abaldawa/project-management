/**
 * @author Abhijit Baldawa
 */

import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { PROJECT_MANAGEMENT_SERVICE_GRAPHQL_URL } from "../../shared/constants/backend-services-url";

const client = new ApolloClient({
  uri: PROJECT_MANAGEMENT_SERVICE_GRAPHQL_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

const GraphqlProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <ApolloProvider client={client}>{children}</ApolloProvider>;

export { GraphqlProvider };
