if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(reg) {
    // регистрация сработала
    console.log('Registration succeeded. Scope is ' + reg.scope);
  }).catch(function(error) {
    // регистрация прошла неудачно
    console.log('Registration failed with ' + error);
  });
};
(function(){
  function daysInMonth(month, year) {
    return 33 - new Date(year, month, 33).getDate();
  }
  (function createCalendar(id, year) {
    let dataWrapper = document.querySelector(`#${id}`);
    let arrMonth = [];
    let arrNameMonth = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let calendarHTML = '';
    for (let i = 11; i > -1; i--) {
      arrMonth.unshift(daysInMonth(i, year));
    }
    for (let i = arrMonth.length - 1; i > -1; i--) {
      calendarHTML = `</ul>${calendarHTML}`;
      let flag = 2;
      if (i === new Date().getMonth()) {
      	flag = 1;
      } else if (i < new Date().getMonth()) {
      	flag = 0;
      }
      for (let j = arrMonth[i] - 1; j > -1; j--) {
        let classEl = new Date(year, i, j).getDay();
        if(flag === 1 && j+1 < new Date().getDate()) {
        	calendarHTML = `<li class="last-day" data-dayWeek="${classEl}" data-month="${i+1}" data-day="${j+1}"><span>${j+1}</span></li>${calendarHTML}`
        } else if (flag === 0) {
        	calendarHTML = `<li class="last-day" data-dayWeek="${classEl}" data-month="${i+1}" data-day="${j+1}"><span>${j+1}</span></li>${calendarHTML}`
        } else {
        	calendarHTML = `<li data-dayWeek="${classEl}" data-month="${i+1}" data-day="${j+1}"><span>${j+1}</span></li>${calendarHTML}`
        }
      }
      calendarHTML = `<ul><li class="title-month">${arrNameMonth[i]}</li>${calendarHTML}`;
    }
    dataWrapper.innerHTML = calendarHTML;
  })('calendar', 2019);
})();