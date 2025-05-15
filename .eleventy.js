module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("favicon.ico");
  
    return {
      dir: {
        input: ".",
        output: "_site"
      }
    };
  };