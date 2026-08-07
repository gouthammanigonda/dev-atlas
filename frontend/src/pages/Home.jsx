import { useCallback, useMemo, useState } from "react";
import { Empty } from "antd";
import {
  FireOutlined,
  RocketOutlined,
  StarOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";

import { MainLayout } from "../layouts";
import { DiscoverySection, Header, SkillFilters } from "../components";
import { useRecentSearches, useSkills } from "../hooks";

import styles from "./Home.module.css";

const discoverySections = [
  {
    title: "Trending Skills",
    icon: <FireOutlined />,
    items: ["React", "TypeScript", "Docker", "Python"],
  },
  {
    title: "Popular Skills",
    icon: <StarOutlined />,
    items: ["JavaScript", "Node.js", "Next.js", "SQL"],
  },
  {
    title: "Recently Added",
    icon: <ThunderboltOutlined />,
    items: ["Git", "AWS", "GraphQL", "Kubernetes"],
  },
  {
    title: "Career Paths",
    icon: <RocketOutlined />,
    items: [
      { label: "Frontend", value: "React" },
      { label: "Backend", value: "Node.js" },
      { label: "Full Stack", value: "JavaScript" },
      { label: "DevOps", value: "Docker" },
    ],
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const { addRecentSearch, recentSearches } = useRecentSearches();
  const { data: skills = [] } = useSkills();

  const filters = useMemo(
    () => ({
      category: searchParams.get("category") || "",
      difficulty: searchParams.get("difficulty") || "",
    }),
    [searchParams],
  );

  const matchesFilters = useCallback(
    (skillName) => {
      const skill = skills.find((candidate) => candidate.name === skillName);

      if (!skill) return !filters.category && !filters.difficulty;

      return (
        (!filters.category || skill.category === filters.category) &&
        (!filters.difficulty || skill.difficulty === filters.difficulty)
      );
    },
    [filters.category, filters.difficulty, skills],
  );

  const filteredDiscoverySections = useMemo(
    () =>
      discoverySections.map((section) => ({
        ...section,
        items: section.items.filter((item) =>
          matchesFilters(typeof item === "string" ? item : item.value),
        ),
      })),
    [matchesFilters],
  );

  const filteredRecentSearches = useMemo(
    () => recentSearches.filter(matchesFilters),
    [matchesFilters, recentSearches],
  );

  const handleFiltersChange = useCallback(
    (nextFilter) => {
      const nextParams = new URLSearchParams(searchParams);

      Object.entries(nextFilter).forEach(([key, value]) => {
        if (value) nextParams.set(key, value);
        else nextParams.delete(key);
      });

      setSearchParams(nextParams);
    },
    [searchParams, setSearchParams],
  );

  const handleSkillSelect = useCallback(
    (skillName) => {
      addRecentSearch(skillName);
      navigate(`/skill/${encodeURIComponent(skillName)}`);
    },
    [addRecentSearch, navigate],
  );

  return (
    <MainLayout>
      <Header
        searchValue={searchValue}
        filters={filters}
        onSearchChange={setSearchValue}
        onSkillSelect={handleSkillSelect}
      />

      <div className={styles.discovery}>
        <SkillFilters filters={filters} onChange={handleFiltersChange} />
        {!searchValue && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Start with a skill or explore a curated path below."
            className={styles.emptyState}
          />
        )}

        {filteredRecentSearches.length > 0 && (
          <DiscoverySection
            title="Recent Searches"
            items={filteredRecentSearches}
            onItemClick={setSearchValue}
          />
        )}

        {filteredDiscoverySections.map((section) => (
          section.items.length > 0 && (
            <DiscoverySection
              key={section.title}
              {...section}
              onItemClick={setSearchValue}
            />
          )
        ))}

        {filteredDiscoverySections.every((section) => section.items.length === 0) && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No discovery skills match these filters."
            className={styles.emptyState}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Home;
