"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const create_event_1 = require("./create-event");
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
function openCreatePage() {
    $(tabris_1.NavigationView).only().append(JSX.createElement(create_event_1.CreateEventPage, null));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXguanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBR3NCO0FBQ3RCLGlEQUErQztBQUUvQzs7OztFQUlFO0FBQ0YsTUFBTSxXQUFXLEdBQUcsdUJBQXVCLENBQUM7QUFDNUMsTUFBTSxRQUFRLEdBQUcscUJBQXFCLENBQUM7QUFFdkMsSUFBSSxTQUFTLEdBQUcsb0JBQW9CLENBQUM7QUFDckMsSUFBSSxTQUFTLEdBQUcsb0JBQW9CLENBQUM7QUFDckMsSUFBSSxXQUFXLEdBQUcsMkJBQTJCLENBQUM7QUFFOUMsSUFBSSxVQUFVLEdBQUcsU0FBUyxDQUFDO0FBQzNCLElBQUksVUFBVSxHQUFHLFVBQVUsQ0FBQztBQUM1QixJQUFJLFlBQVksR0FBRyxrQkFBa0IsQ0FBQztBQUV0QyxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7QUFDeEIsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO0FBRXZCLG9CQUFXLENBQUMsTUFBTSxDQUNoQixrQkFBQyxDQUFDO0lBR0Esa0JBQUMsdUJBQWMsSUFBQyxPQUFPLFFBQUMsbUJBQW1CLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBRSxNQUFNO1FBRWpFLGtCQUFDLHFCQUFZLElBQUUsRUFBRSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUMzQyxLQUFLLEVBQUUsUUFBUSxFQUNmLFFBQVEsRUFBRSxRQUFRLEVBQ2xCLE9BQU8sRUFBRSxXQUFXLEdBRUw7UUFHZixrQkFBQyxhQUFJLElBQUMsS0FBSyxFQUFDLFlBQVk7WUFJdEIsa0JBQUMsa0JBQVMsSUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFDaEQsS0FBSyxFQUFFLFdBQVcsRUFDbEIsU0FBUyxFQUFDLFNBQVMsR0FBRTtZQUlyQixrQkFBQyxrQkFBUyxJQUFDLE1BQU0sUUFBQyxPQUFPLFFBQUMsY0FBYyxFQUFFLENBQUMsRUFBRSxjQUFjLEVBQUMsUUFBUTtnQkFFbEUsa0JBQUMsWUFBRyxJQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFFBQVEsRUFDL0IsS0FBSyxFQUFFLGNBQWMsRUFDckIsUUFBUSxFQUFFLFFBQVEsR0FDWjtnQkFFTixrQkFBQyxZQUFHLElBQUMsS0FBSyxFQUFDLFVBQVUsR0FDZjtnQkFFTixrQkFBQyxZQUFHLElBQUMsS0FBSyxFQUFDLGFBQWEsR0FDbEI7Z0JBRU4sa0JBQUMsWUFBRyxJQUFDLEtBQUssRUFBQyxZQUFZLEdBQ2pCLENBRUk7WUFFWixrQkFBQyxrQkFBUyxJQUFDLE1BQU0sUUFBQyxRQUFRLFFBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxRQUFRO2dCQUMvRSxrQkFBQyxZQUFHO29CQUNGLGtCQUFDLGlCQUFRLElBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsT0FBTyxRQUFDLE9BQU8sU0FDMUQsQ0FDUCxDQUNNO1lBR2Qsa0JBQUMsa0JBQVMsSUFBQyxNQUFNLFFBQUMsUUFBUSxRQUFDLE9BQU8sUUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBQyxTQUFTLEVBQUMsY0FBYyxFQUFDLFFBQVE7Z0JBQzFGLGtCQUFDLFlBQUc7b0JBQ0Ysa0JBQUMsa0JBQVMsSUFBQyxPQUFPLFFBQUMsT0FBTyxRQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFDLEtBQUssRUFDdkQsS0FBSyxFQUFFLFNBQVMsRUFDaEIsTUFBTSxFQUFFLFVBQVUsR0FDaEI7b0JBQ0Ysa0JBQUMsZUFBTSxJQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBRSxFQUFFLEdBQVcsQ0FDOUU7Z0JBQ04sa0JBQUMsWUFBRztvQkFDRixrQkFBQyxrQkFBUyxJQUFDLE9BQU8sUUFBQyxPQUFPLFFBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUMsS0FBSyxFQUN2RCxLQUFLLEVBQUUsU0FBUyxFQUNoQixNQUFNLEVBQUUsVUFBVSxHQUNoQjtvQkFDRixrQkFBQyxlQUFNLElBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBQyxTQUFTLEVBQUEsT0FBTyxFQUFFLEVBQUUsR0FBVyxDQUM3RTtnQkFDTixrQkFBQyxZQUFHO29CQUNGLGtCQUFDLGtCQUFTLElBQUMsT0FBTyxRQUFDLE9BQU8sUUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBQyxLQUFLLEVBQ3ZELEtBQUssRUFBRSxXQUFXLEVBQ2xCLE1BQU0sRUFBRSxVQUFVLEdBQ2hCO29CQUNGLGtCQUFDLGVBQU0sSUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFDLFNBQVMsRUFBQSxPQUFPLEVBQUUsRUFBRSxHQUFXLENBQy9FO2dCQUNOLGtCQUFDLFlBQUc7b0JBQ0Ysa0JBQUMsZUFBTSxJQUFDLE1BQU0sUUFBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsY0FBYyxFQUFFLHVCQUEyQixDQUN0RSxDQUNJLENBR1AsQ0FFUSxDQUNmLENBQ0wsQ0FBQztBQUVGLGVBQU0sQ0FBQyxNQUFNLENBQ1gsa0JBQUMsaUJBQVEsSUFBQyxPQUFPLFFBQUMsSUFBSSxFQUFFLEVBQUUscUNBQTJDLENBQ3RFLENBQUM7QUFFRixNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsYUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDL0IscURBQXFEO0FBRXJELFNBQVMsY0FBYztJQUNyQixDQUFDLENBQUMsdUJBQWMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FDN0Isa0JBQUMsOEJBQWUsT0FBRyxDQUNwQixDQUFDO0FBQ0osQ0FBQztBQUVELFNBQVMsTUFBTTtJQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLGlCQUFRLENBQUMsQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDO0FBQ2xFLENBQUM7QUFFRCxTQUFTLFFBQVE7QUFFakIsQ0FBQztBQUVELFNBQVMsV0FBVztBQUVwQixDQUFDO0FBRUQsOENBQThDO0FBQzlDLFNBQVMsVUFBVSxDQUFDLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQztJQUNqQyxJQUFJLGlCQUFRLENBQUM7UUFDWCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLG1DQUFtQztLQUNwQyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFHRCxTQUFTLE9BQU87QUFFaEIsQ0FBQztBQUVELFNBQVMsT0FBTztBQUVoQixDQUFDO0FBRUQsU0FBUyxPQUFPO0FBRWhCLENBQUM7QUFFRCxTQUFTLE9BQU87QUFFaEIsQ0FBQztBQUVELFNBQVMsUUFBUTtJQUNmLGNBQWMsRUFBRyxDQUFDO0lBQ2xCLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsQ0FBQyxzQkFBc0I7SUFFakYsb0RBQW9EO0lBQ3BELGtFQUFrRTtBQUNwRSxDQUFDO0FBRUQsU0FBUyxVQUFVO0FBRW5CLENBQUM7QUFFRCxTQUFTLFlBQVk7QUFFckIsQ0FBQztBQVlELDJGQUEyRjtBQUMzRixtRUFBbUU7QUFFbkUsK0NBQStDO0FBQy9DLFNBQVMsUUFBUSxDQUFDLEtBQUs7SUFDckIsT0FBTyxZQUFZLEdBQUcsS0FBSyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQzFHLENBQUM7QUFHRCxTQUFTLFVBQVUsQ0FBQyxLQUFLO0lBQ3ZCLHNDQUFzQztJQUN0QyxvQkFBVyxDQUFDLE1BQU0sQ0FDaEIsa0JBQUMsaUJBQVEsSUFBQyxHQUFHLEVBQUMsV0FBVyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FDekQsQ0FBQztBQUVKLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxFQUFFO0lBQ3JCLG9CQUFXLENBQUMsTUFBTTtJQUNoQix1REFBdUQ7S0FDeEQsQ0FBQztBQUNKLENBQUM7QUFFRCxTQUFTLFNBQVM7SUFDaEIsb0JBQVcsQ0FBQyxNQUFNLENBQ2hCLGtCQUFDLENBQUM7UUFDQSxrQkFBQyxlQUFNLElBQUMsR0FBRyxRQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFDLEtBQUssRUFBQSxJQUFJLEVBQUMsYUFBYSxFQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQVksQ0FFbEcsQ0FDTCxDQUFDO0FBQ0osQ0FBQztBQUVELHVEQUF1RCJ9