import React, { useReducer, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import colors from "../../constants/Colors";
import { UPDATE_INPUT, TOGGLE_CHECKBOX } from "../../constants/Actions";
import {
  emailValidators,
  passwordValidators,
} from "../../constants/Validators";
import Input from "../../components/UI/Form/Input";
import Checkbox from "../../components/UI/Form/Checkbox";
import AppButton from "../../components/UI/AppButton";
import Spinner from "../../components/UI/Spinner";
import { signIn, signUp } from "../../store/actions/auth";

const setFormValidity = (values) => {
  let isFormValid = true;
  for (const key in values) {
    isFormValid = isFormValid && values[key];
  }
  return isFormValid;
};

const formReducer = (state, action) => {
  let inputValidities;
  switch (action.type) {
    case UPDATE_INPUT:
      inputValidities = {
        ...state.inputValidities,
        [action.name]: action.validity,
      };

      return {
        inputValues: {
          ...state.inputValues,
          [action.name]: action.value.trim(),
        },
        inputValidities,
        isFormValid: setFormValidity(inputValidities),
      };
    case TOGGLE_CHECKBOX:
      inputValidities = {
        ...state.inputValidities,
        checkbox: !state.inputValidities.checkbox,
      };

      return {
        ...state,
        inputValidities,
        isFormValid: setFormValidity(inputValidities),
      };
    case "ON_LOGIN":
      inputValidities = {
        ...state.inputValidities,
        email: true,
        checkbox: true,
      };
      return {
        ...state,
        inputValidities,
        isFormValid: setFormValidity(inputValidities),
      };
    case "ON_SIGNIN":
      inputValidities = {
        ...state.inputValidities,
        email: false,
      };
  }
};

const AuthScreen = ({ navigation, route }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isSelected, setSelection] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: "",
      email: "",
      password: "",
    },
    inputValidities: {
      username: false,
      email: false,
      password: false,
      checkbox: false,
    },
    isFormValid: false,
  });

  const changeInputHandler = (name, value, isValid) =>
    dispatchFormState({
      type: UPDATE_INPUT,
      name: name,
      value: value,
      validity: isValid,
    });

  const checkboxHandler = () => {
    setSelection((prev) => !prev);
    dispatchFormState({ type: TOGGLE_CHECKBOX });
  };

  const authHandler = async () => {
    const loginFormValid =
      formState.inputValidities.username && formState.inputValidities.password;

    if (
      (isSignUp &&
        !formState.isFormValid &&
        formState.inputValidities.checkbox) ||
      (!isSignUp && !loginFormValid)
    ) {
      return Alert.alert(
        "Invalid Fields",
        "Please make sure all fields are correctly filled out.",
        [
          {
            text: "Ok",
            style: "default",
          },
        ]
      );
    }

    if (isSignUp && !formState.inputValidities.checkbox) {
      return Alert.alert(
        "Terms and Conditions",
        "Please accept the terms and conditions",
        [
          {
            text: "Ok",
            style: "default",
          },
        ]
      );
    }

    const action = isSignUp ? signUp : signIn;

    setError(null);
    setIsLoading(true);

    try {
      await dispatch(action(formState.inputValues));

      if (isSignUp) {
        Alert.alert("Congratulations!", "You have successfully signed up!", [
          {
            text: "Login",
            onPress: () => {
              setIsSignUp(false);
              setIsLoading(false);
            },
          },
        ]);
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  if (error) {
    Alert.alert(`${isSignUp ? "Registration" : "Login"} failed`, error, [
      {
        text: "Ok",
        style: "default",
        onPress: () => setError(null),
      },
    ]);
  }

  if (isLoading) {
    return <Spinner style={{ backgroundColor: colors.clrBgPrimaryAuth }} />;
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
    >
      <Image
        style={styles.logo}
        source={require("../../assets/images/lg-black.png")}
      />
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          onPress={() => setIsSignUp(false)}
          style={[styles.option, !isSignUp && styles.borderBottom]}
        >
          <Text>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsSignUp(true)}
          style={[styles.option, isSignUp && styles.borderBottom]}
        >
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <Input
          id="username"
          style={styles.input}
          label="Username"
          validators={{ required: true }}
          onInputChange={changeInputHandler}
          errorText="Please enter a valid username"
          initialValue={formState.inputValues.username}
          initialValidty={formState.inputValidities.username}
        />
        {isSignUp && (
          <Input
            id="email"
            style={styles.input}
            label="Email"
            validators={emailValidators}
            onInputChange={changeInputHandler}
            errorText="Please enter a valid email address"
            initialValue={formState.inputValues.email}
            initialValidty={formState.inputValidities.email}
          />
        )}

        <Input
          id="password"
          style={styles.input}
          label="Password"
          validators={passwordValidators}
          onInputChange={changeInputHandler}
          errorText="Please enter a valid password"
          initialValue={formState.inputValues.password}
          initialValidty={formState.inputValidities.password}
        />
        {isSignUp && (
          <Checkbox
            text="I accept the Terms of Use"
            value={isSelected}
            onValueChange={checkboxHandler}
          />
        )}
        <AppButton
          style={styles.confirmBtn}
          textStyle={styles.btnText}
          onPress={authHandler}
        >
          {isSignUp ? "Sign Up" : "Log In"}
        </AppButton>
        <View style={{ alignItems: "center" }}>
          <Text>
            {isSignUp
              ? "Already have an account? "
              : "Need to create an account? "}
            <Text>{isSignUp ? "Log In" : "Sign Up"}</Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.clrBgPrimaryAuth,
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    marginBottom: 40,
  },
  option: {
    flexBasis: "50%",
    alignItems: "center",
    paddingVertical: 15,
  },
  borderBottom: {
    borderBottomWidth: 2,
    borderBottomColor: colors.clrBorderPrimaryAuth,
  },
  logo: {
    width: 280,
    height: 85,
    resizeMode: "contain",
    marginTop: 30,
    marginBottom: 90,
  },
  formContainer: {
    width: "85%",
  },
  input: {
    borderColor: "#C4C4C4",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 30,
    height: 48,
    paddingHorizontal: 20,
  },
  confirmBtn: {
    borderRadius: 30,
    backgroundColor: colors.clrBtnPrimaryAuth,
    height: 48,
    marginVertical: 20,
  },
  btnText: {
    color: "white",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default AuthScreen;
