import API from "./API";

export default {
  getAuth() {
    return API().get();
  },
};
