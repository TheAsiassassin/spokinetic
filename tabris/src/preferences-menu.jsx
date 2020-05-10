/**
 * Event Preferences Page
 * 
 * TODO:
 *   Add options Account Settings page
 *   Add suboptions to each option from Account page
 *     'Directory'-esque setup
 */

import {TextView, ScrollView, Stack, StackLayout, contentView, Page, TabFolder, Tab, NavigationView, Composite, TextInput, CheckBox, Button, AlertDialog, RowLayout, Popover, ImageView} from 'tabris';
import {InterestsPage} from './interests';
import {NotificationMenu} from './notification-menu';

/**
 * Creates a Page object to allow use throughout the project
 * 
 * Most useful for connecting pages in the app
 */
export class PreferencesMenu extends Page {
  constructor(properties) {
    super();
    this.set({title: 'Event Preferences', ...properties}).append(
      <TabFolder id='mainContent' stretchX height={450} tabBarLocation='hidden'>
        <Tab>
          <ScrollView stretch layout={new StackLayout({spacing: 16, alignment: 'stretchX'})} padding={12}>
            <Composite elevation={4} onTap={() => toInterests()}>
              <Button stretchX background='white'/>
              <Button left left={4} background='white' textColor='#234' text='Interests'/>
              <Button right right={8} background='white' textColor='#aaa' text='>'/>
            </Composite>
            <Composite elevation={4}>
              <Button stretchX background='white'/>
              <Button left left={4} background='white' textColor='#234' text='Priorities'/>
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
function toInterests() {
  $(NavigationView).only().append(
    <InterestsPage />
  );
}
