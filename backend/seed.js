import driver from "./db.js";

import {
  skills,
  roles,
  companies,
  projects,
  learningResources,
  relationships,
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
    let query = "";

    switch (relation.type) {
      case "LEADS_TO":
        query = `
            MATCH (a:Skill {name:$from})
            MATCH (b:Skill {name:$to})
            CREATE (a)-[:LEADS_TO]->(b)
        `;
        break;

      case "REQUIRES":
        query = `
            MATCH (a:Skill {name:$from})
            MATCH (b:Skill {name:$to})
            CREATE (a)-[:REQUIRES]->(b)
        `;
        break;

      case "USED_IN":
        query = `
            MATCH (a:Skill {name:$from})
            MATCH (b:Project {title:$to})
            CREATE (a)-[:USED_IN]->(b)
        `;
        break;

      case "USED_BY":
        query = `
            MATCH (a:Project {title:$from})
            MATCH (b:Company {name:$to})
            CREATE (a)-[:USED_BY]->(b)
        `;
        break;

      case "LEARN_FROM":
        query = `
            MATCH (a:Skill {name:$from})
            MATCH (b:LearningResource {title:$to})
            CREATE (a)-[:LEARN_FROM]->(b)
        `;
        break;

      case "ROLE_REQUIRES":
        query = `
            MATCH (a:Role {name:$from})
            MATCH (b:Skill {name:$to})
            CREATE (a)-[:REQUIRES]->(b)
        `;
        break;

      default:
        console.warn(`⚠ Unknown relationship type: ${relation.type}`);
        continue;
    }

    await executeQuery(session, query, relation);
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