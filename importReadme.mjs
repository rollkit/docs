import fs from 'fs';
import fetch from 'node-fetch';

const filesToImport = [
  {
    url: 'https://raw.githubusercontent.com/rollkit/rollkit/main/README.md',
    fileName: 'intro.md',
  },
];

async function importReadme(file) {
  try {
    const response = await fetch(file.url);
    if (response.ok) {
      const markdown = await response.text();
      fs.writeFileSync(`./learn/${file.fileName}`, markdown);
      console.log(`Markdown file '${file.fileName}' successfully imported!`);
    } else {
      console.error(`Error fetching the markdown file: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`Error importing the markdown file: ${error.message}`);
  }
}

filesToImport.forEach(importReadme);
