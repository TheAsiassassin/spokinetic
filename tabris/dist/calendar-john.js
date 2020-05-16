"use strict";
/**
 * Calendar Page
 *
 * TODO:
 *   Connect to DB for event information
 *   Consider alternative approaches to make month view updates snappier
 *     Perhaps it's simply a consequence of emulation/stream to dev app?
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const index_1 = require("./index");
const account_1 = require("./account");
const contact_1 = require("./contact");
const eventPage_1 = require("./eventPage");
var popover;
var firstLoadIn = true;
// Array to name months based on the value returned by date.getMonth()
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// Array to name days of the week based on the value returned by date.getDay()
//const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var date = new Date();
var month = date.getMonth();
var viewMonth = month;
var day = date.getDate();
var year = date.getFullYear();
var viewYear = year;
var firstDayOfMonth = new Date(year, month, 1).getDay();
var items = createItems(year, month);
//const events = createEvents();
/**
 * Create an array determining which days have events
 *
 * Temporary solution for testing purposes
 * Will require connection to DB to check for events
 */
var hasEvents = [];
for (var i = 0; i < 31; i++) {
    if (Math.floor(Math.random() * 10) % 3 === 0)
        hasEvents.push(true);
    else
        hasEvents.push(false);
}
/**
 * Creates a Page object to allow use throughout the project
 *
 * Most useful for connecting pages in the app
 */
class CalendarPage extends tabris_1.Page {
    constructor(properties) {
        super();
        this.set(Object.assign({ title: 'Calendar' }, properties)).append(JSX.createElement(tabris_1.TabFolder, { paging: true, stretch: true, selectionIndex: 1, tabBarLocation: 'bottom' },
            JSX.createElement(tabris_1.Tab, { title: 'Events', id: 'events', onSelect: () => openMainPage() }),
            JSX.createElement(tabris_1.Tab, { title: 'Calendar' }),
            JSX.createElement(tabris_1.Tab, { title: 'Contact Us', onSelect: () => openContactPage() }),
            JSX.createElement(tabris_1.Tab, { title: 'My Account', onSelect: () => openAccountPage() })));
        this.append(JSX.createElement(tabris_1.TabFolder, { id: 'view-month', paging: true, selectionIndex: viewMonth + 1, stretchX: true, height: 100, background: '#234', tabBarLocation: 'hidden', onSelectionIndexChanged: () => updateCalendar() },
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.TextView, { text: months[11], textColor: 'white', font: 'bold 36px', center: true })),
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.TextView, { text: months[0], textColor: 'white', font: 'bold 36px', center: true })),
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.TextView, { text: months[1], textColor: 'white', font: 'bold 36px', center: true })),
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.TextView, { text: months[2], textColor: 'white', font: 'bold 36px', center: true })),
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.TextView, { text: months[3], textColor: 'white', font: 'bold 36px', center: true })),
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.TextView, { text: months[4], textColor: 'white', font: 'bold 36px', center: true })),
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.TextView, { text: months[5], textColor: 'white', font: 'bold 36px', center: true })),
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.TextView, { text: months[6], textColor: 'white', font: 'bold 36px', center: true })),
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.TextView, { text: months[7], textColor: 'white', font: 'bold 36px', center: true })),
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.TextView, { text: months[8], textColor: 'white', font: 'bold 36px', center: true })),
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.TextView, { text: months[9], textColor: 'white', font: 'bold 36px', center: true })),
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.TextView, { text: months[10], textColor: 'white', font: 'bold 36px', center: true })),
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.TextView, { text: months[11], textColor: 'white', font: 'bold 36px', center: true })),
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.TextView, { text: months[0], textColor: 'white', font: 'bold 36px', center: true }))));
        this.append(JSX.createElement(tabris_1.CollectionView, { id: 'calendar', stretchX: true, top: 'prev()', bottom: 35, padding: 12, columnCount: 7, cellHeight: 50, itemCount: items.length, createCell: createCell, updateCell: updateCell }));
        this.append(JSX.createElement(tabris_1.Button, { height: 100, text: '\u27E8', textColor: 'white', font: 'bold 36px', background: '#234', left: true, highlightOnTouch: true, onTap: () => prevMonth() }));
        this.append(JSX.createElement(tabris_1.Button, { height: 100, text: '\u27E9', textColor: 'white', font: 'bold 36px', background: '#234', right: true, highlightOnTouch: true, onTap: () => nextMonth() }));
    }
}
exports.CalendarPage = CalendarPage;
/**
 * Updates calendar view to display selected month
 */
function updateCalendar() {
    if (!firstLoadIn) {
        const tabFolder = $(tabris_1.TabFolder).only('#view-month');
        if (tabFolder.selectionIndex === 0) {
            viewMonth = 11;
            viewYear--;
            firstLoadIn = true;
            const navigationView = $(tabris_1.NavigationView).only();
            navigationView.pages().detach();
            navigationView.append(JSX.createElement(CalendarPage, null));
        }
        else if (tabFolder.selectionIndex === 13) {
            viewMonth = 0;
            viewYear++;
            firstLoadIn = true;
            const navigationView = $(tabris_1.NavigationView).only();
            navigationView.pages().detach();
            navigationView.append(JSX.createElement(CalendarPage, null));
        }
        items = createItems(viewYear, $(tabris_1.TabFolder).only('#view-month').selectionIndex - 1);
        $(tabris_1.CollectionView).only('#calendar').detach();
        $(tabris_1.Page).only().append(JSX.createElement(tabris_1.CollectionView, { id: 'calendar', stretchX: true, top: 'prev()', bottom: 35, padding: 12, columnCount: 7, cellHeight: 50, itemCount: items.length, createCell: createCell, updateCell: updateCell }));
    }
    else
        firstLoadIn = false;
}
/**
 * Create CollectionView cell, set formatting
 */
function createCell() {
    return (JSX.createElement(tabris_1.Button, { font: 'bold 15px', textColor: '#234', style: 'outline', strokeColor: 'transparent', highlightOnTouch: true, onTap: ev => showEvents($(tabris_1.CollectionView).only().itemIndex(ev.target)) }));
}
/**
 * Populate CollectionView cell with data
 *
 * @param {Button} cell
 * @param {number} index
 */
function updateCell(cell, index) {
    cell.text = `${items[index]}`;
    if (items[index] === ' ')
        cell.highlightOnTouch = false;
    if ($(tabris_1.TabFolder).only('#view-month').selectionIndex === month + 1 && items[index] === day && viewYear === year) {
        cell.background = '#79a6e1';
        cell.textColor = '#ffffff';
    }
    if (hasEvents[index] && items[index] !== ' ')
        cell.strokeColor = '#77c666';
    else
        cell.strokeColor = 'transparent';
}
/**
 * Create array to represent days of the month
 *
 * First for loop is used to create indexes with
 *   no real data to start the month on the
 *   correct day of the week
 *
 * TODO
 *   Refactor first day alignment to not rely on
 *     data-less indexes, if possible
 */
function createItems(year, month) {
    const result = [];
    var firstDay = new Date(year, month, 1).getDay();
    var numDays = new Date(year, month + 1, 0).getDate();
    for (let i = 0; i < firstDay; i++) {
        result.push(' ');
    }
    for (let i = 1; i <= numDays; i++) {
        result.push(i);
    }
    return result;
}
/**
 * Opens the Main/Events page
 *
 * detach() is called to prevent the 'hamburger menu'
 *   from being replaced by a back button titled
 *   'Spokinetic'
 */
function openMainPage() {
    viewMonth = month;
    viewYear = year;
    $(tabris_1.TabFolder).only('#view-month').selectionIndex = viewMonth + 1;
    updateCalendar();
    firstLoadIn = true;
    const navigationView = $(tabris_1.NavigationView).only();
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
    viewMonth = month;
    viewYear = year;
    $(tabris_1.TabFolder).only('#view-month').selectionIndex = viewMonth + 1;
    updateCalendar();
    firstLoadIn = true;
    const navigationView = $(tabris_1.NavigationView).only();
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
    viewMonth = month;
    viewYear = year;
    $(tabris_1.TabFolder).only('#view-month').selectionIndex = viewMonth + 1;
    updateCalendar();
    firstLoadIn = true;
    const navigationView = $(tabris_1.NavigationView).only();
    navigationView.pages().detach();
    navigationView.append(JSX.createElement(account_1.AccountPage, null));
}
/**
 * Updates selection index to previous month
 */
function prevMonth() {
    $(tabris_1.TabFolder).only('#view-month').selectionIndex--;
}
/**
 * Updates selection index to next month
 */
function nextMonth() {
    $(tabris_1.TabFolder).only('#view-month').selectionIndex++;
}
/**
 * Displays Popover to show list of events
 *
 * @param {number} index
 */
function showEvents(index) {
    if (index >= firstDayOfMonth) {
        const events = createEvents(index);
        popover = tabris_1.Popover.open(JSX.createElement(tabris_1.Popover, null,
            JSX.createElement(tabris_1.NavigationView, { stretch: true, toolbarVisible: false },
                JSX.createElement(tabris_1.Page, null,
                    JSX.createElement(tabris_1.CollectionView, { stretch: true, itemCount: events.length, cellType: index => events[index].type, cellHeight: (_, type) => type === 'section' ? 48 : 32, createCell: type => type === 'section' ? SectionCell() : ItemCell(), updateCell: (cell, index) => cell.text = events[index].name, onScroll: handleScroll }),
                    JSX.createElement(SectionCell, { stretchX: true, height: 48, id: 'floatingSection', text: events[0].name, onTap: () => toCalendar(popover) })))));
    }
}
/** @param {tabris.Attributes<TextView>=} attributes */
const SectionCell = attributes => JSX.createElement(tabris_1.TextView, Object.assign({ background: '#79a6e1', textColor: 'white', font: 'bold 24px', alignment: 'centerX' }, attributes));
/** @param {tabris.Attributes<TextView>=} attributes */
const ItemCell = attributes => JSX.createElement(tabris_1.TextView, Object.assign({ padding: [2, 5], font: '14px', alignment: 'left', highlightOnTouch: true, onTap: () => toEvents(popover) }, attributes));
/** @param {tabris.CollectionViewScrollEvent<CollectionView<TextView>>} ev */
function handleScroll({ target }) {
    const splitIndex = target.firstVisibleIndex + 1;
    const currentSection = events.slice(0, splitIndex).filter(item => item.type === 'section').pop();
    const nextSection = events.slice(splitIndex).filter(item => item.type === 'section')[0];
    const nextSectionCell = target.cellByItemIndex(events.indexOf(nextSection));
    const bounds = nextSectionCell ? nextSectionCell.absoluteBounds : null;
    /*$('#floatingSection').only(SectionCell).set({
      text: currentSection ? currentSection.name : events[0].name,
      transform: bounds ? {translationY: Math.min(bounds.top - bounds.height, 0)} : {}
    });*/
}
/**
 * Creates array of events to display in Popover
 *
 * @param {number} index
 */
function createEvents(index) {
    let itemCount = 1;
    /** @type {Array<{name: string, type: 'section' | 'item'}>} */
    const result = [];
    result.push({ name: ($(tabris_1.TabFolder).only('#view-month').selectionIndex) + '/' + items[index] + '/' + viewYear, type: 'section' });
    for (let j = 1; j <= 2; j++) {
        if (j === 1)
            result.push({ name: 'My Events', type: 'section' });
        else
            result.push({ name: 'Other Events', type: 'section' });
        for (let i = 0; i < 5; i++) {
            result.push({ name: 'Event ' + itemCount++, type: 'item' });
        }
    }
    return result;
}
/**
 * Closes Popover to return to Calendar
 *
 * @param {Popover} popover
 */
function toCalendar(popover) {
    popover.close();
}
/**
 * Closes Popover to show event details
 *
 * @param {Popover} popover
 */
function toEvents(popover) {
    popover.close();
    $(tabris_1.NavigationView).only().append(JSX.createElement(eventPage_1.EventPage, null));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItam9obi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jYWxlbmRhci1qb2huLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7R0FPRzs7QUFFSCxtQ0FBdUc7QUFDdkcsbUNBQWlDO0FBQ2pDLHVDQUFzQztBQUN0Qyx1Q0FBc0M7QUFDdEMsMkNBQXNDO0FBRXRDLElBQUksT0FBTyxDQUFDO0FBQ1osSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBRXZCLHNFQUFzRTtBQUN0RSxNQUFNLE1BQU0sR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFFMUksOEVBQThFO0FBQzlFLDhGQUE4RjtBQUU5RixJQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0FBQ3RCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUM1QixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDdEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3pCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUM5QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDcEIsSUFBSSxlQUFlLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUV4RCxJQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3JDLGdDQUFnQztBQUVoQzs7Ozs7R0FLRztBQUNILElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNuQixLQUFJLElBQUksQ0FB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