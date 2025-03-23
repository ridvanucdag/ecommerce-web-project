export const authKeyFactory = {
  auth: ["AUTH"],
  signIn: (): string[] => [...authKeyFactory.auth, "SIGN_IN"],
  signUp: (): string[] => [...authKeyFactory.auth, "SIGN_UP"],
  refreshToken: (): string[] => [...authKeyFactory.auth, "REFRESH_TOKEN"],
  getMe: (): string[] => [...authKeyFactory.auth, "GET_ME"],
  getAllUsers: (): string[] => [...authKeyFactory.auth, "GET_ALL_USERS"],
  updateUser: (userId: number): string[] => [...authKeyFactory.auth, "UPDATE_USER", userId.toString()], // userId'yi string'e dönüştürdük
};
