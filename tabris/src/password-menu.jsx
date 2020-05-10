/**
 * Password Settings Page
 * 
 * TODO:
 *   Add functionality to update password (requires DB connection)
 */

import {TextView, ScrollView, StackLayout, Page, TabFolder, Tab, TextInput, Button} from 'tabris';

/**
 * Creates a Page object to allow use throughout the project
 * 
 * Most useful for connecting pages in the app
 */
export class PasswordMenu extends Page {
  constructor(properties) {
    super();
    this.set({title: 'Change Password', ...properties}).append(
      <TabFolder id='mainContent' stretchX height={450} tabBarLocation='hidden'>
        <Tab>
          <ScrollView stretch layout={new StackLayout({spacing: 16, alignment: 'stretchX'})} padding={12}>
            <TextInput id='current-password' top={16} type='password' message='Current Password' style='underline' font='20px' onTextChanged={() => updateButton()}/>
            <TextInput id='new-password' type='password' message='New Password' style='underline' font='20px' onTextChanged={() => updateButton()}/>
            <TextInput id='confirm-password' type='password' message='Confirm Password' style='underline' font='20px' onTextChanged={() => updateButton()}/>
            <Button id='update-password' top={32} stretchX text='SAVE' enabled={false}/>
          </ScrollView>
        </Tab>
      </TabFolder>
    );
  }
}

/**
 * Enables 'SAVE' button if email is changed, otherwise disables it
 */
function updateButton() {
  if($(TextInput).only('#current-password').text.length < 8 || $(TextInput).only('#new-password').text.length < 8 || $(TextInput).only('#confirm-password').text.length < 8 || $(TextInput).only('#current-password').text === $(TextInput).only('#new-password').text || $(TextInput).only('#new-password').text !== $(TextInput).only('#confirm-password').text)
    $(Button).only('#update-password').enabled = false;
  else
    $(Button).only('#update-password').enabled = true;
}
