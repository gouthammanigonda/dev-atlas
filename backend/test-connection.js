import neo4j from 'neo4j-driver';
import dotenv from 'dotenv';

dotenv.config();

// Initialize official Neo4j driver with your Bolt URI and credentials
const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(
    process.env.COGNODB_USER || 'cognodb',
    process.env.COGNODB_PASSWORD
  )
);

async function verifyConnection() {
  const session = driver.session();
  try {
    console.log('Connecting to CognoDB...');
    // Run a simple Cypher test query
    const result = await session.run('RETURN "Graph connection successful!" AS message');
    const message = result.records[0].get('message');
    console.log('✅ SUCCESS:', message);
  } catch (error) {
    console.error('❌ FAILED to connect:', error.message);
  } finally {
    await session.close();
    await driver.close();
  }
}

verifyConnection();