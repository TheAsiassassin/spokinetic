/**
 * Notifications Settings Page
 * 
 * TODO:
 *   Add push notification functionality, if possible
 *   Add functionality to save preferences (connect to DB)
 */

import {TextView, ScrollView, Stack, StackLayout, contentView, Page, TabFolder, Tab, NavigationView, Composite, TextInput, CheckBox, Button, AlertDialog, RowLayout, Popover, ImageView, Switch} from 'tabris';

// Boolean variables to persist data within a run
// TODO: connect to DB so data can persist between runs (and be dynamically read here)
var updatedBool = true;
var upcomingBool = true;
var cancelledBool = true;

/**
 * Creates a Page object to allow use throughout the project
 * 
 * Most useful for connecting pages in the app
 */
export class NotificationMenu extends Page {
  constructor(properties) {
    super();
    this.set({title: 'Notifications', ...properties}).append(
      <TabFolder id='mainContent' stretchX height={450} tabBarLocation='hidden'>
        <Tab>
          <ScrollView stretch layout={new StackLayout({spacing: 4, alignment: 'stretchX'})} padding={12}>
            <TextView font='bold 24px' left={4} bottom={8} text='Notify me when:'/>
            <Composite>
              <Button stretchX background='white'/>
              <TextView left left={8} background='white' textColor='#234' text='An event is updated' font='16px' centerY/>
              <Switch id='updated' right right={8} centerY checked={updatedBool} onCheckedChanged={() => setBool()}/>
            </Composite>
            <Composite>
              <Button stretchX background='white'/>
              <TextView left left={8} background='white' textColor='#234' text='An event is coming up' font='16px' centerY/>
              <Switch id='upcoming' right right={8} centerY checked={upcomingBool} onCheckedChanged={() => setBool()}/>
            </Composite>
            <Composite>
              <Button stretchX background='white'/>
              <TextView left left={8} background='white' textColor='#234' text='An event is cancelled' font='16px' centerY/>
              <Switch id='cancelled' right right={8} centerY checked={cancelledBool} onCheckedChanged={() => setBool()}/>
            </Composite>
          </ScrollView>
        </Tab>
      </TabFolder>
    );
  }
}

/**
 * Updates boolean values, allowing data to persist in a run
 * 
 * TODO:
 *   Implement functionality to store data in DB to allow data to persist between runs
 */
function setBool() {
  updatedBool = $(Switch).only('#updated').checked;
  upcomingBool = $(Switch).only('#upcoming').checked;
  cancelledBool = $(Switch).only('#cancelled').checked;
}