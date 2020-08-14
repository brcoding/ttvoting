import axios from "axios";

export default axios.create({
  //baseURL: "http://66.175.216.67:4000/api",
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-type": "application/json"
  }
});