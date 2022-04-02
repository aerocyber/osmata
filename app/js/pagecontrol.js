// Copyright (C) 2022 aerocyber
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

async function insertData(Name, Url, Categories = []) {
  /**
   * Update or insert data.
   * If data is present, update it.
   * If data is absent, insert it.
   * Name: String: Name given to the Osmation.
   * Url: String: Url of the Osmation.
   * Categories: Array: Categories associated with the URL.
   */
  var connection = new JsStore.Connection(); // Create connection object.
  var db_name = "Osmata"; // DB name.
  var table = {
    name: { primaryKey: true, autoIncrement: false, datatype: "string" },
    url: { notNull: true, datatype: "string" },
    category: { notNull: true, datatype: "array" },
  }; // Set up the table.
  var db = {
    name: db_name,
    tables: [table],
  }; // The DB's set up.
  var isDBCreated = await connection.initDb(db); // Initialize the DB.
  var value = {
    name: Name,
    url: Url,
    category: Categories,
  }; // Set up values.

  var insertNo = connection.insert({
    into: db_name,
    upsert: true, // Allow updating of value.
    values: [value],
  });
}

async function getDataByName(Name) {
  /**
   * Get data based on name.
   * Name: String: Name to be searched for.
   */
  var connection = new JsStore.Connection(); // Create connection object.
  var db_name = "Osmata"; // DB name.
  var table = {
    name: { primaryKey: true, autoIncrement: false, datatype: "string" },
    url: { notNull: true, datatype: "string" },
    category: { notNull: true, datatype: "array" },
  }; // Set up the table.
  var db = {
    name: db_name,
    tables: [table],
  }; // The DB's set up.
  var isDBCreated = await connection.initDb(db); // Initialize the DB.
  var results = await connection.select({
    from: db_name,
    where: {
      name: Name,
    },
  });
  return results;
}

async function getData(Name) {
  /**
   * Get all data.
   * Name: String: Name to be searched for.
   */
  var connection = new JsStore.Connection(); // Create connection object.
  var db_name = "Osmata"; // DB name.
  var table = {
    name: { primaryKey: true, autoIncrement: false, datatype: "string" },
    url: { notNull: true, datatype: "string" },
    category: { notNull: true, datatype: "array" },
  }; // Set up the table.
  var db = {
    name: db_name,
    tables: [table],
  }; // The DB's set up.
  var isDBCreated = await connection.initDb(db); // Initialize the DB.
  var results = await connection.select({
    from: db_name,
  });
  return results;
}

async function DeleteByName(Name) {
  /**
   * Delete data based on name.
   * Name: String: Name to be searched for and hence deleted.
   */
  var connection = new JsStore.Connection(); // Create connection object.
  var db_name = "Osmata"; // DB name.
  var table = {
    name: { primaryKey: true, autoIncrement: false, datatype: "string" },
    url: { notNull: true, datatype: "string" },
    category: { notNull: true, datatype: "array" },
  }; // Set up the table.
  var db = {
    name: db_name,
    tables: [table],
  }; // The DB's set up.
  var isDBCreated = await connection.initDb(db); // Initialize the DB.
  var rowsDeleted = await connection.remove({
    from: db_name,
    where: {
      name: Name,
    },
  });
  return rowsDeleted;
}
