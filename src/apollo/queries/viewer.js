import gql from "graphql-tag";

export default gql`
  query getViewer {
    viewer {
      id
      name
      delay
      optimistic
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
