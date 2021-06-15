import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

const PLUGIN_NAME = 'FlexLocalizationPlugin';

export default class FlexLocalizationPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);

    // This approach works by determining the language the user would like (by Flex worker attributes,
    // or browser setting, in this sample).  Use the method best suited to your use case. REMOVE THE REST.
    // The language name/code is used as a file name for an HTTP POST to retrieve a JSON file
    // containing all the strings that Flex uses.  Make copies of the base JSON file for each language
    // you might need.  Have them translated and store them with the original.

    // Set a default.
    let myLanguage = "en-US";

    // Could use browser data.
    myLanguage = navigator.language || myLanguage;

    // Or flex data.
    myLanguage = flex.defaultConfiguration.language || myLanguage;

    // Or manager data.  (This can be set in appConfig.js)
    myLanguage = manager.configuration.language || myLanguage;

    // Or manager.workerClient.attributes data.  This is preferred, as it can be setup via SSO.
    myLanguage = manager.workerClient.attributes.language || myLanguage;

    // Construct a URL.
    const filePath = "/" + myLanguage + ".json";
    const serviceBaseUrl = process.env.FLEX_APP_FUNCTIONS_BASE;

    // Keep things synchronous to avoid race conditions

    // This sample uses a Twilio serverless Service.
    // Call a Function, which then retrieves the translation data.
    try {
      const serviceUrl = serviceBaseUrl + "/getStrings";

      const request = new XMLHttpRequest();
      request.open("POST", serviceUrl, false);
      request.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
      const body = {
        languageRequested: filePath,
        Token: manager.store.getState().flex.session.ssoTokenPayload.token
      };
      request.send(new URLSearchParams(body));

      if(request.status === 200) {
        const data = JSON.parse(request.responseText);
        manager.strings = { ...manager.strings, ...data};
      } else {
        console.warn("translation file not found, bad request status", request);
      }
    }
    catch(e) {
      console.warn("translation file not found, exception", e);
    }

  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }
  }
}
