import React from "react";
import { Image } from "react-native";
import { useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Drawer } from "./Navigators";
import { logoutUser } from "../store/actions/auth";
import Icons from "../constants/Icons";
import BottleNavigator from "./stacks/BottleNavigator";
import ProfileNavigator from "./stacks/ProfileNavigator";
import CollectionNavigator from "./stacks/CollectionNavigator";
import Colors from "../constants/Colors";

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        icon={({ focused, color, size }) => (
          <SimpleLineIcons
            name="logout"
            size={size}
            color={color}
            style={{ marginLeft: 3 }}
          />
        )}
        onPress={() => dispatch(logoutUser())}
      />
    </DrawerContentScrollView>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Bottles"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Profile"
          component={ProfileNavigator}
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Image
                style={{
                  width: 24,
                  height: 24,
                  marginLeft: 4,
                  position: "relative",
                  left: 3,
                  tintColor: focused ? color : "black",
                }}
                source={Icons.profile}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Bottles"
          component={BottleNavigator}
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Image
                style={{
                  width: 28,
                  height: 28,
                  position: "relative",
                  left: 7,
                  tintColor: focused ? color : "black",
                }}
                source={Icons.whisky}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Collection"
          component={CollectionNavigator}
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <Image
                style={{
                  width: 24,
                  height: 24,
                  marginLeft: 2,
                  position: "relative",
                  left: 5,
                  tintColor: focused ? color : "black",
                }}
                source={Icons.collection}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
