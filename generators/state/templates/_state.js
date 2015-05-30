(function () {
  angular.module('gtjnow.states').config(stateConfigFn);

  function stateConfigFn($stateProvider, $urlRouterProvider) {
    var <%= name %>Config;

    <%= name %>Config = {
      url: "/<%= name %>",
      views: {
        'tab-<%= name %>': {
          templateUrl: "<%= htmlTplFilePath %>",
          controller: '<%= ctrlName %> as <%= name %>'
        }
      },
      resolve: {
        <%= resolveName %>: function(<%= resolvesName %>) {return <%= resolvesName %>.resolve();}
      }
    };

    $stateProvider.state('tabs.<%= name %>', <%= name %>Config);
  }

}());
