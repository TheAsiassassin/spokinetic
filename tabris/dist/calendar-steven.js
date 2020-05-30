"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const index_1 = require("./index");
const calendar_john_1 = require("./calendar-john");
const contact_1 = require("./contact");
const account_1 = require("./account");
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
const SectionCell = attributes => JSX.createElement(tabris_1.TextView, Object.assign({ background: '#c4cfde', textColor: 'white', font: 'bold 24px', alignment: 'centerX', onSwipeRight: swipeRight, onSwipeLeft: swipeLeft }, attributes));
/** @param {tabris.Attributes<TextView>=} attributes */
const YearCell = attributes => JSX.createElement(tabris_1.TextView, Object.assign({ background: '#d08378', textColor: 'red', font: 'bold 35px', onSwipeRight: onYearSwipeRight, onSwipeLeft: onYearSwipeLeft, alignment: 'centerX' }, attributes));
/** @param {tabris.Attributes<TextView>=} attributes */
const ItemCell = attributes => JSX.createElement(tabris_1.TextView, Object.assign({ background: 'white', padding: [2, 5], font: '14px', onTap: onEvent, alignment: 'left' }, attributes));
const items = createItems();
class ListCalendarPage extends tabris_1.Page {
    constructor(properties) {
        super();
        this.set(Object.assign({ title: 'Calendar' }, properties)).append(JSX.createElement(tabris_1.TabFolder, { paging: true, stretch: true, selectionIndex: 1, tabBarLocation: 'bottom' },
            JSX.createElement(tabris_1.Tab, { title: 'Events', id: 'events', onSelect: () => openMainPage() }),
            JSX.createElement(tabris_1.Tab, { title: 'Calendar' }),
            JSX.createElement(tabris_1.Tab, { title: 'Contact Us', onSelect: () => openContactPage() }),
            JSX.createElement(tabris_1.Tab, { title: 'My Account', onSelect: () => openAccountPage() })));
        this.append(JSX.createElement(tabris_1.CollectionView, { stretchX: true, bottom: 100, top: true, id: 'collection', itemCount: items.length, cellType: index => items[index].type, cellHeight: (_, type) => type === 'section' ? 48 : 32, createCell: createCell, updateCell: (cell, index) => cell.text = fillCell(cell, items, index), onScroll: handleScroll }));
        this.append(JSX.createElement(SectionCell, { stretchX: true, height: 48, id: 'floatingSection', text: items[0].name }));
        this.append(JSX.createElement(tabris_1.Composite, { bottom: true, bottom: 60, centerX: true },
            JSX.createElement(tabris_1.TextView, { left: true, centerY: true, text: 'Month View' }),
            JSX.createElement(tabris_1.Switch, { left: 'prev() 8', checked: true, onSelect: () => toMonthView() }),
            JSX.createElement(tabris_1.TextView, { left: 'prev() 8', centerY: true, text: 'List View' })));
    }
}
exports.ListCalendarPage = ListCalendarPage;
//const pageRef = $(Page).only();  
function swipeRight() {
    console.log("Right swipe Working");
    tabris_1.$(tabris_1.CollectionView).only('#collection').updateCell;
}
function swipeLeft() {
    console.log("Left Swipe Working");
}
function onYearSwipeLeft() {
    console.log("On Year Swipe Left");
    monthInt = 1;
    yearInt--;
    //pageRef.find('#collection').first(CollectionView).updateCell;
}
function onYearSwipeRight() {
    // create a method to update all dates and everything associated with it to show new display
    console.log("On Year Swipe right");
    monthInt = 1;
    yearInt++;
    //pageRef.find('#collection').first(CollectionView).updateCell;
}
function onEvent() {
    tabris_1.AlertDialog.open(JSX.createElement(tabris_1.AlertDialog, { title: 'Event Page: Coming Soon', message: 'This is a place holder to view each event.', buttons: { ok: 'OK' } }));
}
function onHome() {
    tabris_1.$(tabris_1.TextView).only('#initText').text = 'Home Pressed';
}
//createCell={type => type === 'section' ? SectionCell() : ItemCell()}
//set key value pairs with each event cell in order to pull info from later
function createCell(type) {
    switch (type) {
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
function fillCell(cell, items, index) {
    console.log("Worked " + yearInt);
    yearInt++;
    if (items[index].type == 'year') {
        return yearInt;
    }
    if (items[index].type == 'section') {
        const nameParsedArray = items[index].name.split(" ");
        const dayInt = nameParsedArray[1];
        return items[index].name;
    }
    else {
        return items[index].name + " | " + items[index].time + " | " + items[index].duration;
    }
}
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
    const navigationView = tabris_1.$(tabris_1.NavigationView).only();
    navigationView.pages().detach();
    navigationView.append(JSX.createElement(index_1.MainPage, null));
}
/**
 * Opens the Contact Us page
 *
 * detach() is called to prevent the 'hamburger menu'
 *   from being replaced by a back button titled
 *   'Spokinetic'
 */
function openContactPage() {
    const navigationView = tabris_1.$(tabris_1.NavigationView).only();
    navigationView.pages().detach();
    navigationView.append(JSX.createElement(contact_1.ContactPage, null));
}
/**
 * Opens the Account Details page
 *
 * detach() is called to prevent the 'hamburger menu'
 *   from being replaced by a back button titled
 *   'Spokinetic'
 */
function openAccountPage() {
    const navigationView = tabris_1.$(tabris_1.NavigationView).only();
    navigationView.pages().detach();
    navigationView.append(JSX.createElement(account_1.AccountPage, null));
}
/**
 * Updates view to show days/events as a list
 */
function toMonthView() {
    const navigationView = tabris_1.$(tabris_1.NavigationView).only();
    navigationView.pages().detach();
    navigationView.append(JSX.createElement(calendar_john_1.CalendarPage, null));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItc3RldmVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NhbGVuZGFyLXN0ZXZlbi5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBb0o7QUFDcEosbUNBQWlDO0FBQ2pDLG1EQUE2QztBQUM3Qyx1Q0FBc0M7QUFDdEMsdUNBQXNDO0FBR3RDLElBQUksUUFBUSxHQUFHLHFCQUFxQixDQUFDO0FBRXJDLElBQUksT0FBTyxDQUFDO0FBQ1osSUFBSSxRQUFRLENBQUM7QUFDYixJQUFJLGVBQWUsQ0FBQztBQUNwQixJQUFJLGlCQUFpQixDQUFDO0FBQ3RCLElBQUksU0FBUyxDQUFDO0FBRWQsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO0FBRXZCLFdBQVcsRUFBRSxDQUFDO0FBRWQsSUFBSSxjQUFjLEdBQUcsY0FBYyxFQUFFLENBQUM7QUFFdEMsdURBQXVEO0FBQ3ZELE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQy9CLGtCQUFDLGlCQUFRLGtCQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFDOUcsV0FBVyxFQUFFLFNBQVMsSUFBTSxVQUFVLEVBQUcsQ0FBQztBQUUxQyx1REFBdUQ7QUFDekQsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FDNUIsa0JBQUMsaUJBQVEsa0JBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFDLFNBQVMsSUFBSyxVQUFVLEVBQUcsQ0FBQztBQUV0Syx1REFBdUQ7QUFDdkQsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FDNUIsa0JBQUMsaUJBQVEsa0JBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBQyxNQUFNLElBQUssVUFBVSxFQUFHLENBQUM7QUFFL0csTUFBTSxLQUFLLEdBQUcsV0FBVyxFQUFFLENBQUM7QUFFNUIsTUFBYSxnQkFBaUIsU0FBUSxhQUFJO0lBQ3hDLFlBQVksVUFBVTtRQUNwQixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxHQUFHLGlCQUFFLEtBQUssRUFBRSxVQUFVLElBQUssVUFBVSxFQUFFLENBQUMsTUFBTSxDQUNqRCxrQkFBQyxrQkFBUyxJQUFDLE1BQU0sUUFBQyxPQUFPLFFBQUMsY0FBYyxFQUFFLENBQUMsRUFBRSxjQUFjLEVBQUMsUUFBUTtZQUVsRSxrQkFBQyxZQUFHLElBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FDeEQ7WUFFTixrQkFBQyxZQUFHLElBQUMsS0FBSyxFQUFDLFVBQVUsR0FDZjtZQUVOLGtCQUFDLFlBQUcsSUFBQyxLQUFLLEVBQUMsWUFBWSxFQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FDbkQ7WUFFTixrQkFBQyxZQUFHLElBQUMsS0FBSyxFQUFDLFlBQVksRUFBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQ25ELENBRUksQ0FDYixDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FDVCxrQkFBQyx1QkFBYyxJQUFDLFFBQVEsUUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsUUFDdkMsRUFBRSxFQUFDLFlBQVksRUFDZixTQUFTLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFDdkIsUUFBUSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFDcEMsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQ3JELFVBQVUsRUFBRSxVQUFVLEVBQ3RCLFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQ3JFLFFBQVEsRUFBRSxZQUFZLEdBQ3RCLENBQ0gsQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQ1Qsa0JBQUMsV0FBVyxJQUFDLFFBQVEsUUFBQyxNQUFNLEVBQUUsRUFBRSxFQUM5QixFQUFFLEVBQUMsaUJBQWlCLEVBQ3BCLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQ3pCLENBQUM7UUFDRixJQUFJLENBQUMsTUFBTSxDQUNULGtCQUFDLGtCQUFTLElBQUMsTUFBTSxRQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsT0FBTztZQUNuQyxrQkFBQyxpQkFBUSxJQUFDLElBQUksUUFBQyxPQUFPLFFBQUMsSUFBSSxFQUFDLFlBQVksR0FBRTtZQUMxQyxrQkFBQyxlQUFNLElBQUMsSUFBSSxFQUFDLFVBQVUsRUFBQyxPQUFPLFFBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxHQUFHO1lBQ2hFLGtCQUFDLGlCQUFRLElBQUMsSUFBSSxFQUFDLFVBQVUsRUFBQyxPQUFPLFFBQUMsSUFBSSxFQUFDLFdBQVcsR0FBRSxDQUMxQyxDQUNiLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUE1Q0QsNENBNENDO0FBRUQsbUNBQW1DO0FBR25DLFNBQVMsVUFBVTtJQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDbkMsVUFBQyxDQUFDLHVCQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsVUFBVSxDQUFDO0FBQ25ELENBQUM7QUFFRCxTQUFTLFNBQVM7SUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFFRCxTQUFTLGVBQWU7SUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ2xDLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFDYixPQUFPLEVBQUcsQ0FBQztJQUNYLCtEQUErRDtBQUNqRSxDQUFDO0FBRUQsU0FBUyxnQkFBZ0I7SUFDdkIsNEZBQTRGO0lBQzVGLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUNuQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBQ2IsT0FBTyxFQUFHLENBQUM7SUFDWCwrREFBK0Q7QUFDakUsQ0FBQztBQUVELFNBQVUsT0FBTztJQUNmLG9CQUFXLENBQUMsSUFBSSxDQUNkLGtCQUFDLG9CQUFXLElBQUMsS0FBSyxFQUFDLHlCQUF5QixFQUFDLE9BQU8sRUFBRSw0Q0FBNEMsRUFDbEcsT0FBTyxFQUFFLEVBQUMsRUFBRSxFQUFFLElBQUksRUFBQyxHQUFHLENBQ3ZCLENBQUM7QUFDSixDQUFDO0FBRUQsU0FBUyxNQUFNO0lBQ2IsVUFBQyxDQUFDLGlCQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQztBQUN0RCxDQUFDO0FBQ0Qsc0VBQXNFO0FBRXRFLDJFQUEyRTtBQUMzRSxTQUFTLFVBQVUsQ0FBQyxJQUFJO0lBQ3RCLFFBQU8sSUFBSSxFQUFDO1FBQ1YsS0FBSyxNQUFNO1lBQ1QsT0FBTyxRQUFRLEVBQUUsQ0FBQztRQUNwQixLQUFLLFNBQVM7WUFDWixPQUFPLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCO1lBQ0UsT0FBTyxRQUFRLEVBQUUsQ0FBQztLQUNyQjtJQUNELHFFQUFxRTtJQUNyRSwyRUFBMkU7SUFDM0Usb0ZBQW9GO0FBRXRGLENBQUM7QUFFRCxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUs7SUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLENBQUM7SUFDakMsT0FBTyxFQUFHLENBQUM7SUFDWCxJQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLElBQUcsTUFBTSxFQUFDO1FBQzVCLE9BQU8sT0FBTyxDQUFDO0tBQ2hCO0lBQ0QsSUFBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFHLFNBQVMsRUFBQztRQUUvQixNQUFNLGVBQWUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyRCxNQUFNLE1BQU0sR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDO0tBQzFCO1NBQ0c7UUFDRixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUM7S0FDdEY7QUFDSCxDQUFDO0FBRUQsNkVBQTZFO0FBQzdFLFNBQVMsWUFBWSxDQUFDLEVBQUMsTUFBTSxFQUFDO0lBRTVCLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUM7SUFDaEQsTUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNoRyxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkYsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDM0UsTUFBTSxNQUFNLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDdkUsVUFBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUMxQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtRQUMxRCxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0tBQ2pGLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFTLFdBQVc7SUFFbEIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNsQixLQUFLLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksaUJBQWlCLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDakQsSUFBRyxHQUFHLElBQUksQ0FBQyxFQUFDO1lBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1NBQ2pEO2FBQ0c7WUFFRixJQUFHLEdBQUcsSUFBSSxTQUFTLEVBQUM7Z0JBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsZUFBZSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQzthQUNwRjtpQkFDRztnQkFDRixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLGVBQWUsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7YUFDckY7U0FDRjtRQUNELEtBQUksSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFLFFBQVEsR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRyxFQUFDO1lBQ2xFLElBQUcsR0FBRyxJQUFJLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUM7Z0JBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUk7b0JBQ25GLFFBQVEsRUFBRSxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO2FBQ2hFO1NBQ0Y7S0FDRjtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBUyxXQUFXO0lBQ2xCLElBQUksY0FBYyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFFaEMsT0FBTyxHQUFHLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QyxRQUFRLEdBQUcsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3JDLGlCQUFpQixHQUFHLFlBQVksRUFBRSxDQUFDO0lBQ25DLGVBQWUsR0FBRyxZQUFZLEVBQUUsQ0FBQztJQUNqQyxTQUFTLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3RDLENBQUM7QUFDRDs7O0dBR0c7QUFDSCxTQUFTLFlBQVk7SUFFbkIsUUFBTyxRQUFRLEVBQUM7UUFDZCxLQUFLLENBQUM7WUFDSixPQUFPLEVBQUUsQ0FBQztRQUNaLEtBQUssQ0FBQyxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQztRQUFDLEtBQUssRUFBRTtZQUM3QixPQUFPLEVBQUUsQ0FBQztRQUNaO1lBQ0UsT0FBTyxFQUFFLENBQUM7S0FDYjtBQUNILENBQUM7QUFFRCxTQUFTLFlBQVk7SUFDbkIsUUFBTyxRQUFRLEVBQUM7UUFDZCxLQUFLLENBQUM7WUFDSixPQUFPLFNBQVMsQ0FBQztZQUNqQixNQUFNO1FBQ1IsS0FBSyxDQUFDO1lBQ0osT0FBTyxTQUFTLENBQUM7WUFDakIsTUFBTTtRQUNSLEtBQUssQ0FBQztZQUNKLE9BQU8sT0FBTyxDQUFDO1lBQ2YsTUFBTTtRQUNSLEtBQUssQ0FBQztZQUNKLE9BQU8sT0FBTyxDQUFDO1lBQ2YsTUFBTTtRQUNSLEtBQUssQ0FBQztZQUNKLE9BQU8sS0FBSyxDQUFDO1lBQ2IsTUFBTTtRQUNSLEtBQUssQ0FBQztZQUNKLE9BQU8sTUFBTSxDQUFDO1lBQ2QsTUFBTTtRQUNSLEtBQUssQ0FBQztZQUNKLE9BQU8sTUFBTSxDQUFDO1lBQ2QsTUFBTTtRQUNSLEtBQUssQ0FBQztZQUNKLE9BQU8sUUFBUSxDQUFDO1lBQ2hCLE1BQU07UUFDUixLQUFLLENBQUM7WUFDSixPQUFPLFdBQVcsQ0FBQztZQUNuQixNQUFNO1FBQ1IsS0FBSyxFQUFFO1lBQ0wsT0FBTyxTQUFTLENBQUM7WUFDakIsTUFBTTtRQUNSLEtBQUssRUFBRTtZQUNMLE9BQU8sVUFBVSxDQUFDO1lBQ2xCLE1BQU07UUFDUixLQUFLLEVBQUU7WUFDTCxPQUFPLFVBQVUsQ0FBQztZQUNsQixNQUFNO0tBQ1Q7QUFDSCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQVMsY0FBYztJQUVyQixxREFBcUQ7SUFFckQsTUFBTSxrQkFBa0IsR0FBRztRQUN6QjtZQUNFLElBQUksRUFBRSxTQUFTO1lBQ2YsS0FBSyxFQUFFLElBQUk7WUFDWCxHQUFHLEVBQUUsR0FBRztZQUNSLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLE1BQU07WUFDWixRQUFRLEVBQUUsS0FBSztZQUNmLFdBQVcsRUFBRSxXQUFXO1lBQ3hCLEdBQUcsRUFBRSxHQUFHO1NBQ1Q7UUFDRDtZQUNFLElBQUksRUFBRSxTQUFTO1lBQ2YsS0FBSyxFQUFFLElBQUk7WUFDWCxHQUFHLEVBQUUsR0FBRztZQUNSLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLE1BQU07WUFDWixRQUFRLEVBQUUsS0FBSztZQUNmLFdBQVcsRUFBRSxXQUFXO1lBQ3hCLEdBQUcsRUFBRSxHQUFHO1NBQ1Q7UUFDRDtZQUNFLElBQUksRUFBRSxhQUFhO1lBQ25CLEtBQUssRUFBRSxJQUFJO1lBQ1gsR0FBRyxFQUFFLElBQUk7WUFDVCxJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxNQUFNO1lBQ1osUUFBUSxFQUFFLEtBQUs7WUFDZixXQUFXLEVBQUUsV0FBVztZQUN4QixHQUFHLEVBQUUsR0FBRztTQUNUO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsc0JBQXNCO1lBQzVCLEtBQUssRUFBRSxJQUFJO1lBQ1gsR0FBRyxFQUFFLElBQUk7WUFDVCxJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxPQUFPO1lBQ2IsUUFBUSxFQUFFLEtBQUs7WUFDZixXQUFXLEVBQUUsV0FBVztZQUN4QixHQUFHLEVBQUUsR0FBRztTQUNUO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsY0FBYztZQUNwQixLQUFLLEVBQUUsSUFBSTtZQUNYLEdBQUcsRUFBRSxJQUFJO1lBQ1QsSUFBSSxFQUFFLE1BQU07WUFDWixJQUFJLEVBQUUsT0FBTztZQUNiLFFBQVEsRUFBRSxLQUFLO1lBQ2YsV0FBVyxFQUFFLFdBQVc7WUFDeEIsR0FBRyxFQUFFLEdBQUc7U0FDVDtRQUNEO1lBQ0UsSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixLQUFLLEVBQUUsSUFBSTtZQUNYLEdBQUcsRUFBRSxJQUFJO1lBQ1QsSUFBSSxFQUFFLE1BQU07WUFDWixJQUFJLEVBQUUsTUFBTTtZQUNaLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFdBQVcsRUFBRSxXQUFXO1lBQ3hCLEdBQUcsRUFBRSxHQUFHO1NBQ1Q7UUFDRDtZQUNFLElBQUksRUFBRSxVQUFVO1lBQ2hCLEtBQUssRUFBRSxJQUFJO1lBQ1gsR0FBRyxFQUFFLElBQUk7WUFDVCxJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxNQUFNO1lBQ1osUUFBUSxFQUFFLEtBQUs7WUFDZixXQUFXLEVBQUUsV0FBVztZQUN4QixHQUFHLEVBQUUsR0FBRztTQUNUO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsYUFBYTtZQUNuQixLQUFLLEVBQUUsSUFBSTtZQUNYLEdBQUcsRUFBRSxJQUFJO1lBQ1QsSUFBSSxFQUFFLE1BQU07WUFDWixJQUFJLEVBQUUsT0FBTztZQUNiLFFBQVEsRUFBRSxLQUFLO1lBQ2YsV0FBVyxFQUFFLFdBQVc7WUFDeEIsR0FBRyxFQUFFLEdBQUc7U0FDVDtRQUNEO1lBQ0UsSUFBSSxFQUFFLFVBQVU7WUFDaEIsS0FBSyxFQUFFLElBQUk7WUFDWCxHQUFHLEVBQUUsSUFBSTtZQUNULElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLE9BQU87WUFDYixRQUFRLEVBQUUsU0FBUztZQUNuQixXQUFXLEVBQUUsV0FBVztZQUN4QixHQUFHLEVBQUUsR0FBRztTQUNUO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsb0JBQW9CO1lBQzFCLEtBQUssRUFBRSxJQUFJO1lBQ1gsR0FBRyxFQUFFLElBQUk7WUFDVCxJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxNQUFNO1lBQ1osUUFBUSxFQUFFLE1BQU07WUFDaEIsV0FBVyxFQUFFLFdBQVc7WUFDeEIsR0FBRyxFQUFFLEdBQUc7U0FDVDtRQUNEO1lBQ0UsSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixLQUFLLEVBQUUsSUFBSTtZQUNYLEdBQUcsRUFBRSxJQUFJO1lBQ1QsSUFBSSxFQUFFLE1BQU07WUFDWixJQUFJLEVBQUUsT0FBTztZQUNiLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFdBQVcsRUFBRSxXQUFXO1lBQ3hCLEdBQUcsRUFBRSxHQUFHO1NBQ1Q7UUFDRDtZQUNFLElBQUksRUFBRSxzQkFBc0I7WUFDNUIsS0FBSyxFQUFFLElBQUk7WUFDWCxHQUFHLEVBQUUsSUFBSTtZQUNULElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLE9BQU87WUFDYixRQUFRLEVBQUUsS0FBSztZQUNmLFdBQVcsRUFBRSxXQUFXO1lBQ3hCLEdBQUcsRUFBRSxHQUFHO1NBQ1Q7UUFDRDtZQUNFLElBQUksRUFBRSxXQUFXO1lBQ2pCLEtBQUssRUFBRSxJQUFJO1lBQ1gsR0FBRyxFQUFFLElBQUk7WUFDVCxJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxPQUFPO1lBQ2IsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLFdBQVc7WUFDeEIsR0FBRyxFQUFFLEdBQUc7U0FDVDtLQUNGLENBQUM7SUFFRixPQUFPLGtCQUFrQixDQUFDO0FBRTVCLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxTQUFTLFlBQVk7SUFDbkIsTUFBTSxjQUFjLEdBQUcsVUFBQyxDQUFDLHVCQUFjLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoRCxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEMsY0FBYyxDQUFDLE1BQU0sQ0FDbkIsa0JBQUMsZ0JBQVEsT0FBRyxDQUNiLENBQUM7QUFDSixDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsU0FBUyxlQUFlO0lBQ3RCLE1BQU0sY0FBYyxHQUFHLFVBQUMsQ0FBQyx1QkFBYyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEQsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hDLGNBQWMsQ0FBQyxNQUFNLENBQ25CLGtCQUFDLHFCQUFXLE9BQUcsQ0FDaEIsQ0FBQztBQUNKLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxTQUFTLGVBQWU7SUFDdEIsTUFBTSxjQUFjLEdBQUcsVUFBQyxDQUFDLHVCQUFjLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoRCxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEMsY0FBYyxDQUFDLE1BQU0sQ0FDbkIsa0JBQUMscUJBQVcsT0FBRyxDQUNoQixDQUFDO0FBQ0osQ0FBQztBQUVEOztHQUVHO0FBQ0gsU0FBUyxXQUFXO0lBQ2xCLE1BQU0sY0FBYyxHQUFHLFVBQUMsQ0FBQyx1QkFBYyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEQsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hDLGNBQWMsQ0FBQyxNQUFNLENBQ25CLGtCQUFDLDRCQUFZLE9BQUcsQ0FDakIsQ0FBQztBQUNKLENBQUMifQ==