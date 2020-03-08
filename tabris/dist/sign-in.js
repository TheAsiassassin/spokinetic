"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
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
tabris_1.contentView.append(JSX.createElement($, null,
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
                    JSX.createElement(tabris_1.ScrollView, { stretch: true, layout: new tabris_1.StackLayout({ spacing: 12, alignment: 'stretchX' }), padding: 32 },
                        JSX.createElement(tabris_1.TextInput, { id: 'username', top: '85', message: "Username" }),
                        JSX.createElement(tabris_1.TextInput, { id: 'password', type: 'password', message: "Password" }),
                        JSX.createElement(tabris_1.Button, { centerX: true, onTap: signIn }, "Submit")))),
            JSX.createElement(tabris_1.TabFolder, { paging: true, stretchX: true, height: 100, background: '#234', tabBarLocation: 'hidden' },
                JSX.createElement(tabris_1.Tab, null,
                    JSX.createElement(tabris_1.TextView, { text: 'SIGN IN', textColor: 'white', font: '40px', centerX: true, centerY: true })))))));
function changeContentHeight() {
    if (tabris_1.device.orientation == "portrait-primary" || tabris_1.device.orientation == "portrait-secondary") {
        mainContentHeightInt = mainContentHeightPortraitInt;
    }
    else {
        mainContentHeightInt = mainContentHeightLandscapeInt;
    }
    $('#mainContent').set({ height: mainContentHeightInt });
}
// Placeholder function for when the submit button is pressed
function signIn() {
    const message = `Username: ${$(tabris_1.TextInput).only('#username').text}\n` +
        `Password: ${$(tabris_1.TextInput).only('#password').text}\n`;
    tabris_1.AlertDialog.open(JSX.createElement(tabris_1.AlertDialog, { title: 'Sign in?', message: message, buttons: { ok: 'Sign-In', cancel: 'Cancel' } }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi1pbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zaWduLWluLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFzTDtBQUV0TCxJQUFJLG9CQUFvQixDQUFDO0FBQ3pCLElBQUksNEJBQTRCLENBQUM7QUFDakMsSUFBSSw2QkFBNkIsQ0FBQztBQUVsQyxJQUFHLGVBQU0sQ0FBQyxXQUFXLElBQUksa0JBQWtCLElBQUksZUFBTSxDQUFDLFdBQVcsSUFBSSxvQkFBb0IsRUFBRTtJQUN6Riw0QkFBNEIsR0FBRyxDQUFDLGVBQU0sQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDM0QsNkJBQTZCLEdBQUcsQ0FBQyxlQUFNLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzFELG9CQUFvQixHQUFHLDRCQUE0QixDQUFDO0NBQ3JEO0tBQU0sSUFBRyxlQUFNLENBQUMsV0FBVyxJQUFJLG1CQUFtQixJQUFJLGVBQU0sQ0FBQyxXQUFXLElBQUkscUJBQXFCLEVBQUU7SUFDbEcsNkJBQTZCLEdBQUcsQ0FBQyxlQUFNLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzNELDRCQUE0QixHQUFHLENBQUMsZUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUMxRCxvQkFBb0IsR0FBRyw2QkFBNkIsQ0FBQztDQUN0RDtBQUVELGVBQU0sQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBRWpELG9CQUFXLENBQUMsTUFBTSxDQUNoQixrQkFBQyxDQUFDO0lBQ0Esa0JBQUMsdUJBQWMsSUFBQyxPQUFPLFFBQUMsbUJBQW1CLEVBQUMsTUFBTTtRQUNoRCxrQkFBQyxxQkFBWSxJQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFDeEMsS0FBSyxFQUFFLHFCQUFxQixHQUNmO1FBR2Ysa0JBQUMsYUFBSSxJQUFDLEtBQUssRUFBQyxZQUFZO1lBQ3RC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