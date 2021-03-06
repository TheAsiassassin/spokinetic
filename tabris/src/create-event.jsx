/**
 * Create New Event Page
 * 
 * TODO:
 *   Add functionality to follow up on successful submission
 *     Connect to DB and add record
 */

import {Button, ImageView, TextInput, TextView, contentView, device, Page, NavigationView, Percent, Picker, SearchAction, TabFolder, Tab, ScrollView, StackLayout, CheckBox, AlertDialog, Color, DateDialog, TimeDialog} from 'tabris';

const TYPE = ['Personal', 'Group', 'Business'];
var mainContentHeightInt;
var mainContentHeightPortraitInt;
var mainContentHeightLandscapeInt;

const defaultButtonColor = new Button().textColor;

/**
 * Establish viewing size so main content doesn't cover up
 *   navigation tabs at bottom of app
 */
if(device.orientation == 'portrait-primary' || device.orientation == 'portrait-secondary') {
  mainContentHeightPortraitInt = (device.screenHeight - 50);
  mainContentHeightLandscapeInt = (device.screenWidth - 35);
  mainContentHeightInt = mainContentHeightPortraitInt;
} else if(device.orientation == 'landscape-primary' || device.orientation == 'landscape-secondary') {
  mainContentHeightLandscapeInt = (device.screenHeight - 35);
  mainContentHeightPortraitInt = (device.screenWidth - 50);
  mainContentHeightInt = mainContentHeightLandscapeInt;
}

device.onOrientationChanged(changeContentHeight);

/**
 * Creates a Page object to allow use throughout the project
 * 
 * Most useful for connecting pages in the app
 */
export class CreateEventPage extends Page {
  constructor(properties) {
    super();
    this.set({title: '', ...properties}).append(
        <ImageView centerX centerY width={800} height={1000} opacity={.7}
        image={'images/mountain2.jpeg'}
        scaleMode='fill' />
    );
    this.append(
      <TabFolder id='mainContent' stretchX height={mainContentHeightInt} tabBarLocation='hidden'>
          <Tab>
            <ScrollView stretch layout={new StackLayout({spacing: 16, alignment: 'stretchX'})} padding={32}>
              <TextView top='85' left='8' textColor='white'>* All fields required *</TextView>
              <TextInput id='title' top='15' autoCapitalize='sentence' autoCorrect='true' message='Title'/>
              <TextInput id='description' height='100' type='multiline' autoCapitalize='sentence' autoCorrect='true' message='Description'/>
              <TextInput id='tags' autoCapitalize='sentence' autoCorrect='true' message='Tags'/>
              <TextView top='5' left='8' font='12px' textColor='white' markupEnabled>Separate tags with commas,<br/>at least one required</TextView>
              <TextInput id='location' autoCapitalize='sentence' autoCorrect='true' message='Location'/>
              <Button id='date' onSelect={showDateDialog} text='Date'/>
              <Button id='time' onSelect={showTimeDialog} text='Time'/>
              <Button centerX onTap={createEvent}>Submit</Button>
            </ScrollView>
          </Tab>
        </TabFolder>
    );
    this.append(
      <TabFolder stretchX height={100} background='#234' tabBarLocation='hidden'>
        <Tab>
          <TextView text='CREATE EVENT' textColor='white' font='40px' centerX centerY />
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
  if(device.orientation == "portrait-primary" || device.orientation == "portrait-secondary") {
    mainContentHeightInt = mainContentHeightPortraitInt;
  } else {
    mainContentHeightInt = mainContentHeightLandscapeInt;
  }

  $('#mainContent').set({height: mainContentHeightInt});
}

/**
 * Displays dialog prompting for a valid date
 * 
 * If process is completed, selected date is displayed
 * If process is cancelled, 'Date' is once again displayed
 */
async function showDateDialog() {
  const {date} = await DateDialog.open().onClose.promise();
  $(Button).only('#date').text = date ? `${date.toDateString()}` : 'Date';
}

/**
 * Parses Date string to create a more readable format
 * 
 * @param {String} rawString
 * 
 * TODO:
 *   Re-implement
 *   Debug issues with initial parse
 */
function parseDate(rawString) {
  var dateParts = [rawString.substring(0, 3), rawString.substring(4, 7), rawString.substring(8, 10), rawString(11)];

  console.log(dateParts);

  switch(dateParts[0]) {
    case 'Sun':
      dateParts[0] = 'Sunday, ';
      break;
    case 'Mon':
      dateParts[0] = 'Monday, ';
      break;
    case 'Tue':
      dateParts[0] = 'Tuesday, ';
      break;
    case 'Wed':
      dateParts[0] = 'Wednesday, ';
      break;
    case 'Thu':
      dateParts[0] = 'Thursday, ';
      break;
    case 'Fri':
      dateParts[0] = 'Friday, ';
      break;
    case 'Sat':
      dateParts[0] = 'Saturday, ';
      break;
  }

  switch(dateParts[1]) {
    case 'Jan':
      dateParts[0] = 'January ';
      break;
    case 'Feb':
      dateParts[0] = 'February ';
      break;
    case 'Mar':
      dateParts[0] = 'March ';
      break;
    case 'Apr':
      dateParts[0] = 'April ';
      break;
    case 'May':
      dateParts[0] = 'May ';
      break;
    case 'Jun':
      dateParts[0] = 'June ';
      break;
    case 'Jul':
      dateParts[0] = 'July ';
      break;
    case 'Aug':
      dateParts[0] = 'August ';
      break;
    case 'Sep':
      dateParts[0] = 'September ';
      break;
    case 'Oct':
      dateParts[0] = 'October ';
      break;
    case 'Nov':
      dateParts[0] = 'November ';
      break;
    case 'Dec':
      dateParts[0] = 'December ';
      break;
  }

  if(dateParts[2][0] == '0') dateParts[2] = dateParts[2].substring(1);

  return dateParts[0] + dateParts[1] + dateParts[2] + ', ' + dateParts[3];
}

/**
 * Displays dialog prompting for a valid time
 * 
 * If process is completed, selected time is displayed
 * If process is cancelled, display is not changed
 * 
 * TODO:
 *   Debug setting text when cancelled/'false'
 */
async function showTimeDialog() {
  const {date} = await TimeDialog.open().onClose.promise();
  var time = parseTime(date.toTimeString());
  $(Button).only('#time').text = date ? time : 'Time';
}

/**
 * Parses Time string to create a more readable format
 *   HH:MM AM/PM
 * 
 * @param {String} rawString
 */
function parseTime(rawString) {
  var timeString = '';
  var colonCount = 0;
  
  for(var i = 0; i < rawString.length; i++) {
    if(rawString[i] == ':' && colonCount == 1) break;
    else {
      timeString += rawString[i];
      if(rawString[i] == ':') colonCount++;
    }
  }

  var hour = timeString.substring(0, 2);
  var min = timeString.substring(3);
  var isAM = true;

  if(hour == 0) hour = 12;
  else if(hour == 12) isAM = false;
  else if(hour > 12) {
    hour = hour - 12;
    isAM = false;
  }

  timeString = hour + ':' + min;
  if(isAM) timeString += ' AM';
  else timeString += ' PM';

  return timeString;
}

/**
 * Provides basic data validation for the fields
 *   on the page
 * 
 * TODO:
 *   Provide proper follow-up once the data is
 *     determined to be valid
 *   Refactor data validation to provide more valid
 *     checks/make more secure once connected to DB
 */
function createEvent() {
  var promptBoolean = false;
  var field = $(TextInput).only('#title');

  if(field.text.length == 0) {
    field.set({borderColor: new Color(255, 0, 0)});
    promptBoolean = true;
  } else {
    field.set({borderColor: new Color(255, 255, 255)});
  }

  field = $(TextInput).only('#description');
  if(field.text.length == 0) {
    field.set({borderColor: new Color(255, 0, 0)});
    promptBoolean = true;
  } else {
    field.set({borderColor: new Color(255, 255, 255)});
  }

  field = $(TextInput).only('#tags');
  if(field.text.length == 0) {
    field.set({borderColor: new Color(255, 0, 0)});
    promptBoolean = true;
  } else {
    field.set({borderColor: new Color(255, 255, 255)});
  }

  field = $(TextInput).only('#location');
  if(field.text.length == 0) {
    field.set({borderColor: new Color(255, 0, 0)});
    promptBoolean = true;
  } else {
    field.set({borderColor: new Color(255, 255, 255)});
  }

  field = $(Button).only('#date');
  if(field.text == 'Date') {
    field.set({textColor: new Color(255, 0, 0)});
    promptBoolean = true;
  } else {
    field.set({textColor: defaultButtonColor});
  }

  field = $(Button).only('#time');
  if(field.text == 'Time') {
    field.set({textColor: new Color(255, 0, 0)});
    promptBoolean = true;
  } else {
    field.set({textColor: defaultButtonColor});
  }

  if(promptBoolean) {
    AlertDialog.open(
      <AlertDialog title='Invalid data' message={'Please correct fields highlighted in red'} buttons={{ok: 'OK'}}/>
    );
  } else {
    AlertDialog.open(
      <AlertDialog title='Create event?' message={'Are you sure you want to create this event?'} buttons={{ok: 'Yes', cancel: 'No'}}/>
    );
  }
}