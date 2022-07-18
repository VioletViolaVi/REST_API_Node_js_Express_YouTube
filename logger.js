const EventEmitter = require("events"); // is a class

const url = "http://mylogger.io/log";

class Logger extends EventEmitter {
  logMethod(message) {
    console.log(message);

    // raise an event
    this.emit("messageLogged", { id: 1, url: "http://" }); // making noise or produce something --> signalling an event has happened

    // raise: logging (data: message)
    this.emit("logging", { message: "this is the message wanted to log" });
  }
}

module.exports = Logger;
