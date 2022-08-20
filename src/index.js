const LIBRARIES = {
  Skill: require("../../../Libraries/Skill")
};

class ClientsTerminalBoot extends LIBRARIES.Skill {
  constructor(_main, _settings) {
    super(_main, _settings);
    const SELF = this;
  }
}

module.exports = ClientsTerminalBoot;
