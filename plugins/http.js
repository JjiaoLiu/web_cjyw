import { Message } from "element-ui";
const Cookie = process.client ? require("js-cookie") : undefined;
export default function ({ $http }) {
  $http.onRequest((config) => {
    Cookie && (config.headers["Authorization"] = "" + Cookie.get("token"));
    console.log("Making request to " + config.url);
  });
  $http.onResponse(async (_request, _options, response) => {
    let __response = await response.json();
    if (__response.code == "001") {
      return __response;
    } else {
      Message({ type: "error", text: __response.message });
      return Promise.resolve(false);
    }
  });

  $http.onError((error) => {
    console.log("请求错误", error);
    return Promise.resolve(false);
  });
}
