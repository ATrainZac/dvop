# Mocha Testing Framework

This project includes Mocha as an alternative testing framework alongside Jest.

## Why Mocha?

- **Flexibility**: Works with any assertion library (we use Chai)
- **Async Support**: Built-in support for promises and async/await
- **Extensible**: Rich ecosystem of plugins and reporters
- **Industry Standard**: Widely used in enterprise applications

## Installation

```bash
npm install --save-dev mocha chai nyc
```

## Running Tests

### Run Mocha tests:
```bash
npm run test:mocha
```

### Run with coverage:
```bash
npm run test:mocha:coverage
```

## Test Structure

- **tests-mocha/**: Contains Mocha test files
- **Assertion Library**: Chai (BDD style)
- **Coverage Tool**: NYC (Istanbul)

## Coverage Configuration

Coverage thresholds are set in `.nycrc`:
- Lines: 80%
- Statements: 80%
- Functions: 80%
- Branches: 80%
