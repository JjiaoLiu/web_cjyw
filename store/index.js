const cookieparser = process.server ? require("cookieparser") : undefined;

export const state = () => {
  return {
    auth: null,
  };
};
export const mutations = {
  setAuth(state, auth) {
    state.auth = auth;
  },
};
export const actions = {
  nuxtServerInit({ commit }, { req, $http }) {
    let auth = null;
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      try {
        auth = parsed.auth;
        $http.setToken(parsed.token);
      } catch (err) {
        // No valid cookie found
      }
    }
    commit("setAuth", auth);
  },
};
