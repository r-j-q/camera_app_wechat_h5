 /**
 base64String: 需要转换的base64 图片
 w: 压缩后的图片的宽度
 quality: 图片的压缩比例
 */
 function compress(base64String, w, quality) {
 	var getMimeType = function (urlData) {
 		var arr = urlData.split(",");
 		var mime = arr[0].match(/:(.*?);/)[1];
 		// return mime.replace("image/", "");
 		return mime;
 	};
 	var newImage = new Image();
 	var imgWidth, imgHeight;
 	var promise = new Promise((resolve) => (newImage.onload = resolve));
 	newImage.src = base64String;
 	return promise.then(() => {
 		imgWidth = newImage.width;
 		imgHeight = newImage.height;
 		var canvas = document.createElement("canvas");
 		var ctx = canvas.getContext("2d");
 		if (Math.max(imgWidth, imgHeight) > w) {
 			if (imgWidth > imgHeight) {
 				canvas.width = w;
 				canvas.height = (w * imgHeight) / imgWidth;
 			} else {
 				canvas.height = w;
 				canvas.width = (w * imgWidth) / imgHeight;
 			}
 		} else {
 			canvas.width = imgWidth;
 			canvas.height = imgHeight;
 		}
 		ctx.clearRect(0, 0, canvas.width, canvas.height);
 		ctx.drawImage(newImage, 0, 0, canvas.width, canvas.height);
 		var base64 = canvas.toDataURL(getMimeType(base64String), quality);
 		return base64;
 	});
 } 
  // compress(base64String, 800, 0.5).then(function (val) {
  //            imgb.src = val;
  //  });



// 防止处理多次点击
function noMultipleClicks(methods, info) {
    // methods是点击后需要执行的函数， info是函数需要传的参数
    let that = this;
    if (that.noClick) {
        // 第一次点击
        that.noClick= false;
        if((info && info !== '') || info ==0) {
            // info是执行函数需要传的参数
            methods(info);
        } else {
            methods();
        }
        setTimeout(()=> {
            that.noClick= true;
        }, 2000)
    } else {
        //  这里是重复点击的判断
    }
}
//导出

// 图片预加载
 function preloader(imgList,next) {
    let count = 0;
    // let loadingInstance1 = Toast({
    //     type: 'loading',
    //     message: '加载中...',
    //     forbidClick: true,
    // });
	 console.log("预加载图片",imgList)
    for (let img of imgList) {
		  count++;
		uni.getImageInfo({
		        src: img.imgUrl,
		    success: function (image) {
		          image.onload = () => {
		             console.log("预加载图片image",image)
		              if (count == imgList.length) {
		                  // loadingInstance1.close();
		                  // Toast.clear();
		                  next();
		              }
		          };
		    }
		});
		
		
        // let image = new Image();
        // image.src = img.imgUrl;
       
    }
}
export default {
	compress,
    noMultipleClicks,// 禁止多次点击
	preloader
}





