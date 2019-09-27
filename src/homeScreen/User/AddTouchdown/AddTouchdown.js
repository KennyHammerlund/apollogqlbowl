import React, { useEffect } from "react";
import { Text, Button } from "native-base";
import { useMutation } from "@apollo/react-hooks";
import moment from "moment";
import ApolloClient from "../../../apollo/apollo";
import { withImageContext } from "../../../contexts/imageContext";
import { withTouchdownContext } from "../../../contexts/touchdownContext";

import MUTATION from "./scoreMutation";
import GET_VIEWER from "../../../apollo/queries/viewer";

const AddTouchdown = ({ props, image, touchdown }) => {
  const [addTouchdown, { loading }] = useMutation(MUTATION, {
    optimisticResponse: ({ input }) => {
      // mock up the object we expect to return
      // cache uses id + __typename as a way to control result values
      // therefore they are required in the optimistic response
      return {
        addGameAction: {
          id: moment()
            .utc()
            .unix(),
          ...input,
          optimistic: true,
          __typename: "GameAction"
        }
      };
    },
    update: (cache, { data: { addGameAction } }) => {
      const { viewer } = cache.readQuery({ query: GET_VIEWER });
      if (!viewer || !viewer.actions) return;

      // remove the optimistic Item.
      const cleanArr = viewer.actions.filter(action => {
        if (
          addGameAction.timeStamp === action.timeStamp &&
          addGameAction.type === action.type
        ) {
          return false;
        }
        return true;
      });

      cache.writeQuery({
        query: GET_VIEWER,
        // the return from our mutation `addGameAction` returns a single game action
        // we need to amend our viewer query to include the new action.
        data: {
          viewer: {
            ...viewer,
            actions: [addGameAction, ...cleanArr]
          },
          addGameAction: addGameAction
        }
      });
    },
    variables: {
      input: {
        type: "TOUCHDOWN",
        value: 6,
        timeStamp: moment()
          .utc()
          .unix()
      }
    }
  });
  useEffect(() => {}, [loading]);

  return (
    <Button
      disabled={touchdown.ui}
      style={{ minWidth: 100, justifyContent: "center" }}
      onPress={() => {
        image.changePhoto("touchdown");
        // when the mutation returns we can toggle the touchdown on the server
        addTouchdown().then(() => {
          touchdown.addServerReturn({
            timeStamp: moment()
              .utc()
              .unix(),
            text: "Touchdown!"
          });
        });
        // we dont have to wait to toggle the ui we are optimistic!
        touchdown.toggleUI();
      }}
    >
      <Text>{touchdown.ui ? ". . ." : "Touchdown"}</Text>
    </Button>
  );
};

export default withTouchdownContext(withImageContext(AddTouchdown));
