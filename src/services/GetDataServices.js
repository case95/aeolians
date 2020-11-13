import Api from "./Api";

export default {
  GetAccommodations() {
    return Api().get("accommodations");
  },
};