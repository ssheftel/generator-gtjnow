/**
 *
 * yo gtjnow:directive "dirctiveName"
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
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    });

    this.log('You called the Gtjnow subgenerator with the argument ' + this.name + '.');
  },

  writing: function () {
    var indexFilePath, ctrlAsName, nameSlug, htmlTplFilePath, scriptPath, destPath, htmlFileName, stateName, ctrlFileName, directiveFileName, stateFileName, nameCap, ctrlName, resolvesName, directiveName, insertBeforeLineFn;
    indexFilePath = 'www/index.html';
    insertBeforeLineFn = insertBeforeLine.bind(this);
    nameCap = s(this.name).capitalize().value();
    nameSlug = s(this.name).slugify().value();
    ctrlName = s(this.name + 'Ctrl').classify().value();
    ctrlAsName = this.name;
    directiveName = this.name + 'Directive';
    scriptPath = 'js/directives/' + this.name + '/';
    destPath = 'www/' + scriptPath;
    htmlFileName = this.name + '.html';
    //ctrlFileName = ctrlName + '.js';
    directiveFileName = directiveName + '.js';
    htmlTplFilePath = scriptPath + htmlFileName;

    //HTML File
    this.fs.copyTpl(
      this.templatePath('_html.html'),
      this.destinationPath(destPath + htmlFileName),
      {nameSlug: nameSlug}
    );

    //Directive File
    this.fs.copyTpl(
      this.templatePath('_directive.js'),
      this.destinationPath(destPath + directiveFileName),
      {name: this.name, nameSlug: nameSlug, ctrlName: ctrlName, ctrlAsName: ctrlAsName, htmlTplFilePath: htmlTplFilePath, directiveName: directiveName}
    );

    insertBeforeLineFn(indexFilePath, '    <!-- DIRECTIVES_INSERT_POINT -->', makeScriptTag(scriptPath + directiveFileName));


  }
});
