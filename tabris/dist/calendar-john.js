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
const calendar_steven_1 = require("./calendar-steven");
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
        this.append(JSX.createElement(tabris_1.CollectionView, { id: 'calendar', stretchX: true, top: 100, bottom: 100, padding: 12, columnCount: 7, cellHeight: 50, itemCount: items.length, createCell: createCell, updateCell: updateCell }));
        this.append(JSX.createElement(tabris_1.Button, { height: 100, text: '\u27E8', textColor: 'white', font: 'bold 36px', background: '#234', left: true, highlightOnTouch: true, onTap: () => prevMonth() }));
        this.append(JSX.createElement(tabris_1.Button, { height: 100, text: '\u27E9', textColor: 'white', font: 'bold 36px', background: '#234', right: true, highlightOnTouch: true, onTap: () => nextMonth() }));
        this.append(JSX.createElement(tabris_1.Composite, { bottom: true, bottom: 60, centerX: true },
            JSX.createElement(tabris_1.TextView, { left: true, centerY: true, text: 'Month View' }),
            JSX.createElement(tabris_1.Switch, { left: 'prev() 8', onSelect: () => toListView() }),
            JSX.createElement(tabris_1.TextView, { left: 'prev() 8', centerY: true, text: 'List View' })));
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
        $(tabris_1.Page).only().append(JSX.createElement(tabris_1.CollectionView, { id: 'calendar', stretchX: true, top: 100, bottom: 100, padding: 12, columnCount: 7, cellHeight: 50, itemCount: items.length, createCell: createCell, updateCell: updateCell }));
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
 * Updates view to show days/events as a list
 */
function toListView() {
    viewMonth = month;
    viewYear = year;
    $(tabris_1.TabFolder).only('#view-month').selectionIndex = viewMonth + 1;
    updateCalendar();
    firstLoadIn = true;
    const navigationView = $(tabris_1.NavigationView).only();
    navigationView.pages().detach();
    navigationView.append(JSX.createElement(calendar_steven_1.ListCalendarPage, null));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItam9obi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jYWxlbmRhci1qb2huLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7R0FPRzs7QUFFSCxtQ0FBMEg7QUFDMUgsbUNBQWlDO0FBQ2pDLHVDQUFzQztBQUN0Qyx1Q0FBc0M7QUFDdEMsMkNBQXNDO0FBQ3RDLHVEQUFtRDtBQUVuRCxJQUFJLE9BQU8sQ0FBQztBQUNaLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztBQUV2QixzRUFBc0U7QUFDdEUsTUFBTSxNQUFNLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBRTFJLDhFQUE4RTtBQUM5RSw4RkFBOEY7QUFFOUYsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUN0QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDNUIsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO0FBQ3RCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN6QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDOUIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLElBQUksZUFBZSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFeEQsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNyQyxnQ0FBZ0M7QUFFaEM7Ozs7O0dBS0c7QUFDSCxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDbkIs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