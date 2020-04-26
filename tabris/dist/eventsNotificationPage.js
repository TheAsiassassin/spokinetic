"use strict";
/**
 * Display Notifications for Events
 *
 * TODO:
 *   Refactor to display in sidebar/drawer, if possible
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
/*
* Add in Later Iteration
* Do a method call to initialize these variables eventually
* Call will be made to events database to pull top events
* For now set them to stock images
*/
const bckgndImage = 'images/icons/checkDoc.png';
const magImage = 'images/magGlass.png';
/*
* notifyArray is fill with event examples.
* Make a database call to fill array with
* Relevent event notifications
* Time of events needs to be updated dynamically
*/
const notifyArray = [
    { title: 'Cooking Class Canceled', sender: 'Jacob\'s Cooking Lessons', time: '12:35' },
    { title: 'Tonight\'s Special Guest: Tom Capaul', sender: 'Coding Club', time: '08:03' },
    { title: 'This is just a spam message', sender: 'Spammer', time: '04:32' },
    { title: 'Royksopp Playing 3/8', sender: 'The Baby Bar', time: 'yesterday' },
    { title: 'Senior Frisbee Tournament Reminder: 4/10', sender: 'Robert J. Oldman', time: 'yesterday' },
    { title: 'Coffee Club Newsletter', sender: 'Coffee Club', time: 'yesterday' },
    { title: 'Fraud mail', sender: 'Unsuspicious Jack', time: 'Saturday' }
];
const searchString = '';
var eventNotifyInt = notifyArray.length;
tabris_1.contentView.append(JSX.createElement($, null,
    JSX.createElement(tabris_1.NavigationView, { stretch: true, drawerActionVisible: 'true', onSelect: onHome },
        JSX.createElement(tabris_1.SearchAction, { id: 'search', image: magImage, onSelect: onSearch, onInput: handleInput }),
        JSX.createElement(tabris_1.Page, { title: 'Spokinetic' },
            JSX.createElement(tabris_1.ImageView, { id: 'background', center: true, width: 100, height: 200, opacity: .7 }),
            JSX.createElement(tabris_1.TabFolder, { paging: true, stretch: true, selectionIndex: 0, tabBarLocation: 'bottom' },
                JSX.createElement(tabris_1.Tab, { title: 'Events', id: 'events', badge: eventNotifyInt, onSelect: onEvents }),
                JSX.createElement(tabris_1.Tab, { title: 'Calendar' }),
                JSX.createElement(tabris_1.Tab, { title: 'MyCalendar' })),
            JSX.createElement(tabris_1.CollectionView, { stretch: true, itemCount: notifyArray.length, cellHeight: 64, createCell: createCell, updateCell: updateCell }),
            JSX.createElement(tabris_1.TabFolder, { id: 'alert', paging: true, stretchX: true, height: 40, tabBarLocation: 'hidden' },
                JSX.createElement(tabris_1.Tab, null,
                    JSX.createElement(tabris_1.TextView, { id: 'alertTxt', textColor: 'black', font: '20px', centerX: true, centerY: true })))))));
const pageRef = $(tabris_1.Page).only();
//  '$'  is equivalent to 'tabris.contentView.find'  
/**
 * Gets notifications relevant to user and populates
 * notifyArray
 */
function getNotifications() {
}
/*
* Add In Later Iteration
* There is no "Home" button.
* Add in later iterations
*/
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
* The following inc/decEvents() are for testing purposes to test badge manipulation
*/
function decEvents() {
    eventNotifyInt--;
    pageRef.find('#events').first(tabris_1.Tab).badge = eventNotifyInt;
}
function incEvents() {
    eventNotifyInt++;
    pageRef.find('#events').first(tabris_1.Tab).badge = eventNotifyInt;
}
/*
* Add In Later Iteration
* onEvents() currently increments the event notifications as a test.
* Will be a link to events page once created.
*/
function onEvents() {
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
// handle collection view ****************************
function createCell() {
    return (JSX.createElement(tabris_1.Composite, { background: '#d36767' },
        JSX.createElement(tabris_1.Composite, { id: 'container', stretch: true, background: 'white', onPanHorizontal: handlePan },
            JSX.createElement(tabris_1.TextView, { id: 'senderText', left: 16, top: 8, font: 'medium 16px' }),
            JSX.createElement(tabris_1.TextView, { id: 'titleText', left: 16, bottom: 8 }),
            JSX.createElement(tabris_1.TextView, { id: 'timeText', right: 16, top: 8, textColor: 'gray' })),
        JSX.createElement(tabris_1.Composite, { stretchX: true, height: 1, background: '#eeeeee' })));
}
function updateCell(view, index) {
    const item = notifyArray[index];
    const container = view.find('#container').only();
    container.item = item;
    container.transform = { translationX: 0 };
    view.find(tabris_1.TextView).only('#senderText').textColor = '#e38e7c';
    view.find(tabris_1.TextView).only('#senderText').text = item.sender;
    view.find(tabris_1.TextView).only('#titleText').text = item.title;
    view.find(tabris_1.TextView).only('#timeText').text = item.time;
}
function handlePan(event) {
    const { target, state, translationX } = event;
    target.transform = { translationX };
    if (state === 'end') {
        handlePanFinished(event);
    }
}
function handlePanFinished({ target, velocityX, translationX }) {
    const beyondCenter = Math.abs(translationX) > target.bounds.width / 2;
    const fling = Math.abs(velocityX) > 200;
    const sameDirection = direction(velocityX) === direction(translationX);
    // When swiped beyond the center, trigger dismiss if flinged in the same direction or let go.
    // Otherwise, detect a dismiss only if flinged in the same direction.
    const dismiss = beyondCenter ? (sameDirection || !fling) : (sameDirection && fling);
    if (dismiss) {
        animateDismiss(target, translationX);
    }
    else {
        animateCancel(target);
    }
}
/**
 * animates a notification sliding out of view
 * @param {} target
 * @param {*} translationX
 */
function animateDismiss(target, translationX) {
    return __awaiter(this, void 0, void 0, function* () {
        yield target.animate({
            transform: { translationX: direction(translationX) * target.bounds.width }
        }, {
            duration: 200,
            easing: 'ease-out'
        });
        const index = notifyArray.indexOf(target.item);
        notifyArray.splice(index, 1);
        $(tabris_1.CollectionView).only().remove(index);
        decEvents();
        //push following responsibility to another method called noNotificationUpdate()
        if ($(tabris_1.CollectionView).only().itemCount == 0) {
            pageRef.find('#background').first(tabris_1.ImageView).image = bckgndImage;
            pageRef.find('#alert').first(tabris_1.TabFolder).background = '#e9e2a9';
            pageRef.find('#alertTxt').first(tabris_1.TextView).text = 'No Notifications!';
        }
    });
}
function animateCancel(target) {
    target.animate({ transform: { translationX: 0 } }, { duration: 200, easing: 'ease-out' });
}
function direction(offset) {
    return offset ? offset < 0 ? -1 : 1 : 0;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzTm90aWZpY2F0aW9uUGFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9ldmVudHNOb3RpZmljYXRpb25QYWdlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7Ozs7Ozs7Ozs7QUFFSCxtQ0FHc0I7QUFHdEI7Ozs7O0VBS0U7QUFDRixNQUFNLFdBQVcsR0FBRywyQkFBMkIsQ0FBQztBQUNoRCxNQUFNLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQztBQUV2Qzs7Ozs7RUFLRTtBQUVGLE1BQU0sV0FBVyxHQUFHO0lBQ2xCLEVBQUMsS0FBSyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sRUFBQywwQkFBMEIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDO0lBQ25GLEVBQUMsS0FBSyxFQUFFLHNDQUFzQyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQztJQUNyRixFQUFDLEtBQUssRUFBRSw2QkFBNkIsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUM7SUFDeEUsRUFBQyxLQUFLLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFDO0lBQzFFLEVBQUMsS0FBSyxFQUFFLDBDQUEwQyxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFDO0lBQ2xHLEVBQUMsS0FBSyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBQztJQUMzRSxFQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUM7Q0FDckUsQ0FBQztBQUVGLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUN4QixJQUFJLGNBQWMsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO0FBRXhDLG9CQUFXLENBQUMs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