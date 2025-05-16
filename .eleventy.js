const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLLL yyyy");
  });

  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("scripts");

  eleventyConfig.addCollection("learning", function (collectionApi) {
    return collectionApi.getFilteredByGlob("learning/*.md");
  });

  eleventyConfig.addCollection("journaling", function (collectionApi) {
    return collectionApi.getFilteredByGlob("journaling/*.md");
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};
