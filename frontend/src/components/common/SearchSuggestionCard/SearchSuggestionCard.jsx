import { Tag } from "antd";
import styles from "./SearchSuggestionCard.module.css";

const difficultyColor = {
  Easy: "success",
  Medium: "warning",
  Hard: "error",
};

const highlightMatch = (text, query) => {
  if (!query) return text;
  
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

export const SearchSuggestionCard = ({ skill, query }) => {
  return (
    <div className={styles.card}>
      <strong className={styles.title}>{highlightMatch(skill.name, query)}</strong>
      <div className={styles.metadata}>
        <span className={styles.category}>{skill.category}</span>
        {skill.difficulty && (
          <Tag color={difficultyColor[skill.difficulty]} className={styles.badge}>
            {skill.difficulty}
          </Tag>
        )}
      </div>
    </div>
  );
};
