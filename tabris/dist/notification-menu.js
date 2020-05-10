"use strict";
/**
 * Notifications Settings Page
 *
 * TODO:
 *   Add push notification functionality, if possible
 *   Add functionality to save preferences (connect to DB)
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
// Boolean variables to persist data within a run
// TODO: connect to DB so data can persist between runs (and be dynamically read here)
var updatedBool = true;
var upcomingBool = true;
var cancelledBool = true;
/**
 * Creates a Page object to allow use throughout the project
 *
 * Most useful for connecting pages in the app
 */
class NotificationMenu extends tabris_1.Page {
    constructor(properties) {
        super();
        this.set(Object.assign({ title: 'Notifications' }, properties)).append(JSX.createElement(tabris_1.TabFolder, { id: 'mainContent', stretchX: true, height: 450, tabBarLocation: 'hidden' },
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.ScrollView, { stretch: true, layout: new tabris_1.StackLayout({ spacing: 4, alignment: 'stretchX' }), padding: 12 },
                    JSX.createElement(tabris_1.TextView, { font: 'bold 24px', left: 4, bottom: 8, text: 'Notify me when:' }),
                    JSX.createElement(tabris_1.Composite, null,
                        JSX.createElement(tabris_1.Button, { stretchX: true, background: 'white' }),
                        JSX.createElement(tabris_1.TextView, { left: true, left: 8, background: 'white', textColor: '#234', text: 'An event is updated', font: '16px', centerY: true }),
                        JSX.createElement(tabris_1.Switch, { id: 'updated', right: true, right: 8, centerY: true, checked: updatedBool, onCheckedChanged: () => setBool() })),
                    JSX.createElement(tabris_1.Composite, null,
                        JSX.createElement(tabris_1.Button, { stretchX: true, background: 'white' }),
                        JSX.createElement(tabris_1.TextView, { left: true, left: 8, background: 'white', textColor: '#234', text: 'An event is coming up', font: '16px', centerY: true }),
                        JSX.createElement(tabris_1.Switch, { id: 'upcoming', right: true, right: 8, centerY: true, checked: upcomingBool, onCheckedChanged: () => setBool() })),
                    JSX.createElement(tabris_1.Composite, null,
                        JSX.createElement(tabris_1.Button, { stretchX: true, background: 'white' }),
                        JSX.createElement(tabris_1.TextView, { left: true, left: 8, background: 'white', textColor: '#234', text: 'An event is cancelled', font: '16px', centerY: true }),
                        JSX.createElement(tabris_1.Switch, { id: 'cancelled', right: true, right: 8, centerY: true, checked: cancelledBool, onCheckedChanged: () => setBool() }))))));
    }
}
exports.NotificationMenu = NotificationMenu;
/**
 * Updates boolean values, allowing data to persist in a run
 *
 * TODO:
 *   Implement functionality to store data in DB to allow data to persist between runs
 */
function setBool() {
    updatedBool = $(tabris_1.Switch).only('#updated').checked;
    upcomingBool = $(tabris_1.Switch).only('#upcoming').checked;
    cancelledBool = $(tabris_1.Switch).only('#cancelled').checked;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLW1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbm90aWZpY2F0aW9uLW1lbnUuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBRUgsbUNBQStNO0FBRS9NLGlEQUFpRDtBQUNqRCxzRkFBc0Y7QUFDdEYsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQztBQUN4QixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUM7QUFFekI7Ozs7R0FJRztBQUNILE1BQWEsZ0JBQWlCLFNBQVEsYUFBSTtJQUN4QyxZQUFZLFVBQVU7UUFDcEIsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsR0FBRyxpQkFBRSxLQUFLLEVBQUUsZUFBZSxJQUFLLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FDdEQsa0JBQUMsa0JBQVMsSUFBQyxFQUFFLEVBQUMsYUFBYSxFQUFDLFFBQVEsUUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBQyxRQUFRO1lBQ3ZFLGtCQUFDLFlBQUc7Z0JBQ0Ysa0JBQUMsbUJBQVUsSUFBQyxPQUFPLFFBQUMsTUFBTSxFQUFFLElBQUksb0JBQVcsQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUU7b0JBQzNGLGtCQUFDLGlCQUFRLElBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFDLGlCQUFpQixHQUFFO29CQUN2RSxrQkFBQyxrQkFBUzt3QkFDUixrQkFBQyxlQUFNLElBQUMsUUFBUSxRQUFDLFVBQVUsRUFBQyxPQUFPLEdBQUU7d0JBQ3JDLGtCQUFDLGlCQUFRLElBQUMsSUFBSSxRQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxxQkFBcUIsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLE9BQU8sU0FBRTt3QkFDNUcsa0JBQUMsZUFBTSxJQUFDLEVBQUUsRUFBQyxTQUFTLEVBQUMsS0FBSyxRQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsT0FBTyxRQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FDN0Y7b0JBQ1osa0JBQUMsa0JBQVM7d0JBQ1Isa0JBQUMsZUFBTSxJQUFDLFFBQVEsUUFBQyxVQUFVLEVBQUMsT0FBTyxHQUFFO3dCQUNyQyxrQkFBQyxpQkFBUSxJQUFDLElBQUksUUFBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsdUJBQXVCLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxPQUFPLFNBQUU7d0JBQzlHLGtCQUFDLGVBQU0sSUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEtBQUssUUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLE9BQU8sUUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQy9GO29CQUNaLGtCQUFDLGtCQUFTO3dCQUNSLGtCQUFDLGVBQU0sSUFBQyxRQUFRLFFBQUMsVUFBVSxFQUFDLE9BQU8sR0FBRTt3QkFDckMsa0JBQUMsaUJBQVEsSUFBQyxJQUFJLFFBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLHVCQUF1QixFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsT0FBTyxTQUFFO3dCQUM5RyxrQkFBQyxlQUFNLElBQUMsRUFBRSxFQUFDLFdBQVcsRUFBQyxLQUFLLFFBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxPQUFPLFFBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUNqRyxDQUNELENBQ1QsQ0FDSSxDQUNiLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUE1QkQsNENBNEJDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxTQUFTLE9BQU87SUFDZCxXQUFXLEdBQUcsQ0FBQyxDQUFDLGVBQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDakQsWUFBWSxHQUFHLENBQUMsQ0FBQyxlQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ25ELGFBQWEsR0FBRyxDQUFDLENBQUMsZUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUN2RCxDQUFDIn0=