/**
 * Display event page
 * 
 * TODO:
 *   Connect to DB to dynamically display proper event
 *     (Use event IDs?)
 */

import {Button, AlertDialog, Page, NavigationView, SearchAction, Composite, 
        contentView, ImageView, TabFolder, Tab, ScrollView, Stack, statusBar, TextView} from 'tabris';


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

/**
 * Creates a Page object to allow use throughout the project
 * 
 * Most useful for connecting pages in the app
 */
export class EventPage extends Page {
  constructor(properties) {
    super();
    this.set({...properties}).append(
      <ScrollView stretch onResize={updateInitialPosition} onScrollY={updateCurrentPosition}>

        <ImageView id='eventImage' stretchX scaleMode='fill' image={eventImage}/>
        <Composite id='descriptionContainer' stretchX top='next()' height={800} padding={16} background='white'>
          <TextView id='description' stretchX text={descriptionString}/>
        </Composite>
        <Stack stretchX alignment='stretchX' padding={16} background={primaryColor(TITLE_VIEW_OPACITY)}>
          <TextView id='quickDescription' font='bold 16px' textColor='black' text={quickDescriptionString}/>
          <TextView id='title' font='medium 24px' textColor='white' text={titleString}/>
        </Stack>

        <TabFolder paging stretch selectionIndex={0} tabBarLocation='hidden'  >
          <Tab title='Events' id='events' 
            badge={eventNotifyInt}
            onSelect={() => openMainPage()}>
          </Tab>

          <Tab title='Calendar'>
          </Tab>

          <Tab title='MyCalendar'>
          </Tab>
        </TabFolder>

        <TabFolder stretch selectionIndex={0} tabBarLocation='hidden'>
          <Tab title= 'SPOKINETIC'>
          </Tab>

          <Tab title='CONTACT' id='contact'>
          </Tab>

          <Tab title='SHARE'>
          </Tab>
        </TabFolder>

      </ScrollView>
    );
  }
}

//I removed the following line of code to place the tab folders of "EVENTS", "CALENDAR", "MYCALNEDAR" at the
//top of the screen rather than the bottom. Just a design preference, I'm not sure what is better.
//tabBarLocation='bottom'

// The following code has been commented out due to an inability to directly access Widgets in the above class
/*
const imageView = $(ImageView).only();
const titleContainer = $(Stack).only();
const descriptionContainer = $(Composite).only('#descriptionContainer');

const titleView = $(TextView).only('#title');
const quickDescriptionView = $(TextView).only('#quickDescription');
const descriptionView = $(TextView).only('#description');

initFields();
*/

/**
 * [Insert description]
 * 
 * @param {number} height
 */
function updateInitialPosition({height}) {
  $(ImageView).only('#eventImage').height = height / 2;
  $(Composite).only('#descriptionContainer').height = height * 1.5;
  const titleContainerHeight = $(Stack).only().bounds.height;
  // We need the offset of the title composite in each scroll event.
  // As it can only change on resize, we assign it here.
  titleContainerY = Math.min($(ImageView).only('#eventImage').height - titleContainerHeight, height / 2);
  $(Stack).only().top = titleContainerY;
}

/**
 * [Insert description]
 * 
 * @param {number} offset 
 */
function updateCurrentPosition({offset}) {
  $(ImageView).only('#eventImage').transform = {translationY: Math.max(0, offset * 0.4)};
  $(Stack).only().transform = {translationY: Math.max(0, offset - titleContainerY)};
  $(Stack).only().background = primaryColor(calculatetitleContainerOpacity(offset));
}

/**
 * [Insert description]
 * 
 * @param {number} scrollViewOffsetY 
 */
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

/**
 * Add In Later Iteration
 * Search bar has no search functionality
 * Brings up keyboard and allows input
 */
function onSearch(){

}

/**
 * Opens the Main/Events page
 * 
 * detach() is called to prevent the 'hamburger menu'
 *   from being replaced by a back button titled
 *   'Spokinetic'
 */
function openMainPage() {
  const navigationView = $(NavigationView).only();
  navigationView.pages().detach();
  navigationView.append(
    <MainPage />
  );
}

function handleInput(){

}

/**
 * @param {tabris.ImageViewLoadEvent} event
 */
function handleLoad({target, error}) {
  new TextView({
    centerX: target.centerX, top: [target, 8]
    //text: error ? 'Error' : 'Success'
  }).insertAfter(target);
}
