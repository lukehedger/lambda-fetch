# lambda-fetch

> A lightweight fetch wrapper for AWS Lambda functions

## Overview

`lambda-fetch` is a simple utility library that provides a convenient wrapper around the Fetch API for use in AWS Lambda functions. It handles common concerns like error handling, timeouts, and response parsing.

## Features

- 🚀 Simple and intuitive API
- ⚡ Built on the native Fetch API
- 🛡️ Automatic error handling
- ⏱️ Configurable timeouts
- 📦 Zero dependencies
- 🔄 Supports all HTTP methods (GET, POST, PUT, DELETE, etc.)

## Installation

```bash
npm install lambda-fetch
```

Or using yarn:

```bash
yarn add lambda-fetch
```

## Quick Start

```javascript
const { fetch } = require('lambda-fetch');

exports.handler = async (event) => {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

## Usage

### Basic GET Request

```javascript
const { fetch } = require('lambda-fetch');

const data = await fetch('https://api.example.com/users');
const users = await data.json();
```

### POST Request with JSON Body

```javascript
const { fetch } = require('lambda-fetch');

const response = await fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com'
  })
});

const newUser = await response.json();
```

### Request with Custom Headers

```javascript
const { fetch } = require('lambda-fetch');

const response = await fetch('https://api.example.com/protected', {
  headers: {
    'Authorization': 'Bearer your-token-here',
    'X-Custom-Header': 'value'
  }
});
```

### With Timeout

```javascript
const { fetch } = require('lambda-fetch');

const response = await fetch('https://api.example.com/slow-endpoint', {
  timeout: 5000 // 5 seconds
});
```

## API Reference

### `fetch(url, options)`

Makes an HTTP request to the specified URL.

#### Parameters

- `url` (string): The URL to fetch
- `options` (object, optional): Configuration options
  - `method` (string): HTTP method (GET, POST, PUT, DELETE, etc.). Default: 'GET'
  - `headers` (object): Request headers
  - `body` (string | object): Request body
  - `timeout` (number): Request timeout in milliseconds. Default: 30000 (30 seconds)

#### Returns

Returns a Promise that resolves to a Response object.

## Development

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/lukehedger/lambda-fetch.git
cd lambda-fetch
```

2. Install dependencies:
```bash
npm install
```

3. Run tests:
```bash
npm test
```

4. Build the project:
```bash
npm run build
```

### Project Structure

```
lambda-fetch/
├── src/           # Source code
├── test/          # Test files
├── dist/          # Built files (generated)
├── package.json   # Project configuration
└── README.md      # This file
```

## Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details

## Author

Luke Hedger ([@lukehedger](https://github.com/lukehedger))

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/lukehedger/lambda-fetch/issues) on GitHub.