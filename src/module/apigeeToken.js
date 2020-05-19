import crypto from "k6/crypto";
import encoding from "k6/encoding";
import http from "k6/http";


export default function getToken() {
  let consumerkey = "";
  let clientSecret = "";
  let authHeader = "";
  let timestamp = Math.floor((new Date()).getTime() / 1000);
  let callbackURL = "";
  let message = callbackURL + consumerkey + timestamp;
  let signed_signature = crypto.hmac('sha256', clientSecret, message, 'base64');
  let oauthURL = 'https://enterprise-api-dev.autodesk.com/v2/oauth/generateaccesstoken?grant_type=client_credentials';

  authHeader = encoding.b64encode(consumerkey + ":" + clientSecret, 'std');
  let param = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${authHeader}`,
      'signature': signed_signature,
      'timestamp': timestamp.toString()
    },
  };
  let res = http.post(oauthURL, '{}', param);
  return res.json('access_token')
}
