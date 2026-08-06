import {
  getAllSkills,
  getSkillByName,
  searchSkills,
  getSkillGraph,
} from "./services.js";

export async function getSkills(req, res) {
  try {
    const skills = await getAllSkills();
    return res.status(200).json(skills);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch skills",
    });
  }
}

export async function getSkill(req, res) {
  try {
    const { name } = req.params;

    const skill = await getSkillByName(name);

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found",
      });
    }

    return res.status(200).json(skill);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch skill",
    });
  }
}

export async function search(req, res) {
  try {
    const { q } = req.query;

    const skills = await searchSkills(q || "");

    return res.status(200).json(skills);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Search failed",
    });
  }
}

export async function graph(req, res) {
  try {
    const { name } = req.params;

    const data = await getSkillGraph(name);

    if (!data) {
      return res.status(404).json({
        message: "Skill not found",
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch graph",
    });
  }
}