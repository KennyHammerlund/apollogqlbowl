import gql from "graphql-tag";

export default gql`
  mutation removeGame($id: String!) {
    reset(deviceId: $id) {
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
