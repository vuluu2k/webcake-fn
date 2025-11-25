# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-25

### Added
- Initial release of WebCake FN
- Proxy-based API for function calls with method prefix (e.g., `GET_`, `POST_`)
- FunctionCall class for direct function invocation
- Support for both browser and Node.js environments
- Multiple build formats: ESM and UMD (both minified and unminified)
- Automatic site ID detection from HTML attribute
- Custom baseUrl support
- **Full TypeScript definitions** with comprehensive type safety
- CDN support via jsdelivr and unpkg
- TypeScript examples and documentation

### Features
- Dynamic API proxy with automatic method parsing
- Browser global exports (window.api, window.FunctionCall, window.WebCakeFn)
- Automatic environment detection (browser vs Node.js)
- Query parameter support for GET requests
- JSON body support for other HTTP methods
- Error handling with detailed error messages
- Source maps for debugging

### Build System
- Rollup configuration with terser optimization
- 4 output formats: ESM (dev/prod), UMD (dev/prod)
- Banner comments with library information
- Node resolve plugin for dependency bundling

### Documentation
- Comprehensive README with usage examples
- HTML example file for browser testing
- Node.js example file for server-side usage
- API reference documentation

