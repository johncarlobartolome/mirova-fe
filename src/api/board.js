import axios from "./axiosInstance";

export const getBoards = () => axios.get("/boards");
export const createBoard = (data) => axios.post("/boards", data);
export const updateBoard = (boardId, data) =>
  axios.patch(`/boards/${boardId}`, data);
