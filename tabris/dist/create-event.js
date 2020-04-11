"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
const TYPE = ['Personal', 'Group', 'Business'];
var mainContentHeightInt;
var mainContentHeightPortraitInt;
var mainContentHeightLandscapeInt;
var defaultButtonColor = new tabris_1.Button().textColor;
if (tabris_1.device.orientation == 'portrait-primary' || tabris_1.device.orientation == 'portrait-secondary') {
    mainContentHeightPortraitInt = (tabris_1.device.screenHeight - 120);
    mainContentHeightLandscapeInt = (tabris_1.device.screenWidth - 85);
    mainContentHeightInt = mainContentHeightPortraitInt;
}
else if (tabris_1.device.orientation == 'landscape-primary' || tabris_1.device.orientation == 'landscape-secondary') {
    mainContentHeightLandscapeInt = (tabris_1.device.screenHeight - 85);
    mainContentHeightPortraitInt = (tabris_1.device.screenWidth - 120);
    mainContentHeightInt = mainContentHeightLandscapeInt;
}
tabris_1.device.onOrientationChanged(changeContentHeight);
tabris_1.contentView.append(JSX.createElement($, null,
    JSX.createElement(tabris_1.NavigationView, { stretch: true, drawerActionVisible: 'true' },
        JSX.createElement(tabris_1.SearchAction, { id: 'search', message: 'Search', image: 'images/magGlass.png' }),
        JSX.createElement(tabris_1.Page, { title: 'Spokinetic' },
            JSX.createElement(tabris_1.ImageView, { centerX: true, centerY: true, width: 800, height: 1000, opacity: .7, image: 'images/mountain2.jpeg', scaleMode: 'fill' }),
            JSX.createElement(tabris_1.TabFolder, { paging: true, stretch: true, tabBarLocation: 'bottom' },
                JSX.createElement(tabris_1.Tab, { title: 'Events', id: 'events', badge: 0 }),
                JSX.createElement(tabris_1.Tab, { title: 'Calendar' }),
                JSX.createElement(tabris_1.Tab, { title: 'My Calendar' })),
            JSX.createElement(tabris_1.TabFolder, { id: 'mainContent', stretchX: true, height: mainContentHeightInt, tabBarLocation: 'hidden' },
                JSX.createElement(tabris_1.Tab, null,
                    JSX.createElement(tabris_1.ScrollView, { stretch: true, layout: new tabris_1.StackLayout({ spacing: 16, alignment: 'stretchX' }), padding: 32 },
                        JSX.createElement(tabris_1.TextView, { top: '85', left: '8', textColor: 'white' }, "* All fields required *"),
                        JSX.createElement(tabris_1.TextInput, { id: 'title', top: '15', autoCapitalize: 'sentence', autoCorrect: 'true', message: 'Title' }),
                        JSX.createElement(tabris_1.TextInput, { id: 'description', height: '100', type: 'multiline', autoCapitalize: 'sentence', autoCorrect: 'true', message: 'Description' }),
                        JSX.createElement(tabris_1.TextInput, { id: 'tags', autoCapitalize: 'sentence', autoCorrect: 'true', message: 'Tags' }),
                        JSX.createElement(tabris_1.TextView, { top: '5', left: '8', font: '12px', textColor: 'white', markupEnabled: true },
                            "Separate tags with commas,",
                            JSX.createElement("br", null),
                            "at least one required"),
                        JSX.createElement(tabris_1.TextInput, { id: 'location', autoCapitalize: 'sentence', autoCorrect: 'true', message: 'Location' }),
                        JSX.createElement(tabris_1.Button, { id: 'date', onSelect: showDateDialog, text: 'Date' }),
                        JSX.createElement(tabris_1.Button, { id: 'time', onSelect: showTimeDialog, text: 'Time' }),
                        JSX.createElement(tabris_1.Button, { centerX: true, onTap: signUp }, "Submit")))),
            JSX.createElement(tabris_1.TabFolder, { stretchX: true, height: 100, background: '#234', tabBarLocation: 'hidden' },
                JSX.createElement(tabris_1.Tab, null,
                    JSX.createElement(tabris_1.TextView, { text: 'CREATE EVENT', textColor: 'white', font: '40px', centerX: true, centerY: true })))))));
function changeContentHeight() {
    if (tabris_1.device.orientation == "portrait-primary" || tabris_1.device.orientation == "portrait-secondary") {
        mainContentHeightInt = mainContentHeightPortraitInt;
    }
    else {
        mainContentHeightInt = mainContentHeightLandscapeInt;
    }
    $('#mainContent').set({ height: mainContentHeightInt });
}
function showDateDialog() {
    return __awaiter(this, void 0, void 0, function* () {
        const { date } = yield tabris_1.DateDialog.open().onClose.promise();
        $(tabris_1.Button).only('#date').text = date ? `${date.toDateString()}` : 'Date*';
    });
}
function parseDate(rawString) {
    var dateParts = [rawString.substring(0, 3), rawString.substring(4, 7), rawString.substring(8, 10), rawString(11)];
    console.log(dateParts);
    switch (dateParts[0]) {
        case 'Sun':
            dateParts[0] = 'Sunday, ';
            break;
        case 'Mon':
            dateParts[0] = 'Monday, ';
            break;
        case 'Tue':
            dateParts[0] = 'Tuesday, ';
            break;
        case 'Wed':
            dateParts[0] = 'Wednesday, ';
            break;
        case 'Thu':
            dateParts[0] = 'Thursday, ';
            break;
        case 'Fri':
            dateParts[0] = 'Friday, ';
            break;
        case 'Sat':
            dateParts[0] = 'Saturday, ';
            break;
    }
    switch (dateParts[1]) {
        case 'Jan':
            dateParts[0] = 'January ';
            break;
        case 'Feb':
            dateParts[0] = 'February ';
            break;
        case 'Mar':
            dateParts[0] = 'March ';
            break;
        case 'Apr':
            dateParts[0] = 'April ';
            break;
        case 'May':
            dateParts[0] = 'May ';
            break;
        case 'Jun':
            dateParts[0] = 'June ';
            break;
        case 'Jul':
            dateParts[0] = 'July ';
            break;
        case 'Aug':
            dateParts[0] = 'August ';
            break;
        case 'Sep':
            dateParts[0] = 'September ';
            break;
        case 'Oct':
            dateParts[0] = 'October ';
            break;
        case 'Nov':
            dateParts[0] = 'November ';
            break;
        case 'Dec':
            dateParts[0] = 'December ';
            break;
    }
    if (dateParts[2][0] == '0')
        dateParts[2] = dateParts[2].substring(1);
    return dateParts[0] + dateParts[1] + dateParts[2] + ', ' + dateParts[3];
}
function showTimeDialog() {
    return __awaiter(this, void 0, void 0, function* () {
        const { date } = yield tabris_1.TimeDialog.open().onClose.promise();
        var time = parseTime(date.toTimeString());
        $(tabris_1.Button).only('#time').text = date ? time : 'Time*';
    });
}
function parseTime(rawString) {
    var timeString = '';
    var colonCount = 0;
    for (var i = 0; i < rawString.length; i++) {
        if (rawString[i] == ':' && colonCount == 1)
            break;
        else {
            timeString += rawString[i];
            if (rawString[i] == ':')
                colonCount++;
        }
    }
    var hour = timeString.substring(0, 2);
    var min = timeString.substring(3);
    var isAM = true;
    if (hour == 0)
        hour = 12;
    else if (hour == 12)
        isAM = false;
    else if (hour > 12) {
        hour = hour - 12;
        isAM = false;
    }
    timeString = hour + ':' + min;
    if (isAM)
        timeString += ' AM';
    else
        timeString += ' PM';
    return timeString;
}
// Basic validation for when the submit button is pressed
function signUp() {
    var promptBoolean = false;
    var field = $(tabris_1.TextInput).only('#title');
    if (field.text.length == 0) {
        field.set({ borderColor: new tabris_1.Color(255, 0, 0) });
        promptBoolean = true;
    }
    else {
        field.set({ borderColor: new tabris_1.Color(255, 255, 255) });
    }
    field = $(tabris_1.TextInput).only('#description');
    if (field.text.length == 0) {
        field.set({ borderColor: new tabris_1.Color(255, 0, 0) });
        promptBoolean = true;
    }
    else {
        field.set({ borderColor: new tabris_1.Color(255, 255, 255) });
    }
    field = $(tabris_1.TextInput).only('#tags');
    if (field.text.length == 0) {
        field.set({ borderColor: new tabris_1.Color(255, 0, 0) });
        promptBoolean = true;
    }
    else {
        field.set({ borderColor: new tabris_1.Color(255, 255, 255) });
    }
    field = $(tabris_1.TextInput).only('#location');
    if (field.text.length == 0) {
        field.set({ borderColor: new tabris_1.Color(255, 0, 0) });
        promptBoolean = true;
    }
    else {
        field.set({ borderColor: new tabris_1.Color(255, 255, 255) });
    }
    field = $(tabris_1.Button).only('#date');
    if (field.text == 'Date') {
        field.set({ textColor: new tabris_1.Color(255, 0, 0) });
        promptBoolean = true;
    }
    else {
        field.set({ textColor: defaultButtonColor });
    }
    field = $(tabris_1.Button).only('#time');
    if (field.text == 'Time') {
        field.set({ textColor: new tabris_1.Color(255, 0, 0) });
        promptBoolean = true;
    }
    else {
        field.set({ textColor: defaultButtonColor });
    }
    if (promptBoolean) {
        tabris_1.AlertDialog.open(JSX.createElement(tabris_1.AlertDialog, { title: 'Invalid data', message: 'Please correct fields highlighted in red', buttons: { ok: 'OK' } }));
    }
    else {
        tabris_1.AlertDialog.open(JSX.createElement(tabris_1.AlertDialog, { title: 'Create event?', message: 'Are you sure you want to create this event?', buttons: { ok: 'Yes', cancel: 'No' } }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWV2ZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NyZWF0ZS1ldmVudC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG1DQUF1TztBQUV2TyxNQUFNLElBQUksR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDL0MsSUFBSSxvQkFBb0IsQ0FBQztBQUN6QixJQUFJLDRCQUE0QixDQUFDO0FBQ2pDLElBQUksNkJBQTZCLENBQUM7QUFFbEMsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztBQUVoRCxJQUFHLGVBQU0sQ0FBQyxXQUFXLElBQUksa0JBQWtCLElBQUksZUFBTSxDQUFDLFdBQVcsSUFBSSxvQkFBb0IsRUFBRTtJQUN6Riw0QkFBNEIsR0FBRyxDQUFDLGVBQU0sQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDM0QsNkJBQTZCLEdBQUcsQ0FBQyxlQUFNLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzFELG9CQUFvQixHQUFHLDRCQUE0QixDQUFDO0NBQ3JEO0tBQU0sSUFBRyxlQUFNLENBQUMsV0FBVyxJQUFJLG1CQUFtQixJQUFJLGVBQU0sQ0FBQyxXQUFXLElBQUkscUJBQXFCLEVBQUU7SUFDbEcsNkJBQTZCLEdBQUcsQ0FBQyxlQUFNLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzNELDRCQUE0QixHQUFHLENBQUMsZUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUMxRCxvQkFBb0IsR0FBRyw2QkFBNkIsQ0FBQztDQUN0RDtBQUVELGVBQU0sQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBRWpELG9CQUFXLENBQUMsTUFBTSxDQUNoQixrQkFBQyxDQUFDO0lBQ0Esa0JBQUMsdUJBQWMsSUFBQyxPQUFPLFFBQUMsbUJBQW1CLEVBQUMs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QUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDbkIsS0FBSyxLQUFLO1lBQ1IsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQztZQUMxQixNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQztZQUMxQixNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztZQUMzQixNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQztZQUM3QixNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQztZQUM1QixNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQztZQUMxQixNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQztZQUM1QixNQUFNO0tBQ1Q7SUFFRCxRQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNuQixLQUFLLEtBQUs7WUFDUixTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDO1lBQzFCLE1BQU07UUFDUixLQUFLLEtBQUs7WUFDUixTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDO1lBQzNCLE1BQU07UUFDUixLQUFLLEtBQUs7WUFDUixTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDO1lBQ3hCLE1BQU07UUFDUixLQUFLLEtBQUs7WUFDUixTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDO1lBQ3hCLE1BQU07UUFDUixLQUFLLEtBQUs7WUFDUixTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO1lBQ3RCLE1BQU07UUFDUixLQUFLLEtBQUs7WUFDUixTQUFTLENBQUMsQ0FBQyxDQUFDLEdB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