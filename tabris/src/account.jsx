import {TextView, ScrollView, Stack, StackLayout, contentView, Page, TabFolder, Tab, NavigationView, Composite, TextInput, CheckBox, Button, AlertDialog, RowLayout, Popover} from 'tabris';
import {MainPage} from './index';
import {CalendarPage} from './calendar-john';
import {ContactPage} from './contact';
import {SignInPage} from './sign-in';
import {SignUpPage} from './sign-up';

const items = ['[Profile Image]', 'Edit Preferences', 'Account Settings', 'Log Out'];

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
            <Composite elevation={4}>
              <Button stretchX background='white'/>
              <Button left left={4} background='white' textColor='#234' text='Edit Event Preferences'/>
              <Button right right={8} background='white' textColor='#aaa' text='>'/>
            </Composite>
            <Composite elevation={4}>
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

function openMainPage() {
  const navigationView = $(NavigationView).only();
  navigationView.pages().detach();
  navigationView.append(
    <MainPage />
  );
}

function openCalendarPage() {
  const navigationView = $(NavigationView).only();
  navigationView.pages().detach();
  navigationView.append(
    <CalendarPage />
  );
}

function openContactPage() {
  const navigationView = $(NavigationView).only();
  navigationView.pages().detach();
  navigationView.append(
    <ContactPage />
  );
}

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
  
function showSignUp(popover) {
  popover.close();
  const navigationView = $(NavigationView).only();
  navigationView.pages().detach();
  navigationView.append(
    <SignUpPage />
  );
  navigationView.set({toolbarVisible: false});
}
  
function showSignIn(popover) {
  popover.close();
  const navigationView = $(NavigationView).only();
  navigationView.pages().detach();
  navigationView.append(
    <SignInPage />
  );
  navigationView.set({toolbarVisible: false});
}
