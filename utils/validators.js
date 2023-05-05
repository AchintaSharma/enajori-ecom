// Function to validate email id format
const isValidEmail = (email) => {
  // checks valid email format
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// Function to validate Password
const isValidPassword = (password) => {
  // checks password meets requirements
  return password.match(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{10,25}$/
  );
};

// Function to validate phone
const isValidPhone = (phone) => {
  // checks valid phone format
  return String(phone).match(
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  );
};

// Checks if a given string represents a base64-encoded JPEG or PNG image.
const isBase64JpgOrPng = (str) => {
  const regex =
    /^data:image\/(jpeg|png);base64,([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;

  if (!regex.test(str)) {
    return false;
  }
  const mime = str.split(";")[0].split(":")[1];
  if (mime !== "image/jpeg" && mime !== "image/png") {
    return false;
  }

  return true;
};

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidPhone,
  isBase64JpgOrPng,
};
