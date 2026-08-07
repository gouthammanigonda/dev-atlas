import dotenv from "dotenv";
dotenv.config();

import neo4j from "neo4j-driver";

const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;

if (!NEO4J_URI || !NEO4J_USERNAME || !NEO4J_PASSWORD) {
  console.error(
    "❌ Missing required environment variables: NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD"
  );
  process.exit(1);
}

const driver = neo4j.driver(
  NEO4J_URI,
  neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)
);

driver
  .verifyConnectivity()
  .then(() => console.log("✅ Connected to Neo4j"))
  .catch((err) => {
    console.error("❌ Neo4j connection failed:", err.message);
    process.exit(1);
  });

export default driver;