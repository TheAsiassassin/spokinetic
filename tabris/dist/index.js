"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const INTERESTS = createItems();
var mainContentHeightInt;
var mainContentHeightPortraitInt;
var mainContentHeightLandscapeInt;
if (tabris_1.device.orientation == 'portrait-primary' || tabris_1.device.orientation == 'portrait-secondary') {
    mainContentHeightPortraitInt = (tabris_1.device.screenHeight - 120);
    mainContentHeightLandscapeInt = (tabris_1.device.screenWidth - 85);
    mainContentHeightInt = mainContentHeightPortraitInt;
}
else if (tabris_1.device.orientation == 'landscape-primary' || tabris_1.device.orientation == 'landscape-secondary') {
    mainContentHeightLandscapeInt = (tabris_1.device.screenHeight - 85);
    mainContentHeightPortraitInt = (tabris_1.device.screenWidth - 120);
    mainContentHeightInt = mainContentHeightLandscapeInt;
}
tabris_1.device.onOrientationChanged(changeContentHeight);
tabris_1.contentView.append(JSX.createElement(tabris_1.$, null,
    JSX.createElement(tabris_1.NavigationView, { stretch: true, drawerActionVisible: 'true' },
        JSX.createElement(tabris_1.SearchAction, { id: 'search', message: 'Search', image: 'images/magGlass.png' }),
        JSX.createElement(tabris_1.Page, { title: 'Spokinetic' },
            JSX.createElement(tabris_1.ImageView, { centerX: true, centerY: true, width: 800, height: 1000, opacity: .7, image: 'images/mountain2.jpeg', scaleMode: 'fill' }),
            JSX.createElement(tabris_1.TabFolder, { paging: true, stretch: true, tabBarLocation: 'bottom' },
                JSX.createElement(tabris_1.Tab, { title: 'Events', id: 'events', badge: 0 }),
                JSX.createElement(tabris_1.Tab, { title: 'Calendar' }),
                JSX.createElement(tabris_1.Tab, { title: 'My Calendar' })),
            JSX.createElement(tabris_1.TabFolder, { id: 'mainContent', stretchX: true, height: mainContentHeightInt, tabBarLocation: 'hidden' },
                JSX.createElement(tabris_1.Tab, null,
                    JSX.createElement(tabris_1.ScrollView, { stretch: true, layout: new tabris_1.StackLayout({ spacing: 16, alignment: 'stretchX' }), padding: 32 },
                        JSX.createElement(tabris_1.TextView, { top: '85', textColor: 'white' }, "Blah Blah Blah"),
                        JSX.createElement(tabris_1.CollectionView, { stretch: true, cellHeight: 128, itemCount: INTERESTS.length, createCell: createNewCell, updateCell: updateTheCell })))),
            JSX.createElement(tabris_1.TabFolder, { stretchX: true, height: 100, background: '#234', tabBarLocation: 'hidden' },
                JSX.createElement(tabris_1.Tab, null,
                    JSX.createElement(tabris_1.TextView, { text: 'SIGN UP', textColor: 'white', font: '40px', centerX: true, centerY: true })))))));
function changeContentHeight() {
    if (tabris_1.device.orientation == 'portrait-primary' || tabris_1.device.orientation == 'portrait-secondary') {
        mainContentHeightInt = mainContentHeightPortraitInt;
    }
    else {
        mainContentHeightInt = mainContentHeightLandscapeInt;
    }
    tabris_1.$('#mainContent').set({ height: mainContentHeightInt });
}
function createNewCell() {
    console.log('creating new cell...');
    return new tabris_1.TextView({
        font: { size: 32, weight: 'bold' },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXguanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQXdLO0FBRXhLLE1BQU0sU0FBUyxHQUFHLFdBQVcsRUFBRSxDQUFDO0FBQ2hDLElBQUksb0JBQW9CLENBQUM7QUFDekIsSUFBSSw0QkFBNEIsQ0FBQztBQUNqQyxJQUFJLDZCQUE2QixDQUFDO0FBRWxDLElBQUcsZUFBTSxDQUFDLFdBQVcsSUFBSSxrQkFBa0IsSUFBSSxlQUFNLENBQUMsV0FBVyxJQUFJLG9CQUFvQixFQUFFO0lBQ3ZGLDRCQUE0QixHQUFHLENBQUMsZUFBTSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsQ0FBQztJQUMzRCw2QkFBNkIsR0FBRyxDQUFDLGVBQU0sQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDMUQsb0JBQW9CLEdBQUcsNEJBQTRCLENBQUM7Q0FDdkQ7S0FBTSxJQUFHLGVBQU0sQ0FBQyxXQUFXLElBQUksbUJBQW1CLElBQUksZUFBTSxDQUFDLFdBQVcsSUFBSSxxQkFBcUIsRUFBRTtJQUNoRyw2QkFBNkIsR0FBRyxDQUFDLGVBQU0sQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDM0QsNEJBQTRCLEdBQUcsQ0FBQyxlQUFNLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQzFELG9CQUFvQixHQUFHLDZCQUE2QixDQUFDO0NBQ3hEO0FBRUQsZUFBTSxDQUFDLG9CQUFvQixDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFFakQsb0JBQVcsQ0FBQyxNQUFNLENBQ2hCLGtCQUFDLFVBQUM7SUFDQSxrQkFBQyx1QkFBYyxJQUFDLE9BQU8sUUFBQyxtQkFBbUIsRUFBQyxNQUFNO1FBQ2hELGtCQUFDLHFCQUFZLElBQUMsRUFBRSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUN4QyxLQUFLLEVBQUUscUJBQXFCLEdBQ2Y7UUFFZixrQkFB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