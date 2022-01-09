import App from "./App";
import { getUserDataFromMemory } from "./utils/getUserData";
import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
  ApolloProvider,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://blooming-basin-18935.herokuapp.com",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: "Bearer " + getUserDataFromMemory().token || null,
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});
export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
