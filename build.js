#!/usr/bin/env node
'use strict'

const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const target = path.join(getPath());
const archive = archiver('zip', {});

if (!fs.existsSync(target)) {
  fs.mkdirSync(target);
}

const output = fs.createWriteStream(`${target}/${getFileName()}`);

output.on('close', () => {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
  return 0;
});
output.on('end', () => {
  console.log('Data has been drained');
  return 0;
});

archive.on('warning', onWarning);
archive.on('error', onError);

archive.directory('dist/', false);
archive.pipe(output);
archive.finalize();


function getPath() {
  if (argv.path) {
    return argv.path;
  }

  return './target';
}

function getFileName() {
  let languageCode;

  const packageJson = JSON.parse(fs.readFileSync(path.join('./package.json'), 'utf-8'));
  const projectName = packageJson.name;
  const version = packageJson.version;

  if (argv.en) {
    languageCode = 'en';
  } else if (argv.de) {
    languageCode = 'de';
  } else if (argv.lang === 'en') {
    languageCode = 'en';
  } else if (argv.lang === 'de') {
    languageCode = 'de';
  } else if (argv.language === 'en') {
    languageCode = 'en';
  } else if (argv.language === 'de') {
    languageCode = 'de';
  } else {
    languageCode = 'en';
  }

  return `${projectName}-v${version}-${languageCode}-dist.zip`;
}

function onWarning(err) {
  console.warn(err);
  if (err.code === 'ENOENT') {
    // log warning
  } else {
    throw err;
  }

}

function onError(err) {
  throw err;
}
