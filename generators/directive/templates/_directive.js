(function() {
  angular.module('gtjnow.directives').directive('<%= name %>', <%= directiveName %>);
  angular.module('gtjnow.directives').controller('<%= ctrlName %>', <%= ctrlName %>);

  function <%= directiveName %>($log, $state, $stateParams) {
    var directive = {};
    $log.log('instantiating <%= directiveName %>');

    directive.restrict = 'EA';
    directive.templateUrl = '<%= htmlTplFilePath %>';
    directive.link = postLinkFn;
    directive.controller = '<%= ctrlName %>';
    directive.controllerAs = '<%= ctrlAsName %>';



    return directive;
    //////////////////////////////////////////////////////////////////////////

    function postLinkFn(scope, element, attrs) {

    }
  }

  function <%= ctrlName %>($log, $scope) {
    var vm = this;
    $log.log('instantiating <%= ctrlName %>');

    vm.name = '<%= ctrlName %>';

    activate();

    //////////////////////////////////////////////////////////////////////////

    function activate() {}

  }
}());
