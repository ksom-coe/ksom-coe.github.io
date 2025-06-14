module.exports = function(eleventyConfig) {
    // Copy `css/` to `_site/css/`
    eleventyConfig.addPassthroughCopy("css");

    // Copy `js/` to `_site/js/`
    eleventyConfig.addPassthroughCopy("js");

    // Copy `Images/` to `_site/Images/`
    eleventyConfig.addPassthroughCopy("Images");

    // Ensure _data directory is processed, though Eleventy does this by default
    // eleventyConfig.addPassthroughCopy("_data"); // Not strictly needed, but good to know

    return {
        dir: {
            input: "./",      // Process files from the current directory
            output: "_site",  // Output to the _site folder
            includes: "_includes", // Includes are in _includes
            layouts: "_layouts",   // Layouts are in _layouts
            data: "_data"      // Data files are in _data
        },
        templateFormats: [
            "md",
            "html",
            "njk" // Nunjucks is often used with Eleventy
        ],
        markdownTemplateEngine: "njk", // Use Nunjucks for Markdown files
        htmlTemplateEngine: "njk",     // Use Nunjucks for HTML files
        dataTemplateEngine: "njk"      // Use Nunjucks for data files
    };
};
