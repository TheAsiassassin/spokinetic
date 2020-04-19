"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const create_event_1 = require("./create-event");
const sign_up_1 = require("./sign-up");
const sign_in_1 = require("./sign-in");
/*
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
            JSX.createElement(tabris_1.Tab, { title: 'Events', id: 'events', badge: eventNotifyInt, onSelect: onEvents }),
            JSX.createElement(tabris_1.Tab, { title: 'Calendar' }),
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
if (!signedInBoolean) {
    showLanding();
}
function openCreatePage() {
    $(tabris_1.NavigationView).only().append(JSX.createElement(create_event_1.CreateEventPage, null));
}
function showLanding() {
    const popover = tabris_1.Popover.open(JSX.createElement(tabris_1.Popover, { width: 300, height: 400 },
        JSX.createElement(tabris_1.ScrollView, { stretch: true, layout: new tabris_1.StackLayout({ spacing: 16, alignment: 'stretchX' }), padding: 16 },
            JSX.createElement(tabris_1.Button, { style: 'outline', right: true, strokeColor: 'blue', textColor: 'blue', onSelect: () => showSignIn(popover) }, "Sign in"),
            JSX.createElement(tabris_1.TextView, { centerX: true, top: 50, font: 'bold 36px' }, "Welcome!"),
            JSX.createElement(tabris_1.TextView, { centerX: true, font: '24px' }, "All your local events, right"),
            JSX.createElement(tabris_1.TextView, { centerX: true, top: 5, font: '24px' }, "in the palm of your hand"),
            JSX.createElement(tabris_1.Button, { centerX: true, top: 64, style: 'flat', background: 'blue', font: 'bold 24px', textColor: 'white', onSelect: () => showSignUp(popover) }, "Get Started"))));
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
function onHome() {
    pageRef.find('#initText').first(tabris_1.TextView).text = 'Home Pressed';
}
function onSearch() {
}
function handleInput() {
}
/* @param {tabris.ImageViewLoadEvent} event */
function handleLoad({ target, error }) {
    new tabris_1.TextView({
        centerX: target.centerX, top: [target, 8]
        //text: error ? 'Error' : 'Success'
    }).insertAfter(target);
}
function onPage1() {
}
function onPage2() {
}
function onPage3() {
}
function onPage4() {
}
function onEvents() {
    eventNotifyInt++;
    pageRef.find('#events').first(tabris_1.Tab).badge = eventNotifyInt; // increment badge val
    //pageRef.find('#events').first(Tab).title = "this";
    //pageRef.find('#eventTxt').first(TextView).text = eventNotifyInt;
}
function onCalendar() {
}
function onMyCalendar() {
}
//onSelect={() => console.log('select Pay')} onReselect={() => console.log('reselect Pay')}
// code snippet saved from testing Events, Calendar, and MyCalendar
// unused functions ***************************
function getImage(image) {
    return 'resources/' + image + (device.platform === 'iOS' ? '-black-24dp@3x.png' : '-white-24dp@3x.png');
}
function initSearch(event) {
    //$(TextInput).only().text = 'Search';
    tabris_1.contentView.append(JSX.createElement(tabris_1.TextView, { top: 'prev() 16', left: '20%', text: event.text }));
}
function searchInput(ev) {
    tabris_1.contentView.append(
    //<TextView top='prev() 16' left='20%' text={ev.text}/>
    );
}
function newButton() {
    tabris_1.contentView.append(JSX.createElement($, null,
        JSX.createElement(tabris_1.Button, { top: true, onSelect: showText2, width: '200', text: 'Hello World', background: [255, 128, 0] })));
}
//https://unsplash.com/photos/PMwu9gfCSbw image website
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXguanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBR3NCO0FBQ3RCLGlEQUErQztBQUMvQyx1Q0FBcUM7QUFDckMsdUNBQXFDO0FBRXJDOzs7O0VBSUU7QUFFRiw4Q0FBOEM7QUFDOUMsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDO0FBRTVCLE1BQU0sV0FBVyxHQUFHLHVCQUF1QixDQUFDO0FBQzVDLE1BQU0sUUFBUSxHQUFHLHFCQUFxQixDQUFDO0FBRXZDLElBQUksU0FBUyxHQUFHLG9CQUFvQixDQUFDO0FBQ3JDLElBQUksU0FBUyxHQUFHLG9CQUFvQixDQUFDO0FBQ3JDLElBQUksV0FBVyxHQUFHLDJCQUEyQixDQUFDO0FBRTlDLElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQztBQUMzQixJQUFJLFVBQVUsR0FBRyxVQUFVLENBQUM7QUFDNUIsSUFBSSxZQUFZLEdBQUcsa0JBQWtCLENBQUM7QUFFdEMsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQztBQUV2QixNQUFhLFFBQVMsU0FBUSxhQUFJO0lBQ2hDLFlBQVksVUFBVTtRQUNwQixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxHQUFHLGlCQUFFLEtBQUssRUFBRSxZQUFZLElBQUssVUFBVSxFQUFFLENBQUMsTUFBTSxDQUNuRCxrQkFBQyxrQkFBUyxJQUFDLE9BQU8sUUFBQyxPQUFPLFFBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQzlELEtBQUssRUFBRSxXQUFXLEVBQ2xCLFNBQVMsRUFBQyxTQUFTLEdBQUcsQ0FDekIsQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQ1Qsa0JBQUMsa0JBQVMsSUFBQyxNQUFNLFFBQUMsT0FBTyxRQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUs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