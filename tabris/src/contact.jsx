/**
 * Contact Us Page
 * 
 * TODO:
 *   Add functionality to follow up on successful submission
 *     Email vs Help Desk Ticket approach
 */

import {Button, ImageView, TextInput, TextView, contentView, device, Page, NavigationView, Percent, Picker, SearchAction, TabFolder, Tab, ScrollView, StackLayout, CheckBox, AlertDialog, Color, Composite, Popover} from 'tabris';
import {MainPage} from './index';
import {CalendarPage} from './calendar-john';
import {AccountPage} from './account';

const TYPE = ['App Issue', 'Report User', 'General Question', 'Other'];
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
export class ContactPage extends Page {
  constructor(properties) {
    super();
    this.set({...properties}).append(
      <ImageView centerX centerY width={800} height={1000} opacity={.7}
        image={'images/mountain2.jpeg'}
        scaleMode='fill' />
    );
    this.append(
      <TabFolder paging stretch selectionIndex={2} tabBarLocation='bottom'>

        <Tab title='Events' id='events' onSelect={() => openMainPage()}>
        </Tab>

        <Tab title='Calendar' onSelect={() => openCalendarPage()}>
        </Tab>

        <Tab title='Contact Us'>
        </Tab>

        <Tab title='My Account' onSelect={() => openAccountPage()}>
        </Tab>

      </TabFolder>
    );
    this.append(
      <TabFolder id='mainContent' stretchX height={mainContentHeightInt} tabBarLocation='hidden'>
        <Tab>
          <ScrollView stretch layout={new StackLayout({spacing: 16, alignment: 'stretchX'})} padding={32}>
            <TextView top='85' left='8' font='16px' textColor='white'>* indicates a required field</TextView>
            <TextInput id='name' top='15' font='20px' message='First Name*'/>
            <TextInput id='username' font='20px' message='Username*'/>
            <Picker id='contactType' background='white' font='20px' itemCount={TYPE.length} itemText={(index) => TYPE[index]} message='Reason for Contact*' onSelectionIndexChanged={isOther}/>
            <TextInput id='otherReason' font='20px' enabled={false}/>
            <TextView text='Provide details below:*' textColor='white'/>
            <TextInput id='description' font='20px' type='multiline' autoCapitalize='sentence' autoCorrect height={100}/>
            <TextInput id='email' font='20px' message='Email*' keyboard='email'/>
            <Button centerX font='bold 16px' onTap={submit}>Submit</Button>
          </ScrollView>
        </Tab>
      </TabFolder>
    );
    this.append(
      <TabFolder stretchX height={100} background='#234' tabBarLocation='hidden'>
        <Tab>
          <TextView text='CONTACT US' textColor='white' font='40px' centerX centerY />
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
 * Enables or disables TextInput depending on value of
 *   Picker widget
 */
function isOther() {
  if($(Picker).only('#contactType').selectionIndex == 3)
    $(TextInput).only('#otherReason').enabled = true;
  else
    $(TextInput).only('#otherReason').enabled = false;
}

/**
 * Opens the Calendar page
 * 
 * detach() is called to prevent the 'hamburger menu'
 *   from being replaced by a back button titled
 *   'Spokinetic'
 */
function openCalendarPage() {
  const navigationView = $(NavigationView).only();
  navigationView.pages().detach();
  navigationView.append(
    <CalendarPage />
  );
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
  
/**
 * Opens the Account Details page
 * 
 * detach() is called to prevent the 'hamburger menu'
 *   from being replaced by a back button titled
 *   'Spokinetic'
 */
function openAccountPage() {
  const navigationView = $(NavigationView).only();
  navigationView.pages().detach();
  navigationView.append(
    <AccountPage />
  );
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
function submit() {
  var promptBoolean = false;
  var field = $(TextInput).only('#email');
  var search = field.text.search(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  if(search == -1 || field.text.length == 0) {
    field.set({borderColor: new Color(255, 0, 0)});
    promptBoolean = true;
  } else {
    field.set({borderColor: new Color(255, 255, 255)});
  }

  field = $(TextInput).only('#name');
  if(field.text.length == 0) {
    field.set({borderColor: new Color(255, 0, 0)});
    promptBoolean = true;
  } else {
    field.set({borderColor: new Color(255, 255, 255)});
  }

  field = $(TextInput).only('#username');
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

  field = $(TextInput).only('#otherReason');
  if($(Picker).only('#contactType').selectionIndex == 3 && field.text.length == 0) {
    field.set({borderColor: new Color(255, 0, 0)});
    promptBoolean = true;
  } else {
    field.set({borderColor: new Color(255, 255, 255)});
  }

  field = $(Picker).only('#contactType');
  if(field.selectionIndex == -1) {
    field.set({borderColor: new Color(255, 0, 0)});
    promptBoolean = true;
  } else {
    field.set({borderColor: new Color(255, 255, 255)});
  }

  if(promptBoolean) {
    AlertDialog.open(
      <AlertDialog title='Invalid data' message={'Please correct fields highlighted in red'} buttons={{ok: 'OK'}}/>
    );
  } else {
    AlertDialog.open(
      <AlertDialog title='Success' message={'Ticket has been submitted!'} buttons={{ok: 'OK'}}/>
    );
    /*const navigationView = $(NavigationView).only();
    navigationView.pages().detach();
    navigationView.append(
      <MainPage />
    );
    navigationView.set({toolbarVisible: true});*/
  }
}