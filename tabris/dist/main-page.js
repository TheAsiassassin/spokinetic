"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
/*
* Do a method call to initialize these variables eventually
* Call will be made to events database to pull top events
* For now set them to stock images
*/
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
                JSX.createElement(tabris_1.Tab, { title: 'My Calendar' })),
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
                    JSX.createElement(tabris_1.Button, { style: 'flat', text: pThreeString, background: '#CD5C5C', opacity: .8 })))))));
const pageRef = $(tabris_1.Page).only();
//  '$'  is equivalent to 'tabris.contentView.find'  
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21haW4tcGFnZS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FHc0I7QUFHdEI7Ozs7RUFJRTtBQUNGLE1BQU0sV0FBVyxHQUFHLHVCQUF1QixDQUFDO0FBQzVDLE1BQU0sUUFBUSxHQUFHLHFCQUFxQixDQUFDO0FBRXZDLElBQUksU0FBUyxHQUFHLG9CQUFvQixDQUFDO0FBQ3JDLElBQUksU0FBUyxHQUFHLG9CQUFvQixDQUFDO0FBQ3JDLElBQUksV0FBVyxHQUFHLDJCQUEyQixDQUFDO0FBRTlDLElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQztBQUMzQixJQUFJLFVBQVUsR0FBRyxVQUFVLENBQUM7QUFDNUIsSUFBSSxZQUFZLEdBQUcsa0JBQWtCLENBQUM7QUFFdEMsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQztBQUV2QixvQkFBVyxDQUFDLE1BQU0sQ0FDaEIsa0JBQUMsQ0FBQztJQUdBLGtCQUFDLHVCQUFjLElBQUMsT0FBTyxRQUFDLG1CQUFtQixFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUUsTUFBTTtRQUVqRSxrQkFBQyxxQkFBWSxJQUFFLEVBQUUsRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFDM0MsS0FBSyxFQUFFLFFBQVEsRUFDZixRQUFRLEVBQUUsUUFBUSxFQUNsQixPQUFPLEVBQUUsV0FBVyxHQUVMO1FBR2Ysa0JBQUMsYUFBSSxJQUFDLEtBQUssRUFBQyxZQUFZO1lBSXRCLGtCQUFDLGtCQUFTLElBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQ2hELEtBQUssRUFBRSxXQUFXLEVBQ2xCLFNBQVMsRUFBQyxTQUFTLEdBQUU7WUFJckIsa0JBQUMsa0JBQVMsSUFBQyxNQUFNLFFBQUMsT0FBTyxRQUFDLGNBQWMs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