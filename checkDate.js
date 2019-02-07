(function () {
	setInterval(function(){
		window.quantityEventsToday = 0;
		let flag = false;
		let date = [`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`];
		date = window.checkDateCookie(date)[0];
		for (let i = cookieArr[0].length - 1; i > -1; i--) {
			if(cookieArr[0][i] === date) {
		 outer: while (i > -1 && !flag) {
		 			if (cookieArr[0][i] === date) {
		 				++quantityEventsToday;
		 			}
					if (i === 0) {
						flag = true;
						i = cookieArr[0].length - 1;
						break outer;
					}
					--i;
	 				continue;
				}
				let message = confirm(`Напоминание о событии ${cookieArr[1][i]} ${cookieArr[0][i]}. 
					OK - напомнить позже, Отмена - отключить напоминание`);
				if (!message) {
					--quantityEventsToday;
					window.deleteCookie(cookieArr[2][i], cookieArr[1][i], cookieArr[0][i]);
    				window.determinationHeight();
				}
			}
		}
	},15000);
})();