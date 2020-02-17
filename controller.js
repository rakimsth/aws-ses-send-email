const messenger = require("./messenger");

class Controller {

  async sendEmail(payload) {
    let response = await messenger.send({
      to: "receiver@mail.com", //change it
      template: "queryEmail",
      data: payload //alter it as your need
    });
    return response;
  }
}

module.exports = new Controller();
