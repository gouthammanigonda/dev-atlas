import { forwardRef, useMemo } from "react";
import { AutoComplete, Empty, Input, Spin, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { useDebounce, useSearchSkills } from "../../../hooks";
import styles from "./SearchBar.module.css";

const highlightMatch = (text, query) => {
  const normalizedQuery = query.trim();
  const matchIndex = text.toLowerCase().indexOf(normalizedQuery.toLowerCase());

  if (!normalizedQuery || matchIndex < 0) return text;

  return (
    <>
      {text.slice(0, matchIndex)}
      <mark className={styles.match}>
        {text.slice(matchIndex, matchIndex + normalizedQuery.length)}
      </mark>
      {text.slice(matchIndex + normalizedQuery.length)}
    </>
  );
};

const SearchBar = forwardRef(
  ({ filters, onChange, onSkillSelect, value }, ref) => {
    const debouncedSearch = useDebounce(value, 300);
    const { data = [], isError, isFetching } = useSearchSkills(debouncedSearch);
    const isSearchPending = Boolean(value.trim()) && value !== debouncedSearch;
    const isSearching = isSearchPending || isFetching;

    const filteredSkills = useMemo(
      () =>
        data.filter(
          (skill) =>
            (!filters?.category || skill.category === filters.category) &&
            (!filters?.difficulty || skill.difficulty === filters.difficulty),
        ),
      [data, filters?.category, filters?.difficulty],
    );

    const options = useMemo(
      () =>
        (isSearchPending ? [] : filteredSkills).map((skill) => ({
          value: skill.name,
          label: (
            <div className={styles.suggestion}>
              <strong>{highlightMatch(skill.name, value)}</strong>
              <span className={styles.metadata}>
                {skill.category}
                {skill.difficulty && <Tag>{skill.difficulty}</Tag>}
              </span>
            </div>
          ),
        })),
      [filteredSkills, isSearchPending, value],
    );

    const exactMatch = filteredSkills.find(
      (skill) => skill.name.toLowerCase() === value.trim().toLowerCase(),
    );

    const handleSelect = (skillName) => {
      onChange(skillName);
      onSkillSelect(skillName);
    };

    const handlePressEnter = () => {
      if (exactMatch) {
        onSkillSelect(exactMatch.name);
      }
    };

    const getNotFoundContent = () => {
      if (!value.trim()) return null;
      if (isSearching) return <Spin size="small" />;
      if (isError) return <Empty description="Unable to search skills right now." />;

      return <Empty description="No matching skill found." />;
    };

    return (
      <AutoComplete
        value={value}
        options={options}
        onChange={onChange}
        onSelect={handleSelect}
        className={styles.autoComplete}
        popupClassName={styles.dropdown}
        notFoundContent={getNotFoundContent()}
      >
        <Input
          ref={ref}
          size="large"
          prefix={<SearchOutlined />}
          suffix={isSearching ? <Spin size="small" /> : null}
          placeholder="Search React, Node.js, Docker..."
          allowClear
          onPressEnter={handlePressEnter}
        />
      </AutoComplete>
    );
  },
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
