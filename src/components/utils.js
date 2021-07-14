export const checkInput = (string) => {
  var numbers = /^-?(?=.*\d)[\d ]+$/;
  if (string.match(numbers)) {
    return true;
  } else {
    return false;
  }
};
