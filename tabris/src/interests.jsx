import {$, ImageView, TextView, CollectionView, Slider, contentView, device, Page, NavigationView, SearchAction, TabFolder, Tab, ScrollView, StackLayout} from 'tabris';

const INTERESTS = createItems();
var mainContentHeightInt;
var mainContentHeightPortraitInt;
var mainContentHeightLandscapeInt;

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

        <TabFolder id='mainContent' stretchX height={mainContentHeightInt} tabBarLocation='hidden'>
          <Tab>
            <ScrollView stretch layout={new StackLayout({spacing: 16, alignment: 'stretchX'})} padding={32}>
              <TextView top='85' textColor='white'>Blah Blah Blah</TextView>
              <CollectionView stretch cellHeight={128} itemCount={INTERESTS.length} createCell={createNewCell} updateCell={updateTheCell}/>
            </ScrollView>
          </Tab>
        </TabFolder>

        <TabFolder stretchX height={100} background='#234' tabBarLocation='hidden'>
          <Tab>
            <TextView text='SIGN UP' textColor='white' font='40px' centerX centerY />
          </Tab>
        </TabFolder>
      </Page>
    </NavigationView>
  </$>
);

function changeContentHeight() {
    if(device.orientation == 'portrait-primary' || device.orientation == 'portrait-secondary') {
        mainContentHeightInt = mainContentHeightPortraitInt;
    } else {
        mainContentHeightInt = mainContentHeightLandscapeInt;
    }

    $('#mainContent').set({height: mainContentHeightInt});
}

function createNewCell() {
  console.log('creating new cell...')
  return new TextView({
    font: {size: 32, weight: 'bold'},
    textColor: '#555555',
    alignment: 'centerX',
    maxLines: 1
  });
}

function updateTheCell(cell, index) {
  console.log(index);
  //cell.text = `${INTERESTS[index]}`;
}

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