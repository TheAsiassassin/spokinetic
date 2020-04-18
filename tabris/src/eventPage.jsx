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


contentView.append(
  <$>
    

    <NavigationView stretch drawerActionVisible='true' onSelect={onHome}>
      
      <SearchAction  id='search'
      image={magImage}
      onSelect={onSearch}
      onInput={handleInput}
      >
      </SearchAction>
      

      <Page title='Spokinetic'>



        <ScrollView stretch onResize={updateInitialPosition} onScrollY={updateCurrentPosition}>
          <ImageView stretchX scaleMode='fill'/>
          <Composite id='descriptionContainer' stretchX top='next()' height={800} padding={16} background='white'>
            <TextView id='description' stretchX/>
          </Composite>
          <Stack stretchX alignment='stretchX' padding={16} background={primaryColor(TITLE_VIEW_OPACITY)}>
            <TextView id='quickDescription' font='bold 16px' textColor='black'/>
            <TextView id='title' font='medium 24px' textColor='white'/>
          </Stack>


          <TabFolder paging stretch selectionIndex={0}  >

            <Tab title='Events' id='events' 
            badge={eventNotifyInt}
            onSelect={onEvents}>
            </Tab>

            <Tab title='Calendar'>
            </Tab>

            <Tab title='MyCalendar'>
            </Tab>

          </TabFolder>


          <TabFolder stretch selectionIndex={0} tabBarLocation='bottom'>

            <Tab title= 'SPOKINETIC'>
            </Tab>

            <Tab title='CONTACT' id='contact'>
            </Tab>

            <Tab title='SHARE'>
            </Tab>

          </TabFolder>

        </ScrollView>

      </Page>

    </NavigationView>
  </$>
);

//I removed the following line of code to place the tab folders of "EVENTS", "CALENDAR", "MYCALNEDAR" at the
//top of the screen rather than the bottom. Just a design preference, I'm not sure what is better.
//tabBarLocation='bottom'

const pageRef = $(Page).only();

const imageView = $(ImageView).only();
const titleContainer = $(Stack).only();
const descriptionContainer = $(Composite).only('#descriptionContainer');

const titleView = $(TextView).only('#title');
const quickDescriptionView = $(TextView).only('#quickDescription');
const descriptionView = $(TextView).only('#description');

initFields();

function updateInitialPosition({height}) {
  imageView.height = height / 2;
  descriptionContainer.height = height * 1.5;
  const titleContainerHeight = titleContainer.bounds.height;
  // We need the offset of the title composite in each scroll event.
  // As it can only change on resize, we assign it here.
  titleContainerY = Math.min(imageView.height - titleContainerHeight, height / 2);
  titleContainer.top = titleContainerY;
}

function updateCurrentPosition({offset}) {
  imageView.transform = {translationY: Math.max(0, offset * 0.4)};
  titleContainer.transform = {translationY: Math.max(0, offset - titleContainerY)};
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
function initFields(){
  titleView.text = titleString;
  quickDescriptionView.text = quickDescriptionString;
  descriptionView.text = descriptionString;
  imageView.image = eventImage;
}

function onHome(){
  pageRef.find('#initText').first(TextView).text = 'Home Pressed';
}

function onSearch(){

}

function onEvents(){
  eventNotifyInt ++;
  pageRef.find('#events').first(Tab).badge = eventNotifyInt; // increment badge val
}

function handleInput(){

}

/* @param {tabris.ImageViewLoadEvent} event */
function handleLoad({target, error}) {
  new TextView({
    centerX: target.centerX, top: [target, 8]
    //text: error ? 'Error' : 'Success'
  }).insertAfter(target);
}
