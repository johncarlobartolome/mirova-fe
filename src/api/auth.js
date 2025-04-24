import axios from "./axiosInstance";

export const signin = (data) => axios.post("/auth/signin", data);
export const signup = (data) => axios.post("/auth/signup", data);
