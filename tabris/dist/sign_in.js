"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
tabris_1.contentView.append(JSX.createElement($, null,
    JSX.createElement(tabris_1.NavigationView, { stretch: true, drawerActionVisible: 'true' },
        JSX.createElement(tabris_1.SearchAction, { id: 'search', message: 'Search' },
            "image=",
            'images/magGlass.png'),
        JSX.createElement(tabris_1.Page, { title: 'Sign in' },
            JSX.createElement(ImageView, { width: 800, height: 1000, opacity: .7, image: 'images/mountain2.jpeg', scaleMode: 'stretch' }),
            JSX.createElement(tabris_1.TabFolder, null,
                JSX.createElement(tabris_1.Tab, { title: 'Events', id: 'events', badge: 0 }),
                JSX.createElement(tabris_1.Tab, { title: 'Calendar' }),
                JSX.createElement(tabris_1.Tab, { title: 'My Calendar' })),
            JSX.createElement(tabris_1.TabFolder, { paging: true, stretchX: true, height: 100, background: '#234', tabBarLocation: 'hidden' },
                JSX.createElement(tabris_1.Tab, null,
                    JSX.createElement(tabris_1.TextView, { text: 'SIGN IN', textColor: 'white', font: '40px', centerX: true, centerY: true }))),
            JSX.createElement(tabris_1.TextInput, { top: '50', left: '16', right: '16', font: '24px', message: "Username" }),
            JSX.createElement(tabris_1.TextInput, { top: '150', left: '16', right: '16', font: '24px', type: 'password', message: "Password" }),
            JSX.createElement(tabris_1.Button, { centerX: true, top: '250' }, "Submit")))));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbl9pbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zaWduX2luLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUE2SDtBQUU3SCxvQkFBVyxDQUFDLE1BQU0sQ0FDaEIsa0JBQUMsQ0FBQztJQUNBLGtCQUFDLHVCQUFjLElBQUMsT0FBTyxRQUFDLG1CQUFtQixFQUFDLE1BQU07UUFDaEQsa0JBQUMscUJBQVksSUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxRQUFROztZQUNqQyxxQkFBcUIsQ0FDZjtRQUVmLGtCQUFDLGFBQUksSUFBQyxLQUFLLEVBQUMsU0FBUztZQUNuQixrQkFBQyxTQUFTLElBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQ2hELEtBQUssRUFBRSx1QkFBdUIsRUFDOUIsU0FBUyxFQUFDLFNBQVMsR0FBRztZQUV0QixrQkFBQyxrQkFBUztnQkFDUixrQkFBQyxZQUFHLElBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLEtBQUssRUFBRSxDQUFDLEdBQVE7Z0JBQ2hELGtCQUFDLFlBQUcsSUFBQyxLQUFLLEVBQUMsVUFBVSxHQUFPO2dCQUM1QixrQkFBQyxZQUFHLElBQUMsS0FBSyxFQUFDLGFBQWEsR0FBTyxDQUNyQjtZQUVaLGtCQUFDLGtCQUFTLElBQUMsTUFBTSxRQUFDLFFBQVEsUUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFFBQVE7Z0JBQy9FLGtCQUFDLFlBQUc7b0JBQ0Ysa0JBQUMsaUJBQVEsSUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxPQUFPLFFBQUMsT0FBTyxTQUFHLENBQ3JFLENBQ0k7WUFFWixrQkFBQyxrQkFBUyxJQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFVBQVUsR0FBRTtZQUN6RSxrQkFBQyxrQkFBUyxJQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsVUFBVSxHQUFFO1lBQzFGLGtCQUFDLGVBQU0sSUFBQyxPQUFPLFFBQUMsR0FBRyxFQUFDLEtBQUssYUFBZ0IsQ0FDcEMsQ0FDUSxDQUNmLENBQ0wsQ0FBQyJ9