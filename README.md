# Risk Ident code challenge

The app is configured via a `.env` file that should be located at the root folder. Please create a file with the contents specified on `.env.sample`

```bash
# Set to production when deploying to production
NODE_ENV=development

# Node.js server configuration
SERVER_PORT=3001
```

Test data is included on the `src` folder.

## To run locally
1) `npm i`
2) `npm run dev`
3) Go to http://localhost:3001 (or any other port configured in `.env` file)

## API endpoints:

`/api/test` - fetches the demo data

`/api/transactions?transactionId={transactionId}&confidenceLevel={confidence}` - code challenge endpoint
