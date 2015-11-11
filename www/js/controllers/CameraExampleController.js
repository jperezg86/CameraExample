angular.module('CameraExample').controller('CameraExampleController',

function($scope,$cordovaCamera){
	$scope.photo = "img/camera-icon.png";
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
			console.log(imageData);
		},function(error){
			console.log(error);
		});
	};
});