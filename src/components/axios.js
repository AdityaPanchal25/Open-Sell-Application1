import axios from "axios";

const instance=axios.create({
    //the API cloud function url
    baseURL:"http://127.0.0.1:5001/open-sell-3147d/us-central1/api" //the API {cloud function}

})
export default instance;    