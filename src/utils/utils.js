const capitalizedTitle = (title) => {
  const words = title.split(' ');
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return capitalizedWords.join(' ');
};

export { capitalizedTitle };
