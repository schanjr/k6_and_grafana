import http from "k6/http";
import {check, sleep} from "k6";
import getToken from "./module/apigeeToken.js";

function call(token) {
  let param = {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  };
  let res = http.get('https://google.com', param);
  check(res, {
    [`status ${res.status}`]: true,
    "transaction_count": (r) => true,
  });
  if (res.status != 200) {
    console.log(`Logging info: ${JSON.stringify(res.json())}`)
  }
};

export let options = {
  // Other ways of specifying VUs if there are no stages.
  // max_vus: 3,
  // vus: 3,
  stages: [
    { duration: "30m", target: 100},
    { duration: "15m", target: 70 },
    { duration: "15m", target: 30 }
  ],
};

export function setup() {
  const token = getToken();
  return getToken();
}

export default function (token) {
  call(token);
}

