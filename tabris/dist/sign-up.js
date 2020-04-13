"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const TYPE = ['Personal', 'Group', 'Business'];
var mainContentHeightInt;
var mainContentHeightPortraitInt;
var mainContentHeightLandscapeInt;
if (tabris_1.device.orientation == 'portrait-primary' || tabris_1.device.orientation == 'portrait-secondary') {
    mainContentHeightPortraitInt = (tabris_1.device.screenHeight - 50);
    mainContentHeightLandscapeInt = (tabris_1.device.screenWidth - 35);
    mainContentHeightInt = mainContentHeightPortraitInt;
}
else if (tabris_1.device.orientation == 'landscape-primary' || tabris_1.device.orientation == 'landscape-secondary') {
    mainContentHeightLandscapeInt = (tabris_1.device.screenHeight - 35);
    mainContentHeightPortraitInt = (tabris_1.device.screenWidth - 50);
    mainContentHeightInt = mainContentHeightLandscapeInt;
}
tabris_1.device.onOrientationChanged(changeContentHeight);
class SignUpPage extends tabris_1.Page {
    constructor(properties) {
        super();
        this.set(Object.assign({}, properties)).append(JSX.createElement(tabris_1.ImageView, { centerX: true, centerY: true, width: 800, height: 1000, opacity: .7, image: 'images/mountain2.jpeg', scaleMode: 'fill' }));
        this.append(JSX.createElement(tabris_1.TabFolder, { id: 'mainContent', stretchX: true, height: mainContentHeightInt, tabBarLocation: 'hidden' },
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
                    JSX.createElement(tabris_1.Button, { centerX: true, onTap: signUp }, "Submit")))));
        this.append(JSX.createElement(tabris_1.TabFolder, { stretchX: true, height: 100, background: '#234', tabBarLocation: 'hidden' },
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.TextView, { text: 'SIGN UP', textColor: 'white', font: '40px', centerX: true, centerY: true }))));
    }
}
exports.SignUpPage = SignUpPage;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi11cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zaWduLXVwLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFtTztBQUVuTyxNQUFNLElBQUksR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDL0MsSUFBSSxvQkFBb0IsQ0FBQztBQUN6QixJQUFJLDRCQUE0QixDQUFDO0FBQ2pDLElBQUksNkJBQTZCLENBQUM7QUFFbEMsSUFBRyxlQUFNLENBQUMsV0FBVyxJQUFJLGtCQUFrQixJQUFJLGVBQU0sQ0FBQyxXQUFXLElBQUksb0JBQW9CLEVBQUU7SUFDekYsNEJBQTRCLEdBQUcsQ0FBQyxlQUFNLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzFELDZCQUE2QixHQUFHLENBQUMsZUFBTSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMxRCxvQkFBb0IsR0FBRyw0QkFBNEIsQ0FBQztDQUNyRDtLQUFNLElBQUcsZUFBTSxDQUFDLFdBQVcsSUFBSSxtQkFBbUIsSUFBSSxlQUFNLENBQUMsV0FBVyxJQUFJLHFCQUFxQixFQUFFO0lBQ2xHLDZCQUE2QixHQUFHLENBQUMsZUFBTSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMzRCw0QkFBNEIsR0FBRyxDQUFDLGVBQU0sQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDekQsb0JBQW9CLEdBQUcsNkJBQTZCLENBQUM7Q0FDdEQ7QUFFRCxlQUFNLENBQUMsb0JBQW9CLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUVqRCxNQUFhLFVBQVcsU0FBUSxhQUFJO0lBQ2xDLFlBQVksVUFBVTtRQUNwQixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxHQUFHLG1CQUFLLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FDOUIsa0JBQUMsa0JBQVMsSUFBQyxPQUFPLFFBQUMsT0FBTyxRQUFDLEtB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