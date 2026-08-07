import { useCallback, useState } from "react";

const storageKey = "devatlas-bookmarked-skills";

const readBookmarks = () => {
  try {
    return JSON.parse(window.localStorage.getItem(storageKey)) || [];
  } catch {
    return [];
  }
};

const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState(readBookmarks);

  const toggleBookmark = useCallback((skillName) => {
    setBookmarks((currentBookmarks) => {
      const isBookmarked = currentBookmarks.includes(skillName);
      const nextBookmarks = isBookmarked
        ? currentBookmarks.filter((bookmark) => bookmark !== skillName)
        : [...currentBookmarks, skillName];

      window.localStorage.setItem(storageKey, JSON.stringify(nextBookmarks));
      return nextBookmarks;
    });
  }, []);

  return { bookmarks, toggleBookmark };
};

export default useBookmarks;
