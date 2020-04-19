"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const sign_up_1 = require("./sign-up");
const index_1 = require("./index");
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
                    JSX.createElement(tabris_1.TextInput, { id: 'username', top: '135', font: '20px', message: "Username" }),
                    JSX.createElement(tabris_1.TextInput, { id: 'password', type: 'password', font: '20px', message: "Password" }),
                    JSX.createElement(tabris_1.Button, { centerX: true, font: 'bold 16px', onTap: signIn }, "Submit"),
                    JSX.createElement(tabris_1.Button, { top: 35, centerX: true, textColor: 'white', style: 'text', onTap: showSignUp }, "New User? Sign Up Here!")))));
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
function showSignUp() {
    const navigationView = $(tabris_1.NavigationView).only();
    navigationView.pages().detach();
    navigationView.append(JSX.createElement(sign_up_1.SignUpPage, null));
}
// Placeholder function for when the submit button is pressed
function signIn() {
    /* Placeholder to ensure proper capture of raw data
    const message = `Username: ${$(TextInput).only('#username').text}\n` +
                    `Password: ${$(TextInput).only('#password').text}\n`;
    AlertDialog.open(
      <AlertDialog title='Sign in?' message={message} buttons={{ok: 'Sign-In', cancel: 'Cancel'}}/>
    );*/
    const navigationView = $(tabris_1.NavigationView).only();
    navigationView.pages().detach();
    navigationView.append(JSX.createElement(index_1.MainPage, null));
    navigationView.set({ toolbarVisible: true });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi1pbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zaWduLWluLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFzTDtBQUN0TCx1Q0FBcUM7QUFDckMsbUNBQWlDO0FBRWpDLElBQUksb0JBQW9CLENBQUM7QUFDekIsSUFBSSw0QkFBNEIsQ0FBQztBQUNqQyxJQUFJLDZCQUE2QixDQUFDO0FBRWxDLElBQUcsZUFBTSxDQUFDLFdBQVcsSUFBSSxrQkFBa0IsSUFBSSxlQUFNLENBQUMsV0FBVyxJQUFJLG9CQUFvQixFQUFFO0lBQ3pGLDRCQUE0QixHQUFHLENBQUMsZUFBTSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsQ0FBQztJQUMzRCw2QkFBNkIsR0FBRyxDQUFDLGVBQU0sQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDMUQsb0JBQW9CLEdBQUcsNEJBQTRCLENBQUM7Q0FDckQ7S0FBTSxJQUFHLGVBQU0sQ0FBQyxXQUFXLElBQUksbUJBQW1CLElBQUksZUFBTSxDQUFDLFdBQVcsSUFBSSxxQkFBcUIsRUFBRTtJQUNsRyw2QkFBNkIsR0FBRyxDQUFDLGVBQU0sQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDM0QsNEJBQTRCLEdBQUcsQ0FBQyxlQUFNLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQzFELG9CQUFvQixHQUFHLDZCQUE2QixDQUFDO0NBQ3REO0FBRUQsZUFBTSxDQUFDLG9CQUFvQixDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFFakQsTUFBYSxVQUFXLFNBQVEsYUFBSTtJQUNsQyxZQUFZLFVBQVU7UUFDcEIsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsR0FBRyxtQkFBSyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQzlCLGtCQUFDLGtCQUFTLElBQUMsT0FBTyxRQUFDLE9BQU8sUUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVB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