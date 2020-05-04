/**
 * Profile Settings Page
 * 
 * TODO:
 *   Add functionality to edit profile
 *     Each field gets its own page
 *       vs.
 *     All done on this page
 */

import {TextView, ScrollView, Stack, StackLayout, contentView, Page, TabFolder, Tab, NavigationView, Composite, TextInput, CheckBox, Button, AlertDialog, RowLayout, Popover, ImageView} from 'tabris';

/**
 * Creates a Page object to allow use throughout the project
 * 
 * Most useful for connecting pages in the app
 */
export class ProfileMenu extends Page {
  constructor(properties) {
    super();
    this.set({title: 'Profile', ...properties}).append(
      <TabFolder id='mainContent' stretchX height={450} tabBarLocation='hidden'>
        <Tab>
          <ScrollView stretch layout={new StackLayout({spacing: 16, alignment: 'stretchX'})} padding={12}>
            <Composite elevation={4}>
              <Button stretchX background='white'/>
              <Button left left={4} background='white' textColor='#234' text='Username'/>
              <TextView right right='next() 4' background='white' textColor='#aaa' text='Spokinetic' font='12px' centerY/>
              <Button right right={8} background='white' textColor='#aaa' text='>'/>
            </Composite>
            <Composite elevation={4}>
              <Button stretchX background='white'/>
              <Button left left={4} background='white' textColor='#234' text='Email'/>
              <TextView right right='next() 4' background='white' textColor='#aaa' text='Spokinetic@gmail.com' font='12px' centerY/>
              <Button right right={8} background='white' textColor='#aaa' text='>'/>
            </Composite>
            <Composite elevation={4}>
              <Button stretchX background='white'/>
              <Button left left={4} background='white' textColor='#234' text='Password'/>
              <TextView right right='next() 4' background='white' textColor='#aaa' text='********' font='12px' centerY/>
              <Button right right={8} background='white' textColor='#aaa' text='>'/>
            </Composite>
          </ScrollView>
        </Tab>
      </TabFolder>
    );
  }
}
