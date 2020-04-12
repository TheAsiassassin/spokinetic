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
    mainContentHeightPortraitInt = (tabris_1.device.screenHeight - 50);
    mainContentHeightLandscapeInt = (tabris_1.device.screenWidth - 35);
    mainContentHeightInt = mainContentHeightPortraitInt;
}
else if (tabris_1.device.orientation == 'landscape-primary' || tabris_1.device.orientation == 'landscape-secondary') {
    mainContentHeightLandscapeInt = (tabris_1.device.screenHeight - 35);
    mainContentHeightPortraitInt = (tabris_1.device.screenWidth - 50);
    mainContentHeightInt = mainContentHeightLandscapeInt;
}
tabris_1.device.onOrientationChanged(changeContentHeight);
class CreateEventPage extends tabris_1.Page {
    constructor(properties) {
        super();
        this.set(Object.assign({ title: 'Spokinetic' }, properties)).append(JSX.createElement(tabris_1.ImageView, { centerX: true, centerY: true, width: 800, height: 1000, opacity: .7, image: 'images/mountain2.jpeg', scaleMode: 'fill' }));
        this.append(JSX.createElement(tabris_1.TabFolder, { id: 'mainContent', stretchX: true, height: mainContentHeightInt, tabBarLocation: 'hidden' },
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
                    JSX.createElement(tabris_1.Button, { centerX: true, onTap: signUp }, "Submit")))));
        this.append(JSX.createElement(tabris_1.TabFolder, { stretchX: true, height: 100, background: '#234', tabBarLocation: 'hidden' },
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.TextView, { text: 'CREATE EVENT', textColor: 'white', font: '40px', centerX: true, centerY: true }))));
    }
}
exports.CreateEventPage = CreateEventPage;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWV2ZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NyZWF0ZS1ldmVudC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG1DQUF1TztBQUV2TyxNQUFNLElBQUksR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDL0MsSUFBSSxvQkFBb0IsQ0FBQztBQUN6QixJQUFJLDRCQUE0QixDQUFDO0FBQ2pDLElBQUksNkJBQTZCLENBQUM7QUFFbEMsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztBQUVoRCxJQUFHLGVBQU0sQ0FBQyxXQUFXLElBQUksa0JBQWtCLElBQUksZUFBTSxDQUFDLFdBQVcsSUFBSSxvQkFBb0IsRUFBRTtJQUN6Riw0QkFBNEIsR0FBRyxDQUFDLGVBQU0sQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDMUQsNkJBQTZCLEdBQUcsQ0FBQyxlQUFNLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzFELG9CQUFvQixHQUFHLDRCQUE0QixDQUFDO0NBQ3JEO0tBQU0sSUFBRyxlQUFNLENBQUMsV0FBVyxJQUFJLG1CQUFtQixJQUFJLGVBQU0sQ0FBQyxXQUFXLElBQUkscUJBQXFCLEVBQUU7SUFDbEcsNkJBQTZCLEdBQUcsQ0FBQyxlQUFNLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzNELDRCQUE0QixHQUFHLENBQUMsZUFBTSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUN6RCxvQkFBb0IsR0FBRyw2QkFBNkIsQ0FBQztDQUN0RDtBQUVELGVBQU0sQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBRWpELE1BQWEsZUFBZ0IsU0FBUSxhQUFJO0lBQ3ZDLFlBQVksVUFBVTtRQUNwQixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxHQUFHLGlCQUFFLEtBQUssRUFBRSxZQUFZLElBQUssVUFBVSxFQUFFLENBQUMsTUFBTSxDQUNqRCxrQkFBQyxrQkFBUyxJQUFDLE9BQU8sUUFBQyxPQUFPLFFBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQ2hFLEtBQUssRUFBRSx1QkFBdUIsRUFDOUIsU0FBUyxFQUFDLE1BQU0sR0FBRyxDQUN0QixDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FDVCxrQkFBQyxrQkFBUyxJQUFDLEVBQUUsRUFBQyxhQUFhLEVBQUMsUUFBUSxRQUFDLE1BQU0sRUFBRSxvQkFBb0IsRUFBRSxjQUFjLEVBQUMsUUFBUTtZQUN0RixrQkFBQyxZQUFHO2dCQUNGLGtCQUFDLG1CQUFVLElBQUMsT0FBTyxRQUFDLE1BQU0sRUFBRSxJQUFJLG9CQUFXLENBQUMsRUFBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFO29CQUM1RixrQkFBQyxpQkFBUSxJQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsT0FBTyw4QkFBbUM7b0JBQ2hGLGtCQUFDLGtCQUFTLElBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLGNBQWMsRUFBQyxVQUFVLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxHQUFFO29CQUM3RixrQkFBQyxrQkFBUyxJQUFDLEVBQUUsRUFBQyxhQUFhLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLGNBQWMsRUFBQyxVQUFVLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsYUFBYSxHQUFFO29CQUM5SCxrQkFBQyxrQkFBUyxJQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFVBQVUsRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxNQUFNLEdBQUU7b0JBQ2xGLGtCQUFDLGlCQUFRLElBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxhQUFhOzt3QkFBMkIsNkJBQUs7Z0RBQWdDO29CQUN0SSxrQkFBQyxrQkFBUyxJQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsY0FBYyxFQUFDLFVBQVUsRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxVQUFVLEdBQUU7b0JBQzFGLGtCQUFDLGVBQU0sSUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFDLE1BQU0sR0FBRTtvQkFDekQsa0JBQUMsZUFBTSxJQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUMsTUFBTSxHQUFFO29CQUN6RCxrQkFBQyxlQUFNLElBQUMsT0FBTyxRQUFDLEtBQUssRUFBRSxNQUFNLGFBQWlCLENBQ25DLENBQ1QsQ0FDSSxDQUNmLENBQUM7UUFDRixJQUFJLENBQUMsTUFBTSxDQUNULGtCQUFDLGtCQUFTLElBQUMsUUFBUSxRQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsUUFBUTtZQUN4RSxrQkFBQyxZQUFHO2dCQUNGLGtCQUFDLGlCQUFRLElBQUMsSUFBSSxFQUFDLGNBQWMsRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsT0FBTyxRQUFDLE9BQU8sU0FBRyxDQUMxRSxDQUNJLENBQ2IsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQWpDRCwwQ0FpQ0M7QUFFRCxTQUFTLG1CQUFtQjtJQUMxQixJQUFHLGVBQU0sQ0FBQyxXQUFXLElBQUksa0JBQWtCLElBQUksZUFBTSxDQUFDLFdBQVcsSUFBSSxvQkFBb0IsRUFBRTtRQUN6RixvQkFBb0IsR0FBRyw0QkFBNEIsQ0FBQztLQUNyRDtTQUFNO1FBQ0wsb0JBQW9CLEdBQUcsNkJBQTZCLENBQUM7S0FDdEQ7SUFFRCxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsTUFBTSxFQUFFLG9CQUFvQixFQUFDLENBQUMsQ0FBQztBQUN4RCxDQUFDO0FBRUQsU0FBZSxjQUFjOztRQUMzQixNQUFNLEVBQUMsSUFBSSxFQUFDLEdBQUcsTUFBTSxtQkFBVSxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN6RCxDQUFDLENBQUMsZUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUMzRSxDQUFDO0NBQUE7QUFFRCxTQUFTLFNBQVMsQ0FBQyxTQUFTO0lBQzFCLElBQUksU0FBUyxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFbEgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUV2QixRQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNuQixLQUFLLEtBQUs7WUFDUixTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDO1lBQzFCLE1BQU07UUFDUixLQUFLLEtBQUs7WUFDUixTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDO1lBQzFCLE1BQU07UUFDUixLQUFLLEtBQUs7WUFDUixTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDO1lBQzNCLE1BQU07UUFDUixLQUFLLEtBQUs7WUFDUixTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDO1lBQzdCLE1BQU07UUFDUixLQUFLLEtBQUs7WUFDUixTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDO1lBQzVCLE1BQU07UUFDUixLQUFLLEtBQUs7WUFDUixTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDO1lBQzFCLE1BQU07UUFDUixLQUFLLEtBQUs7WUFDUixTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDO1lBQzVCLE1BQU07S0FDVDtJQUVELFFBQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ25CLEtBQUssS0FBSztZQUNSLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUM7WUFDMUIsTUFBTTtRQUNSLEtBQUssS0FBSztZQUNSLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUM7WUFDM0IsTUFBTTtRQUNSLEtBQUssS0FBSztZQUNSLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUM7WUFDeEIsTUFBTTtRQUNSLEtBQUssS0FBSztZQUNSLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUM7WUFDeEIsTUFBTTtRQUNSLEtBQUssS0FBSztZQUNSLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7WUFDdEIsTUFBTTtRQUNSLEtBQUssS0FBSztZQUNSLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUM7WUFDdkIsTUFBTTtRQUNSLEtBQUssS0FBSztZQUNSLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUM7WUFDdkIsTUFBTTtRQUNSLEtBQUssS0FBSztZQUNSLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7WUFDekIsTUFBTTtRQUNSLEtBQUssS0FBSztZQUNSLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUM7WUFDNUIsTUFBTTtRQUNSLEtBQUssS0FBSztZQUNS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