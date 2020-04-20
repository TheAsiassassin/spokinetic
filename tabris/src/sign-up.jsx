import {Button, ImageView, TextInput, TextView, contentView, device, Page, NavigationView, Percent, Picker, SearchAction, TabFolder, Tab, ScrollView, StackLayout, CheckBox, AlertDialog, Color, Composite, Popover} from 'tabris';
import {SignInPage} from './sign-in';
import {MainPage} from './index';

const TYPE = ['Personal', 'Group', 'Business'];
var mainContentHeightInt;
var mainContentHeightPortraitInt;
var mainContentHeightLandscapeInt;

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

export class SignUpPage extends Page {
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
          <ScrollView stretch layout={new StackLayout({spacing: 16, alignment: 'stretchX'})} padding={32}>
            <TextView top='85' left='8' font='16px' textColor='white'>* indicates a required field</TextView>
            <TextInput id='email' top='15' font='20px' message='Email Address*'/>
            <TextInput id='username' font='20px' message='Username*'/>
            <TextInput id='reusername' font='20px' message='Re-enter Username*'/>
            <TextInput id='password' type='password' font='20px' message='Password*'/>
            <TextView top='5' left='8' font='16px' textColor='white'>Must be at least 8 characters</TextView>
            <TextInput id='repassword' top='10' type='password' font='20px' message='Re-enter Password*'/>
            <Picker id='accountType' background='white' font='20px' itemCount={TYPE.length} itemText={(index) => TYPE[index]} message='Account Type*'/>
            <CheckBox id='termsConditions' text='I agree to the Terms and Conditions*' font='20px' textColor='white'/>
            <CheckBox id='notifications' text='I would like to receive email notifications (optional)' font='20px' textColor='white'/>
            <Button centerX font='bold 16px' onTap={signUp}>Submit</Button>
            <Button top={35} centerX textColor='white' style='text' onTap={showSignIn}>Already have an account?</Button>
          </ScrollView>
        </Tab>
      </TabFolder>
    );
    this.append(
      <TabFolder stretchX height={100} background='#234' tabBarLocation='hidden'>
        <Tab>
          <TextView text='SIGN UP' textColor='white' font='40px' centerX centerY />
        </Tab>
      </TabFolder>
    );
  }
}

function changeContentHeight() {
  if(device.orientation == "portrait-primary" || device.orientation == "portrait-secondary") {
    mainContentHeightInt = mainContentHeightPortraitInt;
  } else {
    mainContentHeightInt = mainContentHeightLandscapeInt;
  }

  $('#mainContent').set({height: mainContentHeightInt});
}

function showSignIn() {
  const navigationView = $(NavigationView).only();
  navigationView.pages().detach();
  navigationView.append(
    <SignInPage />
  );
}

// Basic validation for when the submit button is pressed
async function signUp() {
  var promptBoolean = false;
  var field = $(TextInput).only('#email');
  var search = field.text.search(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  if(search == -1 || field.text.length == 0) {
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

  field = $(TextInput).only('#reusername');
  if($(TextInput).only('#username').text != field.text || field.text.length == 0) {
    field.set({borderColor: new Color(255, 0, 0)});
    promptBoolean = true;
  } else {
    field.set({borderColor: new Color(255, 255, 255)});
  }

  field = $(TextInput).only('#password');
  if(field.text.length < 8) {
    field.set({borderColor: new Color(255, 0, 0)});
    promptBoolean = true;
  } else {
    field.set({borderColor: new Color(255, 255, 255)});
  }

  field = $(TextInput).only('#repassword');
  if($(TextInput).only('#password').text != field.text || field.text.length < 8) {
    field.set({borderColor: new Color(255, 0, 0)});
    promptBoolean = true;
  } else {
    field.set({borderColor: new Color(255, 255, 255)});
  }

  field = $(Picker).only('#accountType');
  if(field.selectionIndex == -1) {
    field.set({borderColor: new Color(255, 0, 0)});
    promptBoolean = true;
  } else {
    field.set({borderColor: new Color(255, 255, 255)});
  }

  field = $(CheckBox).only('#termsConditions');
  if(!field.checked) {
    field.set({textColor: new Color(255, 0, 0)});
    promptBoolean = true;
  } else {
    field.set({textColor: new Color(255, 255, 255)});
  }

  if(promptBoolean) {
    AlertDialog.open(
      <AlertDialog title='Invalid data' message={'Please correct fields highlighted in red'} buttons={{ok: 'OK'}}/>
    );
  } else {
    const dialog = AlertDialog.open(
      <AlertDialog title='Sign up?' message={'Are you sure you want to sign up?'} buttons={{ok: 'Yes', cancel: 'No'}}/>
    );
    const {button} = await dialog.onClose.promise();
    if(button === 'ok') {
      const navigationView = $(NavigationView).only();
      navigationView.pages().detach();
      navigationView.append(
        <MainPage />
      );
      navigationView.set({toolbarVisible: true});
    }
  }
}