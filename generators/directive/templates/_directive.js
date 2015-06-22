(function() {
  angular.module('gtjnow.directives').directive('<%= name %>', <%= directiveName %>);
  angular.module('gtjnow.directives').controller('<%= ctrlName %>', <%= ctrlName %>);

  function <%= directiveName %>($log, $state, $stateParams) {
    var directive = {};
    $log.log('instantiating <%= directiveName %>');

    directive.restrict = 'EA';
    directive.templateUrl = '<%= htmlTplFilePath %>';
    directive.link = _postLinkFn;
    directive.controller = '<%= ctrlName %>';
    directive.controllerAs = '<%= ctrlAsName %>';



    return directive;
    //////////////////////////////////////////////////////////////////////////

    function _postLinkFn(scope, element, attrs) {
      $log.log('running <%= directiveName %> _postLinkFn');

      element.on('$destroy', _elmOnDestroyCb);
    }
    function _elmOnDestroyCb() {
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
