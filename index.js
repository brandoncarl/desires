
/*

  desires

*/

"use strict";

var npm = require("npmwrap"),
    path = require("path"),
    cache = {};


module.exports = function(name, config) {

  var library,
      location,
      options = options || {};

  // Return cache if available
  if (cache[name]) return cache[name];

  // Default to saving
  if ("undefined" === typeof config.save) options.save = true;

  // Allow for alternative directories
  location = name;
  if (config.dir) {
    options.cwd = path.join(config.dir.replace("\/node_modules\/?$", ""), "node_modules");
    location = path.join(options.cwd, location);
  }

  // Attempt to load, install if absent
  try {
    library = require(location);
  } catch (err) {
    npm.installSync(name, options);
    library = require(location);
  }

  // Cache
  return cache[name] = library;

}
