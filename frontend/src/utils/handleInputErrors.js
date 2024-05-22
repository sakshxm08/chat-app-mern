import toast from "react-hot-toast";

// every function returns a success value

// Function to handle empty input fields
export const handleEmptyInputs = (inputs) => {
  for (const [, value] of Object.entries(inputs)) {
    if (value.trim() === "") {
      toast.error("Please fill all the details");

      return false;
    }
  }
  return true;
};

// Function to check if password length is sufficient
export const checkPasswordLength = (password) => {
  if (password.length < 6) {
    toast.error("Password length should be at least 6 characters.");
    return false;
  }
  return true;
};

// Function to check if passwords match
export const handlePasswordsMatch = (password, confPassword) => {
  if (password !== confPassword) {
    toast.error("Passwords do not match.");
    return false;
  }
  return true;
};

export const validatePassword = (password, confPassword) => {
  if (!checkPasswordLength(password)) return false;
  return handlePasswordsMatch(password, confPassword);
};
