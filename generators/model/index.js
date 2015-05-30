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
    var indexFilePath, insertBeforeLineFn, scriptPath, destPath, modelName, modelFileName;
    indexFilePath = 'www/index.html';
    insertBeforeLineFn = insertBeforeLine.bind(this);
    scriptPath = 'js/models/';
    destPath = 'www/' + scriptPath;
    modelName = this.name + 'Model';
    modelFileName = this.name + 'Model' +  '.js';



    this.fs.copyTpl(
      this.templatePath('_model.js'),
      this.destinationPath(destPath + modelFileName),
      {modelName: modelName, name: this.name}
    );

    insertBeforeLineFn(indexFilePath, '    <!-- MODELS_INSERT_POINT -->', makeScriptTag(scriptPath + modelFileName));
  }
});
