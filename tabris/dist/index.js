"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const create_event_1 = require("./create-event");
const sign_up_1 = require("./sign-up");
const sign_in_1 = require("./sign-in");
const calendar_john_1 = require("./calendar-john");
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
            JSX.createElement(tabris_1.Tab, { title: 'Events', id: 'events', onSelect: () => toMainPage() }),
            JSX.createElement(tabris_1.Tab, { title: 'Calendar', onSelect: () => openCalendarPage() }),
            JSX.createElement(tabris_1.Tab, { title: 'My Calendar' }),
            JSX.createElement(tabris_1.Tab, { title: 'My Account' })));
        this.append(JSX.createElement(tabris_1.TabFolder, { stretchX: true, height: 100, background: '#234', tabBarLocation: 'hidden' },
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.TextView, { text: 'EVENTS', textColor: 'white', font: '40px', centerX: true, centerY: true }))));
        this.append(JSX.createElement(tabris_1.TabFolder, { paging: true, stretchX: true, centerY: true, height: 300, background: '#495764', tabBarLocation: 'hidden' },
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.ImageView, { centerX: true, centerY: true, height: 250, scaleMode: 'fit', image: pOneImage, onLoad: handleLoad }),
                JSX.createElement(tabris_1.Button, { style: 'flat', text: pOneString, background: '#CD5C5C', opacity: .8 })),
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.ImageView, { centerX: true, centerY: true, height: 250, scaleMode: 'fit', image: pTwoImage, onLoad: handleLoad }),
                JSX.createElement(tabris_1.Button, { style: 'flat', text: pTwoString, background: '#CD5C5C', opacity: .8 })),
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.ImageView, { centerX: true, centerY: true, height: 250, scaleMode: 'fit', image: pThreeImage, onLoad: handleLoad }),
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
/**
 *  Opens a "Create New Event" page
 */
function openCreatePage() {
    $(tabris_1.NavigationView).only().append(JSX.createElement(create_event_1.CreateEventPage, null));
}
function openCalendarPage() {
    //console.log('Open Calendar Page');
    const navigationView = $(tabris_1.NavigationView).only();
    navigationView.pages().detach();
    navigationView.append(JSX.createElement(calendar_john_1.CalendarPage, null));
}
function toMainPage() {
    const navigationView = $(tabris_1.NavigationView).only();
    navigationView.pages().detach();
    navigationView.append(JSX.createElement(MainPage, null));
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
    const popover = tabris_1.Popover.open(JSX.createElement(tabris_1.Popover, { stretchX: true },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXguanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBR3NCO0FBQ3RCLGlEQUErQztBQUMvQyx1Q0FBcUM7QUFDckMsdUNBQXFDO0FBRXJDLG1EQUE2QztBQUU3Qzs7Ozs7RUFLRTtBQUVGLDhDQUE4QztBQUM5QyxJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUM7QUFFNUIsTUFBTSxXQUFXLEdBQUcsdUJBQXVCLENBQUM7QUFDNUMsTUFBTSxRQUFRLEdBQUcscUJBQXFCLENBQUM7QUFFdkMsSUFBSSxTQUFTLEdBQUcsb0JBQW9CLENBQUM7QUFDckMsSUFBSSxTQUFTLEdBQUcsb0JBQW9CLENBQUM7QUFDckMsSUFBSSxXQUFXLEdBQUcsMkJBQTJCLENBQUM7QUFFOUMsSUFBSSxVQUFVLEdBQUcsU0FBUyxDQUFDO0FBQzNCLElBQUksVUFBVSxHQUFHLFVBQVUsQ0FBQztBQUM1QixJQUFJLFlBQVksR0FBRyxrQkFBa0IsQ0FBQztBQUV0QyxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7QUFDeEIsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO0FBRXZCLE1BQWEsUUFBUyxTQUFRLGFBQUk7SUFDaEMsWUFBWSxVQUFVO1FBQ3BCLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLEdBQUcsaUJBQUUsS0FBSyxFQUFFLFlBQVksSUFBSyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQ25ELGtCQUFDLGtCQUFTLElBQUMsT0FBTyxRQUFDLE9BQU8sUUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFDOUQsS0FBSyxFQUFFLFdBQVcsRUFDbEIsU0FBUyxFQUFDLFNBQVMsR0FBRyxDQUN6QixDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FDVCxrQkFBQyxrQkFBUyxJQUFDLE1BQU0sUUFBQyxPQUFPLFFBQUMsY0FBYyxF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