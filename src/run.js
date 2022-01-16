import http from "k6/http";
import {check, sleep} from "k6";
// import getToken from "./module/apigeeToken.js";

const only200CallBack = http.expectedStatuses(200);
function call() {
  // let param = {
  //   headers: {
  //     'Authorization': `Bearer ${token}`
  //   },
  // };
  // let res = http.get('https://localhost:3000', param);
  let res = http.get('http://localhost:31000', { responseCallback: only200CallBack });
  check(res, {
    [`status_${res.status}`]: true,
  });
  if (res.status !== 200) {
    console.log(`Received error response: ${JSON.stringify(res.json())}`)
  }
};

export let options = {
  // Other ways of specifying VUs if there are no stages.
  startVUs: 1,
  stages: [
    { duration: "30m", target: 10},
    { duration: "15m", target: 70 },
    { duration: "15m", target: 30 }
  ],
};

// export function setup() {
//   const token = getToken();
//   return getToken();
// }

export default function () {
  call();
}

