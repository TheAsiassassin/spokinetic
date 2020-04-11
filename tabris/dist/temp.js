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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90ZW1wLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFpRTtBQUNqRSwrQ0FBMEM7QUFFMUMsMERBQTBEO0FBQzFELG9CQUFXLENBQUMsTUFBTSxDQUNoQixrQkFBQyx1QkFBYyxJQUFDLE9BQU87SUFDckIsa0JBQUMsYUFBSSxJQUFDLEtBQUssRUFBQyxXQUFXO1FBQ3JCLGtCQUFDLGVBQU0sSUFBQyxNQUFNLFFBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFlBQVksRUFBRSxxQkFFcEMsQ0FDSixDQUNRLENBQ2xCLENBQUE7QUFFRCxTQUFTLFlBQVk7SUFDbkIsQ0FBQyxDQUFDLHVCQUFjLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQzdCLGtCQUFDLG1CQUFRLE9BQUcsQ0FDYixDQUFDO0FBQ0osQ0FBQyJ9