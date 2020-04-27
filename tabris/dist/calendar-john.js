"use strict";
/**
 * Calendar Page
 *
 * TODO:
 *   Add functionality to show events when a day is tapped
 *   Add functionality to change months (and years?)
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const index_1 = require("./index");
const account_1 = require("./account");
const contact_1 = require("./contact");
// Array to name months based on the value returned by date.getMonth()
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// Array to name days of the week based on the value returned by date.getDay()
//const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
/** @param {tabris.Attributes<TextView>=} attributes */
const SectionCell = attributes => JSX.createElement(tabris_1.TextView, Object.assign({ background: '#79a6e1', textColor: 'white', font: 'bold 24px', alignment: 'centerX' }, attributes));
/** @param {tabris.Attributes<TextView>=} attributes */
const ItemCell = attributes => JSX.createElement(tabris_1.TextView, Object.assign({ padding: [2, 5], font: '14px', alignment: 'left' }, attributes));
var date = new Date();
var month = date.getMonth();
var day = date.getDate();
var year = date.getFullYear();
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
    return (JSX.createElement(tabris_1.TextView, { font: 'bold 16px', textColor: '#234', alignment: 'centerX', maxLines: 1, onTap: ev => showEvents($(tabris_1.CollectionView).only().itemIndex(ev.target)) }));
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
function showEvents(index) {
    const events = createEvents(index);
    const popover = tabris_1.Popover.open(JSX.createElement(tabris_1.Popover, null,
        JSX.createElement(tabris_1.CollectionView, { stretch: true, itemCount: events.length, cellType: index => events[index].type, cellHeight: (_, type) => type === 'section' ? 48 : 32, createCell: type => type === 'section' ? SectionCell() : ItemCell(), updateCell: (cell, index) => cell.text = events[index].name, onScroll: handleScroll }),
        JSX.createElement(SectionCell, { stretchX: true, height: 48, id: 'floatingSection', text: events[0].name, onTap: () => toCalendar(popover) })));
}
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
function toCalendar(popover) {
    popover.close();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItam9obi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jYWxlbmRhci1qb2huLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQUVILG1DQUFvSDtBQUNwSCxtQ0FBaUM7QUFDakMsdUNBQXNDO0FBQ3RDLHVDQUFzQztBQUV0QyxzRUFBc0U7QUFDdEUsTUFBTSxNQUFNLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBRTFJLDhFQUE4RTtBQUM5RSw4RkFBOEY7QUFFOUYsdURBQXVEO0FBQ3ZELE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUMsa0JBQUMsaUJBQVEsa0JBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsU0FBUyxFQUFDLFNBQVMsSUFBSyxVQUFVLEVBQUcsQ0FBQztBQUUxSSx1REFBdUQ7QUFDdkQsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQyxrQkFBQyxpQkFBUSxrQkFBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsTUFBTSxJQUFLLFVBQVUsRUFBRyxDQUFDO0FBRXpHLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7QUFDdEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQzVCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN6QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7QUFFOUIsTUFBTSxL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