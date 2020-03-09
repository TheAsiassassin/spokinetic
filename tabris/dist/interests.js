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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJlc3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2ludGVyZXN0cy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBd0s7QUFFeEssTUFBTSxTQUFTLEdBQUcsV0FBVyxFQUFFLENBQUM7QUFDaEMsSUFBSSxvQkFBb0IsQ0FBQztBQUN6QixJQUFJLDRCQUE0QixDQUFDO0FBQ2pDLElBQUksNkJBQTZCLENBQUM7QUFFbEMsSUFBRyxlQUFNLENBQUMsV0FBVyxJQUFJLGtCQUFrQixJQUFJLGVBQU0sQ0FBQyxXQUFXLElBQUksb0JBQW9CLEVBQUU7SUFDdkYsNEJBQTRCLEdBQUcsQ0FBQyxlQUFNLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQzNELDZCQUE2QixHQUFHLENBQUMsZUFBTSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMxRCxvQkFBb0IsR0FBRyw0QkFBNEIsQ0FBQztDQUN2RDtLQUFNLElBQUcsZUFBTSxDQUFDLFdBQVcsSUFBSSxtQkFBbUIsSUFBSSxlQUFNLENBQUMsV0FBVyxJQUFJLHFCQUFxQixFQUFFO0lBQ2hHLDZCQUE2QixHQUFHLENBQUMsZUFBTSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMzRCw0QkFBNEIsR0FBRyxDQUFDLGVBQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDMUQsb0JBQW9CLEdBQUcsNkJBQTZCLENBQUM7Q0FDeEQ7QUFFRCxlQUFNLENBQUMsb0JBQW9CLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUVqRCxvQkFBVyxDQUFDLE1BQU0sQ0FDaEIsa0JBQUMsVUFBQztJQUNBLGtCQUFDLHVCQUFjLElBQUMsT0FBTyxRQUFDLG1CQUFtQixFQUFDLE1BQU07UUFDaEQsa0JBQUMscUJBQVksSUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQ3hDLEtBQUssRUFBRSxxQkFBcUIsR0FDZjtR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