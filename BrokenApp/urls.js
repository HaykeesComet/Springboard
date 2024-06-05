const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');

// Function to get the hostname from a URL
const getHostname = (url) => {
  try {
    return new URL(url).hostname;
  } catch (error) {
    console.error(`Invalid URL: ${url}`);
    return null;
  }
};

// Function to fetch and save the HTML content of a URL
const fetchAndSaveURL = (url) => {
  return new Promise((resolve, reject) => {
    const hostname = getHostname(url);
    if (!hostname) {
      return resolve(); // Skip invalid URLs
    }

    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        fs.writeFile(path.join(__dirname, hostname), data, (err) => {
          if (err) {
            console.error(`Couldn't write to ${hostname}: ${err.message}`);
          } else {
            console.log(`Wrote to ${hostname}`);
          }
          resolve();
        });
      });

    }).on('error', (err) => {
      console.error(`Couldn't download ${url}: ${err.message}`);
      resolve();
    });
  });
};

// Main function to read the file and process URLs
const main = async () => {
  const filename = process.argv[2];

  if (!filename) {
    console.error('Usage: node urls.js FILENAME');
    process.exit(1);
  }

  try {
    const fileContent = fs.readFileSync(filename, 'utf8');
    const urls = fileContent.split('\n').filter(Boolean);

    for (const url of urls) {
      await fetchAndSaveURL(url);
    }

  } catch (err) {
    console.error(`Error reading file ${filename}: ${err.message}`);
    process.exit(1);
  }
};

// Run the main function
main();
