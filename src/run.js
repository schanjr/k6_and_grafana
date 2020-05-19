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
  max_vus: 3,
  vus: 3,
  stages: [
    { duration: "10s", target: 1 },
    { duration: "50s", target: 2 },
    { duration: "14m", target: 3 },
  ],
};

export function setup() {
  const token = getToken();
  return getToken();
}

export default function (token) {
  call(token);
  sleep(1)
}

