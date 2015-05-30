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
    var indexFilePath, htmlTplFilePath, scriptPath, destPath, htmlFileName, stateName, ctrlFileName, resolveFileName, stateFileName, nameCap, ctrlName, resolvesName, resolveName, insertBeforeLineFn;
    indexFilePath = 'www/index.html';
    insertBeforeLineFn = insertBeforeLine.bind(this);
    nameCap = s(this.name).capitalize().value();
    resolvesName = this.name + 'Resolves';
    resolveName = this.name + 'Resolve';
    ctrlName = this.name + 'Ctrl';
    stateName = this.name + 'State';
    scriptPath = 'js/states/' + this.name + '/';
    destPath = 'www/' + scriptPath;
    htmlFileName = this.name + '.html';
    ctrlFileName = ctrlName + '.js';
    resolveFileName = resolvesName + '.js';
    stateFileName = stateName + '.js';
    htmlTplFilePath = scriptPath + htmlFileName;

    //HTML File
    this.fs.copyTpl(
      this.templatePath('_html.html'),
      this.destinationPath(destPath + htmlFileName),
      {nameCap: nameCap}
    );

    //Ctrl File
    this.fs.copyTpl(
      this.templatePath('_ctrl.js'),
      this.destinationPath(destPath + ctrlFileName),
      {ctrlName: ctrlName}
    );

    //Resolves File
    this.fs.copyTpl(
      this.templatePath('_resolves.js'),
      this.destinationPath(destPath + resolveFileName),
      {resolvesName: resolvesName}
    );

    //State File
    this.fs.copyTpl(
      this.templatePath('_state.js'),
      this.destinationPath(destPath + stateFileName),
      {htmlTplFilePath:htmlTplFilePath, stateName: stateName, resolvesName: resolvesName, resolveName: resolveName, ctrlName: ctrlName, name: this.name}
    );

    insertBeforeLineFn(indexFilePath, '    <!-- STATE_INSERT_POINT -->', makeScriptTag(scriptPath + resolveFileName));
    insertBeforeLineFn(indexFilePath, '    <!-- STATE_INSERT_POINT -->', makeScriptTag(scriptPath + ctrlFileName));
    insertBeforeLineFn(indexFilePath, '    <!-- STATE_INSERT_POINT -->', makeScriptTag(scriptPath + stateFileName));


  }
});
