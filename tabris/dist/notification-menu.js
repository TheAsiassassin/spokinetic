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
                        JSX.createElement(tabris_1.Switch, { right: true, right: 8, centerY: true, checked: true })),
                    JSX.createElement(tabris_1.Composite, null,
                        JSX.createElement(tabris_1.Button, { stretchX: true, background: 'white' }),
                        JSX.createElement(tabris_1.TextView, { left: true, left: 8, background: 'white', textColor: '#234', text: 'An event is coming up', font: '16px', centerY: true }),
                        JSX.createElement(tabris_1.Switch, { right: true, right: 8, centerY: true, checked: true })),
                    JSX.createElement(tabris_1.Composite, null,
                        JSX.createElement(tabris_1.Button, { stretchX: true, background: 'white' }),
                        JSX.createElement(tabris_1.TextView, { left: true, left: 8, background: 'white', textColor: '#234', text: 'An event is cancelled', font: '16px', centerY: true }),
                        JSX.createElement(tabris_1.Switch, { right: true, right: 8, centerY: true, checked: true }))))));
    }
}
exports.NotificationMenu = NotificationMenu;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLW1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbm90aWZpY2F0aW9uLW1lbnUuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBRUgsbUNBQStNO0FBRS9NOzs7O0dBSUc7QUFDSCxNQUFhLGdCQUFpQixTQUFRLGFBQUk7SUFDeEMsWUFBWSxVQUFVO1FBQ3BCLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLEdBQUcsaUJBQUUsS0FBSyxFQUFFLGVBQWUsSUFBSyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQ3RELGtCQUFDLGtCQUFTLElBQUMsRUFBRSxFQUFDLGFBQWEsRUFBQyxRQUFRLFFBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUMsUUFBUTtZQUN2RSxrQkFBQyxZQUFHO2dCQUNGLGtCQUFDLG1CQUFVLElBQUMsT0FBTyxRQUFDLE1BQU0sRUFBRSxJQUFJLG9CQUFXLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFO29CQUMzRixrQkFBQyxpQkFBUSxJQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBQyxpQkFBaUIsR0FBRTtvQkFDdkUsa0JBQUMsa0JBQVM7d0JBQ1Isa0JBQUMsZUFBTSxJQUFDLFFBQVEsUUFBQyxVQUFVLEVBQUMsT0FBTyxHQUFFO3dCQUNyQyxrQkFBQyxpQkFBUSxJQUFDLElBQUksUUFBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMscUJBQXFCLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxPQUFPLFNBQUU7d0JBQzVHLGtCQUFDLGVBQU0sSUFBQyxLQUFLLFFBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxPQUFPLFFBQUMsT0FBTyxTQUFFLENBQy9CO29CQUNaLGtCQUFDLGtCQUFTO3dCQUNSLGtCQUFDLGVBQU0sSUFBQyxRQUFRLFFBQUMsVUFBVSxFQUFDLE9BQU8sR0FBRTt3QkFDckMsa0JBQUMsaUJBQVEsSUFBQyxJQUFJLFFBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLHVCQUF1QixFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsT0FBTyxTQUFFO3dCQUM5RyxrQkFBQyxlQUFNLElBQUMsS0FBSyxRQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsT0FBTyxRQUFDLE9BQU8sU0FBRSxDQUMvQjtvQkFDWixrQkFBQyxrQkFBUzt3QkFDUixrQkFBQyxlQUFNLElBQUMsUUFBUSxRQUFDLFVBQVUsRUFBQyxPQUFPLEdBQUU7d0JBQ3JDLGtCQUFDLGlCQUFRLElBQUMsSUFBSSxRQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyx1QkFBdUIsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLE9BQU8sU0FBRTt3QkFDOUcsa0JBQUMsZUFBTSxJQUFDLEtBQUssUUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLE9BQU8sUUFBQyxPQUFPLFNBQUUsQ0FDL0IsQ0FDRCxDQUNULENBQ0ksQ0FDYixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBNUJELDRDQTRCQyJ9