let net = require("net");
let BSON = require("bson");

function makeid(length){
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";
    let counter = 0;
    while (counter < length){
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        counter += 1;
    }
    return result;
}

module.exports = class {
    constructor(host, port, name, password){
        this.name = name;
        this.password = password;
        this.port = port;
        this.host = host;

        this.data = {};
    }

    createTable = async function (name) {
        return new Promise(async (resolve, reject) => {
            let client = net.createConnection(this.port, this.host)
            let processID = makeid(5);

            await client.on("data", dataRaw => {
                let dataParse = BSON.deserialize(dataRaw);
                if(dataParse.process === processID) resolve(dataParse);
            });
    
            await client.write(BSON.serialize({
                "action": "create_table",
                "table": {"name": name},
                "login": {
                    "name": this.name,
                    "password": this.password
                },
                "process": processID
            }));
        });
    }

    set = async function (table, name, value) {
        return new Promise(async (resolve, reject) => {
            let client = net.createConnection(this.port, this.host)
            let processID = makeid(5);

            await client.on("data", dataRaw => {
                let dataParse = BSON.deserialize(dataRaw);
                if(dataParse.process === processID) resolve(dataParse);
            });
    
            await client.write(BSON.serialize({
                "action": "set_variable",
                "table": {"name": table},
                "variable": {
                    "name": name,
                    "value": value
                },
                "login": {
                    "name": this.name,
                    "password": this.password
                },
                "process": processID
            }));
        });
    }

    delete = async function (table, name) {
        return new Promise(async (resolve, reject) => {
            let client = net.createConnection(this.port, this.host)
            let processID = makeid(5);

            await client.on("data", dataRaw => {
                let dataParse = BSON.deserialize(dataRaw);
                if(dataParse.process === processID) resolve(dataParse);
            });
    
            await client.write(BSON.serialize({
                "action": "remove_variable",
                "table": {"name": table},
                "variable": {
                    "name": name
                },
                "login": {
                    "name": this.name,
                    "password": this.password
                },
                "process": processID
            }));
        });
    }

    get = async function (table, name) {
        return new Promise(async (resolve, reject) => {
            let client = net.createConnection(this.port, this.host)
            let processID = makeid(5);

            await client.on("data", dataRaw => {
                let dataParse = BSON.deserialize(dataRaw);
                
                if(dataParse.process === processID && dataParse.err) resolve ({"err": dataParse.err});
                if(dataParse.process === processID) resolve(dataParse.variable.value);
            });
    
            await client.write(BSON.serialize({
                "action": "get_variable",
                "table": {"name": table},
                "variable": {
                    "name": name,
                },
                "login": {
                    "name": this.name,
                    "password": this.password
                },
                "process": processID
            }));
        });
    }

    createUser = async function(name, password) {
        return new Promise(async (resolve, reject) => {
            let client = net.createConnection(this.port, this.host)
            let processID = makeid(5);

            await client.on("data", dataRaw => {
                let dataParse = BSON.deserialize(dataRaw);

                console.log(dataParse)
                
                if(dataParse.err) return console.log(data.err)

                if(dataParse.process === processID && dataParse.err) resolve ({"err": dataParse.err});
                if(dataParse.process === processID) resolve(dataParse);
            });
    
            await client.write(BSON.serialize({
                "action": "create_user",
                "login": {
                    "name": this.name,
                    "password": this.password
                },
                "user": {
                    "name": name,
                    "password": password
                },
                "process": processID
            }));
        });
    }

    deleteUser = async function(name) {
        return new Promise(async (resolve, reject) => {
            let client = net.createConnection(this.port, this.host)
            let processID = makeid(5);

            await client.on("data", dataRaw => {
                let dataParse = BSON.deserialize(dataRaw);
                
                if(dataParse.process === processID && dataParse.err) resolve ({"err": dataParse.err});
                if(dataParse.process === processID) resolve(dataParse);
            });
    
            await client.write(BSON.serialize({
                "action": "delete_user",
                "login": {
                    "name": this.name,
                    "password": this.password
                },
                "user": {
                    "name": name
                },
                "process": processID
            }));
        });
    }

    checkPassword = async function(name, password){
        return new Promise(async (resolve, reject) => {
            let client = net.createConnection(this.port, this.host)
            let processID = makeid(5);

            await client.on("data", dataRaw => {
                let dataParse = BSON.deserialize(dataRaw);
                
                if(dataParse.process === processID && dataParse.err) resolve ({"err": dataParse.err});
                if(dataParse.process === processID) resolve(dataParse.passCheck.success);
            });
    
            await client.write(BSON.serialize({
                "action": "check_password",
                "login": {
                    "name": this.name,
                    "password": this.password
                },
                "checkPass": {
                    "name": name,
                    "pass": password
                },
                "process": processID
            }));
        });
    }

    getTables = async function() {
        return new Promise(async (resolve, reject) => {
            let client = net.createConnection(this.port, this.host)
            let processID = makeid(5);

            await client.on("data", dataRaw => {
                let dataParse = BSON.deserialize(dataRaw);
                
                if(dataParse.process === processID && dataParse.err) resolve ({"err": dataParse.err});
                if(dataParse.process === processID) resolve(dataParse.tables);
            });
    
            await client.write(BSON.serialize({
                "action": "get_tables",
                "login": {
                    "name": this.name,
                    "password": this.password
                },
                "process": processID
            }));
        });
    }

    getTableData = async function(table) {
        return new Promise(async (resolve, reject) => {
            let client = net.createConnection(this.port, this.host)
            let processID = makeid(5);

            await client.on("data", dataRaw => {
                let dataParse = BSON.deserialize(dataRaw);
                
                if(dataParse.not_exists) resolve({"err": dataParse.err, "not_exist": true});
                if(dataParse.process === processID && dataParse.err) resolve ({"err": dataParse.err});
                if(dataParse.process === processID) resolve(dataParse);
            });
    
            await client.write(BSON.serialize({
                "action": "get_table_data",
                "table": table,
                "login": {
                    "name": this.name,
                    "password": this.password
                },
                "process": processID
            }));
        });
    }

    checkPermission = async function(user, permission) {
        return new Promise(async (resolve, reject) => {
            let client = net.createConnection(this.port, this.host)
            let processID = makeid(5);

            await client.on("data", dataRaw => {
                let dataParse = BSON.deserialize(dataRaw);
                
                if(dataParse.process === processID && dataParse.err) resolve ({"err": dataParse.err});
                if(dataParse.process === processID) resolve(dataParse.result);
            });

            await client.write(BSON.serialize({
                "action": "check_permission",
                "permission": {
                    "user": user,
                    "name": permission
                },
                "login": {
                    "name": this.name,
                    "password": this.password
                },
                "process": processID
            }));
        })
    }

    removePermission = async function(user, permission) {
        return new Promise(async (resolve, reject) => {
            let client = net.createConnection(this.port, this.host)
            let processID = makeid(5);

            await client.on("data", dataRaw => {
                let dataParse = BSON.deserialize(dataRaw);
                
                if(dataParse.process === processID && dataParse.err) resolve ({"err": dataParse.err});
                if(dataParse.process === processID) resolve(dataParse);
            });

            await client.write(BSON.serialize({
                "action": "remove_permission",
                "permission": {
                    "user": user,
                    "name": permission
                },
                "login": {
                    "name": this.name,
                    "password": this.password
                },
                "process": processID
            }));
        })
    }

    addPermission = async function(user, permission) {
        return new Promise(async (resolve, reject) => {
            let client = net.createConnection(this.port, this.host)
            let processID = makeid(5);

            await client.on("data", dataRaw => {
                let dataParse = BSON.deserialize(dataRaw);
                
                if(dataParse.process === processID && dataParse.err) resolve ({"err": dataParse.err});
                if(dataParse.process === processID) resolve(dataParse);
            });

            await client.write(BSON.serialize({
                "action": "add_permission",
                "permission": {
                    "user": user,
                    "name": permission
                },
                "login": {
                    "name": this.name,
                    "password": this.password
                },
                "process": processID
            }));
        })
    }
}
