"use strict";
/**
 * Password Settings Page
 *
 * TODO:
 *   Add functionality to update password (requires DB connection)
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
/**
 * Creates a Page object to allow use throughout the project
 *
 * Most useful for connecting pages in the app
 */
class PasswordMenu extends tabris_1.Page {
    constructor(properties) {
        super();
        this.set(Object.assign({ title: 'Change Password' }, properties)).append(JSX.createElement(tabris_1.TabFolder, { id: 'mainContent', stretchX: true, height: 450, tabBarLocation: 'hidden' },
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.ScrollView, { stretch: true, layout: new tabris_1.StackLayout({ spacing: 16, alignment: 'stretchX' }), padding: 12 },
                    JSX.createElement(tabris_1.TextInput, { id: 'current-password', top: 16, type: 'password', message: 'Current Password', style: 'underline', font: '20px', onTextChanged: () => updateButton() }),
                    JSX.createElement(tabris_1.TextInput, { id: 'new-password', type: 'password', message: 'New Password', style: 'underline', font: '20px', onTextChanged: () => updateButton() }),
                    JSX.createElement(tabris_1.TextInput, { id: 'confirm-password', type: 'password', message: 'Confirm Password', style: 'underline', font: '20px', onTextChanged: () => updateButton() }),
                    JSX.createElement(tabris_1.Button, { id: 'update-password', top: 32, stretchX: true, text: 'SAVE', enabled: false })))));
    }
}
exports.PasswordMenu = PasswordMenu;
/**
 * Enables 'SAVE' button if email is changed, otherwise disables it
 */
function updateButton() {
    if ($(tabris_1.TextInput).only('#current-password').text.length < 8 || $(tabris_1.TextInput).only('#new-password').text.length < 8 || $(tabris_1.TextInput).only('#confirm-password').text.length < 8 || $(tabris_1.TextInput).only('#current-password').text === $(tabris_1.TextInput).only('#new-password').text || $(tabris_1.TextInput).only('#new-password').text !== $(tabris_1.TextInput).only('#confirm-password').text)
        $(tabris_1.Button).only('#update-password').enabled = false;
    else
        $(tabris_1.Button).only('#update-password').enabled = true;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQtbWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wYXNzd29yZC1tZW51LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7O0FBRUgsbUNBQWtHO0FBRWxHOzs7O0dBSUc7QUFDSCxNQUFhLFlBQWEsU0FBUSxhQUFJO0lBQ3BDLFlBQVksVUFBVTtRQUNwQixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxHQUFHLGlCQUFFLEtBQUssRUFBRSxpQkFBaUIsSUFBSyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQ3hELGtCQUFDLGtCQUFTLElBQUMsRUFBRSxFQUFDLGFBQWEsRUFBQyxRQUFRLFFBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUMsUUFBUTtZQUN2RSxrQkFBQyxZQUFHO2dCQUNGLGtCQUFDLG1CQUFVLElBQUMsT0FBTyxRQUFDLE1BQU0sRUFBRSxJQUFJLG9CQUFXLENBQUMsRUFBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFO29CQUM1RixrQkFBQyxrQkFBUyxJQUFDLEVBQUUsRUFBQyxrQkFBa0IsRUFBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLGtCQUFrQixFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxhQUFhLEVBQUUsR0FBRyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUc7b0JBQ3pKLGtCQUFDLGtCQUFTLElBQUMsRUFBRSxFQUFDLGNBQWMsRUFBQyxJQUFJLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxjQUFjLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBRztvQkFDeEksa0JBQUMsa0JBQVMsSUFBQyxFQUFFLEVBQUMsa0JBQWtCLEVBQUMsSUFBSSxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBRztvQkFDaEosa0JBQUMsZUFBTSxJQUFDLEVBQUUsRUFBQyxpQkFBaUIsRUFBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLFFBQVEsUUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBRSxLQUFLLEdBQUcsQ0FDakUsQ0FDVCxDQUNJLENBQ2IsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQWhCRCxvQ0FnQkM7QUFFRDs7R0FFRztBQUNILFNBQVMsWUFBWTtJQUNuQixJQUFHLENBQUMsQ0FBQyxrQkFBUyxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLGtCQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLGtCQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsa0JBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsa0JBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLGtCQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxrQkFBUyxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSTtRQUM3VixDQUFDLENBQUMsZUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzs7UUFFbkQsQ0FBQyxDQUFDLGVBQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDdEQsQ0FBQyJ9