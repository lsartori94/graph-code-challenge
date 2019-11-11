import express from "express";
import config from "./config/config";
import testData from "./test-data.json";

// Create a new Express app
const app = express();

// Query
interface TransactionQuery {
  transactionId: string,
  confidenceLevel: number
};

interface CombinedConnectionInfo {
  types: Array<string>,
  confidence: number
};

interface ConnectionInfo {
  type: string,
  confidence: number
};

interface GeoInfo {
  latitude: number,
  longitude: number
};

// Graph Data
interface GraphItem {
  id: string,
  age: number,
  name: string,
  email: string,
  phone: string,
  geoInfo: GeoInfo,
  connectionInfo?: ConnectionInfo,
  children?: Array<GraphItem>
};

interface ProcessedItem {
  id: string,
  age: number,
  name: string,
  email: string,
  phone: string,
  connectionInfo?: ConnectionInfo,
  combinedConnectionInfo?: CombinedConnectionInfo
};

function processData(
  query: TransactionQuery,
  data: Array<GraphItem> = testData,
  found = false
  ) {
  let result: Array<ProcessedItem> = [];
  data.forEach((elem: GraphItem) => {
    if (elem.id === query.transactionId) {
      result.unshift(processTransaction(elem, true));
      if (elem.children && elem.children.length > 0) {
        result.push(...processData(query, elem.children, true));
      }
    } else
    if (elem.children && elem.children.length > 0) {
      result.push(...processData(query, elem.children, found));
    }
    if (
      found &&
      elem.connectionInfo &&
      elem.connectionInfo.confidence >= query.confidenceLevel
    ) {
      result.push(processTransaction(elem));
    }
  });
  return result;
}

function processTransaction(elem: GraphItem, mainItem = false): ProcessedItem {
  const a: ProcessedItem = {
    id: elem.id,
    age: elem.age,
    name: elem.name,
    email: elem.email,
    phone: elem.phone
  };
  if (elem.connectionInfo && !mainItem) {
    a.connectionInfo = {
      type: elem.connectionInfo.type,
      confidence: elem.connectionInfo.confidence
    }
  }
  return a;
}

// Define an endpoint that must be called with an access token
app.get('/', (req:express.Request, res:express.Response) => {
  res.send('Hello Risk Ident!');
});

app.get(
  '/api/transactions',
  (req:express.Request, res:express.Response) => {
    const query = req.query as TransactionQuery;
    if (!query.transactionId) {
      res.send('Error. Missing transaction ID');
    }
    if (!query.confidenceLevel) {
      res.send('Error. Missing confidence level');
    }
    const processedResponse = processData(query);
    res.send(processedResponse);
});

app.get(
  '/api/test',
  (req:express.Request, res:express.Response) => {
    console.log('TEST');
    res.send(testData);
});

// Start the app
app.listen(config.port, () => {
  // tslint:disable-next-line:no-console
  console.log(`API listening on ${config.port}`);
});
