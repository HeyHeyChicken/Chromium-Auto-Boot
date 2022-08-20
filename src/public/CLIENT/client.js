LIBRARIES = {
    ChildProcess: require("child_process")
};

class Client {
    constructor(_main) {
        const SELF = this;

        this.Main = _main;

        SELF.Terminal("ps -A", "", function (_error_code, _messages) {
            if (_error_code === 0) {
                let chromiumIsLaunched = false;
                for(let i = 0; i < _messages.length; i++){
                    if(_messages[i].includes("chromium")){
                        chromiumIsLaunched = true;
                        break;
                    }
                }
                if(!chromiumIsLaunched){
                  SELF.Main.Log("Chromium is booting");
                  SELF.Terminal("chromium-browser http://localhost:" + SELF.Main.Settings.WebServerPort, "", function (_error_code, _messages) {
                      if (_error_code === 0) {
                      } else {
                          console.log("ChromiumAutoBoot error: " + _error_code);
                      }
                  });
                }
                else{
                  SELF.Main.Log("Chromium is already booted");
                }
            } else {
                console.log("ChromiumAutoBoot error: " + _error_code);
            }
        });
    }

    // This function executes terminal commands on the local computer.
    Terminal(_command, _path, _callback){
        const SELF = this;

        const MESSAGES = [];
        const EXECUTION = LIBRARIES.ChildProcess.exec(_command, { cwd: _path });

        EXECUTION.stdout.on("data", (_data) => {
            _data = _data.split("\n");
            for(let i = 0; i < _data.length; i++){
                if(_data[i].length > 0){
                    MESSAGES.push(_data[i]);
                }
            }
        });

        EXECUTION.stderr.on("data", (_data) => {
            _data = _data.split("\n");
            for(let i = 0; i < _data.length; i++){
                if(_data[i].length > 0){
                    MESSAGES.push(_data[i]);
                }
            }
        });

        EXECUTION.on("close", (_error_code) => {
            if(_callback !== undefined){
                _callback(_error_code, MESSAGES);
            }
        });
    }
}

module.exports = Client;
