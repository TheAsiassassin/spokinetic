"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const create_event_1 = require("./create-event");
const sign_up_1 = require("./sign-up");
const sign_in_1 = require("./sign-in");
const calendar_john_1 = require("./calendar-john");
const account_1 = require("./account");
const eventPage_1 = require("./eventPage");
/**
 * Add In Later Iteration
 * Do a method call to initialize these variables eventually
 * Call will be made to events database to pull top events
 * For now set them to stock images
*/
// Temporary(?) boolean to track for new users
var signedInBoolean = false;
const bckgndImage = 'images/mountain2.jpeg';
const magImage = 'images/magGlass.png';
var pOneImage = 'images/running.jpg';
var pTwoImage = 'images/concert.jpg';
var pThreeImage = 'images/obstacleCourse.jpg';
var pOneString = 'Running';
var pTwoString = 'Concerts';
var pThreeString = 'Obstacle Courses';
const searchString = '';
var eventNotifyInt = 0;
class MainPage extends tabris_1.Page {
    constructor(properties) {
        super();
        this.set(Object.assign({ title: 'Spokinetic' }, properties)).append(JSX.createElement(tabris_1.ImageView, { centerX: true, centerY: true, width: 800, height: 1000, opacity: .7, image: bckgndImage, scaleMode: 'stretch' }));
        this.append(JSX.createElement(tabris_1.TabFolder, { paging: true, stretch: true, selectionIndex: 0, tabBarLocation: 'bottom' },
            JSX.createElement(tabris_1.Tab, { title: 'Events', id: 'events' }),
            JSX.createElement(tabris_1.Tab, { title: 'Calendar', onSelect: () => openCalendarPage() }),
            JSX.createElement(tabris_1.Tab, { title: 'My Calendar' }),
            JSX.createElement(tabris_1.Tab, { title: 'My Account', onSelect: () => openAccountPage() })));
        this.append(JSX.createElement(tabris_1.TabFolder, { stretchX: true, height: 100, background: '#234', tabBarLocation: 'hidden' },
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.TextView, { text: 'EVENTS', textColor: 'white', font: '40px', centerX: true, centerY: true }))));
        this.append(JSX.createElement(tabris_1.TabFolder, { paging: true, stretchX: true, centerY: true, height: 300, background: '#495764', tabBarLocation: 'hidden' },
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.ImageView, { centerX: true, centerY: true, height: 250, scaleMode: 'fit', image: pOneImage, onLoad: handleLoad, onTap: () => openEventPage() }),
                JSX.createElement(tabris_1.Button, { style: 'flat', text: pOneString, background: '#CD5C5C', opacity: .8 })),
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.ImageView, { centerX: true, centerY: true, height: 250, scaleMode: 'fit', image: pTwoImage, onLoad: handleLoad, onTap: () => openEventPage() }),
                JSX.createElement(tabris_1.Button, { style: 'flat', text: pTwoString, background: '#CD5C5C', opacity: .8 })),
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.ImageView, { centerX: true, centerY: true, height: 250, scaleMode: 'fit', image: pThreeImage, onLoad: handleLoad, onTap: () => openEventPage() }),
                JSX.createElement(tabris_1.Button, { style: 'flat', text: pThreeString, background: '#CD5C5C', opacity: .8 })),
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.Button, { center: true, onSelect: () => openCreatePage() }, "Create new event"))));
    }
}
exports.MainPage = MainPage;
tabris_1.contentView.append(JSX.createElement($, null,
    JSX.createElement(tabris_1.NavigationView, { stretch: true, drawerActionVisible: 'true', onSelect: onHome },
        JSX.createElement(tabris_1.SearchAction, { id: 'search', message: 'Search', image: magImage, onSelect: onSearch, onInput: handleInput }),
        JSX.createElement(tabris_1.Page, null))));
tabris_1.drawer.append(JSX.createElement(tabris_1.TextView, { centerY: true, left: 16 }, "Hello, World! You've found me!"));
const pageRef = $(tabris_1.Page).only();
//  '$'  is equivalent to 'tabris.contentView.find'  
checkShowLanding();
function checkShowLanding() {
    if (!signedInBoolean) {
        showLanding();
    }
}
// Opens "Create New Event" page
function openCreatePage() {
    $(tabris_1.NavigationView).only().append(JSX.createElement(create_event_1.CreateEventPage, null));
}
// Opens a Calendar page
function openCalendarPage() {
    const navigationView = $(tabris_1.NavigationView).only();
    navigationView.pages().detach();
    navigationView.append(JSX.createElement(calendar_john_1.CalendarPage, null));
}
function openAccountPage() {
    const navigationView = $(tabris_1.NavigationView).only();
    navigationView.pages().detach();
    navigationView.append(JSX.createElement(account_1.AccountPage, null));
}
function openEventPage() {
    $(tabris_1.NavigationView).only().append(JSX.createElement(eventPage_1.EventPage, null));
}
/**
 * Initial page user sees. Prompts user to sign up.
 *
 * TO DO:
 * add padding to ScrollView
 * make sizing more generic for different screen sizes
 * bypass this page if already signed in
 * include info in the white space below the "get started button"
 * make stack section scrollable: see eventPage.jsx.
 * pull out common setters, (replicated code)
 * (i.e. all text is white, set it outside of popover with a reference to the entire popover tag)
 */
function showLanding() {
    const popover = tabris_1.Popover.open(JSX.createElement(tabris_1.Popover, null,
        JSX.createElement(tabris_1.Stack, { background: '#79a6e1', stretchX: true, height: 550 },
            JSX.createElement(tabris_1.ScrollView, { top: true, background: '#234', stretchX: true, height: 72, direction: 'horizontal', layout: new tabris_1.RowLayout({ alignment: 'stretchY' }) },
                JSX.createElement(tabris_1.TextView, { left: true, textColor: 'white', font: 'bold 35px' }, "  Spokinetic    "),
                JSX.createElement(tabris_1.Button, { style: 'text', textColor: 'white', left: 16, font: 'bold 14px', onSelect: () => showSignIn(popover) }, "SIGN IN")),
            JSX.createElement(tabris_1.TextView, { centerX: true, top: 60, textColor: 'white', font: 'bold 40px' }, "Welcome!"),
            JSX.createElement(tabris_1.TextView, { centerX: true, textColor: 'white', font: 'bold 24px' }, "All your local events, right"),
            JSX.createElement(tabris_1.TextView, { centerX: true, top: 5, textColor: 'white', font: 'bold 24px' }, "in the palm of your hand"),
            JSX.createElement(tabris_1.Button, { centerX: true, top: 105, width: 300, height: 70, background: '#77c666', style: 'flat', font: 'bold 18px', textColor: 'white', onSelect: () => showSignUp(popover) }, "Get Started")),
        JSX.createElement(tabris_1.TextView, { bottom: true, centerX: true, textColor: '#2f2f2f', font: 'bold 9px' }, "James Tollefson | Ian Oleson | John Petrovich | Steven McConnell")));
}
function showSignUp(popover) {
    popover.close();
    const navigationView = $(tabris_1.NavigationView).only();
    navigationView.pages().detach();
    navigationView.append(JSX.createElement(sign_up_1.SignUpPage, null));
    navigationView.set({ toolbarVisible: false });
}
function showSignIn(popover) {
    popover.close();
    const navigationView = $(tabris_1.NavigationView).only();
    navigationView.pages().detach();
    navigationView.append(JSX.createElement(sign_in_1.SignInPage, null));
    navigationView.set({ toolbarVisible: false });
}
/*
function showNotificationPage(popover){
  popover.close();
  $(NavigationView).only().append(
    <EventNotifyPage />
  );
}*/
/**
 * Add In Later Iteration
 * Home button hasn't been set.
 * Navigates to main page
 */
function onHome() {
    pageRef.find('#initText').first(tabris_1.TextView).text = 'Home Pressed';
}
/**
 * Add In Later Iteration
 * Search bar has no search functionality
 * Brings up keyboard and allows input
 */
function onSearch() {
}
/**
 * Add In Later Iteration
 * Ment to handle search bar input
 * Save input for auto fill functionality or
 * suggestions while typing
 */
function handleInput() {
}
/* @param {tabris.ImageViewLoadEvent} event */
function handleLoad({ target, error }) {
    new tabris_1.TextView({
        centerX: target.centerX, top: [target, 8]
        //text: error ? 'Error' : 'Success'
    }).insertAfter(target);
}
/**
 * Add In Later Iteration
 * The onPage methods handle the three main events displayed
 * on the main page. Each onPage method navigates to the event
 * page associated with the event displayed.
 */
function onPage1() {
}
function onPage2() {
}
function onPage3() {
}
/**
 * Add In Later Iteration
 * Incrementing the badge is currently for proof of concept
 * OnEvents is associated with "events" tab. Tab may change
 * to a notification tab. Events are visible in both calendar
 * views.
 */
function onEvents() {
    eventNotifyInt++;
    pageRef.find('#events').first(tabris_1.Tab).badge = eventNotifyInt; // increment badge val
}
/**
 * Add In Later Iteration
 * When selected the calendar page will be displayed
 */
function onCalendar() {
}
/**
 * Add In Later Iteration
 * When selected personal calendar page will be displayed
 */
function onMyCalendar() {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXguanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBR3NCO0FBQ3RCLGlEQUErQztBQUMvQyx1Q0FBcUM7QUFDckMsdUNBQXFDO0FBRXJDLG1EQUE2QztBQUM3Qyx1Q0FBc0M7QUFDdEMsMkNBQXNDO0FBRXRDOzs7OztFQUtFO0FBRUYsOENBQThDO0FBQzlDLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQztBQUU1QixNQUFNLFdBQVcsR0FBRyx1QkFBdUIsQ0FBQztBQUM1QyxNQUFNLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQztBQUV2QyxJQUFJLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQztBQUNyQyxJQUFJLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQztBQUNyQyxJQUFJLFdBQVcsR0FBRywyQkFBMkIsQ0FBQztBQUU5QyxJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUM7QUFDM0IsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDO0FBQzVCLElBQUksWUFBWSxHQUFHLGtCQUFrQixDQUFDO0FBRXRDLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUN4QixJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUM7QUFFdkIsTUFBYSxRQUFTLFNBQVEsYUFBSTtJQUNoQyxZQUFZLFVBQVU7UUFDcEIsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsR0FBRyxpQkFBRSxLQUFLLEVBQUUsWUFBWSxJQUFLLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FDbkQsa0JBQUMsa0JBQVMsSUFBQyxPQUFPLFFBQUMsT0FBTyxRQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUM5RCxLQUFLLEVBQUUsV0FBVyxFQUNsQixTQUFTLEVBQUMsU0FBUyxHQUFHLENBQ3pCLENBQUM7UUFDRixJQUFJLENBQUMsTUFBTSxDQUNULGtCQUFDLGtCQUFTLElBQUMs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