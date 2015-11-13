angular.module('CameraExample').controller('CameraExampleController',

function($scope,$cordovaCamera,$cordovaFileTransfer){
	$scope.photo = "img/camera-icon.png";
	$scope.photoReady = false;
	
	$scope.getPhoto = function(source){
		var objConfig = {
				quality : 100,
				destinationType : Camera.DestinationType.FILE_URI,
				sourceType : (source === 'camera') ? Camera.PictureSourceType.CAMERA : Camera.PictureSourceType.SAVEDPHOTOALBUM,
				saveToPhotoAlbum : false,
				popoverOptions :new CameraPopoverOptions(300, 300, 200, 200, Camera.PopoverArrowDirection.ARROW_ANY)
			};
		
		console.log(objConfig);
		$cordovaCamera.getPicture(objConfig).then(function(imageData){
			$scope.photo =imageData;
			$scope.photoReady = true;
		},function(error){
			console.log(error);
			$scope.photoReady = false;
		});
	};
	
	$scope.uploadPhoto = function(image){
		 var options = new FileUploadOptions();
         options.fileKey="file";
         options.fileName= image.substr(image.lastIndexOf('/')+1);;
         options.mimeType="image/jpeg";
         var params = new Object();
         params.value1 = "test";
         params.value2 = "param";
         options.params = params;
         options.chunkedMode = false;
         options.headers = {
        		    Connection: "close"
        		};

//         var ft = new FileTransfer();
//         var win = function win(r) {
//             console.log("Code = " + r.responseCode);
//             console.log("Response = " + r.response);
//             console.log("Sent = " + r.bytesSent);
//             alert(r.response);
//         };

//         fail = function fail(error) {
//             alert("An error has occurred: Code = " + error.code);
//         };
         
         
         
         $cordovaFileTransfer.upload( encodeURI('http://www.tecprosolutions.com.mx/test/fileupload.php'),image,options)
         .then(function(r){
        	 console.log("Code = " + r.responseCode);
	           console.log("Response = " + r.response);
	           console.log("Sent = " + r.bytesSent);
	           alert(r.response);
         },function(error){
        	 alert("An error has occurred: Code = " + error.code);
         });
	};
});