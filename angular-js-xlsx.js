'use strict';

angular.module('angular-js-xlsx', [])
.directive('jsXls', function () {
  return {
    restrict: 'E',
    template: '<input type="file" />',
    replace: true,
    link: function (scope, element, attrs) {

      function handleSelect() {
        var files = this.files;
        for (var i = 0, f = files[i]; i != files.length; ++i) {
          var reader = new FileReader();
          var name = f.name;
          reader.onload = function(e) {
            var data = e.target.result;

            /* if binary string, read with type 'binary' */
            try {
              var workbook = XLS.read(data, {type: 'binary'});

              if (attrs.onread) {
                var handleRead = scope[attrs.onread];
                if (typeof handleRead === "function") {
                  handleRead(workbook);
                }
              }
            } catch(e) {
              if (attrs.onerror) {
                var handleError = scope[attrs.onerror];
                if (typeof handleError === "function") {
                  handleError(e);
                }
              }
            }

            // Clear input file
            element.val('');
          };

          reader.readAsBinaryString(f);
        }
      }

      element.on('change', handleSelect);
    }
  };
});
