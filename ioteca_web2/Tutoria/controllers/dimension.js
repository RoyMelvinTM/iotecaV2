app

    .controller("DimensionCtrl", function($scope, API, $window, $mdDialog, $stateParams) {

    var params = {};
    params.page = $stateParams.page ? $stateParams.page : 1;
    params.page_size =  5;
    $scope.lista = [];
    $scope.dimension={};

    $scope.list = function(params) {

        console.log("page_size: " + params.page_size);
        API.Dimension.list(params).$promise.then(function(r) {
            $scope.lista = r.results;
            $scope.options = r.options;
            //$scope.per= $scope.per ? $scope.per :r.options.page_size;
        }, function(err) {
            console.log("Err " + err);
        });
    };
    $scope.list(params);

    $scope.listtest = function() {

        API.Test.list({query:$scope.query}).$promise.then(function(r) {
            console.log("sssss");
            console.log(r);
            console.log("sssss");
            $scope.listatest = r.results;
        }, function(err) {
            console.log("Err " + err);
        });
    };
    $scope.listtest();

    $scope.listAll = function() {
        //params.page = 1;
        //params.fields = 'nombre,direccion';
        //params.query = $scope.query;
        //params.page_size= $scope.per;
        params.all = true; //así debe quedar
        $scope.list(params);

    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.new = function(evt) {
        $scope.dimension.id = null;
        $scope.Dimension = {};
        $mdDialog.show({
            scope: $scope,
            targetEvent: evt,
            templateUrl: 'tutoria/views/dimension/formd.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            preserveScope: true,
        }).then(function() {
            window.alert("Se ha guardado satisfactoriamente!");
            $scope.list(params);

        }, function() {});
    };

    $scope.sel = function(d) {
        $scope.dimension = API.Dimension.get({ id: d.id });
        $mdDialog.show({
            scope: $scope,
            templateUrl: 'tutoria/views/dimension/formd.html',
            parent: angular.element(document.body),
            clickOutsideToClose:false,
            preserveScope: true,
        }).then(function(){
            $scope.list(params);
            //$scope.categoria={};
        }, function(){
        });
    };

    $scope.save = function() {
        if ($scope.dimension.id) {

            API.Dimension.update({ id: $scope.dimension.id }, $scope.dimension).$promise.then(function(r) {
                window.alert("Se ha actualizado satisfactoriamente!");
                console.log("r: " + r);
                //$scope.list();
                $mdDialog.hide();
            }, function(err) {
                console.log("Err " + err);
            });

        } else {
            API.Dimension.save($scope.dimension).$promise.then(function(r) {
                console.log("r: " + r);
                //$scope.list();
                $mdDialog.hide();
            }, function(err) {
                console.log("Err " + err);
            });
        }
    };

    $scope.delete = function(d) {
        if ($window.confirm("Seguro?")) {
            API.Dimension.delete({ id: d.id }).$promise.then(function(r) {
                console.log("r: " + r);
                $scope.list(params);
            }, function(err) {
                console.log("Err " + err);
            });
        }
    };
});