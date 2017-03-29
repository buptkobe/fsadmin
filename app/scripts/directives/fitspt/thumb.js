"use strict";
angular.module("sbAdminApp").directive("ngThumb", ["$window", function($window) {
    var helper = {
        support: !(!$window.FileReader || !$window.CanvasRenderingContext2D),
        isFile: function(item) {
            return angular.isObject(item) && item instanceof $window.File
        },
        isImage: function(file) {
            var type = "|" + file.type.slice(file.type.lastIndexOf("/") + 1) + "|";
            return -1 !== "|jpg|png|jpeg|bmp|gif|".indexOf(type)
        }
    };
    return {
        restrict: "A",
        template: "<canvas/>",
        link: function(scope, element, attributes) {
            function onLoadFile(event) {
                var img = new Image;
                img.onload = onLoadImage, img.src = event.target.result
            }

            function onLoadImage() {
                var width = params.width || this.width / this.height * params.height,
                    height = params.height || this.height / this.width * params.width;
                canvas.attr({
                    width: width,
                    height: height
                }), canvas[0].getContext("2d").drawImage(this, 0, 0, width, height)
            }
            if (helper.support) {
                var params = scope.$eval(attributes.ngThumb);
                if (helper.isFile(params.file) && helper.isImage(params.file)) {
                    var canvas = element.find("canvas"),
                        reader = new FileReader;
                    reader.onload = onLoadFile, reader.readAsDataURL(params.file)
                }
            }
        }
    }
}]);