import {Button, TextView, contentView, AlertDialog, TextInput, Row, CollectionView, 
        TabFolder, Tab, ImageView, Stack, Page, NavigationView, ListView, Cell, Action, 
        SearchAction, ScrollView, Composite
      } from 'tabris';
//import './calendar';  multiple "import" statements breaks the program

/*
* Add In Later Iteration
* Do a method call to initialize these variables eventually
* Call will be made to events database to pull top events
* For now set them to stock images
*/
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
      
      <SearchAction  id='search'
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

          <Tab title='MyCalendar'>
          </Tab>

        </TabFolder>

        <TabFolder paging stretchX height={100} background='#234' tabBarLocation='hidden'>
          <Tab>
            <TextView text='Events' textColor='white' font='40px' centerX centerY>
            </TextView>
          </Tab>
          </TabFolder>


        <TabFolder paging stretchX centerY height={300} background='#495764' tabBarLocation='hidden'>
          <Tab >
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
        </TabFolder>


      </Page>

    </NavigationView>
  </$>
);

const pageRef = $(Page).only(); 
//  '$'  is equivalent to 'tabris.contentView.find'  


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
* Add In Later Iteration
* onEvents() currently increments the event notifications as a test.
* Will be a link to events page once created.
*/
function onEvents(){
  eventNotifyInt ++;
  pageRef.find('#events').first(Tab).badge = eventNotifyInt; // increment badge val

  //pageRef.find('#events').first(Tab).title = "this";
  //pageRef.find('#eventTxt').first(TextView).text = eventNotifyInt;
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

/* @param {tabris.ImageViewLoadEvent} event */
function handleLoad({target, error}) {
  new TextView({
    centerX: target.centerX, top: [target, 8]
    //text: error ? 'Error' : 'Success'
  }).insertAfter(target);
}