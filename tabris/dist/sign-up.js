"use strict";
/**
 * Sign-Up Page
 *
 * TODO:
 *   Add functionality to follow up on successful submission
 *     Connect to DB and add record
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const sign_in_1 = require("./sign-in");
const index_1 = require("./index");
const TYPE = ['Personal', 'Group', 'Business'];
var mainContentHeightInt;
var mainContentHeightPortraitInt;
var mainContentHeightLandscapeInt;
/**
 * Establish viewing size so main content doesn't cover up
 *   navigation tabs at bottom of app
 */
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
/**
 * Creates a Page object to allow use throughout the project
 *
 * Most useful for connecting pages in the app
 */
class SignUpPage extends tabris_1.Page {
    constructor(properties) {
        super();
        this.set(Object.assign({}, properties)).append(JSX.createElement(tabris_1.ImageView, { centerX: true, centerY: true, width: 800, height: 1000, opacity: .7, image: 'images/mountain2.jpeg', scaleMode: 'fill' }));
        this.append(JSX.createElement(tabris_1.TabFolder, { id: 'mainContent', stretchX: true, height: mainContentHeightInt, tabBarLocation: 'hidden' },
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.ScrollView, { stretch: true, layout: new tabris_1.StackLayout({ spacing: 16, alignment: 'stretchX' }), padding: 32 },
                    JSX.createElement(tabris_1.TextView, { top: '85', left: '8', font: '16px', textColor: 'white' }, "* indicates a required field"),
                    JSX.createElement(tabris_1.TextInput, { id: 'email', top: '15', font: '20px', message: 'Email Address*' }),
                    JSX.createElement(tabris_1.TextInput, { id: 'username', font: '20px', message: 'Username*' }),
                    JSX.createElement(tabris_1.TextInput, { id: 'reusername', font: '20px', message: 'Re-enter Username*' }),
                    JSX.createElement(tabris_1.TextInput, { id: 'password', type: 'password', font: '20px', message: 'Password*' }),
                    JSX.createElement(tabris_1.TextView, { top: '5', left: '8', font: '16px', textColor: 'white' }, "Must be at least 8 characters"),
                    JSX.createElement(tabris_1.TextInput, { id: 'repassword', top: '10', type: 'password', font: '20px', message: 'Re-enter Password*' }),
                    JSX.createElement(tabris_1.Picker, { id: 'accountType', background: 'white', font: '20px', itemCount: TYPE.length, itemText: (index) => TYPE[index], message: 'Account Type*' }),
                    JSX.createElement(tabris_1.CheckBox, { id: 'termsConditions', text: 'I agree to the Terms and Conditions*', font: '20px', textColor: 'white' }),
                    JSX.createElement(tabris_1.CheckBox, { id: 'notifications', text: 'I would like to receive email notifications (optional)', font: '20px', textColor: 'white' }),
                    JSX.createElement(tabris_1.Button, { centerX: true, font: 'bold 16px', onTap: signUp }, "Submit"),
                    JSX.createElement(tabris_1.Button, { top: 35, centerX: true, textColor: 'white', style: 'text', onTap: showSignIn }, "Already have an account?")))));
        this.append(JSX.createElement(tabris_1.TabFolder, { stretchX: true, height: 100, background: '#234', tabBarLocation: 'hidden' },
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.TextView, { text: 'SIGN UP', textColor: 'white', font: '40px', centerX: true, centerY: true }))));
    }
}
exports.SignUpPage = SignUpPage;
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
 * Opens a Sign-In page
 *
 * detach() is called to prevent the 'hamburger menu'
 *   from being replaced by a back button titled
 *   'Spokinetic', without this call the main app
 *   can be accessed without an account
 */
function showSignIn() {
    const navigationView = $(tabris_1.NavigationView).only();
    navigationView.pages().detach();
    navigationView.append(JSX.createElement(sign_in_1.SignInPage, null));
}
/**
 * Provides basic data validation for the fields
 *   on the page
 *
 * TODO:
 *   Provide proper follow-up once the data is
 *     determined to be valid
 *   Refactor data validation to provide more valid
 *     checks/make more secure once connected to DB
 */
function signUp() {
    return __awaiter(this, void 0, void 0, function* () {
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
            const dialog = tabris_1.AlertDialog.open(JSX.createElement(tabris_1.AlertDialog, { title: 'Sign up?', message: 'Are you sure you want to sign up?', buttons: { ok: 'Yes', cancel: 'No' } }));
            const { button } = yield dialog.onClose.promise();
            if (button === 'ok') {
                const navigationView = $(tabris_1.NavigationView).only();
                navigationView.pages().detach();
                navigationView.append(JSX.createElement(index_1.MainPage, null));
                navigationView.set({ toolbarVisible: true });
            }
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi11cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zaWduLXVwLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7O0FBRUgsbUNBQW1PO0FBQ25PLHVDQUFxQztBQUNyQyxtQ0FBaUM7QUFFakMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQy9DLElBQUksb0JBQW9CLENBQUM7QUFDekIsSUFBSSw0QkFBNEIsQ0FBQztBQUNqQyxJQUFJLDZCQUE2QixDQUFDO0FBRWxDOzs7R0FHRztBQUNILElBQUcsZUFBTSxDQUFDLFdBQVcsSUFBSSxrQkFBa0IsSUFBSSxlQUFNLENBQUMsV0FBVyxJQUFJLG9CQUFvQixFQUFFO0lBQ3pGLDRCQUE0QixHQUFHLENBQUMsZUFBTSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMxRCw2QkFBNkIsR0FBRyxDQUFDLGVBQU0sQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDMUQsb0JBQW9CLEdBQUcsNEJBQTRCLENBQUM7Q0FDckQ7S0FBTSxJQUFHLGVBQU0sQ0FBQyxXQUFXLElBQUksbUJBQW1CLElBQUksZUFBTSxDQUFDLFdBQVcsSUFBSSxxQkFBcUIsRUFBRTtJQUNsRyw2QkFBNkIsR0FBRyxDQUFDLGVBQU0sQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDM0QsNEJBQTRCLEdBQUcsQ0FBQyxlQUFNLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELG9CQUFvQixHQUFHLDZCQUE2QixDQUFDO0NBQ3REO0FBRUQsZUFBTSxDQUFDLG9CQUFvQixDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFFakQ7Ozs7R0FJRztBQUNILE1BQWEsVUFBVyxTQUFRLGFBQUk7SUFDbEMsWUFBWSxVQUFVO1FBQ3BCLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLEdB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