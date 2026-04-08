const fs = require('fs');
const path = require('path');

function replaceCurrency(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceCurrency(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace literal $ before {expression} with {expression} DZ
      content = content.replace(/\$({\s*[^}]+\s*})/g, '$1 DZ');
      
      // Replace literal $ before a number with {number} DZ
      content = content.replace(/\$([0-9]+(?:\.[0-9]+)?)/g, '$1 DZ');

      // Replace "Price ($)" with "Price (DZ)"
      content = content.replace(/Price \(\$\)/g, 'Price (DZ)');

      // Template string handling: replace `$${...} ` or `$${...}` into `${...} DZ`
      content = content.replace(/\$\${([^}]+)}/g, '${$1} DZ');

      fs.writeFileSync(fullPath, content);
    }
  }
}
replaceCurrency('./src');
