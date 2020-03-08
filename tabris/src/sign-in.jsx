import {Button, ImageView, TextInput, TextView, contentView, device, Page, NavigationView, Percent, SearchAction, TabFolder, Tab, ScrollView, StackLayout, AlertDialog} from 'tabris';

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
            <ScrollView stretch layout={new StackLayout({spacing: 12, alignment: 'stretchX'})} padding={32}>  
              <TextInput id='username' top='85' message="Username"/>
              <TextInput id='password' type='password' message="Password"/>
              <Button centerX onTap={signIn}>Submit</Button>
            </ScrollView>
          </Tab>
        </TabFolder>

        <TabFolder paging stretchX height={100} background='#234' tabBarLocation='hidden'>
          <Tab>
            <TextView text='SIGN IN' textColor='white' font='40px' centerX centerY />
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

// Placeholder function for when the submit button is pressed
function signIn() {
  const message = `Username: ${$(TextInput).only('#username').text}\n` + 
                  `Password: ${$(TextInput).only('#password').text}\n`;
  AlertDialog.open(
    <AlertDialog title='Sign in?' message={message} buttons={{ok: 'Sign-In', cancel: 'Cancel'}}/>
  );
}