// queries.js
import driver from './db.js';

// Helper to convert Neo4j integer/records to plain JS objects
const toNative = (record) => {
  const obj = {};
  record.keys.forEach(key => {
    let val = record.get(key);
    // Neo4j returns numbers as custom Integer objects, convert them back
    if (val && typeof val === 'object' && 'low' in val && 'high' in val) {
      val = val.toNumber();
    }
    obj[key] = val;
  });
  return obj;
};

// Q1: Search for Authors
export const searchAuthors = async (query) => {
  const session = driver.session();
  try {
    const cypher = `
      MATCH (a:Author)
      WHERE toLower(a.name) CONTAINS toLower($query)
      RETURN a.id AS id, a.name AS name
      LIMIT 10
    `;
    const result = await session.run(cypher, { query });
    return result.records.map(toNative);
  } finally {
    await session.close();
  }
};

// Q2: Citation Ancestry (Multi-hop traversal - 2+ hops)
// backend/queries.js
export const getCitationAncestry = async (workId) => {
  const session = driver.session();
  try {
    const cypher = `
      MATCH path = (w:Work {id: $workId})-[:CITES*1..3]->(ancestor:Work)
      RETURN path
    `;
    const result = await session.run(cypher, { workId });

    const nodesMap = new Map();
    const links = [];

    // Build graph data in JavaScript instead of Cypher
    result.records.forEach(record => {
      const path = record.get('path');

      // Extract nodes from path segments
      path.segments.forEach(segment => {
        const startNode = segment.start;
        const endNode = segment.end;

        if (!nodesMap.has(startNode.properties.id)) {
          nodesMap.set(startNode.properties.id, {
            id: startNode.properties.id,
            title: startNode.properties.title,
            year: startNode.properties.year
          });
        }
        if (!nodesMap.has(endNode.properties.id)) {
          nodesMap.set(endNode.properties.id, {
            id: endNode.properties.id,
            title: endNode.properties.title,
            year: endNode.properties.year
          });
        }

        links.push({
          source: startNode.properties.id,
          target: endNode.properties.id
        });
      });
    });

    return {
      nodes: Array.from(nodesMap.values()),
      links: links
    };
  } finally {
    await session.close();
  }
};

// Q3: Connect the Dots (Graph-awkward for SQL - Shortest Path)
export const getCollaborationPath = async (author1Id, author2Id) => {
  const session = driver.session();
  try {
    const cypher = `
      MATCH path = shortestPath(
        (a1:Author {id: $author1Id})-[:AUTHORED*1..6]-(a2:Author {id: $author2Id})
      )
      RETURN [n IN nodes(path) | 
        CASE 
          WHEN n:Author THEN n.name 
          ELSE n.title 
        END
      ] AS chain
    `;
    const result = await session.run(cypher, { author1Id, author2Id });
    return result.records.length > 0 ? toNative(result.records[0]).chain : null;
  } finally {
    await session.close();
  }
};

// Q4: Collaborator Recommendations (Friend of Friend with Negation)
export const getRecommendations = async (authorId) => {
  const session = driver.session();
  try {
    const cypher = `
      MATCH (me:Author {id: $authorId})-[:AUTHORED]->(w:Work)-[:ABOUT]->(t:Topic)
            <-[:ABOUT]-(otherW:Work)<-[:AUTHORED]-(suggested:Author)
      WHERE NOT EXISTS {
        MATCH (me)-[:AUTHORED]->(:Work)<-[:AUTHORED]-(suggested)
      }
        AND suggested <> me
      WITH suggested, count(DISTINCT t) AS shared_topics, count(DISTINCT otherW) AS shared_works
      RETURN suggested.id AS id, 
             suggested.name AS name, 
             shared_topics, 
             shared_works
      ORDER BY shared_topics DESC, shared_works DESC
      LIMIT 5
    `;
    const result = await session.run(cypher, { authorId });
    return result.records.map(toNative);
  } finally {
    await session.close();
  }
};

// Q5: Get Author Profile (1-hop traversal)
export const getAuthorProfile = async (authorId) => {
  const session = driver.session();
  try {
    const cypher = `
      MATCH (a:Author {id: $authorId})
      OPTIONAL MATCH (a)-[:AFFILIATED_WITH]->(i:Institution)
      OPTIONAL MATCH (a)-[:AUTHORED]->(w:Work)
      RETURN a.id AS id, 
             a.name AS name,
             collect(DISTINCT {id: i.id, name: i.name}) AS institutions,
             collect(DISTINCT {id: w.id, title: w.title, year: w.year}) AS works
    `;
    const result = await session.run(cypher, { authorId });
    return result.records.length > 0 ? toNative(result.records[0]) : null;
  } finally {
    await session.close();
  }
};