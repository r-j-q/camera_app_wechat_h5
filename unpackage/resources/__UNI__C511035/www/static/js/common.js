export default{
	test:function(Num){

		//判断号码是否存在
		if(!Num||Num==null){
		

			return false;

		}
		//判断号码是否为菲律宾号码段，符合10位
	/* 	var reg=/^(8|08|9|09)[0-9]{9}$/;


			if(!Num.match(reg)){


				console.log('号码有误，请输入正确的菲律宾手机号');
				return false	;


			}else{
				console.log("号码正确");
			} */


// 判断号码前是否带0
if(Num.substring(1,0)==0){
	var phone=Num.substring(4,0);
	phone=phone.replace("0", "");

	var len =phone.length;
         // console.log(phone,num)
     }else{
     	var phone=Num.substring(3,0);  
     	var len=phone.length;

     } 
     // console.log(Num,phone,len,phone.length);




		//判断号码为那个运营商
		var reg1=/^(817|90[4|5|6]|91[5|6|7]|92[6|7]|93[5|6|7]|945|95[4|5|6]|96[5|6|7]|97[3|5|7|8|9]|99[4|5|7])\d{0}$/;

		var reg2=/^(813|908|91[1|3|4|8|9]|92[0|1|8|9]|939|94[7|9]|961|970|98[1|9]|99[8|9])\d{0}$/;

		var reg3=/^(92[2|3|4|5]|93[1|2|3|4]|94[1|2|3|4])\d{0}$/;

		if(phone.match(reg1) && phone.length==3 && len==3  ){
	
			return 1;
			
		}
		if(phone.match(reg2) && phone.length==3 && len==3  ){
		
			return 2;
		}
		if(phone.match(reg3) && phone.length==3 && len==3  ){
	
			
			return 3;


		}
		return false;

 

	},
	
	wechat:function(){



	}, 


 
 


}
// 暂时未用
// debounce: function(fn, delay) {
// 	var timer = null;
// 	var delay = delay || 200;
// 	return function() {
// 		var args = arguments;
// 		var that = this;
//     // 清除上一次延时器
//     clearTimeout(timer)
//     timer = setTimeout(function() {
//     	fn.apply(that,args)
//     }, delay);
// }
// }






