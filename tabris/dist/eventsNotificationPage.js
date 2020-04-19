"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzTm90aWZpY2F0aW9uUGFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9ldmVudHNOb3RpZmljYXRpb25QYWdlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsbUNBR3NCO0FBR3RCOzs7OztFQUtFO0FBQ0YsTUFBTSxXQUFXLEdBQUcsMkJBQTJCLENBQUM7QUFDaEQsTUFBTSxRQUFRLEdBQUcscUJBQXFCLENBQUM7QUFFdkM7Ozs7O0VBS0U7QUFFRixNQUFNLFdBQVcsR0FBRztJQUNsQixFQUFDLEtBQUssRUFBRSx3QkFBd0IsRUFBRSxNQUFNLEVBQUMsMEJBQTBCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQztJQUNuRixFQUFDLEtBQUssRUFBRSxzQ0FBc0MsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUM7SUFDckYsRUFBQyxLQUFLLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDO0lBQ3hFLEVBQUMsS0FBSyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBQztJQUMxRSxFQUFDLEtBQUssRUFBRSwwQ0FBMEMsRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBQztJQUNsRyxFQUFDLEtBQUssRUFBRSx3QkFBd0IsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUM7SUFDM0UsRUFBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFDO0NBQ3JFLENBQUM7QUFFRixNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7QUFDeEIsSUFBSSxjQUFjLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztBQUV4QyxvQkFBVyxDQUFDLE1BQU0sQ0FDaEIsa0JB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