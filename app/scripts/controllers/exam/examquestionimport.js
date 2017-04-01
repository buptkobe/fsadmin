"use strict";
angular.module("sbAdminApp").controller("ExamQuestionImportCtrl", function($scope, FileUploader, toastr, $state, $timeout) {
    var uploader = $scope.uploader = new FileUploader({
        url: baseURL + "excelupload",
        filters: [{
            name: "filesizelimit",
            fn: function(item) {
                return item.size >= 10*1024*1024 ? (toastr.warning("文件大小不能超过10M"), !1) : !0
            }
        }],
        queueLimit : 1
    });
    uploader.filters.push({
        name: "excelFilter",
        fn: function(item, options) {
            var type = "|" + item.type.slice(item.type.lastIndexOf("/") + 1) + "|";
            if ("|vnd.ms-excel|vnd.openxmlformats-officedocument.spreadsheetml.sheet|".indexOf(type) == -1) {
                toastr.warning("请选择Excel文件！");
                return false;
            }
            return true;
        }
    });
    uploader.onWhenAddingFileFailed = function(item, filter, options) {
        console.info("onWhenAddingFileFailed", item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info("onAfterAddingFile", fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info("onAfterAddingAll", addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info("onBeforeUploadItem", item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info("onProgressItem", fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info("onProgressAll", progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info("onSuccessItem", fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info("onErrorItem", fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info("onCancelItem", fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info("onCompleteItem", fileItem, response, status, headers);
        $timeout(function() {
            toastr.info("导入完成");
            $state.go("dashboard.examquestionlist");
        }, 500);
    };
    uploader.onCompleteAll = function() {
        console.info("onCompleteAll");
    };
    console.info("uploader", uploader);

    $scope.importExcel = function(item) {
        item.upload();

        
    }
});