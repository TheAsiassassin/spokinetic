"use strict";
/**
 * Calendar Page
 *
 * TODO:
 *   Add functionality to change months (and years?)
 *   Add functionality to access full event pages from Popover
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const index_1 = require("./index");
const account_1 = require("./account");
const contact_1 = require("./contact");
const eventPage_1 = require("./eventPage");
var popover;
// Array to name months based on the value returned by date.getMonth()
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// Array to name days of the week based on the value returned by date.getDay()
//const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var date = new Date();
var month = date.getMonth();
var day = date.getDate();
var year = date.getFullYear();
var firstDayOfMonth = new Date(year, month, 1).getDay();
const items = createItems();
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
        this.append(JSX.createElement(tabris_1.TabFolder, { stretchX: true, height: 100, background: '#234', tabBarLocation: 'hidden' },
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.TextView, { text: months[month], textColor: 'white', font: 'bold 36px', center: true }))));
        this.append(JSX.createElement(tabris_1.CollectionView, { id: 'calendar', stretchX: true, top: 'prev()', bottom: 35, padding: 12, columnCount: 7, cellHeight: 50, itemCount: items.length, createCell: createCell, updateCell: updateCell }));
    }
}
exports.CalendarPage = CalendarPage;
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
    if (items[index] === day) {
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
function createItems() {
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
    result.push({ name: (month + 1) + '/' + items[index] + '/' + year, type: 'section' });
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
function toEvents(popover) {
    popover.close();
    $(tabris_1.NavigationView).only().append(JSX.createElement(eventPage_1.EventPage, null));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItam9obi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jYWxlbmRhci1qb2huLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQUVILG1DQUFxSjtBQUNySixtQ0FBaUM7QUFDakMsdUNBQXNDO0FBQ3RDLHVDQUFzQztBQUN0QywyQ0FBc0M7QUFFdEMsSUFBSSxPQUFPLENBQUM7QUFFWixzRUFBc0U7QUFDdEUsTUFBTSxNQUFNLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBRTFJLDhFQUE4RTtBQUM5RSw4RkFBOEY7QUFFOUYsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUN0QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDNUIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3pCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUM5QixJQUFJLGVBQWUsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRXhELE1BQU0sS0FBSyxHQUFHLFdBQVcsRUFBRSxDQUFDO0FBQzVCLGdDQUFnQztBQUVoQzs7OztHQUlHO0FBQ0gsTUFBYSxZQUFhLFNBQVEsYUFBSTtJQUNwQyxZQUFZLFVBQVU7UUFDcEIsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsR0FBRyxpQkFBRSxLQUFLLEVBQUUsVUFBVSxJQUFLLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FDakQsa0JBQUMsa0JBQVMsSUFBQyxNQUFNLFFBQUMsT0FB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