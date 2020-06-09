import {Composite, contentView, ImageView, ScrollView, Stack, statusBar, TextView, NavigationView, SearchAction, Page} from 'tabris';


var magImage = 'images/magGlass.png';

var yearInt;
var monthInt;
var actualMonthInt;
var monthNameString;
var totalMonthDaysInt;
var curDayInt;
var eventObjArray;

var yearMap;
var monthMap;


var dayContainsEventMap;



/** @param {tabris.Attributes<TextView>=} attributes */
const MonthCell = attributes =>
  <TextView background='#c4cfde' textColor='white' font='bold 24px' stretchX alignment='centerX' onSwipeLeft={onMonthSwipeLeft} onSwipeRight={onMonthSwipeRight} {...attributes}/>;

  /** @param {tabris.Attributes<TextView>=} attributes */
const YearCell = attributes =>
  <TextView background='#34495e' textColor='white' font='bold 35px' stretchX alignment='centerX' onSwipeLeft={onYearSwipeLeft} onSwipeRight={onYearSwipeRight} {...attributes}/>;

/** @param {tabris.Attributes<TextView>=} attributes */
const EventCell = attributes =>
  <TextView background='white' padding={[2, 5]} font='14px' onTap={onEvent} alignment='left' {...attributes}/>;


contentView.append(
<$>

  <NavigationView stretch drawerActionVisible='true'>
    
    <SearchAction  id='search'
    image={magImage}
    onTap={onHome}>
    </SearchAction>


    <Page title='Spokinetic'>

      <ScrollView stretch onResize={updateInitialPosition} onScrollY={updateCurrentPosition}>
        <Stack id='stack' layoutData='stretchX'>

        </Stack>
      </ScrollView>

    </Page>

  </NavigationView>
</$>

);

const scrollView = $(ScrollView).only();
const pageRef = $(Page).only();  
var stackRef = $(Stack).only('#stack');
//const yearTextView = pageRef.find('#year').first(TextView);



getDateInfo();
eventObjArray = fillEventArray(yearInt, monthInt);
dayContainsEventMap = fillBoolDayEvents();
addRows();


function addRows(){

  YearCell({text: yearInt}).appendTo(stackRef);

  for(let index = 1; index < totalMonthDaysInt; index ++){
    
    if(index == curDayInt){
      MonthCell({text: monthNameString + ' ' + index , id: index, background: '#d08378'}).appendTo(stackRef);
    }
    else{
      if(dayContainsEventMap.get(index)){
        MonthCell({text: monthNameString + ' ' + index , id: index, background: '#7fb3d5'}).appendTo(stackRef);

        // use boolean month contains event here
        addEvents(stackRef, index);
      }
      else{
        MonthCell({text: monthNameString + ' ' + index , id: index}).appendTo(stackRef);
      }
    }    
  }
}


function updateRows(){
  
  stackRef.dispose();
  
  scrollView.append(<Stack id='stack' layoutData='stretchX'>
  </Stack>);

  stackRef = pageRef.find('#stack').first(Stack);
  dayContainsEventMap = fillBoolDayEvents();
  addRows();
}


/**
 * This method takes the passed in widget and fades it's display to 
 * opacity 0 over 1 second.
 */
async function fadeOut(widget) {
  await widget.animate(
    {opacity: 0},
    {duration: 1000, easing: 'ease-out'}
  );
  widget.dispose();
}

/**
 * addEvents iterates through eventObjArray and creates
 * an EventCell for every event that exists for the passed
 * in day. EventCells are appended to the passed in Stack
 * reference stackRef.
 */
function addEvents(stackRef, i){ 

  var index = 0;
  if(eventObjArray[index] == undefined){

  }
  else{
    while(eventObjArray[index].day <= i){
      if(eventObjArray[index].day == i){
        EventCell({text: eventObjArray[index].name + ' ' + eventObjArray[index].day, id: i}).appendTo(stackRef);
      }
      index ++;
    } 
  }
}

function handleScroll({target}){
  console.log(target.text);
}

function onEvent(){// works
  console.log('clicked on an event');
}

function onMonthSwipeLeft(){
  if(monthInt == 12){
    yearInt ++;
    monthInt = 1;
  }
  else{
    monthInt ++;
  }
  updateMonthInfo();
  eventObjArray = fillEventArray(yearInt, monthInt);
  updateRows();
}

function onMonthSwipeRight(){
  if(monthInt == 1){
    yearInt --;
    monthInt = 12;
  }
  else{
    monthInt --;
  }
  updateMonthInfo();
  eventObjArray = fillEventArray(yearInt, monthInt);
  updateRows();
}

function onYearSwipeLeft(){
  yearInt ++;
  updateRows();

}

function onYearSwipeRight(){
  yearInt --;
  updateRows();
}

function onHome(){

}

function updateInitialPosition({height}) {

}

function updateCurrentPosition({offset}) {

}

function calculateTitleViewOpacity(scrollViewOffsetY) {

}


/**
 * Instantiates an object of the current date. Initializes monthInt with a number representing
 * the month. Initializes totalMonthDaysInt with the total days in specified month with a method call.
 * Initializes monthNameString with a string representation of the month with a method call.
 */
function getDateInfo(){
  var currentDateObj = new Date();

  yearInt = currentDateObj.getFullYear();
  monthInt = currentDateObj.getMonth();

  monthInt ++;
  actualMonthInt = monthInt;

  totalMonthDaysInt = getMonthDays();
  monthNameString = getMonthName();
  curDayInt = currentDateObj.getDate();

}

/**
 * Fills and returns a map where the key is int days and value is a boolean stating whether that day
 * contains an event.
 */
function fillBoolDayEvents(){
  
  let myBoolMap = new Map();

  for(let index = 1; index < totalMonthDaysInt; index ++){
    
    myBoolMap.set(index,checkDayHasEvent(index));
  }
  return myBoolMap;
}

/**
 * Iterates eventObjArray up too the the coorisponding day passed in checking if there exists an event
 * on that day. If there is an event associated with passed in day true is returned, else false is 
 * returned.
 * @param {Current Day Checked} i 
 */
function checkDayHasEvent(i){

  let index = 0;

  while(index < eventObjArray.length && eventObjArray[index].day <= i){
    
    if(eventObjArray[index].day == i){
      
      return true;
    }

    index ++;
  }
  return false;
}

function updateMonthInfo(){
  if(monthInt != actualMonthInt){
    curDayInt = 0;
  }
  else{
    var currentDateObj = new Date();
    curDayInt = currentDateObj.getDate();
  }
  totalMonthDaysInt = getMonthDays();
  monthNameString = getMonthName();
}

/**
 * Returns the appropriate number of days for 
 * the specific month.
 */
function getMonthDays(){

  switch(monthInt){
    case 2:
      return 29;
    case 4: case 6: case 9: case 11:
      return 30;
    default:
      return 31;
  }
}

function getMonthName(){
  switch(monthInt){
    case 1:
      return "January";
      break;
    case 2:
      return "Febuary";
      break;
    case 3:
      return "March";
      break;
    case 4:
      return "April";
      break;
    case 5:
      return "May";
      break;
    case 6:
      return "June";
      break;
    case 7:
      return "July";
      break;
    case 8:
      return "August";
      break;
    case 9:
      return "September";
      break;
    case 10:
      return "October";
      break;
    case 11:
      return "November";
      break;
    case 12:
      return "December";
      break;
  }
}


/**
 * This method will use the month to access events in that month and 
 * pull relavent events from that month and populate the events array
 * before displaying to the screen.
 */
function fillEventArray(yearInt, monthInt){
  var tempEventsObjArray;

  // use the monthInt var to pull events for that month
  if(yearInt == 2020 && monthInt == 6){
    tempEventsObjArray = [
      {
        name: 'Fun Run',
        month: '06',
        day: '1',
        year: '2020',
        time: '7 am',
        duration: '1hr',
        description: 'something',
        key: '0'
      },
      {
        name: 'Concert',
        month: '06',
        day: '4',
        year: '2020',
        time: '9 pm',
        duration: '2hr',
        description: 'something',
        key: '0'
      },
      {
        name: 'Block Party',
        month: '06',
        day: '10',
        year: '2020',
        time: '3 pm',
        duration: '4hr',
        description: 'something',
        key: '0'
      },
      {
        name: 'Neighborhood Cleanup',
        month: '06',
        day: '10',
        year: '2020',
        time: '10 am',
        duration: '2hr',
        description: 'something',
        key: '0'
      },
      {
        name: 'Cooking Club',
        month: '06',
        day: '15',
        year: '2020',
        time: '12 pm',
        duration: '2hr',
        description: 'something',
        key: '0'
      },
      {
        name: 'Paint and Drink',
        month: '06',
        day: '17',
        year: '2020',
        time: '7 pm',
        duration: '1hr 30min',
        description: 'something',
        key: '0'
      },
      {
        name: 'Hot Yoga',
        month: '06',
        day: '20',
        year: '2020',
        time: '9 am',
        duration: '1hr',
        description: 'something',
        key: '0'
      },
      {
        name: 'Normal Yoga',
        month: '06',
        day: '20',
        year: '2020',
        time: '11 am',
        duration: '1hr',
        description: 'something',
        key: '0'
      },
      {
        name: 'Pet Park',
        month: '06',
        day: '20',
        year: '2020',
        time: '10 am',
        duration: 'All Day',
        description: 'something',
        key: '0'
      },
      {
        name: 'Bike the Centenial',
        month: '06',
        day: '25',
        year: '2020',
        time: '8 am',
        duration: 'none',
        description: 'something',
        key: '0'
      },
      {
        name: 'Beer Pong Party',
        month: '06',
        day: '25',
        year: '2020',
        time: '10 pm',
        duration: 'All Night',
        description: 'something',
        key: '0'
      },
      {
        name: 'Neighborhood Cleanup',
        month: '06',
        day: '30',
        year: '2020',
        time: '10 am',
        duration: '4hr',
        description: 'something',
        key: '0'
      },
      {
        name: 'Yard Sale',
        month: '06',
        day: '31',
        year: '2020',
        time: '11 am',
        duration: 'All day',
        description: 'something',
        key: '0'
      },
    ];
  }

  else if(yearInt == 2020 && monthInt == 7){
    tempEventsObjArray = [
      {
        name: 'Fun Run',
        month: '07',
        day: '2',
        year: '2020',
        time: '7 am',
        duration: '1hr',
        description: 'something',
        key: '0'
      },
      {
        name: 'Concert',
        month: '07',
        day: '2',
        year: '2020',
        time: '9 pm',
        duration: '2hr',
        description: 'something',
        key: '0'
      },
      {
        name: 'Block Party',
        month: '07',
        day: '5',
        year: '2020',
        time: '3 pm',
        duration: '4hr',
        description: 'something',
        key: '0'
      },
      {
        name: 'Neighborhood Cleanup',
        month: '07',
        day: '6',
        year: '2020',
        time: '10 am',
        duration: '2hr',
        description: 'something',
        key: '0'
      },
      {
        name: 'Swim Party',
        month: '07',
        day: '6',
        year: '2020',
        time: '12 pm',
        duration: '6 hr',
        description: 'something',
        key: '0'
      },
      {
        name: 'Cooking Club',
        month: '07',
        day: '15',
        year: '2020',
        time: '12 pm',
        duration: '2hr',
        description: 'something',
        key: '0'
      },
      {
        name: 'Paint and Drink',
        month: '07',
        day: '17',
        year: '2020',
        time: '7 pm',
        duration: '1hr 30min',
        description: 'something',
        key: '0'
      },
      {
        name: 'Bike at the Park',
        month: '07',
        day: '18',
        year: '2020',
        time: '9 am',
        duration: '4hr',
        description: 'something',
        key: '0'
      },
      {
        name: 'Fun in the Sun',
        month: '07',
        day: '18',
        year: '2020',
        time: '11 am',
        duration: '3hr',
        description: 'something',
        key: '0'
      },
      {
        name: 'Pet Park',
        month: '07',
        day: '21',
        year: '2020',
        time: '10 am',
        duration: 'All Day',
        description: 'something',
        key: '0'
      },
      {
        name: 'Bike the Centenial',
        month: '07',
        day: '25',
        year: '2020',
        time: '8 am',
        duration: 'none',
        description: 'something',
        key: '0'
      },
      {
        name: 'Beer Pong Party',
        month: '07',
        day: '25',
        year: '2020',
        time: '10 pm',
        duration: 'All Night',
        description: 'something',
        key: '0'
      },
      {
        name: 'Neighborhood Cleanup',
        month: '07',
        day: '30',
        year: '2020',
        time: '10 am',
        duration: '4hr',
        description: 'something',
        key: '0'
      },
      {
        name: 'Yard Sale',
        month: '07',
        day: '31',
        year: '2020',
        time: '11 am',
        duration: 'All day',
        description: 'something',
        key: '0'
      },
    ];
  }

  else{
    tempEventsObjArray = [];
  }

  return tempEventsObjArray;
  
}


