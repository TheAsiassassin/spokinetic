import {$, NavigationView, Page, SearchAction, CollectionView, contentView, TextView, AlertDialog, TabFolder, Tab, Composite, Switch} from 'tabris';
import {MainPage} from './index';
import {CalendarPage} from './calendar-john';
import {ContactPage} from './contact';
import {AccountPage} from './account';


var magImage = 'images/magGlass.png';

var yearInt;
var monthInt;
var monthNameString;
var totalMonthDaysInt;
var curDayInt;

var curDayCountInt = 0;

getDateInfo();

var eventsObjArray = fillEventArray();

/** @param {tabris.Attributes<TextView>=} attributes */
const SectionCell = attributes =>
  <TextView background='#c4cfde' textColor='white' font='bold 24px' alignment='centerX' onSwipeRight={swipeRight}
  onSwipeLeft={swipeLeft} {...attributes}/>;

  /** @param {tabris.Attributes<TextView>=} attributes */
const YearCell = attributes =>
  <TextView background='#d08378' textColor='red' font='bold 35px' onSwipeRight={onYearSwipeRight} onSwipeLeft={onYearSwipeLeft} alignment='centerX' {...attributes}/>;

/** @param {tabris.Attributes<TextView>=} attributes */
const ItemCell = attributes =>
  <TextView background='white' padding={[2, 5]} font='14px' onTap={onEvent} alignment='left' {...attributes}/>;

const items = createItems();

export class ListCalendarPage extends Page {
  constructor(properties) {
    super();
    this.set({title: 'Calendar', ...properties}).append(
      <TabFolder paging stretch selectionIndex={1} tabBarLocation='bottom'>

        <Tab title='Events' id='events' onSelect={() => openMainPage()}>
        </Tab>

        <Tab title='Calendar'>
        </Tab>

        <Tab title='Contact Us' onSelect={() => openContactPage()}>
        </Tab>

        <Tab title='My Account' onSelect={() => openAccountPage()}>
        </Tab>

      </TabFolder>
    );
    this.append(
      <CollectionView stretchX bottom={100} top
        id='collection'
        itemCount={items.length}
        cellType={index => items[index].type}
        cellHeight={(_, type) => type === 'section' ? 48 : 32}
        createCell={createCell}
        updateCell={(cell, index) => cell.text = fillCell(cell, items, index)}       
        onScroll={handleScroll}
      />
    );
    this.append(
      <SectionCell stretchX height={48} 
        id='floatingSection' 
        text={items[0].name}/>
    );
    this.append(
      <Composite bottom bottom={60} centerX>
        <TextView left centerY text='Month View'/>
        <Switch left='prev() 8' checked onSelect={() => toMonthView()}/>
        <TextView left='prev() 8' centerY text='List View'/>
      </Composite>
    );
  }
}

//const pageRef = $(Page).only();  


function swipeRight(){
  console.log("Right swipe Working");
  $(CollectionView).only('#collection').updateCell;
}

function swipeLeft(){
  console.log("Left Swipe Working");
}

function onYearSwipeLeft(){
  console.log("On Year Swipe Left");
  monthInt = 1;
  yearInt --;
  //pageRef.find('#collection').first(CollectionView).updateCell;
}

function onYearSwipeRight(){
  // create a method to update all dates and everything associated with it to show new display
  console.log("On Year Swipe right");
  monthInt = 1;
  yearInt ++;
  //pageRef.find('#collection').first(CollectionView).updateCell;
}

function  onEvent(){
  AlertDialog.open(
    <AlertDialog title='Event Page: Coming Soon' message={'This is a place holder to view each event.'}
    buttons={{ok: 'OK'}}/>
  );
}

function onHome(){
  $(TextView).only('#initText').text = 'Home Pressed';
}
//createCell={type => type === 'section' ? SectionCell() : ItemCell()}

//set key value pairs with each event cell in order to pull info from later
function createCell(type){
  switch(type){
    case 'year':
      return YearCell();
    case 'section':
      return SectionCell();
    default:
      return ItemCell();
  }
  //count the number of cells in order to keep track of each event cell
  // when you come across an event you must use your count as the items index
  // then store it's info into another data structure with key value pair capabilities

}

function fillCell(cell, items, index){
  console.log("Worked " + yearInt);
  yearInt ++;
  if(items[index].type =='year'){
    return yearInt;
  }
  if(items[index].type =='section'){

    const nameParsedArray = items[index].name.split(" ");
    const dayInt = nameParsedArray[1];
    return items[index].name;
  }
  else{
    return items[index].name + " | " + items[index].time + " | " + items[index].duration;
  }
}

/** @param {tabris.CollectionViewScrollEvent<CollectionView<TextView>>} ev */
function handleScroll({target}) {
  
  const splitIndex = target.firstVisibleIndex + 1;
  const currentSection = items.slice(0, splitIndex).filter(item => item.type === 'section').pop();
  const nextSection = items.slice(splitIndex).filter(item => item.type === 'section')[0];
  const nextSectionCell = target.cellByItemIndex(items.indexOf(nextSection));
  const bounds = nextSectionCell ? nextSectionCell.absoluteBounds : null;
  $('#floatingSection').only(SectionCell).set({
    text: currentSection ? currentSection.name : items[0].name,
    transform: bounds ? {translationY: Math.min(bounds.top - bounds.height, 0)} : {}
  });
}

function createItems() {
  
  let itemCount = 1;
  const result = [];
  for (let day = 0; day <= totalMonthDaysInt; day++) {
    if(day == 0){
      result.push({name: yearInt + "", type: 'year'});
    }
    else{
      
      if(day == curDayInt){
        result.push({name: monthNameString + " " + day, type: 'section', current: 'true'});
      }
      else{
        result.push({name: monthNameString + " " + day, type: 'section', current: 'false'});
      }
    }
    for(let curEvent = 0; curEvent < eventsObjArray.length; curEvent ++){ 
      if(day == eventsObjArray[curEvent].day){
        result.push({name: eventsObjArray[curEvent].name, time: eventsObjArray[curEvent].time, 
          duration: eventsObjArray[curEvent].duration, type: 'event'});
      } 
    } 
  }
  return result;
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
  totalMonthDaysInt = getMonthDays();
  monthNameString = getMonthName();
  curDayInt = currentDateObj.getDay();
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
function fillEventArray(){

  // use the monthInt var to pull events for that month

  const tempEventsObjArray = [
    {
      name: 'Fun Run',
      month: '03',
      day: '1',
      year: '2020',
      time: '7 am',
      duration: '1hr',
      description: 'something',
      key: '0'
    },
    {
      name: 'Concert',
      month: '03',
      day: '4',
      year: '2020',
      time: '9 pm',
      duration: '2hr',
      description: 'something',
      key: '0'
    },
    {
      name: 'Block Party',
      month: '03',
      day: '10',
      year: '2020',
      time: '3 pm',
      duration: '4hr',
      description: 'something',
      key: '0'
    },
    {
      name: 'Neighborhood Cleanup',
      month: '03',
      day: '10',
      year: '2020',
      time: '10 am',
      duration: '2hr',
      description: 'something',
      key: '0'
    },
    {
      name: 'Cooking Club',
      month: '03',
      day: '15',
      year: '2020',
      time: '12 pm',
      duration: '2hr',
      description: 'something',
      key: '0'
    },
    {
      name: 'Paint and Drink',
      month: '03',
      day: '17',
      year: '2020',
      time: '7 pm',
      duration: '1hr 30min',
      description: 'something',
      key: '0'
    },
    {
      name: 'Hot Yoga',
      month: '03',
      day: '20',
      year: '2020',
      time: '9 am',
      duration: '1hr',
      description: 'something',
      key: '0'
    },
    {
      name: 'Normal Yoga',
      month: '03',
      day: '20',
      year: '2020',
      time: '11 am',
      duration: '1hr',
      description: 'something',
      key: '0'
    },
    {
      name: 'Pet Park',
      month: '03',
      day: '20',
      year: '2020',
      time: '10 am',
      duration: 'All Day',
      description: 'something',
      key: '0'
    },
    {
      name: 'Bike the Centenial',
      month: '03',
      day: '25',
      year: '2020',
      time: '8 am',
      duration: 'none',
      description: 'something',
      key: '0'
    },
    {
      name: 'Beer Pong Party',
      month: '03',
      day: '25',
      year: '2020',
      time: '10 pm',
      duration: 'All Night',
      description: 'something',
      key: '0'
    },
    {
      name: 'Neighborhood Cleanup',
      month: '03',
      day: '30',
      year: '2020',
      time: '10 am',
      duration: '4hr',
      description: 'something',
      key: '0'
    },
    {
      name: 'Yard Sale',
      month: '03',
      day: '31',
      year: '2020',
      time: '11 am',
      duration: 'All day',
      description: 'something',
      key: '0'
    },
  ];

  return tempEventsObjArray;
  
}

/**
 * Opens the Main/Events page
 * 
 * detach() is called to prevent the 'hamburger menu'
 *   from being replaced by a back button titled
 *   'Spokinetic'
 */
function openMainPage() {
  const navigationView = $(NavigationView).only();
  navigationView.pages().detach();
  navigationView.append(
    <MainPage />
  );
}

/**
 * Opens the Contact Us page
 * 
 * detach() is called to prevent the 'hamburger menu'
 *   from being replaced by a back button titled
 *   'Spokinetic'
 */
function openContactPage() {
  const navigationView = $(NavigationView).only();
  navigationView.pages().detach();
  navigationView.append(
    <ContactPage />
  );
}

/**
 * Opens the Account Details page
 * 
 * detach() is called to prevent the 'hamburger menu'
 *   from being replaced by a back button titled
 *   'Spokinetic'
 */
function openAccountPage() {
  const navigationView = $(NavigationView).only();
  navigationView.pages().detach();
  navigationView.append(
    <AccountPage />
  );
}

/**
 * Updates view to show days/events as a list
 */
function toMonthView() {
  const navigationView = $(NavigationView).only();
  navigationView.pages().detach();
  navigationView.append(
    <CalendarPage />
  );
}

