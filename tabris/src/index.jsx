/**
 * Main Page / Events Page
 * 
 * TODO:
 *   Refactor process to check if user is already signed in
 *     (Make sign-in persistent between runs)
 *   Implement link to events notifications (perhaps use sidebar/drawer?)
 *   Refactor project: move all other .jsx page files to /pages directory
 */

import {Button, TextView, contentView, AlertDialog, TextInput, Row, CollectionView, 
        TabFolder, Tab, ImageView, Stack, Page, NavigationView, ListView, Cell, Action, 
        SearchAction, ScrollView, Composite, drawer, Popover, StackLayout, RowLayout
      } from 'tabris';
import {CreateEventPage} from './create-event';
import {SignUpPage} from './sign-up';
import {SignInPage} from './sign-in';
//import {EventNotifyPage} from './eventsNotificationPage';
import {CalendarPage} from './calendar-john';
import {AccountPage} from './account';
import {EventPage} from './eventPage';
import {ContactPage} from './contact';

/**
 * Add In Later Iteration
 * Do a method call to initialize these variables eventually
 * Call will be made to events database to pull top events
 * For now set them to stock images
*/

// Temporary(?) boolean to track for new users
var signedInBoolean = false;

const bckgndImage = 'images/mountain2.jpeg';
const magImage = 'images/magGlass.png';

var pOneImage = 'images/running.jpg';
var pTwoImage = 'images/concert.jpg';
var pThreeImage = 'images/obstacleCourse.jpg';

var pOneString = 'Running';
var pTwoString = 'Concerts';
var pThreeString = 'Obstacle Courses';

const searchString = '';
var eventNotifyInt = 0;

/**
 * Creates a Page object to allow use throughout the project
 * 
 * Most useful for connecting pages in the app
 */
export class MainPage extends Page {
  constructor(properties) {
    super();
    this.set({title: 'Spokinetic', ...properties}).append(
      <ImageView centerX centerY width={800} height={1000} opacity={.7}
        image={bckgndImage}
        scaleMode='stretch' />
    );
    this.append(
      <TabFolder paging stretch selectionIndex={0} tabBarLocation='bottom' >

          <Tab title='Events' id='events'>
          </Tab>

          <Tab title='Calendar' onSelect={() => openCalendarPage()}>
          </Tab>

          <Tab title='Contact Us' onSelect={() => openContactPage()}>
          </Tab>

          <Tab title='My Account' onSelect={() => openAccountPage()}>
          </Tab>

        </TabFolder>
    );
    this.append(
      <TabFolder stretchX height={100} background='#234' tabBarLocation='hidden'>
        <Tab>
          <TextView text='EVENTS' textColor='white' font='40px' centerX centerY />
        </Tab>
      </TabFolder>
    );
    this.append(
      <TabFolder paging stretchX centerY height={300} background='#495764' tabBarLocation='hidden'>
        <Tab>
          <ImageView centerX centerY height={250} scaleMode='fit'
            image={pOneImage} 
            onLoad={handleLoad}
            onTap={() => openEventPage()}
            />
          <Button style='flat' text={pOneString} background='#CD5C5C' opacity={.8}></Button>
        </Tab>
        <Tab>
          <ImageView centerX centerY height={250} scaleMode='fit'
            image={pTwoImage} 
            onLoad={handleLoad}
            onTap={() => openEventPage()}
            />
          <Button style='flat' text={pTwoString} background='#CD5C5C'opacity={.8}></Button>
        </Tab>
        <Tab>
          <ImageView centerX centerY height={250} scaleMode='fit'
            image={pThreeImage} 
            onLoad={handleLoad}
            onTap={() => openEventPage()}
            />
          <Button style='flat' text={pThreeString} background='#CD5C5C'opacity={.8}></Button>
        </Tab>
        <Tab>
          <Button center onSelect={() => openCreatePage()}>Create new event</Button>
        </Tab>
      </TabFolder>
    );
  }
}

contentView.append(
  <$>
    <NavigationView stretch drawerActionVisible='true' onSelect={onHome}>
      <SearchAction  id='search' message='Search'
      image={magImage}
      onSelect={onSearch}
      onInput={handleInput} />

      <Page />
    </NavigationView>
  </$>
);

drawer.append(
  <TextView centerY left={16}>Hello, World! You've found me!</TextView>
);

const pageRef = $(Page).only(); 
//  '$'  is equivalent to 'tabris.contentView.find'  

checkShowLanding();

/**
 * Checks if user is already signed in
 */
function checkShowLanding(){
  if(!signedInBoolean) {
    showLanding();
  }
}

/**
 * Opens "Create New Event" page
 */ 
function openCreatePage() {
  $(NavigationView).only().append(
    <CreateEventPage />
  );
}

/**
 * Opens a Calendar page
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
 * Opens a Contact page
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

/**
 * Opens an Account Details page
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
 * Opens an Event page
 */
function openEventPage() {
  $(NavigationView).only().append(
    <EventPage />
  );
}

/**
 * Initial page user sees. Prompts user to sign up.
 * 
 * TO DO:
 * add padding to ScrollView 
 * make sizing more generic for different screen sizes
 * bypass this page if already signed in
 * include info in the white space below the "get started button"
 * make stack section scrollable: see eventPage.jsx.
 * pull out common setters, (replicated code) 
 * (i.e. all text is white, set it outside of popover with a reference to the entire popover tag)
 */
function showLanding() {
  const popover = Popover.open(
    <Popover>
  
        <Stack background='#79a6e1' stretchX height={550}>
          <ScrollView top background='#234' stretchX height={72} direction='horizontal' layout={new RowLayout({alignment: 'stretchY'})}>
            <TextView left textColor='white' font='bold 35px'>  Spokinetic    </TextView>
            <Button style='text' textColor='white' left={16} font='bold 14px' onSelect={() => showSignIn(popover)}>SIGN IN</Button>
            {/*<TextView textColor='white'> | </TextView>
            <Button style='text' textColor='white' font='bold 14px' onSelect={() => showSignUp(popover)}>SIGN UP</Button>*/}
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

/**
 * Opens a notifications page
 * 
 * Currently not in use
 * 
 * TODO:
 *   Create an EventNotifyPage
 *   Connect to this page
 */
/*function showNotificationPage(popover){
  popover.close();
  $(NavigationView).only().append(
    <EventNotifyPage />
  );
}*/

/**
 * Add In Later Iteration
 * Home button hasn't been set.
 * Navigates to main page
 */
function onHome(){
  pageRef.find('#initText').first(TextView).text = 'Home Pressed';
}
/**
 * Add In Later Iteration
 * Search bar has no search functionality
 * Brings up keyboard and allows input
 */
function onSearch(){

}
/**
 * Add In Later Iteration
 * Ment to handle search bar input
 * Save input for auto fill functionality or
 * suggestions while typing
 */
function handleInput(){

}

/* @param {tabris.ImageViewLoadEvent} event */
function handleLoad({target, error}) {
  new TextView({
    centerX: target.centerX, top: [target, 8]
    //text: error ? 'Error' : 'Success'
  }).insertAfter(target);
}

/**
 * Add In Later Iteration
 * Incrementing the badge is currently for proof of concept
 * OnEvents is associated with "events" tab. Tab may change
 * to a notification tab. Events are visible in both calendar
 * views.
 */
function onEvents(){
  eventNotifyInt ++;
  pageRef.find('#events').first(Tab).badge = eventNotifyInt; // increment badge val
}
