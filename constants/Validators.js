import regexes from "./Regex";

export const emailValidators = {
  required: true,
  regex: regexes["email"],
};

export const passwordValidators = {
  required: true,
};
