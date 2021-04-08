$('#dailyTasks').on('click', function () {
  // Hide Section
  $('#dailyTasks').show();
  $('.sectionImg').hide();
  $('.quote-wrapper').hide();
  $('.between').hide();
  $('#news').hide();
  $('#cell3W').hide();
  $('.weather').hide();
  $('.container').hide();
  $('.weatherName').hide();
  $('#weatherSection').hide();
  $('#newsSquares').hide();
  $('.daily-tasks').hide();
  // Show Section
  $('.desktop').hide()
  })

 
  $('.taskBtn').on('click', function () {
    // Hide Section
    $('#dailyTasks').show();
    $('.sectionImg').hide();
    $('.quote-wrapper').hide();
    $('.between').hide();
    $('#news').hide();
    $('#cell3W').hide();
    $('.weather').hide();
    $('.container').hide();
    $('.weatherName').hide();
    $('#weatherSection').hide();
    $('#newsSquares').hide();
    $('.daily-tasks').hide();
    // Show Section
    $('.desktop').hide()
    })
  
let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');


const eventTitleInput = document.getElementById('eventTitleInput');
const eventStartTimeInput = document.getElementById('eventStartTimeInput');

const eventTitleInput2 = document.getElementById('eventTitleInput2');
const eventStartTimeInput2 = document.getElementById('eventStartTimeInput2');

const eventTitleInput3 = document.getElementById('eventTitleInput3');
const eventStartTimeInput3 = document.getElementById('eventStartTimeInput3');

const eventTitleInput4 = document.getElementById('eventTitleInput4');
const eventStartTimeInput4 = document.getElementById('eventStartTimeInput4');




const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


//To display events.json to other pages, make sure to use this function, openModal, and specify the current date as the
//parameter passing in, openModal(date)
function openModal(date) {
  clicked = date;
 

  const eventForDay = events.find(e => e.date === clicked);

  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    document.getElementById('eventText2').innerText = eventForDay.startTime;

    document.getElementById('eventText3').innerText = eventForDay.title2;
    document.getElementById('eventText4').innerText = eventForDay.startTime2;

    document.getElementById('eventText5').innerText = eventForDay.title3;
    document.getElementById('eventText6').innerText = eventForDay.startTime3;
  
    deleteEventModal.style.display = 'block';
  } else {
    newEventModal.style.display = 'block';
  }

  backDrop.style.display = 'block';
}

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find(e => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

      if (eventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener('click', () => openModal(dayString));
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);    
  }
}

function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
  load();
}

function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');

    events.push({
      date: clicked,
        title: eventTitleInput.value,
        startTime: eventStartTimeInput.value,
      
        title2: eventTitleInput2.value,
        startTime2: eventStartTimeInput2.value,
        
        title3: eventTitleInput3.value,
        startTime3: eventStartTimeInput3.value,

        title4: eventTitleInput4.value,
        startTime4: eventStartTimeInput4.value,
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}

function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();
