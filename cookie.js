(function(){
	window.checkDateCookie = function(arr) {
		for(let i = arr.length - 1; i > -1; i--) {
		  arr[i] = arr[i].split('-');
		  for (let j = 2; j > 0; j--) {
			if (arr[i][j].length === 1) {
			    arr[i][j] = `0${arr[i][j]}`;
			}
		  }
		    arr[i] = arr[i].join('-');
		}
		return arr;
	}
	window.setCookie = function(key, value, id) {
		let reg = new RegExp(`(?:(?:^|.*;\s*)${key}\s*\=\s*([^;]*).*$)|^.*$`);
		if (document.cookie.replace(reg, "$1") !== "true") {
			alert("Напоминание установлено");
        	let randNum = Math.random().toFixed(2).replace('0.','');
			let date = key.match(/\d+\-\d+\-\d+/g);
			dateName = window.checkDateCookie(date);
			date = dateName[0].replace('2019', '2020');
			date = new Date (date);
			document.cookie = `${randNum}reserved${dateName}=${value}; expires=${date}`;
			window.cookieArr = window.getCookie();
		}
	}
	window.getCookie = function() {
		let str = document.cookie;
		let reg = /(\d+)reserved(.+?)=/g;
		let match = '';
		let arrDate = [];
		window.arrDateId = [];
		let arrName = [];
		let arrEvents = [];
		while ((match = reg.exec(str)) !== null) {
		  arrDate.push(match[2]);
		  arrDateId.push(match[1]);
		  arrName.push(`${match[1]}reserved${match[2]}`);
		}
		window.checkDateCookie(arrDate);
		for (let i = arrDate.length - 1; i > -1; i--) {
			if (i !== arrDate.length - 1) {
				reg = new RegExp(`${arrDateId[i]}reserved${arrDate[i]}\=(.+?); ${arrDateId[i+1]}`, 'g');
			} else {
				reg = new RegExp(`${arrDateId[i]}reserved${arrDate[i]}\=(.+)(; )*`, 'g');
			}
			while ((match = reg.exec(str)) !== null) {
			  arrEvents.unshift(match[1]);
			}
		}
		return [arrDate, arrEvents, arrName];
	}
	window.deleteCookie = function(name, value, date) {
	    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		window.cookieArr = window.getCookie();
		let dateDeleteArr = date.split('-');
		let reg =  new RegExp(`Напоминание о событии ${value}.+?(br\>)+?`);
		for (let i = window.allElemLi.length - 1; i > -1; i--) {
			if (window.allElemLi[i].dataset.month == eval(dateDeleteArr[1]) && window.allElemLi[i].dataset.day == eval(dateDeleteArr[2])) {
				window.allElemLi[i].innerHTML = window.allElemLi[i].innerHTML.replace(reg, '');
				if (!window.quantityEventsToday) {
					window.allElemLi[i].classList.remove('reminder-day');
				}
				break;
			}
		}
	};
})();