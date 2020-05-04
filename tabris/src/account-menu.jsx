/**
 * Account Settings Page
 * 
 * TODO:
 *   Add options to main Account page
 *   Add suboptions to each option from Account page
 *     'Directory'-esque setup
 */

import {TextView, ScrollView, Stack, StackLayout, contentView, Page, TabFolder, Tab, NavigationView, Composite, TextInput, CheckBox, Button, AlertDialog, RowLayout, Popover, ImageView} from 'tabris';
import {ProfileMenu} from './profile-menu';
import {NotificationMenu} from './notification-menu';

/**
 * Creates a Page object to allow use throughout the project
 * 
 * Most useful for connecting pages in the app
 */
export class AccountMenu extends Page {
  constructor(properties) {
    super();
    this.set({title: 'Account Settings', ...properties}).append(
      <TabFolder id='mainContent' stretchX height={450} tabBarLocation='hidden'>
        <Tab>
          <ScrollView stretch layout={new StackLayout({spacing: 16, alignment: 'stretchX'})} padding={12}>
            <Composite elevation={4} onTap={() => toProfileMenu()}>
              <Button stretchX background='white'/>
              <Button left left={4} background='white' textColor='#234' text='Profile'/>
              <Button right right={8} background='white' textColor='#aaa' text='>'/>
            </Composite>
            <Composite elevation={4} onTap={() => toNotificationMenu()}>
              <Button stretchX background='white'/>
              <Button left left={4} background='white' textColor='#234' text='Notifications'/>
              <Button right right={8} background='white' textColor='#aaa' text='>'/>
            </Composite>
            <Composite elevation={4}>
              <Button stretchX background='white'/>
              <Button left left={4} background='white' textColor='#234' text='Privacy'/>
              <Button right right={8} background='white' textColor='#aaa' text='>'/>
            </Composite>
          </ScrollView>
        </Tab>
      </TabFolder>
    );
  }
}

/**
 * Navigate to Profile submenu
 */
function toProfileMenu() {
  $(NavigationView).only().append(
    <ProfileMenu />
  );
}

/**
 * Navigate to Notification submenu
 */
function toNotificationMenu() {
  $(NavigationView).only().append(
    <NotificationMenu />
  );
}
