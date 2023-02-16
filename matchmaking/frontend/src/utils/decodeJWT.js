/**
 * Decodes a JSON Web Token (JWT) and returns the payload object.
 * @author Zach Bourque <Zachary.Bourque@gov.bc.ca>
 * @param {string} JWT - The JWT string to be decoded.
 * @returns {Object} - The decoded payload object.
 */
const decodeJWT = (JWT) => {
  var base64Url = JWT.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export default decodeJWT;
