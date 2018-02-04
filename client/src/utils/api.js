module.exports = {
  callApi() {
    return fetch("/api/hello").then(response => response.json());
  }
};
