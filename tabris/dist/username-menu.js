"use strict";
/**
 * Username Settings Page
 *
 * TODO:
 *   Add functionality to update username (requires DB connection)
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const curUsername = 'Spokinetic';
/**
 * Creates a Page object to allow use throughout the project
 *
 * Most useful for connecting pages in the app
 */
class UsernameMenu extends tabris_1.Page {
    constructor(properties) {
        super();
        this.set(Object.assign({ title: 'Change Username' }, properties)).append(JSX.createElement(tabris_1.TabFolder, { id: 'mainContent', stretchX: true, height: 450, tabBarLocation: 'hidden' },
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.ScrollView, { stretch: true, layout: new tabris_1.StackLayout({ spacing: 16, alignment: 'stretchX' }), padding: 12 },
                    JSX.createElement(tabris_1.TextView, { left: 8, top: 16, text: 'Username', font: '12px' }),
                    JSX.createElement(tabris_1.TextInput, { id: 'change-username', top: 8, text: 'Spokinetic', style: 'underline', font: '20px', onTextChanged: () => updateButton() }),
                    JSX.createElement(tabris_1.Button, { id: 'update-username', top: 32, stretchX: true, text: 'SAVE', enabled: false })))));
    }
}
exports.UsernameMenu = UsernameMenu;
/**
 * Enables 'SAVE' button if username is changed, otherwise disables it
 */
function updateButton() {
    if ($(tabris_1.TextInput).only('#change-username').text === curUsername || $(tabris_1.TextInput).only('#change-username').text.length === 0)
        $(tabris_1.Button).only('#update-username').enabled = false;
    else
        $(tabris_1.Button).only('#update-username').enabled = true;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcm5hbWUtbWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VybmFtZS1tZW51LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7O0FBRUgsbUNBQWtHO0FBRWxHLE1BQU0sV0FBVyxHQUFHLFlBQVksQ0FBQztBQUVqQzs7OztHQUlHO0FBQ0gsTUFBYSxZQUFhLFNBQVEsYUFBSTtJQUNwQyxZQUFZLFVBQVU7UUFDcEIsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsR0FBRyxpQkFBRSxLQUFLLEVBQUUsaUJBQWlCLElBQUssVUFBVSxFQUFFLENBQUMsTUFBTSxDQUN4RCxrQkFBQyxrQkFBUyxJQUFDLEVBQUUsRUFBQyxhQUFhLEVBQUMsUUFBUSxRQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFDLFFBQVE7WUFDdkUsa0JBQUMsWUFBRztnQkFDRixrQkFBQyxtQkFBVSxJQUFDLE9BQU8sUUFBQyxNQUFNLEVBQUUsSUFBSSxvQkFBVyxDQUFDLEVBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRTtvQkFDNUYsa0JBQUMsaUJBQVEsSUFBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsTUFBTSxHQUFFO29CQUN6RCxrQkFBQyxrQkFBUyxJQUFDLEVBQUUsRUFBQyxpQkFBaUIsRUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBQyxZQUFZLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBRztvQkFDOUgsa0JBQUMsZUFBTSxJQUFDLEVBQUUsRUFBQyxpQkFBaUIsRUFBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLFFBQVEsUUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBRSxLQUFLLEdBQUcsQ0FDakUsQ0FDVCxDQUNJLENBQ2IsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQWZELG9DQWVDO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLFlBQVk7SUFDbkIsSUFBRyxDQUFDLENBQUMsa0JBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLElBQUksS0FBSyxXQUFXLElBQUksQ0FBQyxDQUFDLGtCQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUM7UUFDdEgsQ0FBQyxDQUFDLGVBQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7O1FBRW5ELENBQUMsQ0FBQyxlQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3RELENBQUMifQ==