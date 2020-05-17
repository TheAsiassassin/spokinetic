import {$, CollectionView, contentView, TextView, AlertDialog} from 'tabris';

var yearInt;
var monthInt;
var monthNameString;
var totalMonthDaysInt;
var curDayInt;

// for now this is used to dictate when to create a different section cell for cur day
var sectionCellInt = 0;

var assignedPlaceInt = 0;

getDateInfo();

var eventsObjArray = fillEventArray();


/** @param {tabris.Attributes<TextView>=} attributes */
const SectionCell = attributes =>
  <TextView background='#c4cfde' textColor='white' font='bold 24px' alignment='centerX' {...attributes}/>;


/** @param {tabris.Attributes<TextView>=} attributes */
const SectionCellCurDay = attributes =>
  <TextView background='#d08378' textColor='white' font='bold 24px' alignment='centerX' {...attributes}/>;


  /** @param {tabris.Attributes<TextView>=} attributes */
const YearCell = attributes =>
  <TextView background='white' textColor='red' font='bold 35px' onSwipeRight={onYearSwipeRight} onSwipeLeft={onYearSwipeLeft} alignment='centerX' {...attributes}/>;

/** @param {tabris.Attributes<TextView>=} attributes */
const ItemCell = attributes =>
  <TextView background='white' padding={[2, 5]} font='14px' onTap={onEvent} alignment='left' {...attributes}/>;

const items = createItems();

contentView.append(
  <$>
    <CollectionView stretch
        itemCount={items.length}
        cellType={index => items[index].type}
        cellHeight={(_, type) => type === 'section' ? 48 : 32}
        createCell={createCell}
        updateCell={(cell, index) => cell.text = fillCell(cell, items, index)}       
        onScroll={handleScroll}/>
    <SectionCell stretchX height={48} id='floatingSection' text={items[0].name}/>
  </$>
);

//createCell={type => type === 'section' ? SectionCell() : ItemCell()}
function createCell(type, items, index){
  switch(type){
    case 'section':
    
      if(sectionCellInt >= 0){
        if(sectionCellInt == curDayInt){
          console.log("here");
          sectionCellInt = -30;
          return SectionCellCurDay();
        }
      }
      console.log("here!!");
      sectionCellInt ++;
      return SectionCell();
    case 'year':
      return YearCell();
    default:
      return ItemCell();
  }
}

function fillCell(cell, items, index){

  if(items[index].type =='section'){

    const nameParsedArray = items[index].name.split(" ");
    const dayInt = nameParsedArray[1];

    

    /*if(dayInt == curDayInt){
 
      cell.background = "#d08378";
    }*/

   /* if(items[index].current =='true'){
      cell.background = "#d08378";
    }



    if((index + 1 < items.length) && (items[index + 1].type == 'event')){
        cell.background = '#8095b2';

        cell.textColor = 'black';
    }*/
    return items[index].name;
  }

  else if(items[index].type == 'year'){
    console.log("Year created");
  }

  else{
    return items[index].name + " | " + items[index].time + " | " + items[index].duration;
  }
}


//function updateCell()

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

function onYearSwipeRight(){
  console.log("On Year Swipe right");
  yearInt ++;
}

function onYearSwipeLeft(){
  console.log("On Year Swipe Left");
  yearInt --;
}

function  onEvent(){
  AlertDialog.open(
    <AlertDialog title='Event Page: Coming Soon' message={'This is a place holder to view each event.'}
    buttons={{ok: 'OK'}}/>
  );
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
        //result.push({name: 'Some Event ' + itemCount++, type: 'event'});
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
      duration: '1hr'
    },
    {
      name: 'Concert',
      month: '03',
      day: '4',
      year: '2020',
      time: '9 pm',
      duration: '2hr'
    },
    {
      name: 'Block Party',
      month: '03',
      day: '10',
      year: '2020',
      time: '3 pm',
      duration: '4hr'
    },
    {
      name: 'Neighborhood Cleanup',
      month: '03',
      day: '10',
      year: '2020',
      time: '10 am',
      duration: '2hr'
    },
    {
      name: 'Cooking Club',
      month: '03',
      day: '15',
      year: '2020',
      time: '12 pm',
      duration: '2hr'
    },
    {
      name: 'Paint and Drink',
      month: '03',
      day: '17',
      year: '2020',
      time: '7 pm',
      duration: '1hr 30min'
    },
    {
      name: 'Hot Yoga',
      month: '03',
      day: '20',
      year: '2020',
      time: '9 am',
      duration: '1hr'
    },
    {
      name: 'Normal Yoga',
      month: '03',
      day: '20',
      year: '2020',
      time: '11 am',
      duration: '1hr'
    },
    {
      name: 'Pet Park',
      month: '03',
      day: '20',
      year: '2020',
      time: '10 am',
      duration: 'All Day'
    },
    {
      name: 'Bike the Centenial',
      month: '03',
      day: '25',
      year: '2020',
      time: '8 am',
      duration: 'none'
    },
    {
      name: 'Beer Pong Party',
      month: '03',
      day: '25',
      year: '2020',
      time: '10 pm',
      duration: 'All Night'
    },
    {
      name: 'Neighborhood Cleanup',
      month: '03',
      day: '30',
      year: '2020',
      time: '10 am',
      duration: '4hr'
    },
    {
      name: 'Yard Sale',
      month: '03',
      day: '31',
      year: '2020',
      time: '11 am',
      duration: 'All day'
    },
  ];

  return tempEventsObjArray;
  
}

/*
function createItems() {
  console.log("This is the var monthNameString: ", monthNameString);
  let itemCount = 1;
  /** @type {Array<{name: string, type: 'section' | 'event'}>} 
  const result = [];
  for (let day = 1; day <= totalMonthDaysInt; day++) {
    result.push({name: monthNameString + " " + day, type: 'section'});
    for (let eventCount = 0; eventCount < 5; eventCount++) {
      result.push({name: 'Some Event ' + itemCount++, type: 'event'});
    }
  }
  return result;
}*/




