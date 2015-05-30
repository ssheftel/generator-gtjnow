(function() {
  angular.module('gtjnow.states').controller('<%= ctrlName %>', <%= ctrlName %>);

  function <%= ctrlName %>($log, $scope, $state, $stateParams) {
    var vm = this;
    $log.log('instantiating <%= ctrlName %>');

    vm.name = '<%= ctrlName %>';

    activate();

    //////////////////////////////////////////////////////////////////////////

    function activate() {}

  }
}());
