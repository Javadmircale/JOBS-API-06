const authControllers = require("./auth");
const jobsControllers = require("./jobs");

module.exports = { ...authControllers, ...jobsControllers };
