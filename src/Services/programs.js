import axios from "axios";
const apiEndPoint = "https://api.spacexdata.com/v3/launches";

export const getAllPrograms = () => {
	return axios.get(`${apiEndPoint}/?limit=100`);
};
export const getProgramsByQuery = (query) => {
	return axios.get(`${apiEndPoint}/?limit=100${query}`);
};
