(function() {
  angular.module('gtjnow.services').factory('<%= serviceName %>', <%= serviceName %>);

  function <%= serviceName %>($log) {
    var service = {};
    $log.log('instantiating <%= serviceName %>');

    service.name = '<%= serviceName %>';


    activate();
    return service;

    //////////////////////////////////////////////////////////////////////////
    function activate() {}


  }
}());
