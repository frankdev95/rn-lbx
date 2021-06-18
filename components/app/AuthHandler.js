import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { validateSession } from "../../store/actions/auth";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../../constants/Colors";
import AppNavigator from "../../navigation/AppNavigator";
import AuthNavigator from "../../navigation/AuthNavigator";

const AuthHandler = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        const parsedData = JSON.parse(userData);

        if (!userData) return;

        const { token, user, expirationDate } = parsedData;
        const expiryDate = moment(expirationDate);

        if (expiryDate.isSameOrBefore(moment()) || !token || !user) return;

        const expirationMs = expiryDate.unix() - moment().unix();
        dispatch(validateSession(user, token, expirationMs));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    authenticateUser();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.clrBtnPrimaryAuth} />
      </View>
    );
  }

  return !isLoading && isLoggedIn ? <AppNavigator /> : <AuthNavigator />;
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AuthHandler;
