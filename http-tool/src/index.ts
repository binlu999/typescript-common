
import axios from "axios";

import config from './config';
import requestbody from './request_body';

console.log("request body" + JSON.stringify(requestbody));

const sleep = async(ms: number) => {
    return new Promise ( resolve => setTimeout(resolve, ms) );
}

const dopost = async () => {
    await sleep(2000);
    console.log("After 2 seconds wait")
    return axios.post(config.URL + config.endpoint, requestbody, { headers: config.headers });
}
let stop = false;
let index = 0;

while (index < config.repeats && !stop) {
    console.log("Posting No. " + (index++));
    const result=await dopost()
    console.log(result);

        
    }
    


console.log("done")
