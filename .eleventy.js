module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("favicon.ico");
    eleventyConfig.addPassthroughCopy("styles");

    // Tech posts
    eleventyConfig.addCollection("tech", function (collectionApi) {
        return collectionApi.getFilteredByGlob("tech/*.md");
    });

    // Thoughts posts
    eleventyConfig.addCollection("thoughts", function (collectionApi) {
        return collectionApi.getFilteredByGlob("thoughts/*.md");
    });

    return {
        dir: {
        input: ".",
        output: "_site",
        includes: "_includes"
        }
    };
};
