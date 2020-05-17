"use strict";
/**
 * Account Details Page
 *
 * TODO:
 *   Add options to main Account page
 *   Add suboptions to each option from Account page
 *     'Directory'-esque setup
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
const index_1 = require("./index");
const calendar_john_1 = require("./calendar-john");
const contact_1 = require("./contact");
const sign_in_1 = require("./sign-in");
const sign_up_1 = require("./sign-up");
const account_menu_1 = require("./account-menu");
const preferences_menu_1 = require("./preferences-menu");
const items = ['[Profile Image]', 'Edit Preferences', 'Account Settings', 'Log Out'];
/**
 * Creates a Page object to allow use throughout the project
 *
 * Most useful for connecting pages in the app
 */
class AccountPage extends tabris_1.Page {
    constructor(properties) {
        super();
        this.set(Object.assign({ title: 'My Account' }, properties)).append(JSX.createElement(tabris_1.TabFolder, { paging: true, stretch: true, selectionIndex: 3, tabBarLocation: 'bottom' },
            JSX.createElement(tabris_1.Tab, { title: 'Events', id: 'events', onSelect: () => openMainPage() }),
            JSX.createElement(tabris_1.Tab, { title: 'Calendar', onSelect: () => openCalendarPage() }),
            JSX.createElement(tabris_1.Tab, { title: 'Contact Us', onSelect: () => openContactPage() }),
            JSX.createElement(tabris_1.Tab, { title: 'My Account' })));
        this.append(JSX.createElement(tabris_1.TabFolder, { id: 'mainContent', stretchX: true, height: 450, tabBarLocation: 'hidden' },
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.ScrollView, { stretch: true, layout: new tabris_1.StackLayout({ spacing: 16, alignment: 'stretchX' }), padding: 12 },
                    JSX.createElement(tabris_1.Composite, { background: 'linear-gradient(0deg, #0288d1 10%, #00dfff)', height: 160, padding: 16 },
                        JSX.createElement(tabris_1.ImageView, { id: 'profile', image: 'images/Spokinetic_imgLogo.png', height: 96, width: 96, centerX: true, cornerRadius: 48, scaleMode: 'fill', onTap: () => editProfilePic() }),
                        JSX.createElement(tabris_1.TextView, { text: '@Spokinetic', font: 'bold 16px', top: 'prev() 12', centerX: true, textColor: 'white' })),
                    JSX.createElement(tabris_1.Composite, { elevation: 4, onTap: () => toPreferencesMenu() },
                        JSX.createElement(tabris_1.Button, { stretchX: true, background: 'white' }),
                        JSX.createElement(tabris_1.Button, { left: true, left: 4, background: 'white', textColor: '#234', text: 'Edit Event Preferences' }),
                        JSX.createElement(tabris_1.Button, { right: true, right: 8, background: 'white', textColor: '#aaa', text: '>' })),
                    JSX.createElement(tabris_1.Composite, { elevation: 4, onTap: () => toAccountMenu() },
                        JSX.createElement(tabris_1.Button, { stretchX: true, background: 'white' }),
                        JSX.createElement(tabris_1.Button, { left: true, left: 4, background: 'white', textColor: '#234', text: 'Account Settings' }),
                        JSX.createElement(tabris_1.Button, { right: true, right: 8, background: 'white', textColor: '#aaa', text: '>' })),
                    JSX.createElement(tabris_1.Button, { elevation: 4, stretchX: true, background: 'white', textColor: 'red', text: 'Log Out', onTap: () => logOut() })))));
    }
}
exports.AccountPage = AccountPage;
/**
 * Opens the Main/Events page
 *
 * detach() is called to prevent the 'hamburger menu'
 *   from being replaced by a back button titled
 *   'Spokinetic'
 */
function openMainPage() {
    const navigationView = $(tabris_1.NavigationView).only();
    navigationView.pages().detach();
    navigationView.append(JSX.createElement(index_1.MainPage, null));
}
/**
 * Opens the Calendar page
 *
 * detach() is called to prevent the 'hamburger menu'
 *   from being replaced by a back button titled
 *   'Spokinetic'
 */
function openCalendarPage() {
    const navigationView = $(tabris_1.NavigationView).only();
    navigationView.pages().detach();
    navigationView.append(JSX.createElement(calendar_john_1.CalendarPage, null));
}
/**
 * Opens the Contact Us page
 *
 * detach() is called to prevent the 'hamburger menu'
 *   from being replaced by a back button titled
 *   'Spokinetic'
 */
function openContactPage() {
    const navigationView = $(tabris_1.NavigationView).only();
    navigationView.pages().detach();
    navigationView.append(JSX.createElement(contact_1.ContactPage, null));
}
function editProfilePic() {
    return __awaiter(this, void 0, void 0, function* () {
        const actionSheet = tabris_1.ActionSheet.open(JSX.createElement(tabris_1.ActionSheet, { title: 'Update Profile Picture' },
            JSX.createElement(tabris_1.ActionSheetItem, { title: 'Take Picture' }),
            JSX.createElement(tabris_1.ActionSheetItem, { title: 'Upload Image' }),
            JSX.createElement(tabris_1.ActionSheetItem, { title: 'Cancel', style: 'cancel' })));
        const { action } = yield actionSheet.onClose.promise();
        if (action == 'Take Picture')
            openCamera();
        else if (action == 'Upload Image')
            openFilePicker();
    });
}
function setOptions(srcType) {
    var options = {
        quality: 50,
        destinationType: tabris_1.Camera.DestinationType.FILE_URI,
        sourceType: srcType,
        encodingType: tabris_1.Camera.EncodingType.JPEG,
        mediaType: tabris_1.Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true
    };
    return options;
}
function openCamera() {
    var srcType = tabris_1.Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);
    navigator.camera.getPicture(function cameraSuccess(imageUri) {
        $(tabris_1.ImageView).only('#profile').image = imageUri;
    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");
    }, options);
}
function openFilePicker() {
    var srcType = tabris_1.Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);
    navigator.camera.getPicture(function cameraSuccess(imageUri) {
        $(tabris_1.ImageView).only('#profile').image = imageUri;
    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");
    }, options);
}
/**
 * Navigate to Event Preferences submenu
 */
function toPreferencesMenu() {
    $(tabris_1.NavigationView).only().append(JSX.createElement(preferences_menu_1.PreferencesMenu, null));
}
/**
 * Navigate to Account submenu
 */
function toAccountMenu() {
    $(tabris_1.NavigationView).only().append(JSX.createElement(account_menu_1.AccountMenu, null));
}
/**
 * Logs the user out, redirecting back to original Popover
 *
 * Prompts user for confirmation, function is asynchronous
 *   out of necessity; actions following the prompt depend
 *   entirely on user's response
 */
function logOut() {
    return __awaiter(this, void 0, void 0, function* () {
        const dialog = tabris_1.AlertDialog.open(JSX.createElement(tabris_1.AlertDialog, { title: 'Log Out', message: 'Are you sure you want to log out?', buttons: { ok: 'Yes', cancel: 'No' } }));
        const { button } = yield dialog.onClose.promise();
        if (button === 'ok') {
            openMainPage();
            showLanding();
        }
    });
}
/**
 * Opens the initial welcoming Popover
 *
 * Essentially a splash screen with options to either
 *   sign up or sign in
 */
function showLanding() {
    const popover = tabris_1.Popover.open(JSX.createElement(tabris_1.Popover, null,
        JSX.createElement(tabris_1.Stack, { background: '#79a6e1', stretchX: true, height: 550 },
            JSX.createElement(tabris_1.ScrollView, { top: true, background: '#234', stretchX: true, height: 72, direction: 'horizontal', layout: new tabris_1.RowLayout({ alignment: 'stretchY' }) },
                JSX.createElement(tabris_1.TextView, { left: true, textColor: 'white', font: 'bold 35px' }, "  Spokinetic    "),
                JSX.createElement(tabris_1.Button, { style: 'text', textColor: 'white', left: 16, font: 'bold 14px', onSelect: () => showSignIn(popover) }, "SIGN IN")),
            JSX.createElement(tabris_1.TextView, { centerX: true, top: 60, textColor: 'white', font: 'bold 40px' }, "Welcome!"),
            JSX.createElement(tabris_1.TextView, { centerX: true, textColor: 'white', font: 'bold 24px' }, "All your local events, right"),
            JSX.createElement(tabris_1.TextView, { centerX: true, top: 5, textColor: 'white', font: 'bold 24px' }, "in the palm of your hand"),
            JSX.createElement(tabris_1.Button, { centerX: true, top: 105, width: 300, height: 70, background: '#77c666', style: 'flat', font: 'bold 18px', textColor: 'white', onSelect: () => showSignUp(popover) }, "Get Started")),
        JSX.createElement(tabris_1.TextView, { bottom: true, centerX: true, textColor: '#2f2f2f', font: 'bold 9px' }, "James Tollefson | Ian Oleson | John Petrovich | Steven McConnell")));
}
/**
 * Opens a Sign-Up page
 *
 * @param {Popover} popover
 *
 * detach() is called to prevent the 'hamburger menu'
 *   from being replaced by a back button titled
 *   'Spokinetic', without this call the main app
 *   can be accessed without an account
 *
 * The toolbar is removed to further enforce this
 */
function showSignUp(popover) {
    popover.close();
    const navigationView = $(tabris_1.NavigationView).only();
    navigationView.pages().detach();
    navigationView.append(JSX.createElement(sign_up_1.SignUpPage, null));
    navigationView.set({ toolbarVisible: false });
}
/**
 * Opens a Sign-In page
 *
 * @param {Popover} popover
 *
 * detach() is called to prevent the 'hamburger menu'
 *   from being replaced by a back button titled
 *   'Spokinetic', without this call the main app
 *   can be accessed without an account
 *
 * The toolbar is removed to further enforce this
 */
function showSignIn(popover) {
    popover.close();
    const navigationView = $(tabris_1.NavigationView).only();
    navigationView.pages().detach();
    navigationView.append(JSX.createElement(sign_in_1.SignInPage, null));
    navigationView.set({ toolbarVisible: false });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hY2NvdW50LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7R0FPRzs7Ozs7Ozs7OztBQUVILG1DQUEyTTtBQUMzTSxtQ0FBaUM7QUFDakMsbURBQTZDO0FBQzdDLHVDQUFzQztBQUN0Qyx1Q0FBcUM7QUFDckMsdUNBQXFDO0FBQ3JDLGlEQUEyQztBQUMzQyx5REFBbUQ7QUFFbkQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUVyRjs7OztHQUlHO0FBQ0gsTUFBYSxXQUFZLFNBQVEsYUFBSTtJQUNuQyxZQUFZLFVBQVU7UUFDcEIsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsR0FBRyxpQkFBRSxLQUFLLEVBQUUsWUFBWSxJQUFLLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FDbkQsa0JBQUMsa0JBQVMsSUFBQyxNQUFNLFFBQUMsT0FBTyxRQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsY0FBYyxFQUFDLFFBQVE7WUFFbEUsa0JBQUMsWUFBRyxJQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQ3hEO1lBRU4sa0JBQUMsWUFBRyxJQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixFQUFFLEdBQ2xEO1lBRU4sa0JBQUMsWUFBRyxJQUFDLEtBQUssRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUNuRDtZQUVOLGtCQUFDLFlBQUcsSUFBQyxLQUFLLEVBQUMsWUFBWSxHQUNqQixDQUVJLENBQ2IsQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQ1Qsa0JBQUMsa0JBQVMsSUFBQyxF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