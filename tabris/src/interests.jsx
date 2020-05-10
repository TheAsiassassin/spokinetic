/**
 * Interests page to set preferences on initial sign-up (and update from 'My Account' tab)
 * 
 * TODO:
 *   Connect to DB for follow-up to create record of new account
 *     Also for updating preferences later in 'My Account'
 *   Verify INTERESTS array includes a sufficient number of interests
 */

import {TextView, ScrollView, StackLayout, device, Page, TabFolder, Tab, Button, Color} from 'tabris';

const INTERESTS = createItems();
var SELECTED = initSelected();
var mainContentHeightInt;
var mainContentHeightPortraitInt;
var mainContentHeightLandscapeInt;

/**
 * Establish viewing size so main content doesn't cover up
 *   navigation tabs at bottom of app
 */
if(device.orientation == 'portrait-primary' || device.orientation == 'portrait-secondary') {
    mainContentHeightPortraitInt = (device.screenHeight - 120);
    mainContentHeightLandscapeInt = (device.screenWidth - 85);
    mainContentHeightInt = mainContentHeightPortraitInt;
} else if(device.orientation == 'landscape-primary' || device.orientation == 'landscape-secondary') {
    mainContentHeightLandscapeInt = (device.screenHeight - 85);
    mainContentHeightPortraitInt = (device.screenWidth - 120);
    mainContentHeightInt = mainContentHeightLandscapeInt;
}

device.onOrientationChanged(changeContentHeight);

/**
 * Creates a Page object to allow use throughout the project
 * 
 * Most useful for connecting pages in the app
 */
export class InterestsPage extends Page {
  constructor(properties) {
    super();
    this.set({title: 'Event Preferences', ...properties}).append(
      <ScrollView id='main' top={100} stretch layout={new StackLayout({spacing: 16, alignment: 'stretchX'})} padding={32}/>
    );
    for(var i = 0; i < INTERESTS.length; i++) {
      var idString = 'interest' + i;
      this.find(ScrollView).only('#main').append(
        <Button id={idString} font='24px'
          textColor={SELECTED[i] ? 'white' : '#234'}
          background={SELECTED[i] ? '#79a6e1' : 'transparent'}
          stretchX text={INTERESTS[i]} onTap={ev => toggleSelected(ev.target)}/>
      );
    }
    this.append(
      <TabFolder stretchX height={100} background='#234' tabBarLocation='hidden'>
        <Tab>
          <TextView text='INTERESTS' textColor='white' font='40px' centerX centerY />
        </Tab>
      </TabFolder>
    );
  }
}

/**
 * Updates main content height when the device is rotated to
 *   prevent content from covering navigation tabs at bottom
 */
function changeContentHeight() {
    if(device.orientation == 'portrait-primary' || device.orientation == 'portrait-secondary') {
        mainContentHeightInt = mainContentHeightPortraitInt;
    } else {
        mainContentHeightInt = mainContentHeightLandscapeInt;
    }

    $('#mainContent').set({height: mainContentHeightInt});
}

/**
 * Create array to represent different interests
 * 
 * TODO
 *   Verify variety of interests
 */
function createItems() {
  const result = [];
  result.push('Art');
  result.push('Baseball');
  result.push('Basketball');
  result.push('Bowling');
  result.push('Breweries');
  result.push('Camping');
  result.push('Concerts');
  result.push('Cooking');
  result.push('Cycling');
  result.push('Dancing');
  result.push('DIY');
  result.push('Fishing');
  result.push('Football');
  result.push('Gaming');
  result.push('Golf');
  result.push('Hiking');
  result.push('Hockey');
  result.push('Hunting');
  result.push('Karaoke');
  result.push('Martial Arts');
  result.push('Motocross');
  result.push('Movies');
  result.push('Museums');
  result.push('Music');
  result.push('Nightlife');
  result.push('Reading');
  result.push('Restaurants');
  result.push('Running');
  result.push('Skiing');
  result.push('Skydiving');
  result.push('Snowboarding');
  result.push('Soccer');
  result.push('Stand-Up Comedy');
  result.push('Swimming');
  result.push('Tennis');
  result.push('Theatre');
  result.push('Travel');
  result.push('Volleyball');
  result.push('Volunteering');
  result.push('Wine Tasting');
  result.push('Working Out');
  result.push('Yoga');

  return result;
}

/**
 * Create array indicating selected state
 * 
 * TODO:
 *   Update w/ connection to DB
 */
function initSelected() {
  var select = [];
  for(var i = 0; i < INTERESTS.length; i++)
    select.push(false);
  
  return select;
}

/**
 * Toggles buttons between two colors to indicate selection
 * 
 * @param {Button} button 
 */
function toggleSelected(button) {
  var id = button.id.substring(8);
  
  if(!SELECTED[id]) {
    button.textColor = 'white';
    button.background = '#79a6e1';
    SELECTED[id] = true;
  } else {
    button.textColor = '#234';
    button.background = 'transparent';
    SELECTED[id] = false;
  }
}
