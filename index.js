// Use strict
"use strict";

// Try
try {

	// Export BLAKE2b React Native module
	module["exports"] = require("@nicolasflamel/blake2b-react");
}

// Catch errors
catch(error) {

	// Try
	try {
	
		// Export BLAKE2b Node.js addon
		module["exports"] = require("@nicolasflamel/blake2b-native");
	}
	
	// Catch errors
	catch(error) {
	
		// Export BLAKE2b WASM wrapper
		module["exports"] = require("@nicolasflamel/blake2b-wasm");
	}
}
