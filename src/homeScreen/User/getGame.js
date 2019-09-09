import gql from "graphql-tag";

export default gql`
  query getGame {
    game {
      id
      delay
      name
      actions {
        id
        type
        value
        timeStamp
        optimistic
      }
    }
  }
`;
