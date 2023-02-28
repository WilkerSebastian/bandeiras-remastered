const { defineConfig  } = require("tsup")

module.exports = defineConfig({

    outDir: "build",
    target: "es6",
    clean: true,
    ignoreWatch: ["src/databse/sql/*.sql"],
    entry: ['src/'],
    loader: {
    '.ejs': 'copy',
    '.sql': 'copy',
    '.ico': 'copy',
    ".env": 'copy'
    }
  })