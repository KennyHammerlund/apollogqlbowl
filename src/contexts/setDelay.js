import gql from "graphql-tag";

export default gql`
  mutation changeDelay($input: Int!) {
    setDelay(delay: $input)
  }
`;
