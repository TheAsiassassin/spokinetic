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
                        JSX.createElement(tabris_1.ImageView, { image: 'images/concert.jpg', height: 96, width: 96, centerX: true, cornerRadius: 48, scaleMode: 'fill' }),
                        JSX.createElement(tabris_1.TextView, { text: '@Spokinetic', font: 'bold 16px', top: 'prev() 12', centerX: true, textColor: 'white' })),
                    JSX.createElement(tabris_1.Composite, { elevation: 4 },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hY2NvdW50LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7R0FPRzs7Ozs7Ozs7OztBQUVILG1DQUF1TTtBQUN2TSxtQ0FBaUM7QUFDakMsbURBQTZDO0FBQzdDLHVDQUFzQztBQUN0Qyx1Q0FBcUM7QUFDckMsdUNBQXFDO0FBQ3JDLGlEQUEyQztBQUUzQyxNQUFNLEtBQUssR0FBRyxDQUFDLGlCQUFpQixFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBRXJGOzs7O0dBSUc7QUFDSCxNQUFhLFdBQVksU0FBUSxhQUFJO0lBQ25DLFlBQVksVUFBVTtRQUNwQixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxHQUFHLGlCQUFFLEtBQUssRUFBRSxZQUFZLElBQUssVUFBVSxFQUFFLENBQUMsTUFBTSxDQUNuRCxrQkFBQyxrQkFBUyxJQUFDLE1BQU0sUUFBQyxPQUFPLFFBQUMsY0FBYyxFQUFFLENBQUMsRUFBRSxjQUFjLEVBQUMsUUFBUTtZQUVsRSxrQkFBQyxZQUFHLElBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FDeEQ7WUFFTixrQkFBQyxZQUFHLElBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsR0FDbEQ7WUFFTixrQkFBQyxZQUFHLElBQUMsS0FBSyxFQUFDLFlBQVksRUFBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQ25EO1lBRU4sa0JBQUMsWUFBRyxJQUFDLEtBQUssRUFBQyxZQUFZLEdBQ2pCLENBRUksQ0FDYixDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FDVCxrQkFBQyxrQkFBUyxJQUFDLEVBQUUsRUFBQyxhQUFh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