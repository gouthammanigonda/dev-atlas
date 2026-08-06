import driver from "./db.js";

export async function getAllSkills() {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (s:Skill)
      RETURN s
      ORDER BY s.name
    `);

    return result.records.map((record) => record.get("s").properties);
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw error;
  } finally {
    await session.close();
  }
}

export async function getSkillByName(name) {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (s:Skill {name:$name})
      RETURN s
      LIMIT 1
      `,
      { name }
    );

    if (result.records.length === 0) {
      return null;
    }

    return result.records[0].get("s").properties;
  } catch (error) {
    console.error("Error fetching skill:", error);
    throw error;
  } finally {
    await session.close();
  }
}

export async function searchSkills(search) {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (s:Skill)
      WHERE toLower(s.name) CONTAINS toLower($search)
      RETURN s
      ORDER BY s.name
      `,
      { search }
    );

    return result.records.map((record) => record.get("s").properties);
  } catch (error) {
    console.error("Error searching skills:", error);
    throw error;
  } finally {
    await session.close();
  }
}

export async function getSkillGraph(name) {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (skill:Skill {name:$name})

      OPTIONAL MATCH (skill)-[:REQUIRES]->(pre:Skill)

      OPTIONAL MATCH (skill)-[:LEADS_TO]->(next:Skill)

      OPTIONAL MATCH (skill)-[:USED_IN]->(project:Project)

      OPTIONAL MATCH (skill)-[:LEARN_FROM]->(resource:LearningResource)

      RETURN
        skill,
        collect(DISTINCT pre) as prerequisites,
        collect(DISTINCT next) as nextSkills,
        collect(DISTINCT project) as projects,
        collect(DISTINCT resource) as resources
      `,
      { name }
    );

    if (!result.records.length) {
      return null;
    }

    const row = result.records[0];

    return {
      skill: row.get("skill")?.properties,

      prerequisites: row
        .get("prerequisites")
        .filter(Boolean)
        .map((n) => n.properties),

      nextSkills: row
        .get("nextSkills")
        .filter(Boolean)
        .map((n) => n.properties),

      projects: row
        .get("projects")
        .filter(Boolean)
        .map((n) => n.properties),

      resources: row
        .get("resources")
        .filter(Boolean)
        .map((n) => n.properties),
    };
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await session.close();
  }
}