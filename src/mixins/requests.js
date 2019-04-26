export default {
  methods: {
    putRequest(uri, data) {
      let headers = {
        "Content-Type": "application/json"
      };

      if (this.token !== "") {
        headers["Authorization"] = "Bearer " + this.token;
      }

      return this.$http.put(uri, data, { headers });
    },
    postRequest(uri, data) {
      let headers = {
        "Content-Type": "application/json"
      };

      if (this.token !== "") {
        headers["Authorization"] = "Bearer " + this.token;
      }

      return this.$http.post(uri, data, { headers });
    },
    deleteRequest(uri) {
      let headers = {
        "Content-Type": "application/json"
      };

      if (this.token !== "") {
        headers["Authorization"] = "Bearer " + this.token;
      }

      return this.$http.delete(uri, { headers });
    },
    getRequest(uri) {
      let headers = {
        "Content-Type": "application/json"
      };

      if (this.token !== "") {
        headers["Authorization"] = "Bearer " + this.token;
      }

      return this.$http.get(uri, { headers });
    }
  }
};
