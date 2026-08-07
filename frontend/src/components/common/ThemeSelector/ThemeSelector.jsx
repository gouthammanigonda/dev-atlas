import { Select } from "antd";

import { useTheme } from "../../../theme/useTheme";
import styles from "./ThemeSelector.module.css";

const ThemeSelector = () => {
  const { themeId, setTheme, themes } = useTheme();

  const options = themes.map(({ id, name, icon }) => ({
    value: id,
    label: (
      <span className={styles.option}>
        <span aria-hidden="true">{icon}</span>
        <span>{name}</span>
      </span>
    ),
  }));

  return (
    <Select
      value={themeId}
      onChange={setTheme}
      options={options}
      className={styles.selector}
      popupClassName={styles.popup}
      variant="borderless"
      aria-label="Select colour theme"
    />
  );
};

export default ThemeSelector;
