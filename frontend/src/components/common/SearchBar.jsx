import { useMemo, useState } from "react";
import { AutoComplete, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { useSearchSkills } from "../../hooks";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSkillSelect }) => {
  const [search, setSearch] = useState("");

  const { data = [], isFetching } = useSearchSkills(search);

  const options = useMemo(() => {
    return data.map((skill) => ({
      value: skill.name,
      label: skill.name,
    }));
  }, [data]);

  const handleSelect = (value) => {
    setSearch(value);
    onSkillSelect(value);
  };

  return (
    <AutoComplete
      value={search}
      options={options}
      onSearch={setSearch}
      onSelect={handleSelect}
      className={styles.autoComplete}
      notFoundContent={isFetching ? "Searching..." : "No Skills Found"}
    >
      <Input
        size="large"
        prefix={<SearchOutlined />}
        placeholder="Search React, Node.js, Docker..."
        allowClear
      />
    </AutoComplete>
  );
};

export default SearchBar;
