import axios from "axios";

export default axios.create({
    baseURL: 'https://i8A806.p.ssafy.io/api',
    headers : {Authorization: `Bearer ${localStorage.getItem("access-token")}`}
});