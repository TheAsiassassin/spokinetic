/**
 * Email Settings Page
 * 
 * TODO:
 *   Add functionality to update email (requires DB connection)
 */

import {TextView, ScrollView, StackLayout, Page, TabFolder, Tab, TextInput, Button} from 'tabris';

const curEmail = 'Spokinetic@gmail.com';

/**
 * Creates a Page object to allow use throughout the project
 * 
 * Most useful for connecting pages in the app
 */
export class EmailMenu extends Page {
  constructor(properties) {
    super();
    this.set({title: 'Change Email', ...properties}).append(
      <TabFolder id='mainContent' stretchX height={450} tabBarLocation='hidden'>
        <Tab>
          <ScrollView stretch layout={new StackLayout({spacing: 16, alignment: 'stretchX'})} padding={12}>
            <TextView left={8} top={16} text='Email' font='12px'/>
            <TextInput id='change-email' top={8} text='Spokinetic@gmail.com' style='underline' keyboard='email' font='20px' onTextChanged={() => updateButton()}/>
            <Button id='update-email' top={32} stretchX text='SAVE' enabled={false}/>
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
  if($(TextInput).only('#change-email').text === curEmail || $(TextInput).only('#change-email').text.length === 0)
    $(Button).only('#update-email').enabled = false;
  else
    $(Button).only('#update-email').enabled = true;
}
