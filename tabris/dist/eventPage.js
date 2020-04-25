"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
//---------------------------------DATABASE-PULLS-------------------------------------
/* Fill each of the following vars and const' with pulls from database
*/
var descriptionString = "This is a test event description. Fill this field with useful info about events. Things like Why anyone would bother with your event, what to expect, what to bring, I don't know other things. But make it sound good or no one will show up. I already don't want to...";
var titleString = "EVENT TITLE";
var quickDescriptionString = "Quick description to catch attention";
const eventImage = 'images/sampleEvent.jpg';
const primaryColor = (opacity = 1) => `rgba(255, 152, 0, ${opacity})`;
//------------------------------------------------------------------------------------
const magImage = 'images/magGlass.png';
const TITLE_VIEW_OPACITY = 0.85;
var eventNotifyInt = 0;
let titleContainerY = 0;
/**
 * May want to use this at some point to manipulate status bar color and theme.
 */
/*
statusBar.set({
  background: primaryColor(),
  theme: 'dark'
});*/
class EventPage extends tabris_1.Page {
    constructor(properties) {
        super();
        this.set(Object.assign({}, properties)).append(JSX.createElement(tabris_1.ScrollView, { stretch: true, onResize: updateInitialPosition, onScrollY: updateCurrentPosition },
            JSX.createElement(tabris_1.ImageView, { id: 'eventImage', stretchX: true, scaleMode: 'fill', image: eventImage }),
            JSX.createElement(tabris_1.Composite, { id: 'descriptionContainer', stretchX: true, top: 'next()', height: 800, padding: 16, background: 'white' },
                JSX.createElement(tabris_1.TextView, { id: 'description', stretchX: true, text: descriptionString })),
            JSX.createElement(tabris_1.Stack, { stretchX: true, alignment: 'stretchX', padding: 16, background: primaryColor(TITLE_VIEW_OPACITY) },
                JSX.createElement(tabris_1.TextView, { id: 'quickDescription', font: 'bold 16px', textColor: 'black', text: quickDescriptionString }),
                JSX.createElement(tabris_1.TextView, { id: 'title', font: 'medium 24px', textColor: 'white', text: titleString })),
            JSX.createElement(tabris_1.TabFolder, { paging: true, stretch: true, selectionIndex: 0 },
                JSX.createElement(tabris_1.Tab, { title: 'Events', id: 'events', badge: eventNotifyInt, onSelect: () => openMainPage() }),
                JSX.createElement(tabris_1.Tab, { title: 'Calendar' }),
                JSX.createElement(tabris_1.Tab, { title: 'MyCalendar' })),
            JSX.createElement(tabris_1.TabFolder, { stretch: true, selectionIndex: 0, tabBarLocation: 'bottom' },
                JSX.createElement(tabris_1.Tab, { title: 'SPOKINETIC' }),
                JSX.createElement(tabris_1.Tab, { title: 'CONTACT', id: 'contact' }),
                JSX.createElement(tabris_1.Tab, { title: 'SHARE' }))));
    }
}
exports.EventPage = EventPage;
//I removed the following line of code to place the tab folders of "EVENTS", "CALENDAR", "MYCALNEDAR" at the
//top of the screen rather than the bottom. Just a design preference, I'm not sure what is better.
//tabBarLocation='bottom'
//const imageView = $(ImageView).only();
//const titleContainer = $(Stack).only();
//const descriptionContainer = $(Composite).only('#descriptionContainer');
//const titleView = $(TextView).only('#title');
//const quickDescriptionView = $(TextView).only('#quickDescription');
//const descriptionView = $(TextView).only('#description');
//initFields();
function updateInitialPosition({ height }) {
    $(tabris_1.ImageView).only('#eventImage').height = height / 2;
    $(tabris_1.Composite).only('#descriptionContainer').height = height * 1.5;
    const titleContainerHeight = $(tabris_1.Stack).only().bounds.height;
    // We need the offset of the title composite in each scroll event.
    // As it can only change on resize, we assign it here.
    titleContainerY = Math.min($(tabris_1.ImageView).only('#eventImage').height - titleContainerHeight, height / 2);
    $(tabris_1.Stack).only().top = titleContainerY;
}
function updateCurrentPosition({ offset }) {
    $(tabris_1.ImageView).only('#eventImage').transform = { translationY: Math.max(0, offset * 0.4) };
    $(tabris_1.Stack).only().transform = { translationY: Math.max(0, offset - titleContainerY) };
    $(tabris_1.Stack).only().background = primaryColor(calculatetitleContainerOpacity(offset));
}
function calculatetitleContainerOpacity(scrollViewOffsetY) {
    const titleContainerDistanceToTop = titleContainerY - scrollViewOffsetY;
    const opacity = 1 - (titleContainerDistanceToTop * (1 - TITLE_VIEW_OPACITY)) / titleContainerY;
    return Math.min(opacity, 1);
}
/**
* initFields() initializes all the text fields with Strings to
* display the title, quick description or attention grab phrase,
* and the event description that were grabbed from the database.
*/
/*function initFields(){
  $(TextView).only('#title').text = titleString;
  $(TextView).only('#quickDescription').text = quickDescriptionString;
  $(TextView).only('#description').text = descriptionString;
  $(ImageView).only().image = eventImage;
}*/
function onSearch() {
}
function openMainPage() {
    const navigationView = $(tabris_1.NavigationView).only();
    navigationView.pages().detach();
    navigationView.append(JSX.createElement(MainPage, null));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRQYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2V2ZW50UGFnZS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FDc0c7QUFHdEcsc0ZBQXNGO0FBQ3RGO0VBQ0U7QUFDRixJQUFJLGlCQUFpQixHQUFHLDJRQUEyUSxDQUFDO0FBQ3BTLElBQUksV0FBVyxHQUFHLGFBQWEsQ0FBQztBQUNoQyxJQUFJLHNCQUFzQixHQUFHLHNDQUFzQyxDQUFDO0FBRXBFLE1BQU0sVUFBVSxHQUFHLHdCQUF3QixDQUFDO0FBQzVDLE1BQU0sWUFBWSxHQUFHLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMscUJBQXFCLE9BQU8sR0FBRyxDQUFDO0FBQ3RFLHNGQUFzRjtBQUV0RixNQUFNLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQztBQUN2QyxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQztBQUVoQyxJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUM7QUFDdkIsSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDO0FBRXhCOztHQUVHO0FBQ0g7Ozs7S0FJSztBQUVMLE1BQWEsU0FBVSxTQUFRLGFBQUk7SUFDakMsWUFBWSxVQUFVO1FBQ3BCLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLEdBQUcsbUJBQUssVUFBVSxFQUFFLENBQUMsTUFBTSxDQUM5QixrQkFBQyxtQkFBVSxJQUFDLE9BQU8sUUFBQyxRQUFRLEVBQUUscUJBQXFCLEVBQUUsU0FBUyxFQUFFLHFCQUFxQjtZQUVuRixrQkFBQyxrQkFBUyxJQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUMsUUFBUSxRQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFFLFVBQVUsR0FBRztZQUN6RSxrQkFBQyxrQkFBUyxJQUFDLEVBQUUsRUFBQyxzQkFBc0IsRUFBQyxRQUFRLFFBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFB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