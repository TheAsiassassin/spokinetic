/**
 * Profile Settings Page
 * 
 * TODO:
 *   Add functionality to edit profile (requires DB connection to persist)
 *     Each field gets its own page
 *       vs.
 *     All done on this page
 */

import {TextView, ScrollView, StackLayout, Page, TabFolder, Tab, NavigationView, Composite, Button} from 'tabris';
import {UsernameMenu} from './username-menu';
import {EmailMenu} from './email-menu';
import {PasswordMenu} from './password-menu';
import {PictureMenu} from './picture-menu';

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
            <Composite elevation={4} onTap={() => toUsernameMenu()}>
              <Button stretchX background='white'/>
              <Button left left={4} background='white' textColor='#234' text='Username'/>
              <TextView right right='next() 4' background='white' textColor='#aaa' text='Spokinetic' font='12px' centerY/>
              <Button right right={8} background='white' textColor='#aaa' text='>'/>
            </Composite>
            <Composite elevation={4} onTap={() => toEmailMenu()}>
              <Button stretchX background='white'/>
              <Button left left={4} background='white' textColor='#234' text='Email'/>
              <TextView right right='next() 4' background='white' textColor='#aaa' text='Spokinetic@gmail.com' font='12px' centerY/>
              <Button right right={8} background='white' textColor='#aaa' text='>'/>
            </Composite>
            <Composite elevation={4} onTap={() => toPasswordMenu()}>
              <Button stretchX background='white'/>
              <Button left left={4} background='white' textColor='#234' text='Password'/>
              <TextView right right='next() 4' background='white' textColor='#aaa' font='12px' text='**********' centerY/>
              <Button right right={8} background='white' textColor='#aaa' text='>'/>
            </Composite>
            <Composite elevation={4} onTap={() => toPictureMenu()}>
              <Button stretchX background='white'/>
              <Button left left={4} background='white' textColor='#234' text='Profile Picture'/>
              <Button right right={8} background='white' textColor='#aaa' text='>'/>
            </Composite>
          </ScrollView>
        </Tab>
      </TabFolder>
    );
  }
}

/**
 * Navigate to Username submenu
 */
function toUsernameMenu() {
  $(NavigationView).only().append(
    <UsernameMenu />
  );
}

/**
 * Navigate to Email submenu
 */
function toEmailMenu() {
  $(NavigationView).only().append(
    <EmailMenu />
  )
}

/**
 * Navigate to Password submenu
 */
function toPasswordMenu() {
  $(NavigationView).only().append(
    <PasswordMenu />
  )
}

/**
 * Navigate to Picture submenu
 */
function toPictureMenu() {
  $(NavigationView).only().append(
    <PictureMenu />
  );
}
