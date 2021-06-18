import React from "react";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { HeaderButton } from "react-navigation-header-buttons";

export const IoniconsHeaderButton = (props) => (
  <HeaderButton IconComponent={Ionicons} iconSize={23} {...props} />
);

export const FontAwesomeHeaderButton = (props) => (
  <HeaderButton IconComponent={FontAwesome} iconSize={23} {...props} />
);

export const MaterialIconsHeaderButton = (props) => (
  <HeaderButton IconComponent={MaterialIcons} iconSize={23} {...props} />
);
