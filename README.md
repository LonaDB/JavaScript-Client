# LonaDB-JavaScript-Client

This is the JavaScript client for interacting with LonaDB, a custom "database" developed by the the LonaDB Team. This documentation provides an overview of the client's installation, usage, available actions, and contribution guidelines.

## Installation

To install the LonaDB-Client, use the following npm command:

```bash
npm install lonadb-client
```

## Usage

To use the LonaDB-Client, you need to create an instance of the client in your JavaScript code. Here's an example:

```javascript
const LonaDB = require("lonadb-client");

const database = new LonaDB("Host", Port, "Login Name", "Login Password");
```

Replace `"Host"`, `Port`, `"Login Name"`, and `"Login Password"` with the appropriate values for your LonaDB server.

### Available Actions

Once you have instantiated the LonaDB client, you can perform the following actions:

- `LonaDB.set(table, name, value)`: Sets the value of a variable in a table.
- `LonaDB.get(table, name)`: Retrieves the value of a variable from a table.
- `LonaDB.remove(table, name)`: Removes a variable from a table.
- `LonaDB.createTable(name)`: Creates a new table.

If you have administrator access, you can also manage users using the following methods:

- `LonaDB.createUser(name, password)`: Creates a new user.
- `LonaDB.deleteUser(name)`: Deletes a user.

The created users can be used to access the database.

## Contributing

Contributions to the LonaDB-Client are welcome. Before making any major changes, please open an issue to discuss your proposed changes.

When submitting your contributions, please ensure that you update any relevant tests to maintain code quality.

## License

The LonaDB-Client is licensed under the GNU Affero General Public License v3.0 (AGPLv3). For more details, please refer to the [license file](https://choosealicense.com/licenses/agpl-3.0/).