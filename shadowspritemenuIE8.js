//** jQuery Multilevel self-resizing image-sprite shadow DropDown menu horizontal from left to right with shadow support for IE 8
//** written by: Roman Pantring www.roman-pantring.de - www.filomatic.de [easy filebased PHP CMS]
//** Script Download: http://flashdictionary.filomatic.de/css/css_jquery_shadowspritemenuIE8.php
//** Script Demo: http://flashdictionary.filomatic.de/css/shadowspritemenuIE8_demo.php
//** Date: 2011-01-25

(function($) {
$(document).ready(function() {
(function(){
menudiv = $("#navigation");
menuLI= $("#navigation ul li ul >li");
menuUL= $("#navigation ul");
menudiv.children("ul").children("li").addClass('menu');

//clone it
menudiv.wrap('<div id ="navigationbody">');
$("#navigationbody").prepend('<ul></ul>');
for(cloneLoop=0;cloneLoop<menudiv.children('ul').children('li').length;cloneLoop++){
	index = menudiv.children('ul').children('li').length-cloneLoop-1;
	menuID=menudiv.children('ul').children('li').eq(index).attr('id');	
	$("#navigationbody").children('ul').prepend('<li id="'+menuID+'" class="menu"></li>');
}
$("#navigationbody").children('ul').children('li').prepend($("#navigation").children("ul").children("li").eq(0).children("a").clone());
$("#navigationbody").children('ul').wrap('<div id="menuclone">');
// add the shadow span tags inside div ui-shadow
menudiv.children("ul").children("li").children("ul").wrap("<div class='ui-shadow'>");
menudiv.children("ul").children("li").children("div").append('<span class="ui-shadow-el ui-shadow-top-left"></span>');
menudiv.children("ul").children("li").children("div").append('<span class="ui-shadow-el ui-shadow-top-right"></span>');
menudiv.children("ul").children("li").children("div").append('<span class="ui-shadow-el ui-shadow-bot-left"></span>');
menudiv.children("ul").children("li").children("div").append('<span class="ui-shadow-el ui-shadow-bot-right"></span>');
menudiv.css('visibility','visible');
// hide it
menudiv.children("ul").children("li").children("div").css('display','none');
menudiv.children("ul").children("li").children("a").css('display','none');
	
menudiv.children("ul").children("li").mouseover(function(){
	//stop all and hide all
	$(this).parent().children("li").stop();
	$(this).parent().children("li").children().css('display','none'); 
	//show active
	$(this).children().fadeIn(0);
	$(this).children("a").children("span").fadeIn(0);
	$(this).children().children('ul').fadeIn(0);
});
menudiv.children("ul").children("li").mouseleave(function(){
	/*$(this).children('div').fadeOut(0);
	$(this).children('div').children("ul").fadeOut(0);
	$(this).children("a").children("span").fadeOut(0);*/
	/* optional timeout */
	$(this).animate({left: '0'},500,function(){
		$(this).children('div').fadeOut(0);
		$(this).children('div').children("ul").fadeOut(0);
		$(this).children("a").children("span").fadeOut(0);
	});
});
var x="";
MenuAction = function(){
	x = $(this);
	this.timeout=setTimeout(showMenu,250);
}
menuLI.mouseenter(MenuAction).mouseleave(function(){clearTimeout(this.timeout);});
// add level class
var n = 0
menuUL.each(function(i){ 
    if (($(this).parents('ul').length + 1) > n) { n = $(this).parents('ul').length + 1; $(this).addClass('level'+n);}
});
for(levelloop=1;levelloop<=n;levelloop++){
$('.level'+levelloop).children("li").children("ul").addClass("level"+(levelloop+1));
}
function showMenu(){
		position = x.position();
		//hide all
		x.parent().children('li').children('ul').css('display',"none");
		//display current child ul
		x.children('ul').css('display',"block");
		if(x.children('ul').height()!= null && x.children('ul').height()>x.parent().height()){
			//resize bigger
			x.parent().height(x.children('ul').height());		
		}
		if(x.children('ul').height()== null ){
			//resize smaller
			x.parent().height('auto');
		}
		CurrentWidth=x.width();						
		ChildWidth=x.children('ul').children('li').width();
		CurrentMenuIndex = x.parentsUntil(".menu").parent("li").index();
		if(x.children('ul').html() != null){
			if(CurrentWidth!=0){
			x.parent().children('li').children('a').removeClass('active');
		    x.children('a').addClass('active');
			//save the current index from li tag in parent ul.data.index
			x.parent("ul").data('index',x.index());
			
			$level1 = menudiv.children('ul').children('li').children('div').eq(CurrentMenuIndex).children('ul');			
			$level1index = $level1.data('index');
			$level1width = $level1.children("li").width();
			WidthCounterArray = new Array();
			CurrentTarget = $level1.children("li").eq($level1index);
			CurrentTotalWidth = 0;
			for(WidthCounter=0;WidthCounter<n;WidthCounter++){
				//alert(WidthCounter);
				WidthCounterArray[WidthCounter] = new Array();
				WidthCounterArray[WidthCounter]["target"] = CurrentTarget;
				WidthCounterArray[WidthCounter]["index"] = CurrentTarget.children("ul").data('index');
				WidthCounterArray[WidthCounter]["width"] = CurrentTarget.children("ul").width();
				WidthCounterArray[WidthCounter]["nextargetwidth"] = CurrentTarget.children("ul").children("li").eq(WidthCounterArray[WidthCounter]["index"]).children("ul").children("li").width();
				CurrentTarget = CurrentTarget.children("ul").children("li").eq(WidthCounterArray[WidthCounter]["index"]);
				if(WidthCounterArray[WidthCounter]["width"]>0){
					CurrentTotalWidth += WidthCounterArray[WidthCounter]["width"];
				}
			}
			CurrentTotalWidth = CurrentTotalWidth+$level1width;			
			// resize level1
			$level1.width(CurrentTotalWidth);
			// resize the shadow
			$level1.parent('div').width(CurrentTotalWidth);
			//$('div.ui-shadow').eq(CurrentMenuIndex).width(CurrentTotalWidth);			
			}
		}else{
			if(CurrentWidth!=0){
			//save the current index from li tag in parent ul.data.index
			x.parent("ul").data('index',x.index());
			// remove active class
		    x.parent().children('li').children('a').removeClass('active');
			
			$level1 = menudiv.children('ul').children('li').children('div').eq(CurrentMenuIndex).children('ul');
			$level1index = $level1.data('index');
			$level1width = $level1.children("li").width();
			WidthCounterArray = new Array();
			CurrentTarget = $level1.children("li").eq($level1index);
			CurrentTotalWidth = 0;
			for(WidthCounter=0;WidthCounter<n;WidthCounter++){
				//alert(WidthCounter);
				WidthCounterArray[WidthCounter] = new Array();
				WidthCounterArray[WidthCounter]["target"] = CurrentTarget;
				WidthCounterArray[WidthCounter]["index"] = CurrentTarget.children("ul").data('index');
				WidthCounterArray[WidthCounter]["width"] = CurrentTarget.children("ul").width();
				WidthCounterArray[WidthCounter]["nextargetwidth"] = CurrentTarget.children("ul").children("li").eq(WidthCounterArray[WidthCounter]["index"]).children("ul").children("li").width();
				CurrentTarget = CurrentTarget.children("ul").children("li").eq(WidthCounterArray[WidthCounter]["index"]);
				if(WidthCounterArray[WidthCounter]["width"]>0){
					CurrentTotalWidth += WidthCounterArray[WidthCounter]["width"];
				}
			}
			CurrentTotalWidth = CurrentTotalWidth+$level1width;		
			// resize level1
			$level1.width(CurrentTotalWidth);
			// resize the shadow
			$level1.parent('div').width(CurrentTotalWidth);
			//$('div.ui-shadow').eq(CurrentMenuIndex).width(CurrentTotalWidth);
			// hide all
			x.parent().children('li').children('ul').css('display',"none");
			}
		}
		if(CurrentWidth!=0){
			x.children('ul').css('top',position.top*-1);
			x.children('ul').css('left',x.width());
		}	
	}
})(jQuery)
});

})( jQuery );