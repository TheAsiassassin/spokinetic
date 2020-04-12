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
        this.set(Object.assign({ title: 'Create New Event' }, properties)).append(JSX.createElement(tabris_1.ImageView, { centerX: true, centerY: true, width: 800, height: 1000, opacity: .7, image: 'images/mountain2.jpeg', scaleMode: 'fill' }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWV2ZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NyZWF0ZS1ldmVudC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG1DQUF1TztBQUV2TyxNQUFNLElBQUksR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDL0MsSUFBSSxvQkFBb0IsQ0FBQztBQUN6QixJQUFJLDRCQUE0QixDQUFDO0FBQ2pDLElBQUksNkJBQTZCLENBQUM7QUFFbEMsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztBQUVoRCxJQUFHLGVBQU0sQ0FBQyxXQUFXLElBQUksa0JBQWtCLElBQUksZUFBTSxDQUFDLFdBQVcsSUFBSSxvQkFBb0IsRUFBRTtJQUN6Riw0QkFBNEIsR0FBRyxDQUFDLGVBQU0sQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDMUQsNkJBQTZCLEdBQUcsQ0FBQyxlQUFNLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzFELG9CQUFvQixHQUFHLDRCQUE0QixDQUFDO0NBQ3JEO0tBQU0sSUFBRyxlQUFNLENBQUMsV0FBVyxJQUFJLG1CQUFtQixJQUFJLGVBQU0sQ0FBQyxXQUFXLElBQUkscUJBQXFCLEVBQUU7SUFDbEcsNkJBQTZCLEdBQUcsQ0FBQyxlQUFNLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzNELDRCQUE0QixHQUFHLENBQUMsZUFBTSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUN6RCxvQkFBb0IsR0FBRyw2QkFBNkIsQ0FBQztDQUN0RDtBQUVELGVBQU0sQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBRWpELE1BQWEsZUFBZ0IsU0FBUSxhQUFJO0lBQ3ZDLFlBQVksVUFBVTtRQUNwQixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxHQUFH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QUNSLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUM7WUFDN0IsTUFBTTtRQUNSLEtBQUssS0FBSztZQUNSLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUM7WUFDNUIsTUFBTTtRQUNSLEtBQUssS0FBSztZQUNSLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUM7WUFDMUIsTUFBTTtRQUNSLEtBQUssS0FBSztZQUNSLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUM7WUFDNUIsTUFBTTtLQUNUO0lBRUQsUUFBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDbkIsS0FBSyxLQUFLO1lBQ1IsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQztZQUMxQixNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztZQUMzQixNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQztZQUN4QixNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQztZQUN4QixNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztZQUN0QixNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztZQUN2QixNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztZQUN2QixNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztZQUN6QixNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQztZQUM1QixNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQztZQUMxQixNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztZQUMzQixNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztZQUMzQixNQUFNO0tBQ1Q7SUFFRCxJQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHO1FBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFcEUsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFFLENBQUM7QUFFRCxTQUFlLGNBQWM7O1FBQzNCLE1BQU0sRUFBQyxJQUFJLEVBQUMsR0FBRyxNQUFNLG1CQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3pELElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsZUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ3ZELENBQUM7Q0FBQTtBQUVELFNBQVMsU0FBUyxDQUFDLFNBQVM7SUFDMUIsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztJQUVuQixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFB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