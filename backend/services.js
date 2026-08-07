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
    // Skill
    const skillResult = await session.run(
      `
      MATCH (s:Skill {name:$name})
      RETURN s
      `,
      { name }
    );

    if (skillResult.records.length === 0) {
      return null;
    }

    const skill = skillResult.records[0].get("s").properties;

    // Prerequisites
    const preResult = await session.run(
      `
      MATCH (s:Skill {name:$name})-[:REQUIRES]->(p:Skill)
      RETURN p
      `,
      { name }
    );

    const prerequisites = preResult.records.map((r) => r.get("p").properties);

    // Next Skills
    const nextResult = await session.run(
      `
      MATCH (s:Skill {name:$name})-[:LEADS_TO]->(n:Skill)
      RETURN n
      `,
      { name }
    );

    const nextSkills = nextResult.records.map((r) => r.get("n").properties);

    // Projects
    const projectResult = await session.run(
      `
      MATCH (s:Skill {name:$name})-[:USED_IN]->(p:Project)
      RETURN p
      `,
      { name }
    );

    const projects = projectResult.records.map((r) => r.get("p").properties);

    // Resources
    const resourceResult = await session.run(
      `
      MATCH (s:Skill {name:$name})-[:LEARN_FROM]->(r:LearningResource)
      RETURN r
      `,
      { name }
    );

    const resources = resourceResult.records.map((r) => r.get("r").properties);

    // Roles
    const roleResult = await session.run(
      `
      MATCH (s:Skill {name:$name})-[:REQUIRED_FOR]->(r:Role)
      RETURN r
      `,
      { name }
    );

    const roles = roleResult.records.map((r) => r.get("r").properties);

    // Companies (multi-hop)
    const companyResult = await session.run(
      `
      MATCH (s:Skill {name:$name})
            -[:REQUIRED_FOR]->
            (:Role)
            -[:HIRED_BY]->
            (c:Company)
      RETURN DISTINCT c
      `,
      { name }
    );

    const companies = companyResult.records.map((r) => r.get("c").properties);

    return {
      skill,
      prerequisites,
      nextSkills,
      projects,
      resources,
      roles,
      companies,
    };
  } finally {
    await session.close();
  }
}