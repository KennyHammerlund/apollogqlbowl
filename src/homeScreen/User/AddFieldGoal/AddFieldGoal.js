import React, { useEffect } from "react";
import { Text, Button } from "native-base";
import { useMutation } from "@apollo/react-hooks";
import { graphql } from "react-apollo";
import moment from "moment";
import { withImageContext } from "../../../contexts/imageContext";
import { withTouchdownContext } from "../../../contexts/touchdownContext";
import { compose } from "recompose";

import MUTATION from "./scoreMutation";
import GET_VIEWER from "../../../apollo/queries/viewer";
class AddFieldGoal extends React.Component {
  onPress = async () => {
    const { image, mutate, touchdown } = this.props;
    image.changePhoto("blockedKick");

    mutate({
      variables: {
        input: {
          type: "FIELD_GOAL",
          value: 3,
          timeStamp: moment()
            .utc()
            .unix()
        }
      },
      optimisticResponse: ({ input }) => {
        // mock up the object we expect to return
        // cache uses id + __typename as a way to control result values
        // therefore they are required in the optimistic response
        console.log(`*--optimistic`);
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
        console.log(`*--update`);
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
      }
    }).then(() => {
      // when server returns add to toast message
      touchdown.addServerReturn({
        timeStamp: moment()
          .utc()
          .unix(),
        text: "FieldGoal!"
      });
    });
  };

  render() {
    return (
      <Button onPress={this.onPress}>
        <Text>{this.props.result.loading ? "Kicking..." : "Field Goal"}</Text>
      </Button>
    );
  }
}

export default compose(
  withTouchdownContext,
  withImageContext,
  graphql(MUTATION)
)(AddFieldGoal);
