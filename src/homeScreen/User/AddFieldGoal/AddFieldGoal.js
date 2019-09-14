import React, { useEffect } from "react";
import { Text, Button } from "native-base";
import { useMutation } from "@apollo/react-hooks";
import moment from "moment";
import ApolloClient from "../../../apollo/apollo";

import MUTATION from "./scoreMutation";
import GET_VIEWER from "../../../apollo/queries/viewer";

export default ({ props }) => {
  const [addTouchdown, { loading }] = useMutation(MUTATION, {
    optimisticResponse: ({ input }) => {
      const { viewer } = ApolloClient.readQuery({ query: GET_VIEWER });
      // the server assigns the id of the action on creation, push key from Firebase
      // we need to create a temporary id until the server can return its response
      // we also set optimistic to true
      const newActionArray = [
        ...viewer.actions,
        {
          id: moment()
            .utc()
            .unix(),
          ...input,
          optimistic: true,
          __typename: "GameAction"
        }
      ];
      // the object we return needs the same structure as the mutation(mutation name)
      return { addGameAction: newActionArray };
    },
    update: (cache, { data }) => {
      const { viewer } = cache.readQuery({ query: GET_VIEWER });
      // cache uses id as a way to control result values, we cant set viewer to null we need to
      // return the id + __typename with no other values.
      cache.writeQuery({
        query: GET_VIEWER,
        // the return from our mutation `addGameAction` returns an array of game actions
        // we need to amend our viewer query to include those new actions
        data: {
          viewer: {
            ...viewer,
            actions: data.addGameAction
          },
          addGameAction: data.addGameAction
        }
      });
    },
    variables: {
      input: {
        type: "FIELD_GOAL",
        value: 3,
        timeStamp: moment()
          .utc()
          .unix()
      }
    }
  });
  useEffect(() => {}, [loading]);

  return (
    <Button
      onPress={() => {
        addTouchdown();
      }}
    >
      <Text>{loading ? "Kicking..." : "Field Goal"}</Text>
    </Button>
  );
};
