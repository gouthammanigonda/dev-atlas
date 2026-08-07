import { useCallback, useState } from "react";

const storageKey = "devatlas-recent-searches";
const maxRecentSearches = 5;

const readRecentSearches = () => {
  try {
    return JSON.parse(window.localStorage.getItem(storageKey)) || [];
  } catch {
    return [];
  }
};

const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState(readRecentSearches);

  const addRecentSearch = useCallback((skillName) => {
    setRecentSearches((currentSearches) => {
      const nextSearches = [
        skillName,
        ...currentSearches.filter(
          (search) => search.toLowerCase() !== skillName.toLowerCase(),
        ),
      ].slice(0, maxRecentSearches);

      window.localStorage.setItem(storageKey, JSON.stringify(nextSearches));
      return nextSearches;
    });
  }, []);

  return { addRecentSearch, recentSearches };
};

export default useRecentSearches;
