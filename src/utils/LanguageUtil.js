import { Manager } from '@twilio/flex-ui';
const manager = Manager.getInstance();

class LanguageUtil {
  getLanguageStrings = async (language) => {
    console.debug('Getting template strings for language:', language);
    const fetchUrl = `${process.env.FLEX_APP_FUNCTIONS_BASE}/getStrings`;
    const filePath = "/" + language + ".json";
    const fetchBody = {
      Token: manager.store.getState().flex.session.ssoTokenPayload.token,
      languageRequested: filePath,
    };
    const fetchOptions = {
      method: 'POST',
      body: new URLSearchParams(fetchBody),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    };
  
    let strings;
    try {
      const response = await fetch(fetchUrl, fetchOptions);
      strings = await response.json();
      console.debug('Template Strings:', strings);
    } catch (error) {
      console.error('Failed to get template strings');
    }
  
    return strings;
  }
}

const langUtil = new LanguageUtil();

export default langUtil;