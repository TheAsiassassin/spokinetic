/**
 * Profile Settings Page
 * 
 * TODO:
 *   Add functionality to edit profile (requires DB connection to persist)
 *     Each field gets its own page
 *       vs.
 *     All done on this page
 */

import {ScrollView, StackLayout, Page, TabFolder, Tab, Button, Camera} from 'tabris';

/**
 * Creates a Page object to allow use throughout the project
 * 
 * Most useful for connecting pages in the app
 */
export class PictureMenu extends Page {
  constructor(properties) {
    super();
    this.set({title: 'Profile Picture', ...properties}).append(
      <TabFolder id='mainContent' stretchX height={450} tabBarLocation='hidden'>
        <Tab>
          <ScrollView stretch layout={new StackLayout({spacing: 16, alignment: 'stretchX'})} padding={12}>
            <Button elevation={4} background='white' textColor='#234' text='Take a Picture' onSelect={() => openCamera()}/>
            <Button elevation={4} background='white' textColor='#234' text='Upload an Image' onSelect={() => openFilePicker()}/>
          </ScrollView>
        </Tab>
      </TabFolder>
    );
  }
}

function setOptions(srcType) {
  var options = {
    quality: 50,
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: srcType,
    encodingType: Camera.EncodingType.JPEG,
    mediaType: Camera.MediaType.PICTURE,
    allowEdit: true,
    correctOrientation: true
  }
  return options;
}

function openCamera() {
  var srcType = Camera.PictureSourceType.CAMERA;
  var options = setOptions(srcType);

  navigator.camera.getPicture(function cameraSuccess(imageUri) {
    $(ImageView).only('#profile').image = imageUri;
  }, function cameraError(error) {
    console.debug("Unable to obtain picture: " + error, "app");
  }, options);
}

function openFilePicker() {
  var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
  var options = setOptions(srcType);
  
  navigator.camera.getPicture(function cameraSuccess(imageUri) {
    $(ImageView).only('#profile').image = imageUri;
  }, function cameraError(error) {
    console.debug("Unable to obtain picture: " + error, "app");
  }, options);
}
