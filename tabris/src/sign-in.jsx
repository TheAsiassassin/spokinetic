/**
 * Sign-In Page
 * 
 * TODO:
 *   Add functionality to follow up on successful submission
 *     Connect to DB to verify account exists and username/password match
 */

import {Button, ImageView, TextInput, TextView, contentView, device, Page, NavigationView, Percent, SearchAction, TabFolder, Tab, ScrollView, StackLayout, AlertDialog} from 'tabris';
import {SignUpPage} from './sign-up';
import {MainPage} from './index';

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
export class SignInPage extends Page {
  constructor(properties) {
    super();
    this.set({...properties}).append(
      <ImageView centerX centerY width={800} height={1000} opacity={.7}
        image={'images/mountain2.jpeg'}
        scaleMode='fill' />
    );
    this.append(
      <TabFolder id='mainContent' stretchX height={mainContentHeightInt} tabBarLocation='hidden'>
        <Tab>
          <ScrollView stretch layout={new StackLayout({spacing: 12, alignment: 'stretchX'})} padding={32}>  
            <TextInput id='username' top='135' font='20px' message="Username"/>
            <TextInput id='password' type='password' font='20px' message="Password"/>
            <Button centerX font='bold 16px' onTap={signIn}>Submit</Button>
            <Button top={35} centerX textColor='white' style='text' onTap={showSignUp}>New User? Sign Up Here!</Button>
          </ScrollView>
        </Tab>
      </TabFolder>
    );
    this.append(
      <TabFolder paging stretchX height={100} background='#234' tabBarLocation='hidden'>
        <Tab>
          <TextView text='SIGN IN' textColor='white' font='40px' centerX centerY />
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
 * Opens a Sign-Up page
 * 
 * detach() is called to prevent the 'hamburger menu'
 *   from being replaced by a back button titled
 *   'Spokinetic', without this call the main app
 *   can be accessed without an account
 */
function showSignUp() {
  const navigationView = $(NavigationView).only();
  navigationView.pages().detach();
  navigationView.append(
    <SignUpPage />
  );
}

/**
 * Placeholder function for when the submit button is pressed
 * 
 * TODO:
 *   Provide data validation for input fields
 *   Connect to DB to determine if account exists
 */
function signIn() {
  /* Placeholder to ensure proper capture of raw data
  const message = `Username: ${$(TextInput).only('#username').text}\n` + 
                  `Password: ${$(TextInput).only('#password').text}\n`;
  AlertDialog.open(
    <AlertDialog title='Sign in?' message={message} buttons={{ok: 'Sign-In', cancel: 'Cancel'}}/>
  );*/

  const navigationView = $(NavigationView).only();
  navigationView.pages().detach();
  navigationView.append(
    <MainPage />
  );
  navigationView.set({toolbarVisible: true});
}