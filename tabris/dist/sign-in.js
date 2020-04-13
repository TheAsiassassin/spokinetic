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
class SignInPage extends tabris_1.Page {
    constructor(properties) {
        super();
        this.set(Object.assign({}, properties)).append(JSX.createElement(tabris_1.ImageView, { centerX: true, centerY: true, width: 800, height: 1000, opacity: .7, image: 'images/mountain2.jpeg', scaleMode: 'fill' }));
        this.append(JSX.createElement(tabris_1.TabFolder, { id: 'mainContent', stretchX: true, height: mainContentHeightInt, tabBarLocation: 'hidden' },
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.ScrollView, { stretch: true, layout: new tabris_1.StackLayout({ spacing: 12, alignment: 'stretchX' }), padding: 32 },
                    JSX.createElement(tabris_1.TextInput, { id: 'username', top: '85', message: "Username" }),
                    JSX.createElement(tabris_1.TextInput, { id: 'password', type: 'password', message: "Password" }),
                    JSX.createElement(tabris_1.Button, { centerX: true, onTap: signIn }, "Submit")))));
        this.append(JSX.createElement(tabris_1.TabFolder, { paging: true, stretchX: true, height: 100, background: '#234', tabBarLocation: 'hidden' },
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.TextView, { text: 'SIGN IN', textColor: 'white', font: '40px', centerX: true, centerY: true }))));
    }
}
exports.SignInPage = SignInPage;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi1pbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zaWduLWluLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFzTDtBQUV0TCxJQUFJLG9CQUFvQixDQUFDO0FBQ3pCLElBQUksNEJBQTRCLENBQUM7QUFDakMsSUFBSSw2QkFBNkIsQ0FBQztBQUVsQyxJQUFHLGVBQU0sQ0FBQyxXQUFXLElBQUksa0JBQWtCLElBQUksZUFBTSxDQUFDLFdBQVcsSUFBSSxvQkFBb0IsRUFBRTtJQUN6Riw0QkFBNEIsR0FBRyxDQUFDLGVBQU0sQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDM0QsNkJBQTZCLEdBQUcsQ0FBQyxlQUFNLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzFELG9CQUFvQixHQUFHLDRCQUE0QixDQUFDO0NBQ3JEO0tBQU0sSUFBRyxlQUFNLENBQUMsV0FBVyxJQUFJLG1CQUFtQixJQUFJLGVBQU0sQ0FBQyxXQUFXLElBQUkscUJBQXFCLEVBQUU7SUFDbEcsNkJBQTZCLEdBQUcsQ0FBQyxlQUFNLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzNELDRCQUE0QixHQUFHLENBQUMsZUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUMxRCxvQkFBb0IsR0FBRyw2QkFBNkIsQ0FBQztDQUN0RDtBQUVELGVBQU0sQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBRWpELE1BQWEsVUFBVyxTQUFRLGFBQUk7SUFDbEMsWUFBWSxVQUFVO1FBQ3BCLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLEdBQUcsbUJBQUssVUFBVSxFQUFFLENBQUMsTUFBTSxDQUM5QixrQkFBQyxrQkFBUyxJQUFDLE9BQU8sUUFBQyxPQUFPLFFBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQzlELEtBQUssRUFBRSx1QkFBdUIsRUFDOUIsU0FBUyxFQUFDLE1BQU0sR0FBRyxDQUN0QixDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FDVCxrQkFBQyxrQkFBUyxJQUFDLEVBQUUsRUFBQyxhQUFhLEVBQUMsUUFBUSxRQUFDLE1BQU0sRUFBRSxvQkFBb0IsRUFBRSxjQUFjLEVBQUMsUUFBUTtZQUN4RixrQkFBQyxZQUFHO2dCQUNGLGtCQUFDLG1CQUFVLElBQUMsT0FBTyxRQUFDLE1BQU0sRUFBRSxJQUFJLG9CQUFXLENBQUMsRUFBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFO29CQUM1RixrQkFBQyxrQkFBUyxJQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsVUFBVSxHQUFFO29CQUN0RCxrQkFBQyxrQkFBUyxJQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsVUFBVSxHQUFFO29CQUM3RCxrQkFBQyxlQUFNLElBQUMsT0FBTyxRQUFDLEtBQUssRUFBRSxNQUFNLGFBQWlCLENBQ25DLENBQ1QsQ0FDSSxDQUNiLENBQUM7UUFDRixJQUFJLENBQUMsTUFBTSxDQUNULGtCQUFDLGtCQUFTLElBQUMsTUFBTSxRQUFDLFFBQVEsUUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFFBQVE7WUFDL0Usa0JBQUMsWUFBRztnQkFDRixrQkFBQyxpQkFBUSxJQUFDLElBQUksRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLE9BQU8sUUFBQyxPQUFPLFNBQUcsQ0FDckUsQ0FDSSxDQUNiLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUEzQkQsZ0NBMkJDO0FBRUQsU0FBUyxtQkFBbUI7SUFDMUIsSUFBRyxlQUFNLENBQUMsV0FBVyxJQUFJLGtCQUFrQixJQUFJLGVBQU0sQ0FBQyxXQUFXLElBQUksb0JBQW9CLEVBQUU7UUFDekYsb0JBQW9CLEdBQUcsNEJBQTRCLENBQUM7S0FDckQ7U0FBTTtRQUNMLG9CQUFvQixHQUFHLDZCQUE2QixDQUFDO0tBQ3REO0lBRUQsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLE1BQU0sRUFBRSxvQkFBb0IsRUFBQyxDQUFDLENBQUM7QUFDeEQsQ0FBQztBQUVELDZEQUE2RDtBQUM3RCxTQUFTLE1BQU07SUFDYixNQUFNLE9BQU8sR0FBRyxhQUFhLENBQUMsQ0FBQyxrQkFBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksSUFBSTtRQUNwRCxhQUFhLENBQUMsQ0FBQyxrQkFBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO0lBQ3JFLG9CQUFXLENBQUMsSUFBSSxDQUNkLGtCQUFDLG9CQUFXLElBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBQyxHQUFHLENBQzlGLENBQUM7QUFDSixDQUFDIn0=