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

var db = new Dexie("osmata-store");
db.version(1).stores({
  Osmations: `
  id,
  json_item
  `,
});

function osmate(id, json_item) {
  db.Osmations.bulkPut([{ id, json_item }]);
}

function getOsmations() {
  return db.Osmations.toArray();
}

function closeDB() {
  db.close();
}

function deleteDB() {
  db.delete();
  var notifier = document.getElementById("NotifyDel");
  notifier.classList.remove("invisible");
  db.close();
}

function OsmateTry() {
  var db_ = getOsmations();
  var inp_name = document.getElementById("nameOsmate").value;
  var inp_URL = document.getElementById("nameURL").value;
  var inp_category = document.getElementById("nameCategory").value;
  var category_ = inp_category.split(" ");
  var return_code = add(inp_name, inp_URL, db_);
  var fail = true;
  if (return_code.Code.Status == "Error") {
    var _msg = Status.Code.Type + ": " + Status.Code.On;
  } else {
    var _msg = Status.Code.Type + ": " + Status.Code.On;
    var id = db_[id];
    id += 1;
    osmate();
    fail = false;
  }
  var _item = document.getElementById("Response");
  if (fail === true) {
    _item.innerHTML = '<p class="is-danger">' + _msg + "</p>";
  } else {
    _item.innerHTML = '<p class="is-success">' + _msg + "</p>";
  }
  console.log("Triggered!");
  console.log(getOsmations());
}
