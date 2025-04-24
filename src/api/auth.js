import axios from "./axiosInstance";

export const signin = (data) => axios.post("/auth/signin", data);
export const signup = (data) => axios.post("/auth/signup", data);
export const forgotPassword = (data) =>
  axios.post("/auth/forgot-password", data);
export const resetPassword = (data, resetToken) =>
  axios.post(`/auth/reset-password/${resetToken}`, data);
