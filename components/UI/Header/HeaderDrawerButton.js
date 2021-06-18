import React from "react";
import { IoniconsHeaderButton } from "./HeaderButtons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

const HeaderDrawerButton = ({ navigation }) => (
  <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
    <Item
      title="drawer"
      iconName="md-menu"
      onPress={() => navigation.toggleDrawer()}
    />
  </HeaderButtons>
);

export default HeaderDrawerButton;
