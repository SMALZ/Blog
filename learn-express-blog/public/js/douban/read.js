$(function(){
	$('.head_right').find('li:first').hover(function(){
	$('#dbkfd_h').css('display','block');
	},function(){
		$('#dbkfd_h').css('display','none');
	})

	$('.new_book_middle').find('ul').find('li').find('a').hover(function(){
		$(this).next('.desc_a1').css('display','block');
	},function(){
		$(this).next('.desc_a1').css('display','none');
	})

	$('.slide_controls').find('ol').find('li').on('click',function(e){
		e.preventDefault();
		$('.slide_controls').children('ol').find('li').removeClass('color_disc');
		$('.new_book_middle').children('ul').css('display','none');
		$('.slide_controls').children('ol').find('li').eq($(this).index()).addClass('color_disc');
		$('.new_book_middle').children('ul').eq($(this).index()).css('display','block');
	})

	$('.silde_btns').find('a:last').click(function(e){
		e.preventDefault();
		var t=0;
		$('.slide_controls>ol>li').each(function(index){
			if($('.slide_controls>ol>li').eq(index).attr('class').indexOf('color_disc')!=-1)
			{
				t=index;
				if(t==3){
					t=0;
				}
				else{
					t=t+1;
				}
				return false;
			}
		});
		$('.slide_controls').find('ol').find('li').eq(t).trigger('click');
	})

	$('.silde_btns').find('a:first').click(function(e){
		e.preventDefault();
		var t1=0;
		$('.slide_controls>ol>li').each(function(index){
			if($('.slide_controls>ol>li').eq(index).attr('class').indexOf('color_disc')!=-1)
			{
				t1=index;
				if(t1==0){
					t1=3;
				}
				else{
					t1=t1-1;
				}
				return false;
			}
		});
		$('.slide_controls').find('ol').find('li').eq(t1).trigger('click');
	});



	$('.new_book_middle').children('ul').find('a').find('img').on('mouseover',function(e){
		Y=e.pageY;
	});
	baseY=$('.desc_a1').position().top;
	base=baseY;
	$('.new_book_middle').children('ul').find('a').find('img').on('mousewheel',function(e){
		$('.desc_a1').css('top',e.pageY-Y+baseY);
		Y=e.pageY;
		baseY=$('.desc_a1').position().top;
	});
	$('.new_book_middle').children('ul').find('a').find('img').on('mouseleave',function(e){
		$('.desc_a1').css('top',base);
	})








	$('.nav-vendor').find('li').on('click',function(e){
		e.preventDefault();
		$('.nav-vendor').find('li').removeClass('xuan_bang').parent().siblings('.list-ranking').css('display','none');
		$(this).addClass('xuan_bang').parent().siblings('.list-ranking').eq($(this).index()).css('display','block');
	})
});
