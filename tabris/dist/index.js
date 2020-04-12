"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const create_event_1 = require("./create-event");
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
if (!signedInBoolean) {
    showLanding();
}
const pageRef = $(tabris_1.Page).only();
//  '$'  is equivalent to 'tabris.contentView.find'  
function openCreatePage() {
    $(tabris_1.NavigationView).only().append(JSX.createElement(create_event_1.CreateEventPage, null));
}
function showLanding() {
    const popover = tabris_1.Popover.open(JSX.createElement(tabris_1.Popover, { width: 300, height: 400 },
        JSX.createElement(tabris_1.ScrollView, { stretch: true, layout: new tabris_1.StackLayout({ spacing: 16, alignment: 'stretchX' }), padding: 32 },
            JSX.createElement(tabris_1.Button, { right: true, background: 'red', textColor: 'white', onSelect: () => popover.close() }, "X"),
            JSX.createElement(tabris_1.TextView, { centerX: true, top: 50, font: 'bold 36px' }, "Welcome!"),
            JSX.createElement(tabris_1.TextView, { centerX: true, font: '24px' }, "All your local events, right"),
            JSX.createElement(tabris_1.TextView, { centerX: true, top: 5, font: '24px' }, "in the palm of your hand"),
            JSX.createElement(tabris_1.Button, { style: 'flat', centerX: true, background: 'blue', textColor: 'white' }, "Get Started"),
            JSX.createElement(tabris_1.Button, { style: 'outline', centerX: true, strokeColor: 'blue', textColor: 'blue' }, "Sign in"))));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXguanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBR3NCO0FBQ3RCLGlEQUErQztBQUUvQzs7OztFQUlFO0FBRUYsOENBQThDO0FBQzlDLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQztBQUU1QixNQUFNLFdBQVcsR0FBRyx1QkFBdUIsQ0FBQztBQUM1QyxNQUFNLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQztBQUV2QyxJQUFJLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQztBQUNyQyxJQUFJLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQztBQUNyQyxJQUFJLFdBQVcsR0FBRywyQkFBMkIsQ0FBQztBQUU5QyxJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUM7QUFDM0IsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDO0FBQzVCLElBQUksWUFBWSxHQUFHLGtCQUFrQixDQUFDO0FBRXRDLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUN4QixJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUM7QUFFdkIsb0JBQVcsQ0FBQyxNQUFNLENBQ2hCLGtCQUFDLENBQUM7SUFHQSxrQkFBQyx1QkFBYyxJQUFDLE9BQU8sUUFBQyxtQkFBbUIsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFFLE1BQU07UUFFakUsa0JBQUMscUJBQVksSUFBRSxFQUFFLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQzNDLEtBQUssRUFBRSxRQUFRLEVBQ2YsUUFBUSxFQUFFLFFBQVEsRUFDbEIsT0FBTyxFQUFFLFdBQVcsR0FFTDtRQUdmLGtCQUFDLGFBQUksSUFBQyxLQUFLLEVBQUMsWUFBWTtZQUl0QixrQkFBQyxrQkFBUyxJQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUNoRCxLQUFLLEVBQUUsV0FBVyxFQUNsQixTQUFTLEVBQUMsU0FBUyxHQUFF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