var currentDateEl = $('#currentDay');
var timeBlock = $('.time-block');
var today = dayjs();

$(function () {
  
  // Function to change class of time blocks depending on the current hour
  function updateBlockClass() {
    var currentHour = dayjs().format('H');

    timeBlock.each(function () {
      var blockHour = parseInt($(this).attr('id').split('-')[1]);

      if (blockHour < currentHour) {
        $(this).removeClass('present future');
        $(this).addClass('past');
      } else if (blockHour === currentHour) {
        $(this).removeClass('past future');
        $(this).addClass('present');
      } else {
        $(this).removeClass('past present');
        $(this).addClass('future');
      }
    })
  }

  // Function to load events from local storage
  function loadEvent() {
    timeBlock.each(function () {
      var blockHour = $(this).attr('id').split('-')[1];
      var event = localStorage.getItem(blockHour);

      if (event) {
        $(this).find('.description').val(event);
      }
    })
  }

  // Function to save event to local storage
  function saveEvent() {
    var blockHour = $(this).parent().attr('id').split('-')[1];
    var event = $(this).siblings('.description').val();

    localStorage.setItem(blockHour, event);
  }

  // Save button event listener
  $('.saveBtn').on('click', saveEvent);

  // Displays the current date
  currentDateEl.text(dayjs().format('dddd, MMMM D'));

  updateBlockClass();
  loadEvent();
});
