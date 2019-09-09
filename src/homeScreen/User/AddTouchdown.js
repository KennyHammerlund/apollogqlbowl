import React from "react";
import { Text, Button } from "native-base";
import { useMutation } from "@apollo/react-hooks";
import MUTATION from "./scoreMutation";
import moment from "moment";

export default ({ props }) => {
  const [addTouchdown, response] = useMutation(MUTATION, {
    // optimisticResponse: data => {
    //   console.log(`*--OUI: `, data);
    //   return data;
    // },
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

  return (
    <Button onPress={() => addTouchdown()}>
      <Text>Touchdown</Text>
    </Button>
  );
};
