(function() {
  angular.module('gtjnow.models').factory('<%= modelName %>', <%= modelName %>);

  function <%= modelName %>($log) {
    var model = {};
    $log.log('instantiating <%= modelName %>');


    activate();
    return model;

    //////////////////////////////////////////////////////////////////////////
    function activate() {}


  }
}());
