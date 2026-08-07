import { useState } from "react";
import { AutoComplete, Input } from "antd";
import { useNavigate } from "react-router-dom";

import { useSearchSkills, useDebounce } from "../../hooks";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = useSearchSkills(debouncedSearch);

  console.log(data);

  const options =
    data?.map((skill) => ({
      value: skill.name,
      label: skill.name,
    })) || [];

  const navigate = useNavigate();

  return (
    <AutoComplete
      style={{ width: "100%" }}
      options={options}
      onSelect={(value) => navigate(`/skill/${value}`)}
    >
      <Input.Search
        placeholder="Search Skills..."
        value={search}
        loading={isLoading}
        onChange={(e) => setSearch(e.target.value)}
      />
    </AutoComplete>
  );
}
