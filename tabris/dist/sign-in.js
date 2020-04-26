"use strict";
/**
 * Sign-In Page
 *
 * TODO:
 *   Add functionality to follow up on successful submission
 *     Connect to DB to verify account exists and username/password match
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const sign_up_1 = require("./sign-up");
const index_1 = require("./index");
var mainContentHeightInt;
var mainContentHeightPortraitInt;
var mainContentHeightLandscapeInt;
/**
 * Establish viewing size so main content doesn't cover up
 *   navigation tabs at bottom of app
 */
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
/**
 * Creates a Page object to allow use throughout the project
 *
 * Most useful for connecting pages in the app
 */
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
/**
 * Updates main content height when the device is rotated to
 *   prevent content from covering navigation tabs at bottom
 */
function changeContentHeight() {
    if (tabris_1.device.orientation == "portrait-primary" || tabris_1.device.orientation == "portrait-secondary") {
        mainContentHeightInt = mainContentHeightPortraitInt;
    }
    else {
        mainContentHeightInt = mainContentHeightLandscapeInt;
    }
    $('#mainContent').set({ height: mainContentHeightInt });
}
/**
 * Opens a Sign-Up page
 *
 * detach() is called to prevent the 'hamburger menu'
 *   from being replaced by a back button titled
 *   'Spokinetic', without this call the main app
 *   can be accessed without an account
 */
function showSignUp() {
    const navigationView = $(tabris_1.NavigationView).only();
    navigationView.pages().detach();
    navigationView.append(JSX.createElement(sign_up_1.SignUpPage, null));
}
/**
 * Placeholder function for when the submit button is pressed
 *
 * TODO:
 *   Provide data validation for input fields
 *   Connect to DB to determine if account exists
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi1pbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zaWduLWluLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQUVILG1DQUFzTDtBQUN0TCx1Q0FBcUM7QUFDckMsbUNBQWlDO0FBRWpDLElBQUksb0JBQW9CLENBQUM7QUFDekIsSUFBSSw0QkFBNEIsQ0FBQztBQUNqQyxJQUFJLDZCQUE2QixDQUFDO0FBRWxDOzs7R0FHRztBQUNILElBQUcsZUFBTSxDQUFDLFdBQVcsSUFBSSxrQkFBa0IsSUFBSSxlQUFNLENBQUMsV0FBVyxJQUFJLG9CQUFvQixFQUFFO0lBQ3pGLDRCQUE0QixHQUFHLENBQUMsZUFBTSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsQ0FBQztJQUMzRCw2QkFBNkIsR0FBRyxDQUFDLGVBQU0sQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDMUQsb0JBQW9CLEdBQUcsNEJBQTRCLENBQUM7Q0FDckQ7S0FBTSxJQUFHLGVBQU0sQ0FBQyxXQUFXLElBQUksbUJBQW1CLElBQUksZUFBTSxDQUFDLFdBQVcsSUFBSSxxQkFBcUIsRUFBRTtJQUNsRyw2QkFBNkIsR0FBRyxDQUFDLGVBQU0sQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDM0QsNEJBQTRCLEdBQUcsQ0FBQyxlQUFNLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQzFELG9CQUFvQixHQUFHLDZCQUE2QixDQUFDO0NBQ3REO0FBRUQsZUFBTSxDQUFDLG9CQUFvQixDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFFakQ7Ozs7R0FJRztBQUNILE1BQWEsVUFBVyxTQUFRLGFBQUk7SUFDbEMsWUFBWSxVQUFVO1FBQ3BCLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLEdBQUcsbUJBQUssVUFBVSxFQUFFLENBQUMsTUFBTSxDQUM5QixrQkFBQyxrQkFBUyxJQUFDLE9BQU8sUUFBQyxPQUFPLFFB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