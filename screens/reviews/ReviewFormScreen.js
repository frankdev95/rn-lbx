import React, { useEffect, useState, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Image, ScrollView, StyleSheet, Alert } from "react-native";
import { checkImage } from "../../functions/image";
import { Rating } from "react-native-elements";
import { UPDATE_INPUT } from "../../constants/Actions";
import { submitReview } from "../../store/actions/review";
import BodyTextSemiBold from "../../components/UI/Text/BodyTextSemiBold";
import BodyTextRegular from "../../components/UI/Text/BodyTextRegular";
import ReviewInput from "../../components/UI/Form/ReviewInput";
import AppButton from "../../components/UI/AppButton";
import Colors from "../../constants/Colors";

const formReducer = (state, action) => {
  if (action.type === UPDATE_INPUT) {
    return {
      ...state,
      [action.name]: action.value,
    };
  }
};

const ReviewFormScreen = ({ navigation, route }) => {
  const [formState, setFormState] = useReducer(formReducer, {
    title: "",
    appearance: "",
    nose: "",
    palate: "",
    finish: "",
    conclusion: "",
    rating: 0,
  });
  const userId = useSelector((state) => state.auth.user.id);
  const [imageSource, setImageSource] = useState(
    require("../../assets/images/img-placeholder.jpg")
  );
  const { id } = route.params;
  const bottle = useSelector((state) => state.bottles.bottles).find(
    (bottle) => bottle.id === id
  );

  const dispatch = useDispatch();

  const changeTextHandler = (name, value) =>
    setFormState({ type: UPDATE_INPUT, name, value });

  const submitFormHandler = () => {
    Alert.alert(
      "Submit Review",
      `You are rating ${bottle.brand} ${bottle.title} ${formState.rating}/5 stars. Confirm submission?`,
      [
        {
          text: "Confirm",
          onPress: () => {
            const review = { ...formState };
            review["user_id"] = userId;
            review["bottle_id"] = bottle.id;
            dispatch(submitReview(review));
          },
        },
        {
          text: "Cancel",
          style: "destructive",
        },
      ]
    );
  };

  useEffect(() => {
    checkImage(bottle["img_url"]).then((isValid) => {
      isValid && setImageSource({ uri: bottle["img_url"] });
    });
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.bottleSummaryContainer}>
        <View style={styles.bottleImageBorder}>
          <View style={styles.bottleImageContainer}>
            <Image source={imageSource} style={styles.bottleImage} />
          </View>
        </View>
        <View style={styles.bottleDetailsContainer}>
          <BodyTextSemiBold>{`${bottle.brand} ${bottle.title} (${bottle.age}) Years`}</BodyTextSemiBold>
          <BodyTextRegular style={styles.description}>
            {bottle.description}
          </BodyTextRegular>
        </View>
      </View>
      <ScrollView style={styles.reviewFormContainer}>
        <Rating
          showRating
          tintColor="#eee"
          ratingColor={Colors.clrBtnPrimaryAuth}
          reviews={["Terrible", "Bad", "Okay", "Good", "Great"]}
          type="custom"
          fractions={1}
          startingValue={0}
          onFinishRating={changeTextHandler.bind(this, "rating")}
        />
        <ReviewInput
          title="Title"
          placeholder="Enter Title"
          style={{ ...styles.input }}
          onChangeText={changeTextHandler.bind(this, "title")}
          value={formState.title}
        />
        <ReviewInput
          title="Appearance"
          placeholder="Write something about the appearance? "
          style={{ ...styles.input, textAlignVertical: "top" }}
          onChangeText={changeTextHandler.bind(this, "appearance")}
          multiline={true}
          value={formState.appearance}
        />
        <ReviewInput
          title="Nose"
          placeholder="Write your thoughts on the aroma and smell?"
          style={{ ...styles.input, textAlignVertical: "top" }}
          onChangeText={changeTextHandler.bind(this, "nose")}
          multiline={true}
          value={formState.nose}
        />
        <ReviewInput
          title="Palate"
          placeholder="Write about your experience of the palate?"
          style={{ ...styles.input, textAlignVertical: "top" }}
          onChangeText={changeTextHandler.bind(this, "palate")}
          multiline={true}
          value={formState.palate}
        />
        <ReviewInput
          title="Finish"
          placeholder="Write how the flavor changes over time?"
          style={{ ...styles.input, textAlignVertical: "top" }}
          onChangeText={changeTextHandler.bind(this, "finish")}
          multiline={true}
          value={formState.finish}
        />
        <ReviewInput
          title="Conclusion"
          placeholder="What is your final conclusion?"
          style={{ ...styles.input, textAlignVertical: "top" }}
          onChangeText={changeTextHandler.bind(this, "conclusion")}
          value={formState.conclusion}
        />
        <AppButton
          style={styles.submitBtn}
          textStyle={{ color: "white", fontSize: 16 }}
          onPress={submitFormHandler}
        >
          Submit Review
        </AppButton>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  bottleSummaryContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  bottleImageBorder: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D8E3E7",
    width: 75,
    height: 110,
  },
  bottleImageContainer: {
    width: 50,
    height: 50 * 1.86,
  },
  bottleImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
  },
  bottleDetailsContainer: {
    width: "80%",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  description: {
    marginTop: 5,
    fontSize: 12,
  },
  reviewFormContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    backgroundColor: "#eee",
  },
  input: {
    borderRadius: 5,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  submitBtn: {
    borderRadius: 10,
    backgroundColor: Colors.clrBtnPrimaryAuth,
    marginVertical: 20,
    paddingVertical: 12,
  },
});

export default ReviewFormScreen;
