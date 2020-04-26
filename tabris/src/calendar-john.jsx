/**
 * Calendar Page
 * 
 * TODO:
 *   Add functionality to show events when a day is tapped
 *   Add functionality to change months (and years?)
 */

import {TextView, CollectionView, Slider, contentView, Page, TabFolder, Tab, NavigationView} from 'tabris';
import {MainPage} from './index';
import {AccountPage} from './account';
import {ContactPage} from './contact';

// Array to name months based on the value returned by date.getMonth()
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Array to name days of the week based on the value returned by date.getDay()
//const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var date = new Date();

const items = createItems();

/**
 * Creates a Page object to allow use throughout the project
 * 
 * Most useful for connecting pages in the app
 */
export class CalendarPage extends Page {
  constructor(properties) {
    super();
    this.set({title: 'Calendar', ...properties}).append(
      <TabFolder paging stretch selectionIndex={1} tabBarLocation='bottom'>

        <Tab title='Events' id='events' onSelect={() => openMainPage()}>
        </Tab>

        <Tab title='Calendar'>
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
          <TextView text={months[date.getMonth()]} textColor='white' font='bold 36px' center />
        </Tab>
      </TabFolder>
    );
    this.append(
      <CollectionView stretchX top='prev()' bottom={35} padding={12}
        columnCount={7}
        cellHeight={50}
        itemCount={items.length}
        createCell={createCell}
        updateCell={updateCell}/>
    );
  }
}

/**
 * Create CollectionView cell, set formatting
 */
function createCell() {
  return new TextView({
    font: {size: 16, weight: 'bold'},
    textColor: '#234',
    alignment: 'centerX',
    maxLines: 1
  });
}

/**
 * Populate CollectionView cell with data
 * 
 * @param {TextView} cell
 * @param {number} index
 */
function updateCell(cell, index) {
  cell.text = `${items[index]}`;
  if(items[index] === date.getDate()) {
    cell.background = '#79a6e1';
    cell.textColor = '#ffffff';
  }
}

/**
 * Create array to represent days of the month
 * 
 * First for loop is used to create indexes with
 *   no real data to start the month on the
 *   correct day of the week
 * 
 * TODO
 *   Refactor first day alignment to not rely on
 *     data-less indexes, if possible
 */
function createItems() {
  const result = [];
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  var numDays = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
  for (let i = 0; i < firstDay; i++) {
    result.push(' ');
  }
  for (let i = 1; i <= numDays; i++) {
    result.push(i);
  }
  return result;
}

/**
 * Opens the Main/Events page
 * 
 * detach() is called to prevent the 'hamburger menu'
 *   from being replaced by a back button titled
 *   'Spokinetic'
 */
function openMainPage() {
  const navigationView = $(NavigationView).only();
  navigationView.pages().detach();
  navigationView.append(
    <MainPage />
  );
}

/**
 * Opens the Contact Us page
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
 * Opens the Account Details page
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
