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
  name,
  url,
  category
  `,
});

function osmate(name, url, category = []) {
  db.Osmations.bulkPut([{ name, url, category }]);
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
}
