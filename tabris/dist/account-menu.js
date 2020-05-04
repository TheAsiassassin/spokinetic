"use strict";
/**
 * Account Settings Page
 *
 * TODO:
 *   Add options to main Account page
 *   Add suboptions to each option from Account page
 *     'Directory'-esque setup
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const profile_menu_1 = require("./profile-menu");
const notification_menu_1 = require("./notification-menu");
/**
 * Creates a Page object to allow use throughout the project
 *
 * Most useful for connecting pages in the app
 */
class AccountMenu extends tabris_1.Page {
    constructor(properties) {
        super();
        this.set(Object.assign({ title: 'Account Settings' }, properties)).append(JSX.createElement(tabris_1.TabFolder, { id: 'mainContent', stretchX: true, height: 450, tabBarLocation: 'hidden' },
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.ScrollView, { stretch: true, layout: new tabris_1.StackLayout({ spacing: 16, alignment: 'stretchX' }), padding: 12 },
                    JSX.createElement(tabris_1.Composite, { elevation: 4, onTap: () => toProfileMenu() },
                        JSX.createElement(tabris_1.Button, { stretchX: true, background: 'white' }),
                        JSX.createElement(tabris_1.Button, { left: true, left: 4, background: 'white', textColor: '#234', text: 'Profile' }),
                        JSX.createElement(tabris_1.Button, { right: true, right: 8, background: 'white', textColor: '#aaa', text: '>' })),
                    JSX.createElement(tabris_1.Composite, { elevation: 4, onTap: () => toNotificationMenu() },
                        JSX.createElement(tabris_1.Button, { stretchX: true, background: 'white' }),
                        JSX.createElement(tabris_1.Button, { left: true, left: 4, background: 'white', textColor: '#234', text: 'Notifications' }),
                        JSX.createElement(tabris_1.Button, { right: true, right: 8, background: 'white', textColor: '#aaa', text: '>' })),
                    JSX.createElement(tabris_1.Composite, { elevation: 4 },
                        JSX.createElement(tabris_1.Button, { stretchX: true, background: 'white' }),
                        JSX.createElement(tabris_1.Button, { left: true, left: 4, background: 'white', textColor: '#234', text: 'Privacy' }),
                        JSX.createElement(tabris_1.Button, { right: true, right: 8, background: 'white', textColor: '#aaa', text: '>' }))))));
    }
}
exports.AccountMenu = AccountMenu;
/**
 * Navigate to Profile submenu
 */
function toProfileMenu() {
    $(tabris_1.NavigationView).only().append(JSX.createElement(profile_menu_1.ProfileMenu, null));
}
/**
 * Navigate to Notification submenu
 */
function toNotificationMenu() {
    $(tabris_1.NavigationView).only().append(JSX.createElement(notification_menu_1.NotificationMenu, null));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC1tZW51LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FjY291bnQtbWVudS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0dBT0c7O0FBRUgsbUNBQXVNO0FBQ3ZNLGlEQUEyQztBQUMzQywyREFBcUQ7QUFFckQ7Ozs7R0FJRztBQUNILE1BQWEsV0FBWSxTQUFRLGFBQUk7SUFDbkMsWUFBWSxVQUFVO1FBQ3BCLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLEdBQUcsaUJBQUUsS0FBSyxFQUFFLGtCQUFrQixJQUFLLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FDekQsa0JBQUMsa0JBQVMsSUFBQyxFQUFFLEVBQUMsYUFBYSxFQUFDLFFBQVEsUUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBQyxRQUFRO1lBQ3ZFLGtCQUFDLFlBQUc7Z0JBQ0Ysa0JBQUMsbUJBQVUsSUFBQyxPQUFPLFFBQUMsTUFBTSxFQUFFLElBQUksb0JBQVcsQ0FBQyxFQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUU7b0JBQzVGLGtCQUFDLGtCQUFTLElBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBYSxFQUFFO3dCQUNuRCxrQkFBQyxlQUFNLElBQUMsUUFBUSxRQUFDLFVBQVUsRUFBQyxPQUFPLEdBQUU7d0JBQ3JDLGtCQUFDLGVBQU0sSUFBQyxJQUFJLFFBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLFNBQVMsR0FBRTt3QkFDMUUsa0JBQUMsZUFBTSxJQUFDLEtBQUssUUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsR0FBRyxHQUFFLENBQzVEO29CQUNaLGtCQUFDLGtCQUFTLElBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsa0JBQWtCLEVBQUU7d0JBQ3hELGtCQUFDLGVBQU0sSUFBQyxRQUFRLFFBQUMsVUFBVSxFQUFDLE9BQU8sR0FBRTt3QkFDckMsa0JBQUMsZUFBTSxJQUFDLElBQUksUUFBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsZUFBZSxHQUFFO3dCQUNoRixrQkFBQyxlQUFNLElBQUMsS0FBSyxRQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxHQUFHLEdBQUUsQ0FDNUQ7b0JBQ1osa0JBQUMsa0JBQVMsSUFBQyxTQUFTLEVBQUUsQ0FBQzt3QkFDckIsa0JBQUMsZUFBTSxJQUFDLFFBQVEsUUFBQyxVQUFVLEVBQUMsT0FBTyxHQUFFO3dCQUNyQyxrQkFBQyxlQUFNLElBQUMsSUFBSSxRQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxTQUFTLEdBQUU7d0JBQzFFLGtCQUFDLGVBQU0sSUFBQyxLQUFLLFFBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLEdBQUcsR0FBRSxDQUM1RCxDQUNELENBQ1QsQ0FDSSxDQUNiLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUEzQkQsa0NBMkJDO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLGFBQWE7SUFDcEIsQ0FBQyxDQUFDLHVCQUFjLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQzdCLGtCQUFDLDBCQUFXLE9BQUcsQ0FDaEIsQ0FBQztBQUNKLENBQUM7QUFFRDs7R0FFRztBQUNILFNBQVMsa0JBQWtCO0lBQ3pCLENBQUMsQ0FBQyx1QkFBYyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUM3QixrQkFBQyxvQ0FBZ0IsT0FBRyxDQUNyQixDQUFDO0FBQ0osQ0FBQyJ9