"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const create_event_1 = require("./create-event");
const sign_up_1 = require("./sign-up");
const sign_in_1 = require("./sign-in");
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
                JSX.createElement(tabris_1.Button, { style: 'text', textColor: 'white', font: 'bold 14px', onSelect: () => showSignIn(popover) }, "SIGN IN"),
                JSX.createElement(tabris_1.TextView, { textColor: 'white' }, " | "),
                JSX.createElement(tabris_1.Button, { style: 'text', textColor: 'white', font: 'bold 14px', onSelect: () => showSignUp(popover) }, "SIGN UP")),
            JSX.createElement(tabris_1.TextView, { centerX: true, top: 60, textColor: 'white', font: 'bold 40px' }, "Welcome!"),
            JSX.createElement(tabris_1.TextView, { centerX: true, textColor: 'white', font: 'bold 24px' }, "All your local events, right"),
            JSX.createElement(tabris_1.TextView, { centerX: true, top: 5, textColor: 'white', font: 'bold 24px' }, "in the palm of your hand"),
            JSX.createElement(tabris_1.Button, { centerX: true, top: 105, width: 300, height: 70, background: '#77c666', style: 'flat', font: 'bold 18px', textColor: 'white', onSelect: () => showSignUp(popover) }, "Get Started")),
        JSX.createElement(tabris_1.TextView, { bottom: true, centerX: true, textColor: '#2f2f2f', font: 'bold 13px' }, "James Tollefson | Ian Oleson | John Petrovich | Steven McConnell")));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXguanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBR3NCO0FBQ3RCLGlEQUErQztBQUMvQyx1Q0FBcUM7QUFDckMsdUNBQXFDO0FBR3JDOzs7OztFQUtFO0FBRUYsOENBQThDO0FBQzlDLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQztBQUU1QixNQUFNLFdBQVcsR0FBRyx1QkFBdUIsQ0FBQztBQUM1QyxNQUFNLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQztBQUV2QyxJQUFJLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQztBQUNyQyxJQUFJLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQztBQUNyQyxJQUFJLFdBQVcsR0FBRywyQkFBMkIsQ0FBQztBQUU5QyxJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUM7QUFDM0IsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDO0FBQzVCLElBQUksWUFBWSxHQUFHLGtCQUFrQixDQUFDO0FBRXRDLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUN4QixJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUM7QUFFdkIsTUFBYSxRQUFTLFNBQVEsYUFBSTtJQUNoQyxZQUFZLFVBQVU7UUFDcEIsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsR0FBRyxpQkFBRSxLQUFLLEVBQUUsWUFBWSxJQUFLLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FDbkQsa0JBQUMsa0JBQVMsSUFBQyxPQUFPLFFBQUMsT0FBTyxRQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUM5RCxLQUFLLEVBQUUsV0FBVyxFQUNsQixTQUFTLEVBQUMsU0FBUyxHQUFHLENBQ3pCLENBQUM7UUFDRixJQUFJLENBQUMsTUFBTSxDQUNULGtCQUFDLGtCQUFTLElBQUMsTUFBTSxRQUFDLE9BQU8sUUFBQyxjQUFjLEVBQUUsQ0FBQyxFQUFFLGNBQWMsRUFBQyxRQUFRO1lBRWhFLGtCQUFDLFlBQUcsSUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQy9CLEtBQUssRUFBRSxjQUFjLEVBQ3JCLFFBQVEsRUFBRSxRQUFRLEdBQ1o7WUFFTixrQkFBQyxZQUFHLElBQUMsS0FBSyxFQUFDLFVBQVUsR0FDZjtZQUVOLGtCQUFDLFlBQUcsSUFBQyxLQUFLLEVBQUMsYUFBYSxHQUNsQjtZQUVOLGtCQUFDLFlBQUcsSUFBQyxLQUFLLEVBQUMsWUFBWSxHQUNqQixDQUVJLENBQ2YsQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQ1Qsa0JBQUMsa0JBQVMsSUFBQyxRQUFRLFFBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxRQUFRO1lBQ3hFLGtCQUFDLFlBQUc7Z0JBQ0Ysa0JBQUMsaUJBQVEsSUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxPQUFPLFFBQUMsT0FBTyxTQUFHLENBQ3BFLENBQ0ksQ0FDYixDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FDVCxrQkFBQyxrQkFBUyxJQUFDLE1BQU0sUUFBQyxRQUFRLFFBQUMsT0FBTyxRQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFDLFNBQVMsRUFBQyxjQUFjLEVBQUMsUUFBUTtZQUMxRixrQkFBQyxZQUFHO2dCQUNGLGtCQUFDLGtCQUFTLElBQUMsT0FBTyxRQUFDLE9BQU8sUUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBQyxLQUFLLEVBQ3JELEtBQUssRUFBRSxTQUFTLEVBQ2hCLE1BQU0sRUFBRSxVQUFVLEdBQ2hCO2dCQUNKLGtCQUFDLGVBQU0sSUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUUsRUFBRSxHQUFXLENBQzlFO1lBQ04sa0JBQUMsWUFBRztnQkFDRixrQkFBQyxrQkFBUyxJQUFDLE9BQU8sUUFBQyxPQUFPLFFBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUMsS0FBSyxFQUNyRCxLQUFLLEVBQUUsU0FBUyxFQUNoQixNQUFNLEVBQUUsVUFBVSxHQUNoQjtnQkFDSixrQkFBQyxlQUFNLElBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBQyxTQUFTLEVBQUEsT0FBTyxFQUFFLEVBQUUsR0FBVyxDQUM3RTtZQUNOLGtCQUFDLFlBQUc7Z0JBQ0Ysa0JBQUMsa0JBQVMsSUFBQyxPQUFPLFFBQUMsT0FBTyxRQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFDLEtBQUssRUFDckQsS0FBSyxFQUFFLFdBQVcsRUFDbEIsTUFBTSxFQUFFLFVBQVUsR0FDaEI7Z0JBQ0osa0JBQUMsZUFBTSxJQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUMsU0FBUyxFQUFBLE9BQU8sRUFBRSxFQUFFLEdBQVcsQ0FDL0U7WUFDTixrQkFBQyxZQUFHO2dCQUNGLGtCQUFDLGVBQU0sSUFBQyxNQUFNLFFBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLGNBQWMsRUFBRSx1QkFBMkIsQ0FDdEUsQ0FDSSxDQUNiLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUEvREQsNEJBK0RDO0FBRUQsb0JBQVcsQ0FBQyxNQUFNLENBQ2hCLGtCQUFDLENBQUM7SUFDQSxrQkFBQyx1QkFBYyxJQUFDLE9BQU8sUUFBQyxtQkFBbUIsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFFLE1BQU07UUFDakUsa0JBQUMscUJBQVksSUFBRSxFQUFFLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQzNDLEtBQUssRUFBRSxRQUFRLEVBQ2YsUUFBUSxFQUFFLFFBQVEsRUFDbEIsT0FBTyxFQUFFLFdBQVcsR0FBSTtRQUV4QixrQkFBQyxhQUFJLE9BQUcsQ0FDTyxDQUNmLENBQ0wsQ0FBQztBQUVGLGVBQU0sQ0FBQyxNQUFNLENBQ1gsa0JBQUMsaUJBQVEsSUFBQyxPQUFPLFFBQUMsSUFBSSxFQUFFLEVBQUUscUNBQTJDLENBQ3RFLENBQUM7QUFFRixNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsYUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDL0IscURBQXFEO0FBRXJELGdCQUFnQixFQUFFLENBQUM7QUFFbkIsU0FBUyxnQkFBZ0I7SUFDdkIsSUFBRyxDQUFDLGVBQWUsRUFBRTtRQUNuQixXQUFXLEVBQUUsQ0FBQztLQUNmO0FBQ0gsQ0FBQztBQUNEOztHQUVHO0FBQ0gsU0FBUyxjQUFjO0lBQ3JCLENBQUMsQ0FBQyx1QkFBYyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUM3QixrQkFBQyw4QkFBZSxPQUFHLENBQ3BCLENBQUM7QUFDSixDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxTQUFTLFdBQVc7SUFDbEIsTUFBTSxPQUFPLEdBQUcsZ0JBQU8sQ0FBQyxJQUFJLENBQzFCLGtCQUFDLGdCQUFPLElBQUMsUUFBUTtRQUViLGtCQUFDLGNBQUssSUFBQyxVQUFVLEVBQUMsU0FBUyxFQUFFLFFBQVEsUUFBQyxNQUFNLEVBQUUsR0FBRztZQUMvQyxrQkFBQyxtQkFBVSxJQUFDLEdBQUcsUUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLFFBQVEsUUFBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBQyxZQUFZLEVBQUMsTUFBTSxFQUFFLElBQUksa0JBQVMsQ0FBQyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUMsQ0FBQztnQkFDMUgsa0JBQUMsaUJBQVEsSUFBQyxJQUFJLFFBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsV0FBVyx1QkFBNEI7Z0JBQzdFLGtCQUFDLGVBQU0sSUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxjQUFrQjtnQkFDN0csa0JBQUMsaUJBQVEsSUFBQyxTQUFTLEVBQUMsT0FBTyxVQUFlO2dCQUMxQyxrQkFBQyxlQUFNLElBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsY0FBa0IsQ0FDbEc7WUFFYixrQkFBQyxpQkFBUSxJQUFDLE9BQU8sUUFBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFdBQVcsZUFBb0I7WUFDakYsa0JBQUMsaUJBQVEsSUFBQyxPQUFPLFFBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsV0FBVyxtQ0FBd0M7WUFDNUYsa0JBQUMsaUJBQVEsSUFBQyxPQUFPLFFBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxXQUFXLCtCQUFvQztZQUNoRyxrQkFBQyxlQUFNLElBQUMsT0FBTyxRQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQ3RILFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLGtCQUFzQixDQUNuRDtRQUVSLGtCQUFDLGlCQUFRLElBQUMsTUFBTSxRQUFDLE9BQU8sUUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLElBQUksRUFBQyxXQUFXLHVFQUE0RSxDQUVuSSxDQUNYLENBQUM7QUFDSixDQUFDO0FBR0QsU0FBUyxVQUFVLENBQUMsT0FBTztJQUN6QixPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDaEIsTUFBTSxjQUFjLEdBQUcsQ0FBQyxDQUFDLHVCQUFjLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoRCxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEMsY0FBYyxDQUFDLE1BQU0sQ0FDbkIsa0JBQUMsb0JBQVUsT0FBRyxDQUNmLENBQUM7SUFDRixjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUMsY0FBYyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7QUFDOUMsQ0FBQztBQUVELFNBQVMsVUFBVSxDQUFDLE9BQU87SUFDekIsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2hCLE1BQU0sY0FBYyxHQUFHLENBQUMsQ0FBQyx1QkFBYyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEQsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hDLGNBQWMsQ0FBQyxNQUFNLENBQ25CLGtCQUFDLG9CQUFVLE9BQUcsQ0FDZixDQUFDO0lBQ0YsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFDLGNBQWMsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFDRDs7Ozs7O0dBTUc7QUFFSDs7OztHQUlHO0FBQ0gsU0FBUyxNQUFNO0lBQ2IsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsaUJBQVEsQ0FBQyxDQUFDLElBQUksR0FBRyxjQUFjLENBQUM7QUFDbEUsQ0FBQztBQUNEOzs7O0dBSUc7QUFDSCxTQUFTLFFBQVE7QUFFakIsQ0FBQztBQUNEOzs7OztHQUtHO0FBQ0gsU0FBUyxXQUFXO0FBRXBCLENBQUM7QUFFRCw4Q0FBOEM7QUFDOUMsU0FBUyxVQUFVLENBQUMsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDO0lBQ2pDLElBQUksaUJBQVEsQ0FBQztRQUNYLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDekMsbUNBQW1DO0tBQ3BDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDekIsQ0FBQztBQUNEOzs7OztHQUtHO0FBQ0gsU0FBUyxPQUFPO0FBRWhCLENBQUM7QUFFRCxTQUFTLE9BQU87QUFFaEIsQ0FBQztBQUVELFNBQVMsT0FBTztBQUVoQixDQUFDO0FBQ0Q7Ozs7OztHQU1HO0FBQ0gsU0FBUyxRQUFRO0lBQ2YsY0FBYyxFQUFHLENBQUM7SUFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBRyxDQUFDLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxDQUFDLHNCQUFzQjtBQUNuRixDQUFDO0FBQ0Q7OztHQUdHO0FBQ0gsU0FBUyxVQUFVO0FBRW5CLENBQUM7QUFDRDs7O0dBR0c7QUFDSCxTQUFTLFlBQVk7QUFFckIsQ0FBQyJ9