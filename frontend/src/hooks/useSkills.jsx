import { useQuery } from "@tanstack/react-query";
import client from "../api/client";

// Get All Skills
export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data } = await client.get("/skills");
      return data;
    },
  });
};

// Search Skills
export const useSearchSkills = (query) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      const { data } = await client.get("/skills/search", {
        params: { q: query },
      });

      return data;
    },
    enabled: query.trim().length > 0,
  });
};

// Get Skill Details
// export const useSkill = (skillName) => {
//   return useQuery({
//     queryKey: ["skill", skillName],
//     queryFn: async () => {
//       const { data } = await client.get(`/skills/${skillName}`);
//       return data;
//     },
//     enabled: !!skillName,
//   });
// };

// Get Skill Graph
export const useSkillGraph = (skillName) => {
  return useQuery({
    queryKey: ["graph", skillName],
    queryFn: async () => {
      const { data } = await client.get(`/graph/${skillName}`);
      return data;
    },
    enabled: !!skillName,
  });
};
