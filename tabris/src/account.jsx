/**
 * Account Details Page
 * 
 * TODO:
 *   Add options to main Account page
 *   Add suboptions to each option from Account page
 *     'Directory'-esque setup
 */

import {TextView, ScrollView, Stack, StackLayout, Page, TabFolder, Tab, NavigationView, Composite, Button, AlertDialog, RowLayout, Popover, ImageView, ActionSheet, ActionSheetItem, Camera, app, device, permission, CameraView, Picker} from 'tabris';
import {MainPage} from './index';
import {CalendarPage} from './calendar-john';
import {ContactPage} from './contact';
import {SignInPage} from './sign-in';
import {SignUpPage} from './sign-up';
import {AccountMenu} from './account-menu';
import {PreferencesMenu} from './preferences-menu';

const items = ['[Profile Image]', 'Edit Preferences', 'Account Settings', 'Log Out'];
var pic_popover;
var cameraIndex = 0;

app.idleTimeoutEnabled = false;
let camera = device.cameras[0];

permission.withAuthorization('camera',
  () => camera.active = true,
  () => console.log('"camera" permission is required.'),
  (e) => console.error(e));

/**
 * Creates a Page object to allow use throughout the project
 * 
 * Most useful for connecting pages in the app
 */
export class AccountPage extends Page {
  constructor(properties) {
    super();
    this.set({title: 'My Account', ...properties}).append(
      <TabFolder paging stretch selectionIndex={3} tabBarLocation='bottom'>

        <Tab title='Events' id='events' onSelect={() => openMainPage()}>
        </Tab>

        <Tab title='Calendar' onSelect={() => openCalendarPage()}>
        </Tab>

        <Tab title='Contact Us' onSelect={() => openContactPage()}>
        </Tab>

        <Tab title='My Account'>
        </Tab>

      </TabFolder>
    );
    this.append(
      <TabFolder id='mainContent' stretchX height={450} tabBarLocation='hidden'>
        <Tab>
          <ScrollView stretch layout={new StackLayout({spacing: 16, alignment: 'stretchX'})} padding={12}>
            <Composite background='linear-gradient(0deg, #0288d1 10%, #00dfff)' height={160} padding={16}>
              <ImageView id='profile' image='images/Spokinetic_imgLogo.png' height={96} width={96} centerX cornerRadius={48} scaleMode='fill' onTap={() => editProfilePic()}/>
              <TextView text='@Spokinetic' font='bold 16px' top='prev() 12' centerX textColor='white'/>
            </Composite>
            <Composite elevation={4} onTap={() => toPreferencesMenu()}>
              <Button stretchX background='white'/>
              <Button left left={4} background='white' textColor='#234' text='Edit Event Preferences'/>
              <Button right right={8} background='white' textColor='#aaa' text='>'/>
            </Composite>
            <Composite elevation={4} onTap={() => toAccountMenu()}>
              <Button stretchX background='white'/>
              <Button left left={4} background='white' textColor='#234' text='Account Settings'/>
              <Button right right={8} background='white' textColor='#aaa' text='>'/>
            </Composite>
            <Button elevation={4} stretchX background='white' textColor='red' text='Log Out' onTap={() => logOut()}/>
          </ScrollView>
        </Tab>
      </TabFolder>
    );
  }
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
 * Opens the Contact Us page
 * 
 * detach() is called to prevent the 'hamburger menu'
 *   from being replaced by a back button titled
 *   'Spokinetic'
 */
function openContactPage() {
  const navigationView = $(NavigationView).only();
  navigationView.pages().detach();
  navigationView.append(
    <ContactPage />
  );
}

function editProfilePic() {
  pic_popover = Popover.open(
    <Popover>
      <Stack stretch alignment='stretchX' padding={16} spacing={16}>
        <CameraView top bottom={16} background='#dddddd' camera={camera}/>
        <Picker message='Camera'
          itemCount={device.cameras.length}
          itemText={index => device.cameras[index].position}
          selectionIndex={cameraIndex}
          onSelect={cameraSelected}/>
        <Composite>
          <Button left text='Cancel' onSelect={() => pic_popover.close()}/>
          <Button right text='Take Picture' onSelect={updatePicture}/>
        </Composite>
      </Stack>
    </Popover>
  );
}

function cameraSelected({index}) {
  camera.active = false;
  cameraIndex = index;
  camera = device.cameras[index];
  camera.active = true;
  pic_popover.contentView.find(CameraView).only().camera = camera;
}

async function updatePicture() {
  const capturedImage = await camera.captureImage({flash: 'auto'});
  $(ImageView).only('#profile').image = capturedImage.image;
  pic_popover.close();
}

/**
 * Navigate to Event Preferences submenu
 */
function toPreferencesMenu() {
  $(NavigationView).only().append(
    <PreferencesMenu />
  );
}

/**
 * Navigate to Account submenu
 */
function toAccountMenu() {
  $(NavigationView).only().append(
    <AccountMenu />
  );
}

/**
 * Logs the user out, redirecting back to original Popover
 * 
 * Prompts user for confirmation, function is asynchronous
 *   out of necessity; actions following the prompt depend
 *   entirely on user's response
 */
async function logOut() {
  const dialog = AlertDialog.open(
    <AlertDialog title='Log Out' message={'Are you sure you want to log out?'} buttons={{ok: 'Yes', cancel: 'No'}}/>
  );
  const {button} = await dialog.onClose.promise();
  if(button === 'ok') {
    openMainPage();
    showLanding();
  }
}

/**
 * Opens the initial welcoming Popover
 * 
 * Essentially a splash screen with options to either
 *   sign up or sign in
 */
function showLanding() {
  const popover = Popover.open(
    <Popover>
    
      <Stack background='#79a6e1' stretchX height={550}>
        <ScrollView top background='#234' stretchX height={72} direction='horizontal' layout={new RowLayout({alignment: 'stretchY'})}>
          <TextView left textColor='white' font='bold 35px'>  Spokinetic    </TextView>
          <Button style='text' textColor='white' left={16} font='bold 14px' onSelect={() => showSignIn(popover)}>SIGN IN</Button>
        </ScrollView>
            
        <TextView centerX top={60} textColor='white' font='bold 40px'>Welcome!</TextView>
        <TextView centerX textColor='white' font='bold 24px'>All your local events, right</TextView>
        <TextView centerX top={5} textColor='white' font='bold 24px'>in the palm of your hand</TextView>
        <Button centerX top={105} width={300} height={70} background='#77c666' style='flat' font='bold 18px' textColor='white' 
         onSelect={() => showSignUp(popover)}>Get Started</Button>
      </Stack>
  
      <TextView bottom centerX textColor='#2f2f2f' font='bold 9px'>James Tollefson | Ian Oleson | John Petrovich | Steven McConnell</TextView>
  
    </Popover>
  );
}

/**
 * Opens a Sign-Up page
 * 
 * @param {Popover} popover
 * 
 * detach() is called to prevent the 'hamburger menu'
 *   from being replaced by a back button titled
 *   'Spokinetic', without this call the main app
 *   can be accessed without an account
 * 
 * The toolbar is removed to further enforce this
 */
function showSignUp(popover) {
  popover.close();
  const navigationView = $(NavigationView).only();
  navigationView.pages().detach();
  navigationView.append(
    <SignUpPage />
  );
  navigationView.set({toolbarVisible: false});
}
 
/**
 * Opens a Sign-In page
 * 
 * @param {Popover} popover
 * 
 * detach() is called to prevent the 'hamburger menu'
 *   from being replaced by a back button titled
 *   'Spokinetic', without this call the main app
 *   can be accessed without an account
 * 
 * The toolbar is removed to further enforce this
 */
function showSignIn(popover) {
  popover.close();
  const navigationView = $(NavigationView).only();
  navigationView.pages().detach();
  navigationView.append(
    <SignInPage />
  );
  navigationView.set({toolbarVisible: false});
}
