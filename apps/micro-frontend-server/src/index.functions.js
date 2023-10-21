const { DEFAULT_PORT_NUMBER, PORT_CLI_ARG } = require('./index.const');

module.exports = {
  getPortNumber() {
    const portArgIndex = process.argv.indexOf(PORT_CLI_ARG);
    if (portArgIndex !== -1 && process.argv.length > portArgIndex + 1) {
      const portString = process.argv[portArgIndex + 1];
      const portNumber = parseInt(portString, 10);
      return portNumber;
    }

    return DEFAULT_PORT_NUMBER;
  },
};
