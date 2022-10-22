// Header files

// Check if using Emscripten
#ifdef __EMSCRIPTEN__

	// Header files
	#include <emscripten.h>
	#include "blake2.h"

// Otherwise
#else

	// Header files
	extern "C" {
		#include "blake2.h"
	}
#endif

using namespace std;


// Definitions

// Check if using Emscripten
#ifdef __EMSCRIPTEN__

	// Export
	#define EXPORT extern "C"

// Otherwise
#else

	// Export
	#define EXPORT static

	// Emscripten keepalive
	#define EMSCRIPTEN_KEEPALIVE
#endif


// Function prototypes

// Compute
EXPORT bool EMSCRIPTEN_KEEPALIVE compute(uint8_t *result, size_t resultSize, const uint8_t *input, size_t inputSize, const uint8_t *key, size_t keySize);


// Supporting function implementation

// Compute
bool compute(uint8_t *result, size_t resultSize, const uint8_t *input, size_t inputSize, const uint8_t *key, size_t keySize) {

	// Check if computing BLAKE2b failed
	if(blake2b(result, resultSize, input, inputSize, key, keySize)) {
	
		// Return false
		return false;
	}
	
	// Return true
	return true;
}
