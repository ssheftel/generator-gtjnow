(function() {
  angular.module('gtjnow.states').factory('<%= resolvesName %>', <%= resolvesName %>);

  function <%= resolvesName %>($log, $q, $state, $stateParams) {
    var resolves = {};
    resolve.name = '<%= resolvesName %>';
    $log.log('instantiating <%= resolvesName %>');

    resolves.resolve = resolve;

    return resolves;

    //////////////////////////////////////////////////////////////////////////
    function resolve() {
      return $q.when({});
    }


  }
}());
