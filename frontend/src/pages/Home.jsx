import { useCallback, useState } from "react";
import { Empty } from "antd";
import {
  FireOutlined,
  RocketOutlined,
  StarOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { MainLayout } from "../layouts";
import { DiscoverySection, Header } from "../components";
import { useRecentSearches } from "../hooks";

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
  const [searchValue, setSearchValue] = useState("");
  const { addRecentSearch, recentSearches } = useRecentSearches();

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
        onSearchChange={setSearchValue}
        onSkillSelect={handleSkillSelect}
      />

      <div className={styles.discovery}>
        {!searchValue && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Start with a skill or explore a curated path below."
            className={styles.emptyState}
          />
        )}

        {recentSearches.length > 0 && (
          <DiscoverySection
            title="Recent Searches"
            items={recentSearches}
            onItemClick={setSearchValue}
          />
        )}

        {discoverySections.map((section) => (
          <DiscoverySection
            key={section.title}
            {...section}
            onItemClick={setSearchValue}
          />
        ))}
      </div>
    </MainLayout>
  );
};

export default Home;
