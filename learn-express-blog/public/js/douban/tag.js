$(function(){
	$('.head_right').find('li:first').hover(function(){
	$('#dbkfd_h').css('display','block');
	},function(){
		$('#dbkfd_h').css('display','none');
	});
	$('.change').on('click',function(){
		$('.list-content-left').find('ul').css('display','none').prevAll('div').find('.change').addClass('blueFont');
		$(this).removeClass('blueFont').parent().siblings('ul').css('display','block');
	})
})