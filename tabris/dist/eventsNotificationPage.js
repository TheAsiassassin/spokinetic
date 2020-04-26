"use strict";
/**
 * Display Notifications for Events
 *
 * TODO:
 *   Figure out a way to use the 'hamburger menu' icon to indicate
 *     notifications (without also manipulating search icon, if possible)
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
    { title: 'Cooking Class Cancelled', sender: 'Jacob\'s Cooking Lessons', time: '12:35' },
    { title: 'Tonight\'s Special Guest: Tom Capaul', sender: 'Coding Club', time: '08:03' },
    { title: 'This is just a spam message', sender: 'Spammer', time: '04:32' },
    { title: 'Royksopp Playing 3/8', sender: 'The Baby Bar', time: 'yesterday' },
    { title: 'Senior Frisbee Tournament Reminder: 4/10', sender: 'Robert J. Oldman', time: 'yesterday' },
    { title: 'Coffee Club Newsletter', sender: 'Coffee Club', time: 'yesterday' },
    { title: 'Fraud mail', sender: 'Unsuspicious Jack', time: 'Saturday' }
];
const searchString = '';
var eventNotifyInt = notifyArray.length;
/**
 * Creates a Page object to allow use throughout the project
 *
 * Most useful for connecting pages in the app
 */
class Notifications extends tabris_1.Composite {
    constructor(properties) {
        super();
        this.set(Object.assign({}, properties)).append(JSX.createElement(tabris_1.ImageView, { id: 'background', center: true, width: 100, height: 200, opacity: .7 }));
        this.append(JSX.createElement(tabris_1.CollectionView, { stretch: true, itemCount: notifyArray.length, cellHeight: 64, createCell: createCell, updateCell: updateCell }));
        this.append(JSX.createElement(tabris_1.TextView, { id: 'alertTxt', textColor: 'black', font: '20px', centerX: true, centerY: true }));
    }
}
exports.Notifications = Notifications;
//const pageRef = $(Page).only(); 
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
/*function onHome(){
  pageRef.find('#initText').first(TextView).text = 'Home Pressed';
}*/
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
/*
function decEvents(){
  eventNotifyInt --;
  $(Tab).only('#events').first(Tab).badge = eventNotifyInt;
}

function incEvents(){
  eventNotifyInt ++;
  $(Tab).only('#events').first(Tab).badge = eventNotifyInt;
}*/
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
 * Animation for a notification sliding out of view
 *
 * @param {Widget} target
 * @param {number} translationX
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
        tabris_1.drawer.find(tabris_1.CollectionView).only().remove(index);
        //decEvents();
        //push following responsibility to another method called noNotificationUpdate()
        if (tabris_1.drawer.find(tabris_1.CollectionView).only().itemCount === 0) {
            //drawer.find(ImageView).only('#background').image=bckgndImage;
            //drawer.find(TextView).only('#alertTxt').background='#e9e2a9';
            tabris_1.drawer.find(tabris_1.TextView).only('#alertTxt').text = 'No Notifications!';
        }
    });
}
/**
 * Animation to return a notification back to its original position
 *
 * @param {Widget} target
 */
function animateCancel(target) {
    target.animate({ transform: { translationX: 0 } }, { duration: 200, easing: 'ease-out' });
}
function direction(offset) {
    return offset ? offset < 0 ? -1 : 1 : 0;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzTm90aWZpY2F0aW9uUGFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9ldmVudHNOb3RpZmljYXRpb25QYWdlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7O0FBRUgsbUNBR3NCO0FBR3RCOzs7OztFQUtFO0FBQ0YsTUFBTSxXQUFXLEdBQUcsMkJBQTJCLENBQUM7QUFDaEQsTUFBTSxRQUFRLEdBQUcscUJBQXFCLENBQUM7QUFFdkM7Ozs7O0VBS0U7QUFFRixNQUFNLFdBQVcsR0FBRztJQUNsQixFQUFDLEtBQUssRUFBRSx5QkFBeUIsRUFBRSxNQUFNLEVBQUMsMEJBQTBCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQztJQUNwRixFQUFDLEtBQUssRUFBRSxzQ0FBc0MsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUM7SUFDckYsRUFBQyxLQUFLLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDO0lBQ3hFLEVBQUMsS0FBSyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBQztJQUMxRSxFQUFDLEtBQUssRUFBRSwwQ0FBMEMsRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBQztJQUNsRyxFQUFDLEtBQUssRUFBRSx3QkFBd0IsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUM7SUFDM0UsRUFBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFDO0NBQ3JFLENBQUM7QUFFRixNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7QUFDeEIsSUFBSSxjQUFjLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztBQUV4Qzs7OztHQUlHO0FB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