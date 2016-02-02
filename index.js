
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
      options = Object.assign({ save : true }, options);

  // Return cache if available
  if (cache[name]) return cache[name];

  // Allow for alternative directories
  location = name;
  if (options.dir) {
    options.cwd = path.join(options.dir.replace("\/node_modules\/?$", ""), "node_modules");
    location = path.join(options.cwd, location);
    delete options.dir;
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
