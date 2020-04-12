import {Button, TextView, contentView, AlertDialog, TextInput, Row, CollectionView, 
        TabFolder, Tab, ImageView, Stack, Page, NavigationView, ListView, Cell, Action, 
        SearchAction, ScrollView, Composite, drawer, Popover, StackLayout
      } from 'tabris';
import {CreateEventPage} from './create-event';

/*
* Do a method call to initialize these variables eventually
* Call will be made to events database to pull top events
* For now set them to stock images
*/

// Temporary(?) boolean to track for new users
var signedInBoolean = false;

const bckgndImage = 'images/mountain2.jpeg';
const magImage = 'images/magGlass.png';

var pOneImage = 'images/running.jpg';
var pTwoImage = 'images/concert.jpg';
var pThreeImage = 'images/obstacleCourse.jpg';

var pOneString = 'Running';
var pTwoString = 'Concerts';
var pThreeString = 'Obstacle Courses';

const searchString = '';
var eventNotifyInt = 0;

contentView.append(
  <$>
    

    <NavigationView stretch drawerActionVisible='true' onSelect={onHome}>
      
      <SearchAction  id='search' message='Search'
      image={magImage}
      onSelect={onSearch}
      onInput={handleInput}
      >
      </SearchAction>
      

      <Page title='Spokinetic'>


        
        <ImageView width={800} height={1000} opacity={.7}
        image={bckgndImage}
        scaleMode='stretch'/>

  

        <TabFolder paging stretch selectionIndex={0} tabBarLocation='bottom' >

          <Tab title='Events' id='events' 
          badge={eventNotifyInt}
          onSelect={onEvents}>
          </Tab>

          <Tab title='Calendar'>
          </Tab>

          <Tab title='My Calendar'>
          </Tab>

          <Tab title='My Account'>
          </Tab>

        </TabFolder>

        <TabFolder paging stretchX height={100} background='#234' tabBarLocation='hidden'>
          <Tab>
            <TextView text='EVENTS' textColor='white' font='40px' centerX centerY>
            </TextView>
          </Tab>
          </TabFolder>


        <TabFolder paging stretchX centerY height={300} background='#495764' tabBarLocation='hidden'>
          <Tab>
            <ImageView centerX centerY height={250} scaleMode='fit'
            image={pOneImage} 
            onLoad={handleLoad} 
            />
            <Button style='flat' text={pOneString} background='#CD5C5C' opacity={.8}></Button>
          </Tab>
          <Tab>
            <ImageView centerX centerY height={250} scaleMode='fit'
            image={pTwoImage} 
            onLoad={handleLoad}
            />
            <Button style='flat' text={pTwoString} background='#CD5C5C'opacity={.8}></Button>
          </Tab>
          <Tab>
            <ImageView centerX centerY height={250} scaleMode='fit'
            image={pThreeImage} 
            onLoad={handleLoad}
            />
            <Button style='flat' text={pThreeString} background='#CD5C5C'opacity={.8}></Button>
          </Tab>
          <Tab>
            <Button center onSelect={() => openCreatePage()}>Create new event</Button>
          </Tab>
        </TabFolder>


      </Page>

    </NavigationView>
  </$>
);

drawer.append(
  <TextView centerY left={16}>Hello, World! You've found me!</TextView>
);

if(!signedInBoolean) {
  showLanding();
}

const pageRef = $(Page).only(); 
//  '$'  is equivalent to 'tabris.contentView.find'  

function openCreatePage() {
  $(NavigationView).only().append(
    <CreateEventPage />
  );
}

function showLanding() {
  const popover = Popover.open(
    <Popover width={300} height={400}>
      <ScrollView stretch layout={new StackLayout({spacing: 16, alignment: 'stretchX'})} padding={32}>
        <Button right background='red' textColor='white' onSelect={() => popover.close()}>X</Button>
        <TextView centerX top={50} font='bold 36px'>Welcome!</TextView>
        <TextView centerX font='24px'>All your local events, right</TextView>
        <TextView centerX top={5} font='24px'>in the palm of your hand</TextView>
        <Button style='flat' centerX background='blue' textColor='white'>Get Started</Button>
        <Button style='outline' centerX strokeColor='blue' textColor='blue'>Sign in</Button>
      </ScrollView>
    </Popover>
  );
}

function onHome(){
  pageRef.find('#initText').first(TextView).text = 'Home Pressed';
}

function onSearch(){

}

function handleInput(){

}

/* @param {tabris.ImageViewLoadEvent} event */
function handleLoad({target, error}) {
  new TextView({
    centerX: target.centerX, top: [target, 8]
    //text: error ? 'Error' : 'Success'
  }).insertAfter(target);
}


function onPage1(){
  
}

function onPage2(){

}

function onPage3(){

}

function onPage4(){

}

function onEvents(){
  eventNotifyInt ++;
  pageRef.find('#events').first(Tab).badge = eventNotifyInt; // increment badge val

  //pageRef.find('#events').first(Tab).title = "this";
  //pageRef.find('#eventTxt').first(TextView).text = eventNotifyInt;
}

function onCalendar(){

}

function onMyCalendar(){

}











//onSelect={() => console.log('select Pay')} onReselect={() => console.log('reselect Pay')}
// code snippet saved from testing Events, Calendar, and MyCalendar

// unused functions ***************************
function getImage(image) {
  return 'resources/' + image + (device.platform === 'iOS' ? '-black-24dp@3x.png' : '-white-24dp@3x.png');
}


function initSearch(event){
  //$(TextInput).only().text = 'Search';
  contentView.append(
    <TextView top='prev() 16' left='20%' text={event.text}/>
  );
  
}

function searchInput(ev) {
  contentView.append(
    //<TextView top='prev() 16' left='20%' text={ev.text}/>
  );
}

function newButton(){
  contentView.append(
    <$>
      <Button top onSelect={showText2} width='200'text='Hello World' background={[255, 128, 0]} ></Button>

    </$>
  );
}

//https://unsplash.com/photos/PMwu9gfCSbw image website