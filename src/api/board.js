import axios from "./axiosInstance";

export const getBoards = () => axios.get("/boards");
export const createBoard = (data) => axios.post("/boards", data);
