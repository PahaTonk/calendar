(function(){
	document.addEventListener('DOMContentLoaded', function() {
		window.conference = {
			'C++ CoreHard Meet-up 1' : [2019, 2, 12, 19],
			'Особенности привлечения инвестиций на стадии Seed' : [2019, 2, 13, 19],
			'Minsk Legal Hackers Meet-up 1' : [2019, 2, 15, 19],
			'PyCon Belarus 2019 Conference 1' : [2019, 2, 15, 10],
			'PyCon Belarus 2019 Conference 2' : [2019, 2, 16, 10],
			'API Test Automation' : [2019, 2, 19, 19],
			'Career Development Day' : [2019, 2, 23, 9],
			'Модель компетенций QA специалистов' : [2019, 2, 25, 9],
			'Блокчейн-обучение для ИT-специалистов и инженеров' : [2019, 2, 26],
			'LeverX SAPUI5 Open Meetup: когда фреймворк больше, чем просто фреймворк' : [2019, 2, 26, 19],
			'Big Data and Advanced Analytics Conference 1' : [2019, 3, 13],
			'Big Data and Advanced Analytics Conference 2' : [2019, 3, 14],
			'Sitecore Insights Meetup' : [2019, 3, 5, 19],
			'TestingStage’19 — конференция для профессионалов в тестировании' : [2019, 3, 29],
			'TestingStage’19 — конференция для профессионалов в тестировании' : [2019, 3, 30],
			'EMERGE 2019 1' : [2019, 6, 4],
			'EMERGE 2019 2' : [2019, 6, 5]
		}
		for (let key in window.conference) {
			for (let i = window.allElemLi.length - 1; i > -1; i--) {
			    if (window.conference[key][1] == window.allElemLi[i].dataset.month && window.conference[key][2] == window.allElemLi[i].dataset.day) {
			    	if (window.conference[key].length > 3) {
			    		window.allElemLi[i].innerHTML += `Событие - <b>${key}</b> состоится ${window.conference[key][0]}.${window.conference[key][1]}.${window.conference[key][2]} в ${window.conference[key][3]}:00<br>`;
			    	} else {
			    		window.allElemLi[i].innerHTML += `Событие - <b>${key}</b> состоится ${window.conference[key][0]}.${window.conference[key][1]}.${window.conference[key][2]}. Следите за обновлениями или поставьте напоминание чтобы узнать точное время начала.<br>`;
			    	}
			    	if (!window.allElemLi[i].classList.contains('reserved-day')) {
			    		window.allElemLi[i].classList.add('reserved-day');
			    	}
			    }
			}
		}
		(function addReminderEvent() {
			let numberDaysArr = [];
			window.cookieArr = window.getCookie();
			for (let i = window.cookieArr[0].length - 1; i >= 0; i--) {
				let arr = window.cookieArr[0][i].split('-');
		 outer: for (let j = window.allElemLi.length - 1; j > -1; j--) {
					if(window.allElemLi[j].dataset.month == eval(arr[1]) && window.allElemLi[j].dataset.day == eval(arr[2])) {
						let reg = new RegExp(`${window.cookieArr[1][i]}`);
						for (let x = window.allElemLi.length - 1; x > -1; x--) {
							if(window.allElemLi[x].innerHTML.search(reg) !== -1 ) {
								let numberDays = x - j;
						        if (numberDays>3) { 
						          numberDays += ' дней';
						        } else {
						          numberDays += ' дня';
						        }
        						window.allElemLi[j].innerHTML += `Напоминание о событии ${window.cookieArr[1][i]}, за ${numberDays}<br>`;
						    	if (!window.allElemLi[j].classList.contains('reminder-day')) {
						    		window.allElemLi[j].classList.add('reminder-day');
						    	}
								break outer;
							}
						}
					}
				}
			}
    		window.determinationHeight();
		})();
	});
})();