import React from "react";
import { Button, Text } from "native-base";
import { useMutation } from "@apollo/react-hooks";
import { withNavigation } from "react-navigation";
import colors from "../theme";
import SET_VIEWER from "../apollo/queries/setViewer";

const ResetButton = ({ payload, navigation, setError }) => {
  const [setViewer, { data }] = useMutation(SET_VIEWER, {
    variables: { input: payload }
  });
  if (data && data.error) console.error(data.error);

  const onPress = () => {
    if (!payload.delay) {
      setError("Delay is required");
      return;
    }
    if (!payload.name || payload.name === "") {
      setError("Name is required");
      return;
    }
    setViewer()
      .then(() => {
        setError(null);

        navigation.toggleDrawer();
      })
      .catch(e => setError(e.message));
  };

  return (
    <Button
      onPress={onPress}
      block
      style={{
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        marginTop: 20
      }}
    >
      <Text style={{ fontWeight: "500", color: colors.softWhite }}>
        {data && data.loading ? "Loading..." : `Confirm settings`}
      </Text>
    </Button>
  );
};

export default withNavigation(ResetButton);
