"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
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
const SectionCell = attributes => JSX.createElement(tabris_1.TextView, Object.assign({ background: '#c4cfde', textColor: 'white', font: 'bold 24px', alignment: 'centerX' }, attributes));
/** @param {tabris.Attributes<TextView>=} attributes */
const SectionCellCurDay = attributes => JSX.createElement(tabris_1.TextView, Object.assign({ background: '#d08378', textColor: 'white', font: 'bold 24px', alignment: 'centerX' }, attributes));
/** @param {tabris.Attributes<TextView>=} attributes */
const YearCell = attributes => JSX.createElement(tabris_1.TextView, Object.assign({ background: 'white', textColor: 'red', font: 'bold 35px', onSwipeRight: onYearSwipeRight, onSwipeLeft: onYearSwipeLeft, alignment: 'centerX' }, attributes));
/** @param {tabris.Attributes<TextView>=} attributes */
const ItemCell = attributes => JSX.createElement(tabris_1.TextView, Object.assign({ background: 'white', padding: [2, 5], font: '14px', onTap: onEvent, alignment: 'left' }, attributes));
const items = createItems();
tabris_1.contentView.append(JSX.createElement(tabris_1.$, null,
    JSX.createElement(tabris_1.CollectionView, { stretch: true, itemCount: items.length, cellType: index => items[index].type, cellHeight: (_, type) => type === 'section' ? 48 : 32, createCell: createCell, updateCell: (cell, index) => cell.text = fillCell(cell, items, index), onScroll: handleScroll }),
    JSX.createElement(SectionCell, { stretchX: true, height: 48, id: 'floatingSection', text: items[0].name })));
//createCell={type => type === 'section' ? SectionCell() : ItemCell()}
function createCell(type, items, index) {
    switch (type) {
        case 'section':
            if (sectionCellInt >= 0) {
                if (sectionCellInt == curDayInt) {
                    console.log("here");
                    sectionCellInt = -30;
                    return SectionCellCurDay();
                }
            }
            console.log("here!!");
            sectionCellInt++;
            return SectionCell();
        case 'year':
            return YearCell();
        default:
            return ItemCell();
    }
}
function fillCell(cell, items, index) {
    if (items[index].type == 'section') {
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
    else if (items[index].type == 'year') {
        console.log("Year created");
    }
    else {
        return items[index].name + " | " + items[index].time + " | " + items[index].duration;
    }
}
//function updateCell()
/** @param {tabris.CollectionViewScrollEvent<CollectionView<TextView>>} ev */
function handleScroll({ target }) {
    const splitIndex = target.firstVisibleIndex + 1;
    const currentSection = items.slice(0, splitIndex).filter(item => item.type === 'section').pop();
    const nextSection = items.slice(splitIndex).filter(item => item.type === 'section')[0];
    const nextSectionCell = target.cellByItemIndex(items.indexOf(nextSection));
    const bounds = nextSectionCell ? nextSectionCell.absoluteBounds : null;
    tabris_1.$('#floatingSection').only(SectionCell).set({
        text: currentSection ? currentSection.name : items[0].name,
        transform: bounds ? { translationY: Math.min(bounds.top - bounds.height, 0) } : {}
    });
}
function onYearSwipeRight() {
    console.log("On Year Swipe right");
    yearInt++;
}
function onYearSwipeLeft() {
    console.log("On Year Swipe Left");
    yearInt--;
}
function onEvent() {
    tabris_1.AlertDialog.open(JSX.createElement(tabris_1.AlertDialog, { title: 'Event Page: Coming Soon', message: 'This is a place holder to view each event.', buttons: { ok: 'OK' } }));
}
function createItems() {
    let itemCount = 1;
    const result = [];
    for (let day = 0; day <= totalMonthDaysInt; day++) {
        if (day == 0) {
            result.push({ name: yearInt + "", type: 'year' });
        }
        else {
            if (day == curDayInt) {
                result.push({ name: monthNameString + " " + day, type: 'section', current: 'true' });
            }
            else {
                result.push({ name: monthNameString + " " + day, type: 'section', current: 'false' });
            }
        }
        for (let curEvent = 0; curEvent < eventsObjArray.length; curEvent++) {
            if (day == eventsObjArray[curEvent].day) {
                //result.push({name: 'Some Event ' + itemCount++, type: 'event'});
                result.push({ name: eventsObjArray[curEvent].name, time: eventsObjArray[curEvent].time,
                    duration: eventsObjArray[curEvent].duration, type: 'event' });
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
function getDateInfo() {
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
function getMonthDays() {
    switch (monthInt) {
        case 2:
            return 29;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
        default:
            return 31;
    }
}
function getMonthName() {
    switch (monthInt) {
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
function fillEventArray() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXJBdHRlbXB0MS1zdGV2ZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY2FsZW5kYXJBdHRlbXB0MS1zdGV2ZW4uanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQTZFO0FBRTdFLElBQUksT0FBTyxDQUFDO0FBQ1osSUFBSSxRQUFRLENBQUM7QUFDYixJQUFJLGVBQWUsQ0FBQztBQUNwQixJQUFJLGlCQUFpQixDQUFDO0FBQ3RCLElBQUksU0FBUyxDQUFDO0FBRWQsc0ZBQXNGO0FBQ3RGLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQztBQUV2QixJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBQztBQUV6QixXQUFXLEVBQUUsQ0FBQztBQUVkLElBQUksY0FBYyxHQUFHLGNBQWMsRUFBRSxDQUFDO0FBR3RDLHVEQUF1RDtBQUN2RCxNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsRUFBRSxDQUMvQixrQkFBQyxpQkFBUSxrQkFBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxTQUFTLEVBQUMsU0FBUyxJQUFLLFVBQVUsRUFBRyxDQUFDO0FBRzFHLHVEQUF1RDtBQUN2RCxNQUFNLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQ3JDLGtCQUFDLGlCQUFRLGtCQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLFNBQVMsRUFBQyxTQUFTLElBQUssVUFBVSxFQUFHLENBQUM7QUFHeEcsdURBQXVEO0FBQ3pELE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQzVCLGtCQUFDLGlCQUFRLGtCQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFF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