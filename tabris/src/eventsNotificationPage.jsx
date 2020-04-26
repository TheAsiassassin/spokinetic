/**
 * Display Notifications for Events
 * 
 * TODO:
 *   Refactor to display in sidebar/drawer, if possible
 */

import {Button, TextView, contentView, AlertDialog, TextInput, Row, CollectionView, 
        TabFolder, Tab, ImageView, Stack, Page, NavigationView, ListView, Cell, Action, 
        SearchAction, ScrollView, Composite
      } from 'tabris';


/*
* Add in Later Iteration
* Do a method call to initialize these variables eventually
* Call will be made to events database to pull top events
* For now set them to stock images
*/
const bckgndImage = 'images/icons/checkDoc.png';
const magImage = 'images/magGlass.png';

/*
* notifyArray is fill with event examples.
* Make a database call to fill array with 
* Relevent event notifications
* Time of events needs to be updated dynamically
*/

const notifyArray = [
  {title: 'Cooking Class Canceled', sender:'Jacob\'s Cooking Lessons', time: '12:35'},
  {title: 'Tonight\'s Special Guest: Tom Capaul', sender: 'Coding Club', time: '08:03'},
  {title: 'This is just a spam message', sender: 'Spammer', time: '04:32'},
  {title: 'Royksopp Playing 3/8', sender: 'The Baby Bar', time: 'yesterday'},
  {title: 'Senior Frisbee Tournament Reminder: 4/10', sender: 'Robert J. Oldman', time: 'yesterday'},
  {title: 'Coffee Club Newsletter', sender: 'Coffee Club', time: 'yesterday'},
  {title: 'Fraud mail', sender: 'Unsuspicious Jack', time: 'Saturday'}
];

const searchString = '';
var eventNotifyInt = notifyArray.length;

contentView.append(
  <$>
    

    <NavigationView stretch drawerActionVisible='true' onSelect={onHome}>
      
      <SearchAction  id='search'
      image={magImage}
      onSelect={onSearch}
      onInput={handleInput}
      >
      </SearchAction>
      

      <Page title='Spokinetic'>

        <ImageView id='background' center width={100} height={200} opacity={.7}>
        </ImageView>
            
        <TabFolder paging stretch selectionIndex={0} tabBarLocation='bottom' >

          <Tab title='Events' id='events' 
          badge={eventNotifyInt}
          onSelect={onEvents}>
          </Tab>

          <Tab title='Calendar'>
          </Tab>

          <Tab title='MyCalendar'>
          </Tab>

        </TabFolder>

        <CollectionView
          stretch
          itemCount={notifyArray.length}
          cellHeight={64}
          createCell={createCell}
          updateCell={updateCell}>
        </CollectionView>

        <TabFolder id='alert' paging stretchX height={40} tabBarLocation='hidden'>
          <Tab>
            <TextView id='alertTxt' textColor='black' font='20px' centerX centerY>
            </TextView>
          </Tab>
        </TabFolder>
        
          

      </Page>

    </NavigationView>
  </$>
);

const pageRef = $(Page).only(); 
//  '$'  is equivalent to 'tabris.contentView.find'  

/**
 * Gets notifications relevant to user and populates
 * notifyArray
 */
function getNotifications(){

}
/*
* Add In Later Iteration
* There is no "Home" button.
* Add in later iterations
*/
function onHome(){
  pageRef.find('#initText').first(TextView).text = 'Home Pressed';
}
/*
* Add In Later Iteration
* No search functionality is currently available
* - link to handle search page
*/
function onSearch(){

}
/*
* The following inc/decEvents() are for testing purposes to test badge manipulation
*/
function decEvents(){
  eventNotifyInt --;
  pageRef.find('#events').first(Tab).badge = eventNotifyInt; 
}

function incEvents(){
  eventNotifyInt ++;
  pageRef.find('#events').first(Tab).badge = eventNotifyInt; 
}
/*
* Add In Later Iteration
* onEvents() currently increments the event notifications as a test.
* Will be a link to events page once created.
*/
function onEvents(){

}
/*
* Add In Later Iteration
* No calendar view is currently available
* - link to another page
*/
function onCalendar(){
  
}
/*
* Add In Later Iteration
* No calendar view is currently available
* - link to another page
*/
function onMyCalendar(){

}
/*
* Add In Later Iteration
* input for search bar needs functionality
* - storing search results
* - response to search
*/
function handleInput(){

}
/*
* Add In Later Iteration
* Each following onPage#() will link to the associated event it represents
* - link to each event page
*/
function onPage1(){
  
}

function onPage2(){

}

function onPage3(){

}
// handle collection view ****************************


function createCell() {
  return (
    <Composite background='#d36767'>
      <Composite id='container' stretch background='white' onPanHorizontal={handlePan}>
        <TextView id='senderText' left={16} top={8} font='medium 16px'/>
        <TextView id='titleText' left={16} bottom={8}/>
        <TextView id='timeText' right={16} top={8} textColor='gray'/>
      </Composite>
      <Composite stretchX height={1} background='#eeeeee'/>
    </Composite>
  );
}

function updateCell(view, index) {
  const item = notifyArray[index];
  const container = view.find('#container').only();
  container.item = item;
  container.transform = {translationX: 0};
  view.find(TextView).only('#senderText').textColor = '#e38e7c';
  view.find(TextView).only('#senderText').text = item.sender;
  view.find(TextView).only('#titleText').text = item.title;
  view.find(TextView).only('#timeText').text = item.time;
}

function handlePan(event) {
  const {target, state, translationX} = event;
  target.transform = {translationX};
  if (state === 'end') {
    handlePanFinished(event);
  }
}

function handlePanFinished({target, velocityX, translationX}) {
  const beyondCenter = Math.abs(translationX) > target.bounds.width / 2;
  const fling = Math.abs(velocityX) > 200;
  const sameDirection = direction(velocityX) === direction(translationX);
  // When swiped beyond the center, trigger dismiss if flinged in the same direction or let go.
  // Otherwise, detect a dismiss only if flinged in the same direction.
  const dismiss = beyondCenter ? (sameDirection || !fling) : (sameDirection && fling);
  if (dismiss) {
    animateDismiss(target, translationX);
  } else {
    animateCancel(target);
  }
}
/**
 * animates a notification sliding out of view
 * @param {} target 
 * @param {*} translationX 
 */
async function animateDismiss(target, translationX) {
  await target.animate({
    transform: {translationX: direction(translationX) * target.bounds.width}
  }, {
    duration: 200,
    easing: 'ease-out'
  });
  const index = notifyArray.indexOf(target.item);
  notifyArray.splice(index, 1);
  $(CollectionView).only().remove(index);

  decEvents();

  //push following responsibility to another method called noNotificationUpdate()
  if($(CollectionView).only().itemCount == 0){
    pageRef.find('#background').first(ImageView).image=bckgndImage;

    pageRef.find('#alert').first(TabFolder).background='#e9e2a9';
    pageRef.find('#alertTxt').first(TextView).text='No Notifications!';
  }
}

function animateCancel(target) {
  target.animate({transform: {translationX: 0}}, {duration: 200, easing: 'ease-out'});
}

function direction(offset) {
  return offset ? offset < 0 ? -1 : 1 : 0;
}
