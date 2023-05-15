const convertToSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, ""); // Remove special characters except hyphens
};

module.exports = {
  convertToSlug,
};
