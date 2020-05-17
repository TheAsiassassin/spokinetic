"use strict";
/**
 * Profile Settings Page
 *
 * TODO:
 *   Add functionality to edit profile (requires DB connection to persist)
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
class PictureMenu extends tabris_1.Page {
    constructor(properties) {
        super();
        this.set(Object.assign({ title: 'Profile Picture' }, properties)).append(JSX.createElement(tabris_1.TabFolder, { id: 'mainContent', stretchX: true, height: 450, tabBarLocation: 'hidden' },
            JSX.createElement(tabris_1.Tab, null,
                JSX.createElement(tabris_1.ScrollView, { stretch: true, layout: new tabris_1.StackLayout({ spacing: 16, alignment: 'stretchX' }), padding: 12 },
                    JSX.createElement(tabris_1.Button, { elevation: 4, background: 'white', textColor: '#234', text: 'Take a Picture', onSelect: () => openCamera() }),
                    JSX.createElement(tabris_1.Button, { elevation: 4, background: 'white', textColor: '#234', text: 'Upload an Image', onSelect: () => openFilePicker() })))));
    }
}
exports.PictureMenu = PictureMenu;
function setOptions(srcType) {
    var options = {
        quality: 50,
        destinationType: tabris_1.Camera.DestinationType.FILE_URI,
        sourceType: srcType,
        encodingType: tabris_1.Camera.EncodingType.JPEG,
        mediaType: tabris_1.Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true
    };
    return options;
}
function openCamera() {
    var srcType = tabris_1.Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);
    navigator.camera.getPicture(function cameraSuccess(imageUri) {
        $(ImageView).only('#profile').image = imageUri;
    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");
    }, options);
}
function openFilePicker() {
    var srcType = tabris_1.Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);
    navigator.camera.getPicture(function cameraSuccess(imageUri) {
        $(ImageView).only('#profile').image = imageUri;
    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");
    }, options);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGljdHVyZS1tZW51LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3BpY3R1cmUtbWVudS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7OztHQVFHOztBQUVILG1DQUFxRjtBQUVyRjs7OztHQUlHO0FBQ0gsTUFBYSxXQUFZLFNBQVEsYUFBSTtJQUNuQyxZQUFZLFVBQVU7UUFDcEIsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsR0FBRyxpQkFBRSxLQUFLLEVBQUUsaUJBQWlCLElBQUssVUFBVSxFQUFFLENBQUMsTUFBTSxDQUN4RCxrQkFBQyxrQkFBUyxJQUFDLEVBQUUsRUFBQyxhQUFhLEVBQUMsUUFBUSxRQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFDLFFBQVE7WUFDdkUsa0JBQUMsWUFBRztnQkFDRixrQkFBQyxtQkFBVSxJQUFDLE9BQU8sUUFBQyxNQUFNLEVBQUUsSUFBSSxvQkFBVyxDQUFDLEVBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRTtvQkFDNUYsa0JBQUMsZUFBTSxJQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxnQkFBZ0IsRUFBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxFQUFFLEdBQUc7b0JBQy9HLGtCQUFDLGVBQU0sSUFBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsaUJBQWlCLEVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQ3pHLENBQ1QsQ0FDSSxDQUNiLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFkRCxrQ0FjQztBQUVELFNBQVMsVUFBVSxDQUFDLE9BQU87SUFDekIsSUFBSSxPQUFPLEdBQUc7UUFDWixPQUFPLEVBQUUsRUFBRTtRQUNYLGVBQWUsRUFBRSxlQUFNLENBQUMsZUFBZSxDQUFDLFFBQVE7UUFDaEQsVUFBVSxFQUFFLE9BQU87UUFDbkIsWUFBWSxFQUFFLGVBQU0sQ0FBQyxZQUFZLENBQUMsSUFBSTtRQUN0QyxTQUFTLEVBQUUsZUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPO1FBQ25DLFNBQVMsRUFBRSxJQUFJO1FBQ2Ysa0JBQWtCLEVBQUUsSUFBSTtLQUN6QixDQUFBO0lBQ0QsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQUVELFNBQVMsVUFBVTtJQUNqQixJQUFJLE9BQU8sR0FBRyxlQUFNLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDO0lBQzlDLElBQUksT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVsQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLGFBQWEsQ0FBQyxRQUFRO1FBQ3pELENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztJQUNqRCxDQUFDLEVBQUUsU0FBUyxXQUFXLENBQUMsS0FBSztRQUMzQixPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUE0QixHQUFHLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM3RCxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDZCxDQUFDO0FBRUQsU0FBUyxjQUFjO0lBQ3JCLElBQUksT0FBTyxHQUFHLGVBQU0sQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7SUFDdkQsSUFBSSxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRWxDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsYUFBYSxDQUFDLFFBQVE7UUFDekQsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO0lBQ2pELENBQUMsRUFBRSxTQUFTLFdBQVcsQ0FBQyxLQUFLO1FBQzNCLE9BQU8sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEdBQUcsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdELENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNkLENBQUMifQ==