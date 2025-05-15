module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("favicon.ico");
    eleventyConfig.addPassthroughCopy("styles");
  
    return {
      dir: {
        input: ".",
        output: "_site",
        includes: "_includes"
      }
    };
  };