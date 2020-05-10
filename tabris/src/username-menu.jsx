/**
 * Username Settings Page
 * 
 * TODO:
 *   Add functionality to update username (requires DB connection)
 */

import {TextView, ScrollView, StackLayout, Page, TabFolder, Tab, TextInput, Button} from 'tabris';

const curUsername = 'Spokinetic';

/**
 * Creates a Page object to allow use throughout the project
 * 
 * Most useful for connecting pages in the app
 */
export class UsernameMenu extends Page {
  constructor(properties) {
    super();
    this.set({title: 'Change Username', ...properties}).append(
      <TabFolder id='mainContent' stretchX height={450} tabBarLocation='hidden'>
        <Tab>
          <ScrollView stretch layout={new StackLayout({spacing: 16, alignment: 'stretchX'})} padding={12}>
            <TextView left={8} top={16} text='Username' font='12px'/>
            <TextInput id='change-username' top={8} text='Spokinetic' style='underline' font='20px' onTextChanged={() => updateButton()}/>
            <Button id='update-username' top={32} stretchX text='SAVE' enabled={false}/>
          </ScrollView>
        </Tab>
      </TabFolder>
    );
  }
}

/**
 * Enables 'SAVE' button if username is changed, otherwise disables it
 */
function updateButton() {
  if($(TextInput).only('#change-username').text === curUsername || $(TextInput).only('#change-username').text.length === 0)
    $(Button).only('#update-username').enabled = false;
  else
    $(Button).only('#update-username').enabled = true;
}
