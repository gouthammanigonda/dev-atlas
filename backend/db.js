// db.js
import neo4j from 'neo4j-driver';
import dotenv from 'dotenv';

dotenv.config();

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic('cognodb', process.env.COGNODB_PASSWORD)
);

// Verify connection on startup
driver.verifyConnectivity()
  .then(() => console.log('✅ Connected to CognoDB'))
  .catch((err) => console.error('❌ CognoDB connection failed', err));

export default driver;