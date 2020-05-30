"use strict";
/**
 * Profile Settings Page
 *
 * TODO:
 *   Add functionality to edit profile (requires DB connection to persist)
 *     Each field gets its own page
 *       vs.
 *     All done on this page
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const username_menu_1 = require("./username-menu");
const email_menu_1 = require("./email-menu");
const password_menu_1 = require("./password-menu");
/**
 * Creates a Page object to allow use throughout the project
 *
 * Most useful for connecting pages in the app
 */
class ProfileMenu extends tabris_1.Page {
    constructor(properties) {
        super();
        this.set(Object.assign({ title: 'Profile' }, properties)).append(JSX.createElement(tabris_1.TabFolder, { id: 'mainContent', stretchX: true, height: 450, tabBarLocation: 'hidden' },
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.ScrollView, { stretch: true, layout: new tabris_1.StackLayout({ spacing: 16, alignment: 'stretchX' }), padding: 12 },
                    JSX.createElement(tabris_1.Composite, { elevation: 4, onTap: () => toUsernameMenu() },
                        JSX.createElement(tabris_1.Button, { stretchX: true, background: 'white' }),
                        JSX.createElement(tabris_1.Button, { left: true, left: 4, background: 'white', textColor: '#234', text: 'Username' }),
                        JSX.createElement(tabris_1.TextView, { right: true, right: 'next() 4', background: 'white', textColor: '#aaa', text: 'Spokinetic', font: '12px', centerY: true }),
                        JSX.createElement(tabris_1.Button, { right: true, right: 8, background: 'white', textColor: '#aaa', text: '>' })),
                    JSX.createElement(tabris_1.Composite, { elevation: 4, onTap: () => toEmailMenu() },
                        JSX.createElement(tabris_1.Button, { stretchX: true, background: 'white' }),
                        JSX.createElement(tabris_1.Button, { left: true, left: 4, background: 'white', textColor: '#234', text: 'Email' }),
                        JSX.createElement(tabris_1.TextView, { right: true, right: 'next() 4', background: 'white', textColor: '#aaa', text: 'Spokinetic@gmail.com', font: '12px', centerY: true }),
                        JSX.createElement(tabris_1.Button, { right: true, right: 8, background: 'white', textColor: '#aaa', text: '>' })),
                    JSX.createElement(tabris_1.Composite, { elevation: 4, onTap: () => toPasswordMenu() },
                        JSX.createElement(tabris_1.Button, { stretchX: true, background: 'white' }),
                        JSX.createElement(tabris_1.Button, { left: true, left: 4, background: 'white', textColor: '#234', text: 'Password' }),
                        JSX.createElement(tabris_1.TextView, { right: true, right: 'next() 4', background: 'white', textColor: '#aaa', font: '12px', text: '**********', centerY: true }),
                        JSX.createElement(tabris_1.Button, { right: true, right: 8, background: 'white', textColor: '#aaa', text: '>' }))))));
    }
}
exports.ProfileMenu = ProfileMenu;
/**
 * Navigate to Username submenu
 */
function toUsernameMenu() {
    $(tabris_1.NavigationView).only().append(JSX.createElement(username_menu_1.UsernameMenu, null));
}
/**
 * Navigate to Email submenu
 */
function toEmailMenu() {
    $(tabris_1.NavigationView).only().append(JSX.createElement(email_menu_1.EmailMenu, null));
}
/**
 * Navigate to Password submenu
 */
function toPasswordMenu() {
    $(tabris_1.NavigationView).only().append(JSX.createElement(password_menu_1.PasswordMenu, null));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS1tZW51LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3Byb2ZpbGUtbWVudS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7OztHQVFHOztBQUVILG1DQUFrSDtBQUNsSCxtREFBNkM7QUFDN0MsNkNBQXVDO0FBQ3ZDLG1EQUE2QztBQUU3Qzs7OztHQUlHO0FBQ0gsTUFBYSxXQUFZLFNBQVEsYUFBSTtJQUNuQyxZQUFZLFVBQVU7UUFDcEIsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsR0FBRyxpQkFBRSxLQUFLLEVBQUUsU0FBUyxJQUFLLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FDaEQsa0JBQUMsa0JBQVMsSUFBQyxFQUFFLEVBQUMsYUFBYSxFQUFDLFFBQVEsUUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBQyxRQUFRO1lBQ3ZFLGtCQUFDLFlBQUc7Z0JBQ0Ysa0JBQUMsbUJBQVUsSUFBQyxPQUFPLFFBQUMsTUFBTSxFQUFFLElBQUksb0JBQVcsQ0FBQyxFQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUU7b0JBQzVGLGtCQUFDLGtCQUFTLElBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsY0FBYyxFQUFFO3dCQUNwRCxrQkFBQyxlQUFNLElBQUMsUUFBUSxRQUFDLFVBQVUsRUFBQyxPQUFPLEdBQUU7d0JBQ3JDLGtCQUFDLGVBQU0sSUFBQyxJQUFJLFFBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLFVBQVUsR0FBRTt3QkFDM0Usa0JBQUMsaUJBQVEsSUFBQyxLQUFLLFFBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMs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