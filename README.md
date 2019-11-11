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

### Challenge
Dataset

The dataset given is an array of transaction graphs.
Each transaction graph has an array of children which are also transaction graphs (hint: recursion).
Every child transaction has a connectionInfo which describes how they are connected with the immediate parent.
connectionInfo has confidence and type:
Type stores the connection type and can have values like sameEmail, sameGeoInfo etc.
Confidence can be between 0 to 1, 1 indicates that we are 100% sure this transaction is connected to the immediate parent, .6 means we are 60% sure and so on...

Workflow

Create the following API endpoint:

`GET  /api/transactions?transactionId={transactionId}&confidenceLevel={confidence}`

The request should return a list of transactions, containing the transaction with the transactionId query param, along with all its children that have a connection confidence same or bigger than the confidenceLevel query param. This should be a flattened structure.

Important:

There can be multiple levels of children, and children of children are also connected transactions to the main parent

The transactionId can be of any transaction in the provided graph, meaning that it can be of a child transaction as well, and in that case you should return that transaction, along with its children (if any), always taking the confidence level into account

The transaction with the same ID as in the query param should not contain the connectionInfo property, only the other connected transactions

Add a property in the transactions, called combinedConnectionInfo, which should follow this structure:
1) each child combinedConnectionInfo confidence is calculated based on the multiplication of its own connectionInfo confidence with its parent’s connectionInfo confidence (for first level connections, the parent’s confidence will always be 1 - the transaction with the transactionId itself).
2) The combinedConnectionInfo types should be a list of strings containing the connectionInfo type present in the transaction, along with all of the connectionInfo types present in the parents, until getting to the main transaction of transactionId in the query param (first level children will only have a single type, and the others have multiple)