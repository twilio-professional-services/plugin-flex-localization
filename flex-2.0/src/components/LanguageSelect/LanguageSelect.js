import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Manager, withTaskContext } from '@twilio/flex-ui';

import { Actions as LanguageActions } from '../../states/LanguageState';
import LanguageUtil from '../../utils/LanguageUtil';

import { Theme } from '@twilio-paste/core/theme';
import { Flex, Select, Option } from "@twilio-paste/core";
import { PLUGIN_NAME, Languages } from '../../utils/constants';

const manager = Manager.getInstance();

class LanguageSelect extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }


  updateWorker = async (language) => {
    const newAttr = { ...manager.workerClient.attributes, language };
    console.log(PLUGIN_NAME, 'Updated worker attributes: ', newAttr)
    await manager.workerClient.setAttributes(newAttr);
  }

  handleChange = async (e) => {
    console.log(PLUGIN_NAME, 'Selected language: ', e.target.value);
    let data = await LanguageUtil.getLanguageStrings(e.target.value);
    if (data) {
      manager.strings = { ...manager.strings, ...data };
      this.props.setLanguage(e.target.value);
      //Update worker
      this.updateWorker(e.target.value);
    }
  }

  render() {
    let workerLanguage = manager.workerClient?.attributes?.language;
    console.log(PLUGIN_NAME, 'worker language:', workerLanguage )
    return (
      <Theme.Provider theme="flex">
        {Languages && Languages.length > 1 ? (
          <Flex>
            <Select
              key="language-picker"
              defaultValue={workerLanguage}
              onChange={this.handleChange}
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
}

const mapStateToProps = state => {
  let stateLang = state['select-language']?.language?.id
  //console.log(PLUGIN_NAME, 'language from state:', stateLang);
  return {
    currentLanguage: stateLang || 'en-US'
  };
}

const mapDispatchToProps = (dispatch) => ({
  setLanguage: bindActionCreators(LanguageActions.setLanguage, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTaskContext(LanguageSelect));
