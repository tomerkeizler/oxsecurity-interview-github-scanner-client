import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import App from "./App";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
