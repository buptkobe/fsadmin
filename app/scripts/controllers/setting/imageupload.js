"use strict";
angular.module("sbAdminApp").controller("ImageUploadCtrl", function($scope, FileUploader, toastr) {
    var uploader = $scope.uploader = new FileUploader({
        url: baseURL + "imageupload",
        filters: [{
            name: "filesizelimit",
            fn: function(item) {
                return item.size >= 1048576 ? (toastr.warning("文件大小不能超过1M"), !1) : !0
            }
        }]
    });
    uploader.filters.push({
        name: "imageFilter",
        fn: function(item, options) {
            var type = "|" + item.type.slice(item.type.lastIndexOf("/") + 1) + "|";
            return -1 !== "|jpg|png|jpeg|bmp|gif|".indexOf(type)
        }
    }), uploader.onWhenAddingFileFailed = function(item, filter, options) {
        console.info("onWhenAddingFileFailed", item, filter, options)
    }, uploader.onAfterAddingFile = function(fileItem) {
        console.info("onAfterAddingFile", fileItem)
    }, uploader.onAfterAddingAll = function(addedFileItems) {
        console.info("onAfterAddingAll", addedFileItems)
    }, uploader.onBeforeUploadItem = function(item) {
        console.info("onBeforeUploadItem", item)
    }, uploader.onProgressItem = function(fileItem, progress) {
        console.info("onProgressItem", fileItem, progress)
    }, uploader.onProgressAll = function(progress) {
        console.info("onProgressAll", progress)
    }, uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info("onSuccessItem", fileItem, response, status, headers)
    }, uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info("onErrorItem", fileItem, response, status, headers)
    }, uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info("onCancelItem", fileItem, response, status, headers)
    }, uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info("onCompleteItem", fileItem, response, status, headers)
    }, uploader.onCompleteAll = function() {
        console.info("onCompleteAll")
    }, console.info("uploader", uploader)
});