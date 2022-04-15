import { Message } from "element-ui";
const Cookie = process.client ? require("js-cookie") : undefined;
var XLSX = require("xlsx");
export default function ({ $http, redirect, store }) {
  store.state.auth && $http.setHeader("Authorization", store.state.auth);
  $http.onRequest((_config) => {});
  $http.onResponse(async (_request, options, response) => {
    if (options.responseType == "arraybuffer") {
      await response.arrayBuffer().then((buffer) => {
        var wb = XLSX.read(buffer);
        XLSX.writeFile(wb, wb.SheetNames[0] + ".xlsx");
      });
      return;
    }
    let __response = await response.json();
    if (__response.code == "001") {
      return __response;
    } else {
      return Promise.reject(__response);
    }
  });
  $http.onRetry(async (_request, _options, _errors, _retryCount) => {});
  $http.onError((error) => {
    console.log("httpError", error);
    Message({ type: "error", message: error.message });
    if (error.code == 401) {
      store.commit("setAuth", null);
      $http.setToken(null);
      Cookie.remove("token");
      redirect("/login");
    }
    return Promise.resolve(false);
  });
}
