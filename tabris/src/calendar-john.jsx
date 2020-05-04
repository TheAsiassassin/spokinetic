/**
 * Calendar Page
 * 
 * TODO:
 *   Add functionality to change years(?)
 *   Consider alternative approaches to make month view updates snappier
 */

import {TextView, ImageView, CollectionView, Composite, contentView, Page, TabFolder, Tab, NavigationView, Popover, ScrollView, Stack} from 'tabris';
import {MainPage} from './index';
import {AccountPage} from './account';
import {ContactPage} from './contact';
import {EventPage} from './eventPage';

var popover;
var firstLoadIn = true;

// Array to name months based on the value returned by date.getMonth()
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Array to name days of the week based on the value returned by date.getDay()
//const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var date = new Date();
var month = date.getMonth();
var day = date.getDate();
var year = date.getFullYear();
var firstDayOfMonth = new Date(year, month, 1).getDay();

var items = createItems(year, month);
//const events = createEvents();

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
      <TabFolder id='view-month' paging selectionIndex={month} stretchX height={100} background='#234' tabBarLocation='hidden' onSelectionIndexChanged={() => updateCalendar()}>
        <Tab>
          <TextView text={months[0]} textColor='white' font='bold 36px' center />
        </Tab>
        <Tab>
          <TextView text={months[1]} textColor='white' font='bold 36px' center />
        </Tab>
        <Tab>
          <TextView text={months[2]} textColor='white' font='bold 36px' center />
        </Tab>
        <Tab>
          <TextView text={months[3]} textColor='white' font='bold 36px' center />
        </Tab>
        <Tab>
          <TextView text={months[4]} textColor='white' font='bold 36px' center />
        </Tab>
        <Tab>
          <TextView text={months[5]} textColor='white' font='bold 36px' center />
        </Tab>
        <Tab>
          <TextView text={months[6]} textColor='white' font='bold 36px' center />
        </Tab>
        <Tab>
          <TextView text={months[7]} textColor='white' font='bold 36px' center />
        </Tab>
        <Tab>
          <TextView text={months[8]} textColor='white' font='bold 36px' center />
        </Tab>
        <Tab>
          <TextView text={months[9]} textColor='white' font='bold 36px' center />
        </Tab>
        <Tab>
          <TextView text={months[10]} textColor='white' font='bold 36px' center />
        </Tab>
        <Tab>
          <TextView text={months[11]} textColor='white' font='bold 36px' center />
        </Tab>
      </TabFolder>
    );
    this.append(
      <CollectionView id='calendar' stretchX top='prev()' bottom={35} padding={12}
        columnCount={7}
        cellHeight={50}
        itemCount={items.length}
        createCell={createCell}
        updateCell={updateCell}/>
    );
  }
}

/**
 * Updates calendar view to display selected month
 */
function updateCalendar() {
  if(!firstLoadIn) {
    //console.log($(TabFolder).only('#view-month').selectionIndex);
    items = createItems(year, $(TabFolder).only('#view-month').selectionIndex);
    $(CollectionView).only('#calendar').detach();
    $(Page).only().append(
      <CollectionView id='calendar' stretchX top='prev()' bottom={35} padding={12}
        columnCount={7}
        cellHeight={50}
        itemCount={items.length}
        createCell={createCell}
        updateCell={updateCell}/>
    );
  } else
    firstLoadIn = false;
  /*const viewMonth = $(TabFolder).only('#view-month');
  month = viewMonth.selectionIndex;
  viewMonth.children().dispose();*/
}

/**
 * Create CollectionView cell, set formatting
 */
function createCell() {
  return (
    <TextView font='bold 16px' textColor='#234' alignment='centerX' maxLines={1} highlightOnTouch onTap={ev => showEvents($(CollectionView).only().itemIndex(ev.target))}/>
  );
}

/**
 * Populate CollectionView cell with data
 * 
 * @param {TextView} cell
 * @param {number} index
 */
function updateCell(cell, index) {
  cell.text = `${items[index]}`;
  if($(TabFolder).only('#view-month').selectionIndex === month && items[index] === day) {
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
function createItems(year, month) {
  const result = [];
  var firstDay = new Date(year, month, 1).getDay();
  var numDays = new Date(year, month+1, 0).getDate();
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
  firstLoadIn = true;
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
  firstLoadIn = true;
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
  firstLoadIn = true;
  const navigationView = $(NavigationView).only();
  navigationView.pages().detach();
  navigationView.append(
    <AccountPage />
  );
}

/**
 * Displays Popover to show list of events
 * 
 * @param {number} index 
 */
function showEvents(index) {
  if(index >= firstDayOfMonth) {
    const events = createEvents(index);
    popover = Popover.open(
      <Popover>
        <NavigationView stretch toolbarVisible={false}>
          <Page>
            <CollectionView stretch
              itemCount={events.length}
              cellType={index => events[index].type}
              cellHeight={(_, type) => type === 'section' ? 48 : 32}
              createCell={type => type === 'section' ? SectionCell() : ItemCell()}
              updateCell={(cell, index) => cell.text = events[index].name}
              onScroll={handleScroll}/>
            <SectionCell stretchX height={48} id='floatingSection' text={events[0].name} onTap={() => toCalendar(popover)}/>
          </Page>
        </NavigationView>
      </Popover>
    );
  }
}

/** @param {tabris.Attributes<TextView>=} attributes */
const SectionCell = attributes => <TextView background='#79a6e1' textColor='white' font='bold 24px' alignment='centerX' {...attributes}/>;

/** @param {tabris.Attributes<TextView>=} attributes */
const ItemCell = attributes => <TextView padding={[2, 5]} font='14px' alignment='left' highlightOnTouch onTap={() => toEvents(popover)} {...attributes}/>;

/** @param {tabris.CollectionViewScrollEvent<CollectionView<TextView>>} ev */
function handleScroll({target}) {
  const splitIndex = target.firstVisibleIndex + 1;
  const currentSection = events.slice(0, splitIndex).filter(item => item.type === 'section').pop();
  const nextSection = events.slice(splitIndex).filter(item => item.type === 'section')[0];
  const nextSectionCell = target.cellByItemIndex(events.indexOf(nextSection));
  const bounds = nextSectionCell ? nextSectionCell.absoluteBounds : null;
  /*$('#floatingSection').only(SectionCell).set({
    text: currentSection ? currentSection.name : events[0].name,
    transform: bounds ? {translationY: Math.min(bounds.top - bounds.height, 0)} : {}
  });*/
}

/**
 * Creates array of events to display in Popover
 * 
 * @param {number} index 
 */
function createEvents(index) {
  let itemCount = 1;
  /** @type {Array<{name: string, type: 'section' | 'item'}>} */
  const result = [];
  result.push({name: ($(TabFolder).only('#view-month').selectionIndex+1) + '/' + items[index] + '/' + year, type: 'section'});
  for (let j = 1; j <= 2; j++) {
    if(j === 1)
      result.push({name: 'My Events', type: 'section'});
    else
      result.push({name: 'Other Events', type: 'section'});
    for (let i = 0; i < 5; i++) {
      result.push({name: 'Event ' + itemCount++, type: 'item'});
    }
  }
  return result;
}

/**
 * Closes Popover to return to Calendar
 * 
 * @param {Popover} popover 
 */
function toCalendar(popover) {
  popover.close();
}

/**
 * Closes Popover to show event details
 * 
 * @param {Popover} popover 
 */
function toEvents(popover) {
  popover.close();
  $(NavigationView).only().append(
    <EventPage />
  );
}
