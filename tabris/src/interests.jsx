/**
 * Interests page to set preferences on first sign-in (possibly to update later, too?)
 * 
 * TODO:
 *   Refactor to use paging through the NavigationView, as the rest of the app has been
 *     set up to do
 *   Debug cell creation for CollectionView
 *   Connect to DB for follow-up to create record of new account
 *   Update INTERESTS array to include a greater number of interests (perhaps connect to DB?)
 */

import {$, ImageView, TextView, CollectionView, Slider, contentView, device, Page, NavigationView, SearchAction, TabFolder, Tab, ScrollView, StackLayout} from 'tabris';

const INTERESTS = createItems();
var mainContentHeightInt;
var mainContentHeightPortraitInt;
var mainContentHeightLandscapeInt;

/**
 * Establish viewing size so main content doesn't cover up
 *   navigation tabs at bottom of app
 */
if(device.orientation == 'portrait-primary' || device.orientation == 'portrait-secondary') {
    mainContentHeightPortraitInt = (device.screenHeight - 120);
    mainContentHeightLandscapeInt = (device.screenWidth - 85);
    mainContentHeightInt = mainContentHeightPortraitInt;
} else if(device.orientation == 'landscape-primary' || device.orientation == 'landscape-secondary') {
    mainContentHeightLandscapeInt = (device.screenHeight - 85);
    mainContentHeightPortraitInt = (device.screenWidth - 120);
    mainContentHeightInt = mainContentHeightLandscapeInt;
}

device.onOrientationChanged(changeContentHeight);

contentView.append(
  <$>
    <NavigationView stretch drawerActionVisible='true'>
      <SearchAction id='search' message='Search'
        image={'images/magGlass.png'}>
      </SearchAction>

      <Page title='Spokinetic'>
        <ImageView centerX centerY width={800} height={1000} opacity={.7}
        image={'images/mountain2.jpeg'}
        scaleMode='fill' />

        <TabFolder paging stretch tabBarLocation='bottom'>
          <Tab title='Events' id='events' badge={0}></Tab>
          <Tab title='Calendar'></Tab>
          <Tab title='My Calendar'></Tab>
        </TabFolder>

        <CollectionView stretch
          cellHeight={128}
          itemCount={INTERESTS.length}
          createCell={createNewCell}
          updateCell={updateTheCell}/>

        <TabFolder stretchX height={100} background='#234' tabBarLocation='hidden'>
          <Tab>
            <TextView text='SIGN UP' textColor='white' font='40px' centerX centerY />
          </Tab>
        </TabFolder>
      </Page>
    </NavigationView>
  </$>
);

/**
 * Updates main content height when the device is rotated to
 *   prevent content from covering navigation tabs at bottom
 */
function changeContentHeight() {
    if(device.orientation == 'portrait-primary' || device.orientation == 'portrait-secondary') {
        mainContentHeightInt = mainContentHeightPortraitInt;
    } else {
        mainContentHeightInt = mainContentHeightLandscapeInt;
    }

    $('#mainContent').set({height: mainContentHeightInt});
}

/**
 * Create CollectionView cell, set formatting
 */
function createNewCell() {
  console.log('creating new cell...')
  return new TextView({
    font: {size: 32, weight: 'bold'},
    textColor: '#555555',
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
function updateTheCell(cell, index) {
  console.log(index);
  //cell.text = `${INTERESTS[index]}`;
}

/**
 * Create array to represent different interests
 * 
 * TODO
 *   Add more/wider variety of interests
 */
function createItems() {
  const result = [];
  // 'hello', 'goodbye', 'testing', 'gaming', 'misc.'
  result.push('hello');
  result.push('goodbye');
  result.push('testing');
  result.push('gaming');
  result.push('misc.');

  return result;
}