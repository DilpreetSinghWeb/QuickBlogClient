const validationCriteria = [
  {
    key: "length",
    check: (isStrong) => isStrong.hasLength,
    text: "Min length upto 8 digits required",
  },
  {
    key: "uppercase",
    check: (isStrong) => isStrong.hasUppercase,
    text: "At least one uppercase letter",
  },
  {
    key: "hasNumber",
    check: (isStrong) => isStrong.hasNumber,
    text: "Includes a number",
  },
  {
    key: "hasSpecialChar",
    check: (isStrong) => isStrong.hasSpecialChar,
    text: "Includes a special character (e.g., @, #, $)",
  },
];
export default validationCriteria;
