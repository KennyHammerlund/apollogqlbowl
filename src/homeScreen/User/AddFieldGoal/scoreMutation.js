import gql from "graphql-tag";

export default gql`
  mutation addFieldGoal($input: GameActionInput) {
    addGameAction(input: $input) {
      id
      type
      value
      timeStamp
      optimistic
    }
  }
`;
