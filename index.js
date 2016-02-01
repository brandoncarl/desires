
/*

  desires

*/

"use strict";

var npm = require("npmwrap"),
    path = require("path"),
    cache = {};


module.exports = function(name, options) {

  var library,
      location,
      options = options || {};

  // Return cache if available
  if (cache[name]) return cache[name];

  // Default to saving
  if ("undefined" === typeof options.save) options.save = true;

  // Allow for alternative directories
  location = name;
  if (options.dir) {
    options.cwd = options.cwd.replace("\/node_modules\/?$", "");
    location = path.join(options.cwd, "node_modules", location);
  }

  // Attempt to load, install if absent
  try {
    library = require(location)
  } catch (err) {
    npm.installSync(name, options);
    library = require(location);
  }

  // Cache
  return cache[name] = library;

}
