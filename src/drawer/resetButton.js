import React from "react";
import { Button, Text } from "native-base";
import DismissKeyboard from "dismissKeyboard";
import { useMutation } from "@apollo/react-hooks";
import { withNavigation } from "react-navigation";
import Constants from "expo-constants";

import colors from "../theme";
import RESET_MUTATION from "../apollo/queries/reset";
import GET_VIEWER from "../apollo/queries/viewer";

const ResetButton = ({ navigation }) => {
  const [reset, { data }] = useMutation(RESET_MUTATION, {
    variables: {
      id: Constants.installationId
    },
    optimisticResponse: ({ id }) => {
      // Return the value that you are expecting the mutation to return.
      // in this case we are reseting the viewer query so we can return a viewer object
      // the value passed into this function is the inputs/variables of your mutation.
      // In ours we are only passing viewer.id
      // Viewer Object has this shape
      //****************************** */
      // viewer:{
      //  id
      //  name
      //  delay
      //  actions {
      //    id
      //    type
      //    value
      //    timeStamp
      //  }
      //  optimistic
      // }
      //****************************** */
      return {
        reset: {
          id,
          name: null,
          delay: null,
          actions: [],
          // optimistic is set to true only for optimistic returns, server returns false
          optimistic: true,
          __typename: "Viewer"
        }
      };
    },
    // Update will run twice, once with the optimitic value, another when the server responds.
    update: (cache, { data }) => {
      const { viewer } = cache.readQuery({ query: GET_VIEWER });
      // cache uses id as a way to control result values, we cant set viewer to null we need to
      // return the id + __typename with no other values.
      cache.writeQuery({
        query: GET_VIEWER,
        // complete object needs to be updated, including __typename, otherwise you will get a warning.
        // The easiest way is to have your mutation return the object you want to replace. In our case it
        // is the viewer object.
        data: {
          viewer
        }
      });
    }
  });

  return (
    <Button
      onPress={() =>
        reset().then(() => {
          DismissKeyboard();
          navigation.toggleDrawer();
        })
      }
      block
      style={{
        backgroundColor: colors.red,
        borderColor: colors.red,
        marginTop: 20
      }}
    >
      <Text style={{ fontWeight: "500", color: colors.softWhite }}>
        Clear settings
      </Text>
    </Button>
  );
};

export default withNavigation(ResetButton);
