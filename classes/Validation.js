const validatorFunctions = {
  required: ({ text }) => text.trim().length > 0,
  regex: ({ regex, text }) => regex.test(text),
  maxNum: (max, text) => +text < max,
  minNum: (min, text) => +text > min,
  maxLength: (max, text) => +text.length < max,
  minLength: (min, text) => +text.length > min,
};

export default class Validator {
  constructor(validators = {}, text) {
    this.text = text;
    this.validators = validators;
    this.validatorFunctions = validatorFunctions;
    this.isValid;
  }

  get isValid() {
    let isValid = true;
    for (const key of Object.keys(this.validators)) {
      const params = {
        [key]: this.validators[key],
        text: this.text,
      };
      isValid = isValid && validatorFunctions[key](params);
    }
    return isValid;
  }
}
