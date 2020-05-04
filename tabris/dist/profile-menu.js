"use strict";
/**
 * Profile Settings Page
 *
 * TODO:
 *   Add functionality to edit profile
 *     Each field gets its own page
 *       vs.
 *     All done on this page
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
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
                    JSX.createElement(tabris_1.Composite, { elevation: 4 },
                        JSX.createElement(tabris_1.Button, { stretchX: true, background: 'white' }),
                        JSX.createElement(tabris_1.Button, { left: true, left: 4, background: 'white', textColor: '#234', text: 'Username' }),
                        JSX.createElement(tabris_1.TextView, { right: true, right: 'next() 4', background: 'white', textColor: '#aaa', text: 'Spokinetic', font: '12px', centerY: true }),
                        JSX.createElement(tabris_1.Button, { right: true, right: 8, background: 'white', textColor: '#aaa', text: '>' })),
                    JSX.createElement(tabris_1.Composite, { elevation: 4 },
                        JSX.createElement(tabris_1.Button, { stretchX: true, background: 'white' }),
                        JSX.createElement(tabris_1.Button, { left: true, left: 4, background: 'white', textColor: '#234', text: 'Email' }),
                        JSX.createElement(tabris_1.TextView, { right: true, right: 'next() 4', background: 'white', textColor: '#aaa', text: 'Spokinetic@gmail.com', font: '12px', centerY: true }),
                        JSX.createElement(tabris_1.Button, { right: true, right: 8, background: 'white', textColor: '#aaa', text: '>' })),
                    JSX.createElement(tabris_1.Composite, { elevation: 4 },
                        JSX.createElement(tabris_1.Button, { stretchX: true, background: 'white' }),
                        JSX.createElement(tabris_1.Button, { left: true, left: 4, background: 'white', textColor: '#234', text: 'Password' }),
                        JSX.createElement(tabris_1.TextView, { right: true, right: 'next() 4', background: 'white', textColor: '#aaa', text: '********', font: '12px', centerY: true }),
                        JSX.createElement(tabris_1.Button, { right: true, right: 8, background: 'white', textColor: '#aaa', text: '>' }))))));
    }
}
exports.ProfileMenu = ProfileMenu;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS1tZW51LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3Byb2ZpbGUtbWVudS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7OztHQVFHOztBQUVILG1DQUF1TTtBQUV2TTs7OztHQUlHO0FBQ0gsTUFBYSxXQUFZLFNBQVEsYUFBSTtJQUNuQyxZQUFZLFVBQVU7UUFDcEIsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsR0FBRyxpQkFBRSxLQUFLLEVBQUUsU0FBUyxJQUFLLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FDaEQsa0JBQUMsa0JBQVMsSUFBQyxFQUFFLEVBQUMsYUFBYSxFQUFDLFFBQVEsUUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBQyxRQUFRO1lBQ3ZFLGtCQUFDLFlBQUc7Z0JBQ0Ysa0JBQUMsbUJBQVUsSUFBQyxPQUFPLFFBQUMsTUFBTSxFQUFFLElBQUksb0JBQVcsQ0FBQyxFQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUU7b0JBQzVGLGtCQUFDLGtCQUFTLElBQUMsU0FBUyxFQUFFLENBQUM7d0JBQ3JCLGtCQUFDLGVBQU0sSUFBQyxRQUFRLFFBQUMsVUFBVSxFQUFDLE9BQU8sR0FBRTt3QkFDckMsa0JBQUMsZUFBTSxJQUFDLElBQUksUUFBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsVUFBVSxHQUFFO3dCQUMzRSxrQkFBQyxpQkFBUSxJQUFDLEtBQUssUUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsT0FBTyxTQUFFO3dCQUM1RyxrQkFBQyxlQUFNLElBQUMsS0FBSyxRQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxHQUFHLEdBQUUsQ0FDNUQ7b0JBQ1osa0JBQUMsa0JBQVMsSUFBQyxTQUFTLEVBQUUsQ0FBQzt3QkFDckIsa0JBQUMsZUFBTSxJQUFDLFFBQVEsUUFBQyxVQUFVLEVBQUMsT0FBTyxHQUFFO3dCQUNyQyxrQkFBQyxlQUFNLElBQUMsSUFBSSxRQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEdBQUU7d0JBQ3hFLGtCQUFDLGlCQUFRLElBQUMsS0FBSyxRQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxzQkFBc0IsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLE9BQU8sU0FBRTt3QkFDdEgsa0JBQUMsZUFBTSxJQUFDLEtBQUssUUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsR0FBRyxHQUFFLENBQzVEO29CQUNaLGtCQUFDLGtCQUFTLElBQUMsU0FBUyxFQUFFLENBQUM7d0JBQ3JCLGtCQUFDLGVBQU0sSUFBQyxRQUFRLFFBQUMsVUFBVSxFQUFDLE9BQU8sR0FBRTt3QkFDckMsa0JBQUMsZUFBTSxJQUFDLElBQUksUUFBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsVUFBVSxHQUFFO3dCQUMzRSxrQkFBQyxpQkFBUSxJQUFDLEtBQUssUUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsT0FBTyxTQUFFO3dCQUMxRyxrQkFBQyxlQUFNLElBQUMsS0FBSyxRQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxHQUFHLEdBQUUsQ0FDNUQsQ0FDRCxDQUNULENBQ0ksQ0FDYixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBOUJELGtDQThCQyJ9