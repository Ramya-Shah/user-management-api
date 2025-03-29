const fs = require('fs');
const path = require('path');
const swaggerSpec = require('../config/swagger');

// Define paths
const DOCS_DIR = path.join(__dirname, '../docs');

// Clean or create docs directory (GitHub Pages uses this directory by default)
if (fs.existsSync(DOCS_DIR)) {
  fs.rmSync(DOCS_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DOCS_DIR, { recursive: true });

// Add this line after creating the docs directory
fs.writeFileSync(path.join(DOCS_DIR, '.nojekyll'), '');

// Write swagger.json
fs.writeFileSync(
  path.join(DOCS_DIR, 'swagger.json'),
  JSON.stringify(swaggerSpec, null, 2)
);

// Copy Swagger UI files from node_modules
const swaggerUiPath = path.dirname(require.resolve('swagger-ui-dist'));
const filesToCopy = [
  'swagger-ui.css',
  'swagger-ui.js',
  'swagger-ui-bundle.js',
  'swagger-ui-standalone-preset.js',
  'favicon-16x16.png',
  'favicon-32x32.png'
];

filesToCopy.forEach(file => {
  if (fs.existsSync(path.join(swaggerUiPath, file))) {
    fs.copyFileSync(
      path.join(swaggerUiPath, file),
      path.join(DOCS_DIR, file)
    );
  } else {
    console.warn(`Warning: File not found: ${file}`);
  }
});

// Create index.html file
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>User Management API - Documentation</title>
  <link rel="stylesheet" type="text/css" href="./swagger-ui.css">
  <link rel="icon" type="image/png" href="./favicon-32x32.png" sizes="32x32">
  <style>
    html {
      box-sizing: border-box;
      overflow: -moz-scrollbars-vertical;
      overflow-y: scroll;
    }
    
    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }

    body {
      margin: 0;
      background: #fafafa;
    }

    .swagger-ui .topbar {
      background-color: #1f69c0;
    }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>

  <script src="./swagger-ui-bundle.js"></script>
  <script src="./swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = function() {
      const ui = SwaggerUIBundle({
        url: "./swagger.json",
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout",
        defaultModelsExpandDepth: -1
      });

      window.ui = ui;
    };
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(DOCS_DIR, 'index.html'), htmlContent);

console.log(`GitHub Pages build completed successfully in ${DOCS_DIR}`);