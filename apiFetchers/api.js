import { PORTAL } from "@/server-info";
import axios from "axios";

export const deleteAPI = async (id) => {
  "use server"
  try {
    await axios.delete(`${PORTAL.api_url}/posts/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const postDataAPI = async (body) => {
  try {
    await axios.post(`${PORTAL.api_url}/posts`, JSON.stringify(body));
  } catch (error) {
    console.error("( Post Request ) Error : ", error);
  }
};

export const editDataAPI = async (body, id) => {
  try {
    await axios.put(`${PORTAL.api_url}/posts/${id}`, JSON.stringify(body));
  } catch (error) {
    console.error("( Post Request ) Error : ", error);
  }
};
