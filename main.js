(function(){
  function enumerationElements(el, num) {
    for (let i = window.allElemLi.length - 1; i > -1; i--) {
      if (window.allElemLi[i] === el) {
        return window.allElemLi[i-num]
      }
    }
  }
  document.addEventListener('DOMContentLoaded', function() {
    window.allElemLi = document.querySelectorAll('li:not(.title-month)');
    let arrHeightUl = [];
    let arrUlElem = '';
    let heightElemLiMonth = document.querySelector('.title-month').offsetHeight;
    let commonTarget = '';
    let popup = document.querySelector('.popup');
    window.determinationHeight = function() {
      arrUlElem = document.querySelectorAll('ul');
      for (let i = arrUlElem.length - 1; i > -1; i--) {
        arrHeightUl.unshift(arrUlElem[i].scrollHeight);
      }
      for (let i = arrUlElem.length - 1; i > -1; i--) {
        arrUlElem[i].setAttribute('style', `height:${heightElemLiMonth}px`);
      }
      if (popup.classList.contains('active')) {
        popup.classList.remove('active')
      }
    };
    window.determinationHeight();
    document.addEventListener('click', function (e) {
      let lastDay = e.target.classList.contains('last-day');
      if (e.target.classList.contains('title-month')) {
        if (!e.target.parentElement.classList.contains('active')) {
          e.target.parentElement.classList.add('active');
          let month = e.target.nextElementSibling.getAttribute('data-month');
          e.target.parentElement.setAttribute('style', `height:${arrHeightUl[month-1]}px`);
        } else if (e.target.parentElement.offsetHeight === heightElemLiMonth) {
          let month = e.target.nextElementSibling.getAttribute('data-month');
          e.target.parentElement.setAttribute('style', `height:${arrHeightUl[month-1]}px`);
        } else {
          e.target.parentElement.classList.remove('active');
          e.target.parentElement.setAttribute('style', `height:${heightElemLiMonth}px`);
        }
      } else if (e.target.classList.contains('reserved-day') && !lastDay) {
        commonTarget = e.target;
        window.htmlTarget = e.target.innerHTML;
        let arrEv = [];
        let str = e.target.innerHTML;
        reg = new RegExp(`(Событие.+?)<br>`, 'g');
        while ((match = reg.exec(str)) !== null) {
          arrEv.unshift(match[1]);
        }
        if(arrEv.length > 1) {
          let popupEvent = document.querySelector('.popup-event');
          popupEvent.innerHTML = '';
          for (let i = arrEv.length - 1; i > -1; i--) {
            popupEvent.innerHTML += `<button type="button" class="event-selection" data-target="${i}">${arrEv[i]}</button>`
          }
          popupEvent.classList.add('active');
          popupEvent.addEventListener('click', function(evt) {
            if(evt.target.classList.contains('event-selection')) {
              htmlTarget = evt.target.innerHTML;
              popupEvent.classList.remove('active');
              popup.classList.add('active');
            } else if (evt.target.classList.contains('popup-event')) {
              popupEvent.classList.remove('active');
            }
          });
        } else {
          popup.classList.add('active');
        }
      }
    });
    document.addEventListener('click', function (e) {
      if (e.target.classList.contains('popup')) {
        popup.classList.remove('active');
      } else if (e.target.classList.contains('event-reminder')) {
        let numberDays = e.target.dataset.target;
        let elReminder = enumerationElements(commonTarget, numberDays);
        let reminder = `2019-${elReminder.dataset.month}-${elReminder.dataset.day}`;
        let text = htmlTarget.match(/<b>(.+?)<\/b>/)[1];
        let arrDataSet = [elReminder.dataset.month, elReminder.dataset.day];
        for(let i = arrDataSet.length - 1; i > -1; i--) {
            if (arrDataSet[i].length === 1) {
                arrDataSet[i] = `0${arrDataSet[i]}`;
            }
        }
        window.cookieArr = window.getCookie();
        if (window.cookieArr[1].length ) {
          for (let i = window.cookieArr[1].length - 1; i > -1; i--) {
            if (window.cookieArr[1][i] === text && window.cookieArr[2][i] === `${window.arrDateId[i]}reserved2019-${arrDataSet[0]}-${arrDataSet[1]}`) {
                alert('Напоминание уже установлено!')
                return;
              }
          }
        }
        if (!elReminder.classList.contains('reminder-day')) {
          elReminder.classList.add('reminder-day'); 
        }
        if (numberDays>3) { 
          numberDays += ' дней';
        } else {
          numberDays += ' дня';
        }
        elReminder.innerHTML += `Напоминание о событии ${text}, за ${numberDays}<br>`;
        determinationHeight();
        window.setCookie(`reserved${reminder}`, text);
      }
    });
  });
})();