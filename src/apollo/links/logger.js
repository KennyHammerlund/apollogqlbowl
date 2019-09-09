import { ApolloLink } from "apollo-link";
import { print } from "graphql/language/printer";

export default new ApolloLink((operation, forward) => {
  const { operationName, query, variables, context } = operation;
  const start = Date.now();

  return forward(operation).map(({ data, errors }) => {
    const time = Date.now() - start;
    const color = time < 300 ? "green" : time < 2000 ? "#eea93a" : "red";
    if (errors) console.groupCollapsed(`FAILED:${operationName}`);
    else console.groupCollapsed(`graphql:${operationName}`);

    console.log({ variables, context, query: print(query) });
    console.log({ data, errors });

    console.log(`%cloaded in ${time}ms`, `font-weight: 700; color: ${color}`);
    console.groupEnd();

    return { data, errors };
  });
});
