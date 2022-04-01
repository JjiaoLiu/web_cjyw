import Vue from "vue";

Vue.prototype.$getError = (attr, errs = []) => {
  let err = errs.find((i) => attr == i.path);
  return err && err.message;
};
