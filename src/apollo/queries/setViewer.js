import gql from "graphql-tag";

export default gql`
  mutation setViewer($input: ViewerInput!) {
    setViewer(input: $input) {
      name
      id
      delay
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
