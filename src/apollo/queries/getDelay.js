import gql from "graphql-tag";

export default gql`
  query getDelay {
    viewer {
      id
      delay
    }
  }
`;
