import User from "../models/user.model";

/**
 * Generates an access token and a refresh token for a given user id.
 *
 * @param {any} userId - The id of the user for whom the tokens are to be generated.
 * @returns {Promise<Object>} - An object containing the access token and the refresh token.
 * @throws {Error} - If an error occurs while generating the tokens.
 */
export const generateAccessAndRefreshToken = async (userId: any) => {
  try {
    // taking the user
    const user = await User.findById(userId);

    // generating access token and refresh token
    const accessToken = user?.generateAccessToken(); // acess token is given to user
    const refreshToken = user?.generateRefreshToken(); // refresh token is given to user and also saved in db

    // saving refresh token in db
    user!.refreshToken = refreshToken; // saving refresh token in db
    await user!.save({ validateBeforeSave: false }); // saving the user with the new refresh token

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Error creating generateAccessAndRefreshToken", error);
    throw new Error("Error creating generateAccessAndRefreshToken");
  }
};
