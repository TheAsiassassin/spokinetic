"use strict";
/**
 * Initial version of the Main/Events Page
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
//import './calendar';  multiple "import" statements breaks the program
/*
* Add In Later Iteration
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
        JSX.createElement(tabris_1.SearchAction, { id: 'search', image: magImage, onSelect: onSearch, onInput: handleInput }),
        JSX.createElement(tabris_1.Page, { title: 'Spokinetic' },
            JSX.createElement(tabris_1.ImageView, { width: 800, height: 1000, opacity: .7, image: bckgndImage, scaleMode: 'stretch' }),
            JSX.createElement(tabris_1.TabFolder, { paging: true, stretch: true, selectionIndex: 0, tabBarLocation: 'bottom' },
                JSX.createElement(tabris_1.Tab, { title: 'Events', id: 'events', badge: eventNotifyInt, onSelect: onEvents }),
                JSX.createElement(tabris_1.Tab, { title: 'Calendar' }),
                JSX.createElement(tabris_1.Tab, { title: 'MyCalendar' })),
            JSX.createElement(tabris_1.TabFolder, { paging: true, stretchX: true, height: 100, background: '#234', tabBarLocation: 'hidden' },
                JSX.createElement(tabris_1.Tab, null,
                    JSX.createElement(tabris_1.TextView, { text: 'Events', textColor: 'white', font: '40px', centerX: true, centerY: true }))),
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
/*
* Add In Later Iteration
* No search functionality is currently available
* - link to handle search page
*/
function onSearch() {
}
/*
* Add In Later Iteration
* onEvents() currently increments the event notifications as a test.
* Will be a link to events page once created.
*/
function onEvents() {
    eventNotifyInt++;
    pageRef.find('#events').first(tabris_1.Tab).badge = eventNotifyInt; // increment badge val
    //pageRef.find('#events').first(Tab).title = "this";
    //pageRef.find('#eventTxt').first(TextView).text = eventNotifyInt;
}
/*
* Add In Later Iteration
* No calendar view is currently available
* - link to another page
*/
function onCalendar() {
}
/*
* Add In Later Iteration
* No calendar view is currently available
* - link to another page
*/
function onMyCalendar() {
}
/*
* Add In Later Iteration
* input for search bar needs functionality
* - storing search results
* - response to search
*/
function handleInput() {
}
/*
* Add In Later Iteration
* Each following onPage#() will link to the associated event it represents
* - link to each event page
*/
function onPage1() {
}
function onPage2() {
}
function onPage3() {
}
/* @param {tabris.ImageViewLoadEvent} event */
function handleLoad({ target, error }) {
    new tabris_1.TextView({
        centerX: target.centerX, top: [target, 8]
        //text: error ? 'Error' : 'Success'
    }).insertAfter(target);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpblBhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbWFpblBhZ2UuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7QUFFSCxtQ0FHc0I7QUFDdEIsdUVBQXVFO0FBRXZFOzs7OztFQUtFO0FBQ0YsTUFBTSxXQUFXLEdBQUcsdUJBQXVCLENBQUM7QUFDNUMsTUFBTSxRQUFRLEdBQUcscUJBQXFCLENBQUM7QUFFdkMsSUFBSSxTQUFTLEdBQUcsb0JBQW9CLENBQUM7QUFDckMsSUFBSSxTQUFTLEdBQUcsb0JBQW9CLENBQUM7QUFDckMsSUFBSSxXQUFXLEdBQUcsMkJBQTJCLENBQUM7QUFFOUMsSUFBSSxVQUFVLEdBQUcsU0FBUyxDQUFDO0FBQzNCLElBQUksVUFBVSxHQUFHLFVBQVUsQ0FBQztBQUM1QixJQUFJLFlBQVksR0FBRyxrQkFBa0IsQ0FBQztBQUV0QyxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7QUFDeEIsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO0FBR3ZCLG9CQUFXLENBQUMsTUFBTSxDQUNoQixrQkFBQyxDQUFDO0lBR0Esa0JBQUMsdUJBQWMsSUFBQyxPQUFPLFFBQUMsbUJBQW1CLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBRSxNQUFNO1FBRWpFLGtCQUFDLHFCQUFZLElBQUUsRUFBRSxFQUFDLFFBQVEsRUFDMUIsS0FBSyxFQUFFLFFBQVEsRUFDZixRQUFRLEVBQUUsUUFBUSxFQUNsQixPQUFPLEVBQUUsV0FBVyxHQUVMO1FBR2Ysa0JBQUMsYUFBSSxJQUFDLEtBQUssRUFBQyxZQUFZO1lBRXRCLGtCQUFDLGtCQUFTLElBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQ2hELEtBQUssRUFBRSxXQUFXLEVBQ2xCLFNBQVMsRUFBQyxTQUFTLEdBQUU7WUFHckIsa0JBQUMsa0JBQVMsSUFBQyxNQUFNLFFBQUMsT0FBTyxRQUFDLGNB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