import { Message } from "element-ui";

export default function ({ $http, redirect, store }) {
  store.state.auth && $http.setHeader("Authorization", store.state.auth);
  $http.onRequest((_config) => {});
  $http.onResponse(async (_request, _options, response) => {
    let __response = await response.json();
    if (__response.code == "001") {
      if (__response.token) {
        $http.setHeader("Authorization", __response.token);
      }
      return __response;
    } else {
      return Promise.reject(__response);
    }
  });
  $http.onRetry(async (_request, options, _errors, _retryCount) => {
    if (process.client) {
      let token = store.state.auth;
      options.header.set("Authorization", token);
    }
  });
  $http.onError((error) => {
    Message({ type: "error", message: error.message });
    if (error.statusCode === 401) {
      store.commit("setAuth", null);
      redirect("/login");
    }
    return Promise.resolve(false);
  });
}
