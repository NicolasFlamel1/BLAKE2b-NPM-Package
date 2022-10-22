// Use strict
"use strict";


// Constants

// Modules
const MODULES = [
	"@nicolasflamel/blake2b-native",
	"@nicolasflamel/blake2b-wasm",
	"@nicolasflamel/blake2b-wasm.asmjs"
];

// Tests
const TESTS = [
	{
	
		// Name
		name: "compute",
		
		// Paramaters
		parameters: [
		
			// Result size
			32,
			
			// Input
			Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]),
			
			// Key
			Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32])
		],
		
		// Result
		result: Buffer.from([74, 253, 63, 220, 19, 4, 80, 40, 61, 221, 223, 195, 55, 40, 32, 143, 88, 233, 6, 195, 9, 32, 158, 41, 131, 153, 240, 203, 163, 149, 148, 247])
	}
];


// Main function
(async () => {

	// Go through all modules
	for(let module of MODULES) {
	
		// Check if module uses asm.js
		if(module.endsWith(".asmjs")) {
		
			// Remove WASM support
			WebAssembly = undefined;
			
			// Fix module name
			module = module.substring(0, module.length - ".asmjs".length);
		}
		
		// Load module
		const library = require(module);

		// Go through all tests
		for(const test of TESTS) {
		
			// Check if library implements the test
			if(test.name in library) {
		
				// Run test
				let result = library[test.name](...test.parameters);
				
				// Check if result is a promise
				if(result instanceof Promise) {
				
					// Resolve result
					result = await result;
				}
				
				// Check if result is a Uint8Array
				if(result instanceof Uint8Array && !(result instanceof Buffer)) {
				
					// Make result a buffer
					result = Buffer.from(result);
				}
				
				// Otherwise check if result is an object
				else if(typeof result === "object" && result !== null) {
				
					// Go through all values in the object
					for(const key of Object.keys(result)) {
					
						// Check if value is a Uint8Array
						if(result[key] instanceof Uint8Array && !(result[key] instanceof Buffer)) {
						
							// Make value a buffer
							result[key] = Buffer.from(result[key]);
						}
					}
				}
				
				// Check if result is known
				if("result" in test) {
				
					// Check if results don't have the same type or the results differ
					if(typeof test.result !== typeof result || JSON.stringify(test.result) !== JSON.stringify(result)) {
					
						// Throw error
						throw new Error(`Failed ${test.name} test`);
					}
				}
				
				// Otherwise
				else {
				
					// Check if result is invalid
					if(result === undefined || result === null) {
					
						// Throw error
						throw new Error(`Failed ${test.name} test`);
					}
				}
			}
			
			// Otherwise
			else {
			
				// Display message
				console.log(`Skipping ${test.name} test for ${module} module`);
			}
		}
		
		// Unload module
		delete require.cache[require.resolve(module)];
	}
	
	// Display message
	console.log("Tests passed");
})();
