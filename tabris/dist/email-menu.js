"use strict";
/**
 * Email Settings Page
 *
 * TODO:
 *   Add functionality to update email (requires DB connection)
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const curEmail = 'Spokinetic@gmail.com';
/**
 * Creates a Page object to allow use throughout the project
 *
 * Most useful for connecting pages in the app
 */
class EmailMenu extends tabris_1.Page {
    constructor(properties) {
        super();
        this.set(Object.assign({ title: 'Change Email' }, properties)).append(JSX.createElement(tabris_1.TabFolder, { id: 'mainContent', stretchX: true, height: 450, tabBarLocation: 'hidden' },
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.ScrollView, { stretch: true, layout: new tabris_1.StackLayout({ spacing: 16, alignment: 'stretchX' }), padding: 12 },
                    JSX.createElement(tabris_1.TextView, { left: 8, top: 16, text: 'Email', font: '12px' }),
                    JSX.createElement(tabris_1.TextInput, { id: 'change-email', top: 8, text: 'Spokinetic@gmail.com', style: 'underline', keyboard: 'email', font: '20px', onTextChanged: () => updateButton() }),
                    JSX.createElement(tabris_1.Button, { id: 'update-email', top: 32, stretchX: true, text: 'SAVE', enabled: false })))));
    }
}
exports.EmailMenu = EmailMenu;
/**
 * Enables 'SAVE' button if email is changed, otherwise disables it
 */
function updateButton() {
    if ($(tabris_1.TextInput).only('#change-email').text === curEmail || $(tabris_1.TextInput).only('#change-email').text.length === 0)
        $(tabris_1.Button).only('#update-email').enabled = false;
    else
        $(tabris_1.Button).only('#update-email').enabled = true;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwtbWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9lbWFpbC1tZW51LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7O0FBRUgsbUNBQWtHO0FBRWxHLE1BQU0sUUFBUSxHQUFHLHNCQUFzQixDQUFDO0FBRXhDOzs7O0dBSUc7QUFDSCxNQUFhLFNBQVUsU0FBUSxhQUFJO0lBQ2pDLFlBQVksVUFBVTtRQUNwQixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxHQUFHLGlCQUFFLEtBQUssRUFBRSxjQUFjLElBQUssVUFBVSxFQUFFLENBQUMsTUFBTSxDQUNyRCxrQkFBQyxrQkFBUyxJQUFDLEVBQUUsRUFBQyxhQUFhLEVBQUMsUUFBUSxRQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFDLFFBQVE7WUFDdkUsa0JBQUMsWUFBRztnQkFDRixrQkFBQyxtQkFBVSxJQUFDLE9BQU8sUUFBQyxNQUFNLEVBQUUsSUFBSSxvQkFBVyxDQUFDLEVBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRTtvQkFDNUYsa0JBQUMsaUJBQVEsSUFBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxHQUFFO29CQUN0RCxrQkFBQyxrQkFBUyxJQUFDLEVBQUUsRUFBQyxjQUFjLEVBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUMsc0JBQXNCLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFHO29CQUN0SixrQkFBQyxlQUFNLElBQUMsRUFBRSxFQUFDLGNBQWMsRUFBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLFFBQVEsUUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBRSxLQUFLLEdBQUcsQ0FDOUQsQ0FDVCxDQUNJLENBQ2IsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQWZELDhCQWVDO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLFlBQVk7SUFDbkIsSUFBRyxDQUFDLENBQUMsa0JBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLENBQUMsQ0FBQyxrQkFBUyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQztRQUM3RyxDQUFDLENBQUMsZUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7O1FBRWhELENBQUMsQ0FBQyxlQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztBQUNuRCxDQUFDIn0=