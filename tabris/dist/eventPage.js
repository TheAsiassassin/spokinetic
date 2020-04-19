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
tabris_1.contentView.append(JSX.createElement($, null,
    JSX.createElement(tabris_1.NavigationView, { stretch: true, drawerActionVisible: 'true', onSelect: onHome },
        JSX.createElement(tabris_1.SearchAction, { id: 'search', image: magImage, onSelect: onSearch, onInput: handleInput }),
        JSX.createElement(tabris_1.Page, { title: 'Spokinetic' },
            JSX.createElement(tabris_1.ScrollView, { stretch: true, onResize: updateInitialPosition, onScrollY: updateCurrentPosition },
                JSX.createElement(tabris_1.ImageView, { stretchX: true, scaleMode: 'fill' }),
                JSX.createElement(tabris_1.Composite, { id: 'descriptionContainer', stretchX: true, top: 'next()', height: 800, padding: 16, background: 'white' },
                    JSX.createElement(tabris_1.TextView, { id: 'description', stretchX: true })),
                JSX.createElement(tabris_1.Stack, { stretchX: true, alignment: 'stretchX', padding: 16, background: primaryColor(TITLE_VIEW_OPACITY) },
                    JSX.createElement(tabris_1.TextView, { id: 'quickDescription', font: 'bold 16px', textColor: 'black' }),
                    JSX.createElement(tabris_1.TextView, { id: 'title', font: 'medium 24px', textColor: 'white' })),
                JSX.createElement(tabris_1.TabFolder, { paging: true, stretch: true, selectionIndex: 0 },
                    JSX.createElement(tabris_1.Tab, { title: 'Events', id: 'events', badge: eventNotifyInt, onSelect: onEvents }),
                    JSX.createElement(tabris_1.Tab, { title: 'Calendar' }),
                    JSX.createElement(tabris_1.Tab, { title: 'MyCalendar' })),
                JSX.createElement(tabris_1.TabFolder, { stretch: true, selectionIndex: 0, tabBarLocation: 'bottom' },
                    JSX.createElement(tabris_1.Tab, { title: 'SPOKINETIC' }),
                    JSX.createElement(tabris_1.Tab, { title: 'CONTACT', id: 'contact' }),
                    JSX.createElement(tabris_1.Tab, { title: 'SHARE' })))))));
//I removed the following line of code to place the tab folders of "EVENTS", "CALENDAR", "MYCALNEDAR" at the
//top of the screen rather than the bottom. Just a design preference, I'm not sure what is better.
//tabBarLocation='bottom'
const pageRef = $(tabris_1.Page).only();
const imageView = $(tabris_1.ImageView).only();
const titleContainer = $(tabris_1.Stack).only();
const descriptionContainer = $(tabris_1.Composite).only('#descriptionContainer');
const titleView = $(tabris_1.TextView).only('#title');
const quickDescriptionView = $(tabris_1.TextView).only('#quickDescription');
const descriptionView = $(tabris_1.TextView).only('#description');
initFields();
function updateInitialPosition({ height }) {
    imageView.height = height / 2;
    descriptionContainer.height = height * 1.5;
    const titleContainerHeight = titleContainer.bounds.height;
    // We need the offset of the title composite in each scroll event.
    // As it can only change on resize, we assign it here.
    titleContainerY = Math.min(imageView.height - titleContainerHeight, height / 2);
    titleContainer.top = titleContainerY;
}
function updateCurrentPosition({ offset }) {
    imageView.transform = { translationY: Math.max(0, offset * 0.4) };
    titleContainer.transform = { translationY: Math.max(0, offset - titleContainerY) };
    titleContainer.background = primaryColor(calculatetitleContainerOpacity(offset));
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
function initFields() {
    titleView.text = titleString;
    quickDescriptionView.text = quickDescriptionString;
    descriptionView.text = descriptionString;
    imageView.image = eventImage;
}
function onHome() {
    pageRef.find('#initText').first(tabris_1.TextView).text = 'Home Pressed';
}
function onSearch() {
}
function onEvents() {
    eventNotifyInt++;
    pageRef.find('#events').first(tabris_1.Tab).badge = eventNotifyInt; // increment badge val
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRQYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2V2ZW50UGFnZS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FDc0c7QUFHdEcsc0ZBQXNGO0FBQ3RGO0VBQ0U7QUFDRixJQUFJLGlCQUFpQixHQUFHLDJRQUEyUSxDQUFDO0FBQ3BTLElBQUksV0FBVyxHQUFHLGFBQWEsQ0FBQztBQUNoQyxJQUFJLHNCQUFzQixHQUFHLHNDQUFzQyxDQUFDO0FBRXBFLE1BQU0sVUFBVSxHQUFHLHdCQUF3QixDQUFDO0FBQzVDLE1BQU0sWUFBWSxHQUFHLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMscUJBQXFCLE9BQU8sR0FBRyxDQUFDO0FBQ3RFLHNGQUFzRjtBQUV0RixNQUFNLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQztBQUN2QyxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQztBQUVoQyxJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUM7QUFDdkIsSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDO0FBRXhCOztHQUVHO0FBQ0g7Ozs7S0FJSztBQUdMLG9CQUFXLENBQUMsTUFBTSxDQUNoQixrQkFBQyxDQUFDO0lBR0Esa0JBQUMsdUJBQWMsSUFBQyxPQUFPLFFBQUMsbUJBQW1CLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBRSxNQUFNO1FBRWpFLGtCQUFDLHFCQUFZLElBQUUsRUFBRSxFQUFDLFFBQVEsRUFDMUIsS0FBSyxFQUFFLFFBQVEsRUFDZixRQUFRLEVBQUUsUUFBUSxFQUNsQixPQUFPLEVBQUUsV0FBVyxHQUVMO1FBR2Ysa0JBQUMsYUFBSSxJQUFDLEtBQUssRUFBQyxZQUFZO1lBSXRCLGtCQUFDLG1CQUFVLElBQUMsT0FBTyxRQUFDLFFBQVEsRUFBRSxxQkFBcUIsRUFBRSxTQUFTLEVBQUUscUJBQXFCO2dCQUNuRixrQkFBQyxrQkFBUyxJQUFDLFFBQVEsUUFBQyxTQUFTLEVBQUMsTUFBTSxHQUFFO2dC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