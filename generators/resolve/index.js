/**
 *
 *
 * yo gtjnow:resolve "state" "resolve"
 *
 * */
'use strict';
var yeoman = require('yeoman-generator');
var rfas = require("html-wiring");
var s = require("underscore.string");
var fs = require('fs');
var path = require('path');
function insertBeforeLine(filePath, searchLine, insertString) {
  var file, insertPointIndex, insertString;
  file = fs.readFileSync(filePath, {encoding: 'utf8'});
  insertPointIndex = file.indexOf(searchLine);
  insertString = '    ' + insertString + '\n' + searchLine;
  if (insertPointIndex !== -1) {
    fs.writeFileSync(filePath, file.replace(searchLine, insertString), {encoding: 'utf8'});
    //this.write(filePath, file.replace(searchLine, insertString));
  }
}

function makeScriptTag(path) {
  return '<script src="' + path  +'"></script>'
}

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('state', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    });
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    });

    this.log('You called the Gtjnow subgenerator with the argument ' + this.name + '.');
  },

  writing: function () {
    var indexFilePath, htmlTplFilePath, scriptPath, destPath, htmlFileName, stateName, resolveFileName, resolveFileName, stateFileName, nameCap, resolveName, resolvesName, resolveName, insertBeforeLineFn;
    indexFilePath = 'www/index.html';
    insertBeforeLineFn = insertBeforeLine.bind(this);
    nameCap = s(this.name).capitalize().value();
    resolvesName = this.name + 'Resolve';
    scriptPath = 'js/states/' + this.state + '/';
    destPath = 'www/' + scriptPath;
    resolveFileName = resolvesName + '.js';

    //Resolve File
    this.fs.copyTpl(
      this.templatePath('_resolves.js'),
      this.destinationPath(destPath + resolveFileName),
      {nameCap: nameCap, resolvesName:resolvesName, name: this.name}
    );

    insertBeforeLineFn(indexFilePath, '    <!-- STATE_INSERT_POINT -->', makeScriptTag(scriptPath + resolveFileName));
  }
});
