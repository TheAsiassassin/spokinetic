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
tabris_1.contentView.append(JSX.createElement($, null,
    JSX.createElement(tabris_1.NavigationView, { stretch: true, drawerActionVisible: 'true', onSelect: onHome },
        JSX.createElement(tabris_1.SearchAction, { id: 'search', message: 'Search', image: magImage, onSelect: onSearch, onInput: handleInput }),
        JSX.createElement(tabris_1.Page, { title: 'Spokinetic' },
            JSX.createElement(tabris_1.ImageView, { width: 800, height: 1000, opacity: .7, image: bckgndImage, scaleMode: 'stretch' }),
            JSX.createElement(tabris_1.TabFolder, { paging: true, stretch: true, selectionIndex: 0, tabBarLocation: 'bottom' },
                JSX.createElement(tabris_1.Tab, { title: 'Events', id: 'events', badge: eventNotifyInt, onSelect: onEvents }),
                JSX.createElement(tabris_1.Tab, { title: 'Calendar' }),
                JSX.createElement(tabris_1.Tab, { title: 'My Calendar' }),
                JSX.createElement(tabris_1.Tab, { title: 'My Account' })),
            JSX.createElement(tabris_1.TabFolder, { paging: true, stretchX: true, height: 100, background: '#234', tabBarLocation: 'hidden' },
                JSX.createElement(tabris_1.Tab, null,
                    JSX.createElement(tabris_1.TextView, { text: 'EVENTS', textColor: 'white', font: '40px', centerX: true, centerY: true }))),
            JSX.createElement(tabris_1.TabFolder, { paging: true, stretchX: true, centerY: true, height: 300, background: '#495764', tabBarLocation: 'hidden' },
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
                    JSX.createElement(tabris_1.Button, { center: true, onSelect: () => openCreatePage() }, "Create new event")))))));
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
    $(tabris_1.NavigationView).only().append(JSX.createElement(sign_up_1.SignUpPage, null));
}
function showSignIn(popover) {
    popover.close();
    $(tabris_1.NavigationView).only().append(JSX.createElement(sign_in_1.SignInPage, null));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXguanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBR3NCO0FBQ3RCLGlEQUErQztBQUMvQyx1Q0FBcUM7QUFDckMsdUNBQXFDO0FBRXJDOzs7O0VBSUU7QUFFRiw4Q0FBOEM7QUFDOUMsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDO0FBRTVCLE1BQU0sV0FBVyxHQUFHLHVCQUF1QixDQUFDO0FBQzVDLE1BQU0sUUFBUSxHQUFHLHFCQUFxQixDQUFDO0FBRXZDLElBQUksU0FBUyxHQUFHLG9CQUFvQixDQUFDO0FBQ3JDLElBQUksU0FBUyxHQUFHLG9CQUFvQixDQUFDO0FBQ3JDLElBQUksV0FBVyxHQUFHLDJCQUEyQixDQUFDO0FBRTlDLElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQztBQUMzQixJQUFJLFVBQVUsR0FBRyxVQUFVLENBQUM7QUFDNUIsSUFBSSxZQUFZLEdBQUcsa0JBQWtCLENBQUM7QUFFdEMsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQztBQUV2QixvQkFBVyxDQUFDLE1BQU0sQ0FDaEIsa0JBQUMsQ0FBQztJQUdBLGtCQUFDLHVCQUFjLElBQUMsT0FBTyxRQUFDLG1CQUFtQixFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUUsTUFBTTtRQUVqRSxrQkFBQyxxQkFBWSxJQUFFLEVBQUUsRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFDM0MsS0FBSyxFQUFFLFFBQVEsRUFDZixRQUFRLEVBQUUsUUFBUSxFQUNsQixPQUFPLEVBQUUsV0FBVyxHQUVMO1FBR2Ysa0JBQUMsYUFBSSxJQUFDLEtBQUssRUFBQyxZQUFZO1lBSXRCLGtCQUFDLGtCQUFTLElBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQ2hELEtBQUssRUFBRSxXQUFX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