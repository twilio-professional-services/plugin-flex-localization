import React from 'react';
import { Actions, Manager, useFlexDispatch } from '@twilio/flex-ui';
import { ACTION_SET_LANGUAGE } from '../../states/LanguageState';
import LanguageUtil from '../../utils/LanguageUtil';
import { Theme } from '@twilio-paste/core/theme';
import { Flex, Select, Option } from "@twilio-paste/core";
import { PLUGIN_NAME, Languages } from '../../utils/constants';

const manager = Manager.getInstance();

const LanguageSelect = () => {
  const dispatch = useFlexDispatch();

  const handleChange = async (e) => {
    let language = e.target.value;
    console.log(PLUGIN_NAME, 'Selected language: ', language);
    let data = await LanguageUtil.getLanguageStrings(language);
    if (data) {
      manager.strings = { ...manager.strings, ...data };
      dispatch({ type: ACTION_SET_LANGUAGE, language });
      await Actions.invokeAction("SetWorkerAttributes", 
        { attributes: { language }, mergeExisting: true }
      );
    }
  }

  let workerLanguage = manager.workerClient?.attributes?.language;
  console.log(PLUGIN_NAME, 'worker language:', workerLanguage)
  return (
    <Theme.Provider theme="flex">
      {Languages && Languages.length > 1 ? (
        <Flex>
          <Select
            key="language-picker"
            defaultValue={workerLanguage}
            onChange={handleChange}
          >
            {Languages.map((lang) => (
              <Option key={lang.key} value={lang.key}>
                {lang.name}
              </Option>
            ))}
          </Select>
        </Flex>
      ) : null}
    </Theme.Provider>
  )
}

export default LanguageSelect;
