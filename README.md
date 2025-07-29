# QA Automation - Challenge (Sergio Silva)

#  Description
This project contains automated tests using typescript + playwright to validate UI and API

# Requirements
- Node.js (v18 or higher)
- npm

# Installation
```bash
npm install
npx playwright install
```

# Configuration and Environments
- Environment variables are loaded from .env files - Supported environments: .env.qa or env.cert
- The environment is set via the ENV variable (default=qa)
- .env files should be added to the project root folder and should contain base urls per environment
``` bash
# .env.qa
BASE_URL=https://en.wikipedia.org/wiki/
POKEAPI_API_URL=https://pokeapi.co/api/v2/pokemon/
JSONPLACEHOLDER_API_URL=https://jsonplaceholder.typicode.com
```
- Note: Environment SECRET_KEY is set via execution command line

# Running Tests (Default Configuration)
*Direct execution - Requires SECRET_KEY parameter which is defined per environment and shared privately
```bash
npx cross-env ENV=qa SECRET_KEY={env_secret_key} playwright test
```
*Execution via npm script - Requires {env_secret_key} parameter from package.json to be updated and handled via pipeline
```bash
npm run test:qa
```

# Browsers
- By default UI tests run on chrome browsers (chromium)
- Adjust the browser in playwright.config.js if needed

# Reports
- Test Reports are generated in two formats: html(path: playwright-report/index.html) and json(path: report.json)
- To open playwright dinamyc html report from command line:
```bash
npx playwright show-report
``` 

**Author:** Sergio Silva 