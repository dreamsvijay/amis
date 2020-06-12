var codeDate = new Date(); 
$(document).ready(function(e) {
	$("#membercode").val(window.localStorage.getItem("member_code"));
	$("#majlis").val(window.localStorage.getItem("area"));
	$("#region").val(window.localStorage.getItem("region"));
	$("#fullname").val(window.localStorage.getItem("first_name"));
	//$("#email").val(window.localStorage.getItem("member_code"));
	//$("#phone").val(window.localStorage.getItem("member_code"));
	//$("#membercode").val(window.localStorage.getItem("member_code"));
	
	var dataString = "user_id="+window.localStorage.getItem("user_id");
        $.ajax({
            url:'http://amisapp.ansarullah.co.uk/mobile_newapp/profile_details',
            type:'POST',
            data:dataString,
            dataType:'json',
            success:function(data){//console.log(data);
				$(".loading-mask").css('opacity','0');
				$("#postcode").val(data.det['postcode']);
				$("#email").val(data.det['email']);
				$("#profile_id").val(data.det['m_id']);
				$("#phone").val(data.det['mobile']);
				$("#membercode").val(data.det['m_code']);
				$("#willno").val(data.det['willno']);
				$("#majlis").val(data.det['area']);
				$("#region").val(data.det['region']);
				if(data.det['national_pos'][0]){
					$("input[name='national_pos[]']:first").val(data.det['national_pos'][0]);
				}
				if(data.det['national_pos'][1]){
					$("input[name='national_pos[]']").parent().parent().append($(".nation_sec").find('div:eq(0)').clone());
					$("input[name='national_pos[]']:eq(1)").val(data.det['national_pos'][1]);
				}
				if(data.det['national_pos'][2]){
					$("input[name='national_pos[]']").parent().parent().append($(".nation_sec").find('div:eq(0)').clone());
					$("input[name='national_pos[]']:eq(2)").val(data.det['national_pos'][2]);
				}
				
				if(data.det['regional_pos'][0]){
					$("input[name='regional_pos[]']:first").val(data.det['national_pos'][0]);
				}
				if(data.det['regional_pos'][1]){
					$("input[name='regional_pos[]']").parent().parent().append($(".region_sec").find('div:eq(0)').clone());
					$("input[name='regional_pos[]']:eq(1)").val(data.det['national_pos'][1]);
				}
				if(data.det['regional_pos'][2]){
					$("input[name='regional_pos[]']").parent().parent().append($(".region_sec").find('div:eq(0)').clone());
					$("input[name='regional_pos[]']:eq(2)").val(data.det['national_pos'][2]);
				}
				
				if(data.det['majlis_pos'][0]){
					$("input[name='majlis_pos[]']:first").val(data.det['majlis_pos'][0]);
				}
				if(data.det['majlis_pos'][1]){
					$("input[name='majlis_pos[]']").parent().parent().append($(".majlis_sec").find('div:eq(0)').clone());
					$("input[name='majlis_pos[]']:eq(1)").val(data.det['majlis_pos'][1]);
				}
				if(data.det['majlis_pos'][2]){
					$("input[name='majlis_pos[]']").parent().parent().append($(".majlis_sec").find('div:eq(0)').clone());
					$("input[name='majlis_pos[]']:eq(2)").val(data.det['majlis_pos'][2]);
				}
            }
        });
	
	
		$('#profile-form').submit(function(){
				//if(validateFemail() )
				{
        androidToken = window.localStorage.getItem("androidToken");
        iosToken = window.localStorage.getItem("iosToken");
        var dataString ="profile_id="+$("#profile_id").val()+"&fullname="+$("#fullname").val()+"&postcode="+$("#postcode").val()+"&email="+$("#email").val()+"&phone="+$("#phone").val()+"&android="+androidToken+"&ios="+iosToken;
        $.ajax({
            url:"http://amisapp.ansarullah.co.uk/mobile_newapp/update_profile",
            type:"POST",
            data:dataString,
            dataType:"json",
            beforeSend:function(){
                $(".loading-mask").css('opacity','0.5');
               // disableBack =" true;
            },
            success:function(data){ 
               // disableBack = false;
				$(".loading-mask").css('opacity','0');
                if(data.res=="1"){
                    $( ".w-form" ).scrollTop( 300 );
					$(".w-form-done").show();
					$(".w-form").hide();
                }else{
					$('#femail').addClass("error");
                    setTimeout(function(){$('.ajaxOverlay').hide();$('.login_err').html(data.det);}, 2000);
                    window.localStorage.clear();
                }
            }
        });
    
					
					
				}
				return false;
		});
	
	});

$("#add_majlis").on('click',function(){
	var i = 0;
	$("input[name='majlis_pos[]']").each(function(index, element) {
        i++;
    });
	if(i < 3){
		$("input[name='majlis_pos[]']").parent().parent().append($(".majlis_sec").find('div:eq(0)').clone());
	}
});

$("#add_region").on('click',function(){
	var i = 0;
	$("input[name='region_pos[]']").each(function(index, element) {
        i++;
    });
	if(i < 3){
		$("input[name='region_pos[]']").parent().parent().append($(".region_sec").find('div:eq(0)').clone());
	}
});

$("#add_nation").on('click',function(){
	var i = 0;
	$("input[name='national_pos[]']").each(function(index, element) {
        i++;
    });
	if(i < 3){
		$("input[name='national_pos[]']").parent().parent().append($(".nation_sec").find('div:eq(0)').clone());
	}
});

$(".edit_profile").on('click',function(){
	$("#fullname, #postcode, #email, #phone, #majlis_pos, #region_pos, #national_pos").prop('disabled',false);
	$("#profile_save").show();	
});

var camearaOptions = {
            quality: 100,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
        }

function getImage() {
	navigator.camera.getPicture(uploadPhoto, onError, camearaOptions);
}

function onError(err) {
	alert(error);
}

function uploadPhoto(imageURI) {
	var options = new FileUploadOptions();
	options.fileKey = "file";
	options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
	options.mimeType = "image/jpeg";
	var ft = new FileTransfer();
	ft.upload(imageURI, "http://amisapp.ansarullah.co.uk/mobile_newapp/profile_image",
		function(result) {
			console.log(JSON.stringify(result));
		},
		function(error) {
			console.log(JSON.stringify(error));
		}, options);
}

