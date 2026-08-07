import driver from "./db.js";

import {
  skills,
  roles,
  companies,
  projects,
  learningResources,
  relationships,
  relationshipMap
} from "./data.js";

/**
 * Execute Cypher Query
 */
async function executeQuery(session, query, params = {}) {
  try {
    return await session.run(query, params);
  } catch (error) {
    console.error("\n❌ Cypher Query Failed");
    console.error("----------------------------------");
    console.error(query);
    console.error("----------------------------------");
    console.error(error);
    throw error;
  }
}

/**
 * Clear Database
 */
async function clearDatabase(session) {
  console.log("🧹 Clearing Database...");

  await executeQuery(
    session,
    `
        MATCH (n)
        DETACH DELETE n
    `
  );

  console.log("✅ Database Cleared\n");
}

/**
 * Generic Node Seeder
 */
async function createNodes(session, data, label, query) {
  console.log(`🌱 Seeding ${label}...`);

  for (const item of data) {
    await executeQuery(session, query, item);
  }

  console.log(`✅ ${label} Seeded\n`);
}

/**
 * Relationship Seeder
 */
async function createRelationships(session) {
  console.log("🔗 Creating Relationships...");

  for (const relation of relationships) {
    const config = relationshipMap[relation.type];

    if (!config) {
      console.warn(`⚠ Unknown relationship type: ${relation.type}`);
      continue;
    }

    try {
      await session.run(
        `
      MATCH (a:${config.fromLabel} {${config.fromKey}: $from})
      MATCH (b:${config.toLabel} {${config.toKey}: $to})
      CREATE (a)-[:${relation.type}]->(b)
      `,
        relation
      );
    } catch (err) {
      console.error(
        `❌ Failed creating ${relation.type} (${relation.from} -> ${relation.to})`
      );
      console.error(err);
    }
  }

  console.log("✅ Relationships Created\n");
}

/**
 * Main Seeder
 */
async function seedDatabase() {
  const session = driver.session();

  try {
    await clearDatabase(session);

    await createNodes(
      session,
      skills,
      "Skills",
      `
      CREATE (:Skill {
        name:$name,
        description:$description,
        difficulty:$difficulty,
        estimatedTime:$estimatedTime,
        category:$category
      })
      `
    );

    await createNodes(
      session,
      roles,
      "Roles",
      `
      CREATE (:Role {
        name:$name,
        description:$description,
        salaryRange:$salaryRange
      })
      `
    );

    await createNodes(
      session,
      companies,
      "Companies",
      `
      CREATE (:Company {
        name:$name,
        website:$website
      })
      `
    );

    await createNodes(
      session,
      projects,
      "Projects",
      `
      CREATE (:Project {
        title:$title,
        difficulty:$difficulty,
        description:$description
      })
      `
    );

    await createNodes(
      session,
      learningResources,
      "Learning Resources",
      `
      CREATE (:LearningResource {
        title:$title,
        type:$type,
        url:$url,
        provider:$provider
      })
      `
    );

    await createRelationships(session);

    console.log("🎉 Database Seeded Successfully!");
  } catch (error) {
    console.error("\n❌ Seeding Failed");
    console.error(error);
  } finally {
    try {
      await session.close();
      console.log("✅ Session Closed");
    } catch (err) {
      console.error("❌ Error Closing Session:", err);
    }

    try {
      await driver.close();
      console.log("✅ Driver Closed");
    } catch (err) {
      console.error("❌ Error Closing Driver:", err);
    }
  }
}

seedDatabase();