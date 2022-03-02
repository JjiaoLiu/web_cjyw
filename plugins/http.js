import { Message } from "element-ui";
export default function ({ $http }) {
  $http.onRequest((config) => {
    console.log("Making request to " + config.url);
  });
  $http.onResponse(async (_request, _options, response) => {
    let __response = await response.json();
    if (__response.code == "001") {
      return __response.data;
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
