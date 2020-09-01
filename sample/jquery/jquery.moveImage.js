$.fn.moveImage = function ( iMoveKind, sElmStr, iSpeed, iMoveInterval ){

	iMoveInterval = iMoveInterval || 1;  //未定義値またはnullの場合

	var setElm = $("." + sElmStr);
	var slideTime = iSpeed;
	var moveInterval = iMoveInterval;

	if(iMoveKind == C_MOVE_RIGHT || iMoveKind == C_MOVE_LEFT){

		//右から左へ流すスクリプト or 左から右へ流すスクリプト
		setElm.each(function(){
			var classFilter = "";
			if(iMoveKind == C_MOVE_RIGHT){
				classFilter = 'loopright';
			}else if(iMoveKind == C_MOVE_LEFT){
				classFilter = 'loopleft';
			}

			var targetObj = $(this);
			var loopsliderWidth = targetObj.width();
			var loopsliderHeight = targetObj.height();

			targetObj.attr("rel",classFilter);
			targetObj.children('ul').wrapAll('<div class="' + sElmStr + '_wrap"></div>');

			var findWrap = targetObj.find('.' + sElmStr + '_wrap');
			var listWidth = findWrap.children('ul').children('li').width();
			var listCount = findWrap.children('ul').children('li').length;
			var loopWidth = (listWidth)*(listCount);

			findWrap.css({
				top: '0',
				left: '0',
				width: ((loopWidth) * 2),
				height: (loopsliderHeight),
				overflow: 'hidden',
				position: 'absolute'
			});

			findWrap.children('ul').css({
				width: (loopWidth)
			});

			//右から左へ流すスクリプト
			if(classFilter == 'loopleft') {
				loopPosLeft();
				findWrap.children('ul').clone().appendTo(findWrap);
			}
			//左から右へ流すスクリプト
			if(classFilter == 'loopright') {
				loopPosRight();
				findWrap.children('ul').clone().prependTo(findWrap);
			}

			function loopPosLeft(){
				findWrap.css({left:'0'});
				findWrap.stop().animate({left:'-' + (loopWidth) + 'px'},slideTime,'linear');
				setTimeout(function(){
					loopPosLeft();
				},slideTime);
			};
			function loopPosRight(){
				var wrapWidth = findWrap.width();
				findWrap.css({left:'-' + ((wrapWidth) / 2) + 'px'});
				findWrap.stop().animate({left:'0'},slideTime,'linear');
				setTimeout(function(){
					loopPosRight();
				},slideTime);
			};
		});

	}else if(iMoveKind == C_MOVE_UP || iMoveKind == C_MOVE_DOWN){

		//上から下へ流すスクリプト or 下から上へ流すスクリプト
		var setTimer = 0;
		$('.' + sElmStr + '').each(function(){

			var targetObj = $(this);

			var loopsliderWidth = targetObj.width();
			var loopsliderHeight = targetObj.height();
			$(this).children('ul').wrapAll('<div class="' + sElmStr + '_wrap"></div>');

			var findWrap = targetObj.find('.' + sElmStr + '_wrap');

			var listHeight = findWrap.children('ul').children('li').height();
			var listCount = findWrap.children('ul').children('li').length;

			var loopHeight = (listHeight)*(listCount);

			findWrap.css({
				top: '0',
				left: '0',
				width: (loopsliderWidth),
				height: ((loopHeight) * 2),
				overflow: 'hidden',
				position: 'absolute'
			});

			findWrap.children('ul').css({
				height: (loopHeight)
			});
			findWrap.children('ul').clone().appendTo(findWrap);

			if(iMoveKind == C_MOVE_UP){
				//下から上へ流すスクリプト
				timerDown();
			}else if(iMoveKind == C_MOVE_DOWN){
				//上から下へ流すスクリプト
				timerUp();
			}

			function timerUp(){
				setTimer = setInterval(function(){loopPositionUp2()},0);
			};

			function loopPositionUp2(){
				clearInterval(setTimer);
				findWrap.stop().animate({top:'+=' + (moveInterval) + 'px'},slideTime,'linear',function(){
					var posTop2 = parseInt(findWrap.css('top'));
					var heightCal2 = (loopHeight)-((loopHeight)*2);
					var over = posTop2;
					if (posTop2 >= 0) {
						findWrap.css({top:(-(loopHeight - over))});
					}
					timerUp();
				});
			};

			function timerDown(){
				setTimer = setInterval(function(){loopPositionDown()},0);
			};

			function loopPositionDown(){
				clearInterval(setTimer);
				findWrap.stop().animate({top:'-=' + (moveInterval) + 'px'},slideTime,'linear',function(){
					var posTop = parseInt(findWrap.css('top'));
					var heightCal = (loopHeight)-((loopHeight)*2);
					if (posTop <= heightCal) {
						var over = heightCal - posTop;
						findWrap.css({top:0-over});
					}
					timerDown();
				});
			};
		});
	}
}