"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const TYPE = ['Personal', 'Group', 'Business'];
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
                    JSX.createElement(tabris_1.ScrollView, { stretch: true, layout: new tabris_1.StackLayout({ spacing: 16, alignment: 'stretchX' }), padding: 32 },
                        JSX.createElement(tabris_1.TextView, { top: '85', left: '8', textColor: 'white' }, "* indicates a required field"),
                        JSX.createElement(tabris_1.TextInput, { id: 'email', top: '15', message: 'Email Address*' }),
                        JSX.createElement(tabris_1.TextInput, { id: 'username', message: 'Username*' }),
                        JSX.createElement(tabris_1.TextInput, { id: 'reusername', message: 'Re-enter Username*' }),
                        JSX.createElement(tabris_1.TextInput, { id: 'password', type: 'password', message: 'Password*' }),
                        JSX.createElement(tabris_1.TextView, { top: '5', left: '8', font: '12px', textColor: 'white' }, "Must be at least 8 characters"),
                        JSX.createElement(tabris_1.TextInput, { id: 'repassword', top: '10', type: 'password', message: 'Re-enter Password*' }),
                        JSX.createElement(tabris_1.Picker, { id: 'accountType', background: 'white', itemCount: TYPE.length, itemText: (index) => TYPE[index], message: 'Account Type*' }),
                        JSX.createElement(tabris_1.CheckBox, { id: 'termsConditions', text: 'I agree to the Terms and Conditions*', textColor: 'white' }),
                        JSX.createElement(tabris_1.CheckBox, { id: 'notifications', text: 'I would like to receive email notifications (optional)', textColor: 'white' }),
                        JSX.createElement(tabris_1.Button, { centerX: true, onTap: signUp }, "Submit")))),
            JSX.createElement(tabris_1.TabFolder, { stretchX: true, height: 100, background: '#234', tabBarLocation: 'hidden' },
                JSX.createElement(tabris_1.Tab, null,
                    JSX.createElement(tabris_1.TextView, { text: 'SIGN UP', textColor: 'white', font: '40px', centerX: true, centerY: true })))))));
function changeContentHeight() {
    if (tabris_1.device.orientation == "portrait-primary" || tabris_1.device.orientation == "portrait-secondary") {
        mainContentHeightInt = mainContentHeightPortraitInt;
    }
    else {
        mainContentHeightInt = mainContentHeightLandscapeInt;
    }
    $('#mainContent').set({ height: mainContentHeightInt });
}
// Basic validation for when the submit button is pressed
function signUp() {
    var promptBoolean = false;
    var field = $(tabris_1.TextInput).only('#email');
    var search = field.text.search(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    if (search == -1 || field.text.length == 0) {
        field.set({ borderColor: new tabris_1.Color(255, 0, 0) });
        promptBoolean = true;
    }
    else {
        field.set({ borderColor: new tabris_1.Color(255, 255, 255) });
    }
    field = $(tabris_1.TextInput).only('#username');
    if (field.text.length == 0) {
        field.set({ borderColor: new tabris_1.Color(255, 0, 0) });
        promptBoolean = true;
    }
    else {
        field.set({ borderColor: new tabris_1.Color(255, 255, 255) });
    }
    field = $(tabris_1.TextInput).only('#reusername');
    if ($(tabris_1.TextInput).only('#username').text != field.text || field.text.length == 0) {
        field.set({ borderColor: new tabris_1.Color(255, 0, 0) });
        promptBoolean = true;
    }
    else {
        field.set({ borderColor: new tabris_1.Color(255, 255, 255) });
    }
    field = $(tabris_1.TextInput).only('#password');
    if (field.text.length < 8) {
        field.set({ borderColor: new tabris_1.Color(255, 0, 0) });
        promptBoolean = true;
    }
    else {
        field.set({ borderColor: new tabris_1.Color(255, 255, 255) });
    }
    field = $(tabris_1.TextInput).only('#repassword');
    if ($(tabris_1.TextInput).only('#password').text != field.text || field.text.length < 8) {
        field.set({ borderColor: new tabris_1.Color(255, 0, 0) });
        promptBoolean = true;
    }
    else {
        field.set({ borderColor: new tabris_1.Color(255, 255, 255) });
    }
    field = $(tabris_1.Picker).only('#accountType');
    if (field.selectionIndex == -1) {
        field.set({ borderColor: new tabris_1.Color(255, 0, 0) });
        promptBoolean = true;
    }
    else {
        field.set({ borderColor: new tabris_1.Color(255, 255, 255) });
    }
    field = $(tabris_1.CheckBox).only('#termsConditions');
    if (!field.checked) {
        field.set({ textColor: new tabris_1.Color(255, 0, 0) });
        promptBoolean = true;
    }
    else {
        field.set({ textColor: new tabris_1.Color(255, 255, 255) });
    }
    if (promptBoolean) {
        tabris_1.AlertDialog.open(JSX.createElement(tabris_1.AlertDialog, { title: 'Invalid data', message: 'Please correct fields highlighted in red', buttons: { ok: 'OK' } }));
    }
    else {
        tabris_1.AlertDialog.open(JSX.createElement(tabris_1.AlertDialog, { title: 'Sign up?', message: 'Are you sure you want to sign up?', buttons: { ok: 'Yes', cancel: 'No' } }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXguanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQStNO0FBRS9NLE1BQU0sSUFBSSxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztBQUMvQyxJQUFJLG9CQUFvQixDQUFDO0FBQ3pCLElBQUksNEJBQTRCLENBQUM7QUFDakMsSUFBSSw2QkFBNkIsQ0FBQztBQUVsQyxJQUFHLGVBQU0sQ0FBQyxXQUFXLElBQUksa0JBQWtCLElBQUksZUFBTSxDQUFDLFdBQVcsSUFBSSxvQkFBb0IsRUFBRTtJQUN6Riw0QkFBNEIsR0FBRyxDQUFDLGVBQU0sQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDM0QsNkJBQTZCLEdBQUcsQ0FBQyxlQUFNLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzFELG9CQUFvQixHQUFHLDRCQUE0QixDQUFDO0NBQ3JEO0tBQU0sSUFBRyxlQUFNLENBQUMsV0FBVyxJQUFJLG1CQUFtQixJQUFJLGVBQU0sQ0FBQyxXQUFXLElBQUkscUJBQXFCLEVBQUU7SUFDbEcsNkJBQTZCLEdBQUcsQ0FBQyxlQUFNLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzNELDRCQUE0QixHQUFHLENBQUMsZUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUMxRCxvQkFBb0IsR0FBRyw2QkFBNkIsQ0FBQztDQUN0RDtBQUVELGVBQU0sQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBRWpELG9CQUFXLENBQUMsTUFBTSxDQUNoQixrQkFBQyxDQUFDO0lBQ0Esa0JBQUMsdUJBQWMsSUFBQyxPQUFPLFFBQUMsbUJBQW1CLEVBQUMsTUFBTTtRQUNoRCxrQkFBQyxxQkFBWSxJQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFDeEMsS0FBSyxF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