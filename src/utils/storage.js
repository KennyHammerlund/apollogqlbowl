import { AsyncStorage } from "react-native";

export const setEmail = email => AsyncStorage.setItem("email", email);

export const getEmail = () => AsyncStorage.getItem("email");

export const deleteEmail = () => AsyncStorage.removeItem("email");
