import { forwardRef, useMemo } from "react";
import { AutoComplete, Empty, Input, Spin, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { useDebounce, useSearchSkills } from "../../../hooks";
import styles from "./SearchBar.module.css";

const SearchBar = forwardRef(
  ({ onChange, onSkillSelect, value }, ref) => {
    const debouncedSearch = useDebounce(value, 300);
    const { data = [], isError, isFetching } = useSearchSkills(debouncedSearch);
    const isSearchPending = Boolean(value.trim()) && value !== debouncedSearch;
    const isSearching = isSearchPending || isFetching;

    const options = useMemo(
      () =>
        (isSearchPending ? [] : data).map((skill) => ({
          value: skill.name,
          label: (
            <div className={styles.suggestion}>
              <strong>{skill.name}</strong>
              <span className={styles.metadata}>
                {skill.category}
                {skill.difficulty && <Tag>{skill.difficulty}</Tag>}
              </span>
            </div>
          ),
        })),
      [data, isSearchPending],
    );

    const exactMatch = data.find(
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
