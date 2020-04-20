import {TextView, CollectionView, Slider, contentView, Page, TabFolder, Tab, NavigationView} from 'tabris';
import {MainPage} from './index';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var date = new Date();

const items = createItems();

export class CalendarPage extends Page {
  constructor(properties) {
    super();
    this.set({title: 'Calendar', ...properties}).append(
      <TabFolder paging stretch selectionIndex={1} tabBarLocation='bottom'>

        <Tab title='Events' id='events' onSelect={() => toMainPage()}>
        </Tab>

        <Tab title='Calendar'>
        </Tab>

        <Tab title='My Calendar'>
        </Tab>

        <Tab title='My Account'>
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

function createCell() {
  return new TextView({
    font: {size: 16, weight: 'bold'},
    textColor: '#234',
    alignment: 'centerX',
    maxLines: 1
  });
}

/**
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

function toMainPage() {
  const navigationView = $(NavigationView).only();
  navigationView.pages().detach();
  navigationView.append(
    <MainPage />
  );
}
