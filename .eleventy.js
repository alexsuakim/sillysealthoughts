module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("favicon.ico");
    eleventyConfig.addPassthroughCopy("styles");

    // learning posts
    eleventyConfig.addCollection("learning", function (collectionApi) {
        return collectionApi.getFilteredByGlob("learning/*.md");
    });

    // journaling posts
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
