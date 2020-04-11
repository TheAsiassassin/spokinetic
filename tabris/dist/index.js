"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const NewsPage_1 = require("./pages/NewsPage");
// Create a full-size navigation view and add a page to it
tabris_1.contentView.append(JSX.createElement(tabris_1.NavigationView, { stretch: true },
    JSX.createElement(tabris_1.Page, { title: 'Main Page' },
        JSX.createElement(tabris_1.Button, { center: true, onSelect: () => openNewsPage() }, "Open news page"))));
function openNewsPage() {
    $(tabris_1.NavigationView).only().append(JSX.createElement(NewsPage_1.NewsPage, null));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXguanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQWlFO0FBQ2pFLCtDQUEwQztBQUUxQywwREFBMEQ7QUFDMUQsb0JBQVcsQ0FBQyxNQUFNLENBQ2hCLGtCQUFDLHVCQUFjLElBQUMsT0FBTztJQUNyQixrQkFBQyxhQUFJLElBQUMsS0FBSyxFQUFDLFdBQVc7UUFDckIsa0JBQUMsZUFBTSxJQUFDLE1BQU0sUUFBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsWUFBWSxFQUFFLHFCQUVwQyxDQUNKLENBQ1EsQ0FDbEIsQ0FBQTtBQUVELFNBQVMsWUFBWTtJQUNuQixDQUFDLENBQUMsdUJBQWMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FDN0Isa0JBQUMsbUJBQVEsT0FBRyxDQUNiLENBQUM7QUFDSixDQUFDIn0=