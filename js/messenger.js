$(document).ready(function(e) {
	$(".loading-mask").css('opacity','0.5');
	
	var dataString = "user_id="+window.localStorage.getItem("user_id");
    $('#details_event').html('');
    $.ajax({
        url:'http://amisapp.ansarullah.co.uk/mobile_newapp/group_list',
        type:'POST',
        data:dataString,
		dataType:'json',
        success:function(data){ 
			  $(".loading-mask").css('opacity','0');			
			  $(".list-messages").empty().append(data.group);
        }
    });
	
});


$(document).on('click','a[data-cid]',function(){ 
	$("#menu-button").hide();
	$("#chatin").show();
	$(".list-messages").hide();
	$(".navbar-title").empty().append($(this).find('.message-title').html());
	$(".list-chats").show();
	//$("#cont_view").children().hide();
	//$("#cont_view #tab_view_"+$(this).attr('data-cid')).show();
});
$(document).on('click','#chatin',function(){ 
	$("#chatin").hide();
	$("#menu-button").show();
	$(".list-messages").show();
	$(".list-chats").hide();
	$(".navbar-title").empty().append('Messenger');
});
