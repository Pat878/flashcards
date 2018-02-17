module.exports = {
  getCardData() {
    return fetch("/api/cards").then(response => response.json());
  },

  addCard(card) {
    return fetch("/api/add", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        card
      })
    }).then(response => response.json());
  }
};
