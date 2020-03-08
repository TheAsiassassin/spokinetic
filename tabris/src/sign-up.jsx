import {Button, ImageView, TextInput, TextView, contentView, device, Page, NavigationView, Percent, Picker, SearchAction, TabFolder, Tab, ScrollView, StackLayout, CheckBox, AlertDialog, Color} from 'tabris';

const TYPE = ['Personal', 'Group', 'Business'];
var mainContentHeightInt;
var mainContentHeightPortraitInt;
var mainContentHeightLandscapeInt;

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

contentView.append(
  <$>
    <NavigationView stretch drawerActionVisible='true'>
      <SearchAction id='search' message='Search'
        image={'images/magGlass.png'}>
      </SearchAction>
      
      <Page title='Spokinetic'>
        <ImageView centerX centerY width={800} height={1000} opacity={.7}
        image={'images/mountain2.jpeg'}
        scaleMode='fill' />

        <TabFolder paging stretch tabBarLocation='bottom'>
          <Tab title='Events' id='events' badge={0}></Tab>
          <Tab title='Calendar'></Tab>
          <Tab title='My Calendar'></Tab>
        </TabFolder>

        <TabFolder id='mainContent' stretchX height={mainContentHeightInt} tabBarLocation='hidden'>
          <Tab>
            <ScrollView stretch layout={new StackLayout({spacing: 16, alignment: 'stretchX'})} padding={32}>
              <TextView top='85' left='8' textColor='white'>* indicates a required field</TextView>
              <TextInput id='email' top='15' message='Email Address*'/>
              <TextInput id='username' message='Username*'/>
              <TextInput id='reusername' message='Re-enter Username*'/>
              <TextInput id='password' type='password' message='Password*'/>
              <TextView top='5' left='8' font='12px' textColor='white'>Must be at least 8 characters</TextView>
              <TextInput id='repassword' top='10' type='password' message='Re-enter Password*'/>
              <Picker id='accountType' background='white' itemCount={TYPE.length} itemText={(index) => TYPE[index]} message='Account Type*'/>
              <CheckBox id='termsConditions' text='I agree to the Terms and Conditions*' textColor='white'/>
              <CheckBox id='notifications' text='I would like to receive email notifications (optional)' textColor='white'/>
              <Button centerX onTap={signUp}>Submit</Button>
            </ScrollView>
          </Tab>
        </TabFolder>

        <TabFolder stretchX height={100} background='#234' tabBarLocation='hidden'>
          <Tab>
            <TextView text='SIGN UP' textColor='white' font='40px' centerX centerY />
          </Tab>
        </TabFolder>

      </Page>
      
    </NavigationView>
  </$>
);

function changeContentHeight() {
  if(device.orientation == "portrait-primary" || device.orientation == "portrait-secondary") {
    mainContentHeightInt = mainContentHeightPortraitInt;
  } else {
    mainContentHeightInt = mainContentHeightLandscapeInt;
  }

  $('#mainContent').set({height: mainContentHeightInt});
}

// Basic validation for when the submit button is pressed
function signUp() {
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
    AlertDialog.open(
      <AlertDialog title='Sign up?' message={'Are you sure you want to sign up?'} buttons={{ok: 'Yes', cancel: 'No'}}/>
    );
  }
}