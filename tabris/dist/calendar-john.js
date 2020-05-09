"use strict";
/**
 * Calendar Page
 *
 * TODO:
 *   Add functionality to change years(?)
 *   Consider alternative approaches to make month view updates snappier
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
    return (JSX.createElement(tabris_1.TextView, { font: 'bold 16px', textColor: '#234', alignment: 'centerX', maxLines: 1, highlightOnTouch: true, onTap: ev => showEvents($(tabris_1.CollectionView).only().itemIndex(ev.target)) }));
}
/**
 * Populate CollectionView cell with data
 *
 * @param {TextView} cell
 * @param {number} index
 */
function updateCell(cell, index) {
    cell.text = `${items[index]}`;
    if ($(tabris_1.TabFolder).only('#view-month').selectionIndex === month + 1 && items[index] === day && viewYear === year) {
        cell.background = '#79a6e1';
        cell.textColor = '#ffffff';
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItam9obi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jYWxlbmRhci1qb2huLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQUVILG1DQUErRjtBQUMvRixtQ0FBaUM7QUFDakMsdUNBQXNDO0FBQ3RDLHVDQUFzQztBQUN0QywyQ0FBc0M7QUFFdEMsSUFBSSxPQUFPLENBQUM7QUFDWixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFFdkIsc0VBQXNFO0FBQ3RFLE1BQU0sTUFBTSxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUUxSSw4RUFBOEU7QUFDOUUsOEZBQThGO0FBRTlGLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7QUFDdEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQzVCLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztBQUN0QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDekIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQzlCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQztBQUNwQixJQUFJLGVBQWUsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRXhELElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDckMsZ0NBQWdDO0FBRWhDOzs7O0dBSUc7QUFDSCxNQUFhLFlBQWEsU0FBUSxhQUFJO0lBQ3BDLFlBQVksVUFBVTtRQUNwQixLQUFL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