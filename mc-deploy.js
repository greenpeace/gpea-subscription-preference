const fs = require('fs');
const path = require('path');
const os = require('os');
// const FTPS = require('ftps')
const env = process.argv.slice(2)[2];

/*
Install the dependencies first

$sudo apt-get install lftp // ubuntu
$brew install lftp // mac
$choco install lftp // windows
*/

/**
 * This file is a temporary script to replace gpea-npm-en-uploader
 * since we are migrating to mc. It's not fully automated. It still need
 * some manually work.
 *
 * What it does:
 *
 * 1. Replace the MC form with its server side format.
 * 2. Append the server side logic at the frontend of html file.
 * 3. Replace the versiob with timestamps. ex v=123 to v=12325345346
 * 4. Upload the asset to FTP.
 *
 *
 * Usage:
 * ```
 * node mc-deploy.js {pageName} {env}
 * ```
 *
 * NOTE!!! After the script ends, you HAVE TO MANUALLY copy/past the build/index.mc.html
 * file into your marketing cloud editor.
 */

// definitions
const buildFolder = path.join(__dirname, 'build');

// init variables

const pageName = process.argv.slice(2)[0];
const region = process.argv.slice(2)[1];

let indexHtmlFilePath = path.join(__dirname, pageName + '.html');
let fbuf = fs.readFileSync(indexHtmlFilePath);
let content = fbuf.toString();
console.log(indexHtmlFilePath);

let templatePath = path.join(__dirname, 'template', region, pageName + '.html');
let mcHeader = fs.readFileSync(templatePath).toString();

console.log('generate index_mc.html from: ' + pageName + ` in ${region}`);

// patch form contents
const deployDate = Date.now();

if (env === 'dev') {
  if (region === 'tw') {
    content = content.replace(
      /assets/g,
      'https://change.greenpeace.org.tw/2023/test/pref'
    );
  } else if (region === 'hk') {
    content = content.replace(
      /assets/g,
      'https://api.greenpeace.org.hk/2023/test/pref'
    );
  }
} else if (env === 'deploy') {
  // content = content.replace(/assets/g, 'https://cloud.greentw.greenpeace.org');
  if (region === 'tw') {
    content = content.replace(
      /assets/g,
      'https://change.greenpeace.org.tw/2023/pref'
    );
  } else if (region === 'hk') {
    content = content.replace(
      /assets/g,
      'https://api.greenpeace.org.hk/2023/pref'
    );
  }
}

content = content.replace(/{{/g, '%%=v(@');
content = content.replace(/}}/g, ')=%%');

// append the headers

content = mcHeader + '\n' + content;
console.log('MC header patched');

// patch version numbers
content = content.replace(/v=\d+/g, 'v=' + new Date().getTime());
console.log('version number patched');

// output to the file
fs.writeFileSync(path.join(__dirname, 'build', pageName + '-mc.html'), content);
// fs.writeFileSync("/Users/upchen/Dropbox/WorkingSpace/greenpeace/codes/mc/zhtw.2020.polar.savethearctic-content.html", content)
console.log('content patched');
