import toast from "react-hot-toast";

// every function returns a success value

export const handleEmptyInputs = (inputs) => {
  for (let key of Object.keys(inputs)) {
    if (inputs[key] === "") {
      toast.error("Please fill all the details");
      return false;
    }
  }
  return true;
};

export const checkPasswordLength = (password) => {
  if (password.length < 6) {
    toast.error("Password length should be greater than 6");
    return false;
  }
  return true;
};

export const handlePasswordsMatch = (password, conf_password) => {
  if (password !== conf_password) {
    toast.error("Passwords doesn't match.");
    return false;
  }
  return true;
};
