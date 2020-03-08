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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi11cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zaWduLXVwLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUErTTtBQUUvTSxNQUFNLElBQUksR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDL0MsSUFBSSxvQkFBb0IsQ0FBQztBQUN6QixJQUFJLDRCQUE0QixDQUFDO0FBQ2pDLElBQUksNkJBQTZCLENBQUM7QUFFbEMsSUFBRyxlQUFNLENBQUMsV0FBVyxJQUFJLGtCQUFrQixJQUFJLGVBQU0sQ0FBQyxXQUFXLElBQUksb0JBQW9CLEVBQUU7SUFDekYsNEJBQTRCLEdBQUcsQ0FBQyxlQUFNLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQzNELDZCQUE2QixHQUFHLENBQUMsZUFBTSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMxRCxvQkFBb0IsR0FBRyw0QkFBNEIsQ0FBQztDQUNyRDtLQUFNLElBQUcsZUFBTSxDQUFDLFdBQVcsSUFBSSxtQkFBbUIsSUFBSSxlQUFNLENBQUMsV0FBVyxJQUFJLHFCQUFxQixFQUFFO0lBQ2xHLDZCQUE2QixHQUFHLENBQUMsZUFBTSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMzRCw0QkFBNEIsR0FBRyxDQUFDLGVBQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDMUQsb0JBQW9CLEdBQUcsNkJBQTZCLENBQUM7Q0FDdEQ7QUFFRCxlQUFNLENBQUMsb0JBQW9CLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUVqRCxvQkFBVyxDQUFDLE1BQU0sQ0FDaEIsa0JBQUMsQ0FBQztJQUNBLGtCQUFDLHVCQUFjLElBQUMsT0FBTyxRQUFDLG1CQUFtQixFQUFDLE1BQU07UUFDaEQsa0JBQUMscUJBQVksSUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQ3hDLEtB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