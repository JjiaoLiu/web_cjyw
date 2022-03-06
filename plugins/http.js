import { Message } from "element-ui";

export default function ({ $http, redirect, store }) {
  $http.setHeader("Authorization", store.state.auth);
  $http.onRequest((config) => {
    return config;
  });
  $http.onResponse(async (_request, _options, response) => {
    let __response = await response.json();
    if (__response.code == "001") {
      return __response;
    } else {
      Message({ type: "error", message: __response.message });
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
    if (error.statusCode === 401) {
      store.commit("setAuth", null);
      redirect("/login");
    }
    return Promise.resolve(false);
  });
}
