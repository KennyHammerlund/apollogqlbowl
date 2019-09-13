import gql from "graphql-tag";

export default gql`
  mutation addAction($input: GameActionInput) {
    addGameAction(input: $input) {
      id
      type
      value
      timeStamp
      optimistic
    }
  }
`;
