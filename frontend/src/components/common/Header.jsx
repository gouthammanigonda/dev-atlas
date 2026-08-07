import { useEffect, useRef } from "react";
import { Space, Typography } from "antd";

import { SearchBar } from "./";

import styles from "./Header.module.css";

const Header = ({ onSearchChange, onSkillSelect, searchValue }) => {
  const searchInputRef = useRef(null);

  useEffect(() => {
    const focusSearch = (event) => {
      const isTyping = ["INPUT", "TEXTAREA"].includes(event.target.tagName);

      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  return (
    <div className={styles.container}>
      <Space
        direction="vertical"
        size={32}
        align="center"
        className={styles.content}
      >
        <Space direction="vertical" size={8} align="center">
          <Typography.Title level={1} className={styles.title}>
            DevAtlas
          </Typography.Title>

          <Typography.Text className={styles.subtitle}>
            Explore developer skills, learning paths, projects and career
            opportunities visually.
          </Typography.Text>
        </Space>

        <SearchBar
          ref={searchInputRef}
          value={searchValue}
          onChange={onSearchChange}
          onSkillSelect={onSkillSelect}
        />

        <Typography.Text type="secondary" className={styles.shortcut}>
          Press / to focus search
        </Typography.Text>
      </Space>
    </div>
  );
};

export default Header;
