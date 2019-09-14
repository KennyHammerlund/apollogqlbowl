import ApolloClient from "apollo-client";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import apolloLogger from "apollo-link-logger";
import { createHttpLink } from "apollo-link-http";
import { AsyncStorage } from "react-native";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import Constants from "expo-constants";

let uri = "https://sg-summit-api.herokuapp.com/graphql";

const httpLink = createHttpLink({ uri });

const withEmail = setContext(async request => {
  const email = await AsyncStorage.getItem("email");
  return {
    headers: {
      user: email,
      deviceid: Constants.installationId
    }
  };
});

const resetToken = onError(errors => {
  const { networkError, graphQLErrors } = errors;
  let errorMsg = "";
  graphQLErrors &&
    graphQLErrors.forEach(({ message }) => {
      errorMsg = `${message}\n${errorMsg}`;
    });
  console.log(`*--errorMsg`, errorMsg);
  console.log(`*--onError network: `, networkError);
});

const fragmentMatcher = new IntrospectionFragmentMatcher({});

const authFlowLink = withEmail.concat(resetToken);
const logger = authFlowLink.concat(apolloLogger);
const link = logger.concat(httpLink);

const cache = new InMemoryCache({
  fragmentMatcher
});

export default new ApolloClient({
  link,
  cache
});
