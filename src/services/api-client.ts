import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.1.205:3000/api",
});