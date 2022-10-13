import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Manager, withTaskContext } from '@twilio/flex-ui';
import { Container, Title, StyledSelect } from './LanguageSelect.Components';
import MenuItem from "@material-ui/core/MenuItem";
import { Actions as LanguageActions } from '../../states/LanguageState';
import LanguageUtil from '../../utils/LanguageUtil';

const manager = Manager.getInstance();

class LanguageSelect extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      languages: [
        {'name': 'English',
          'key': 'en-US'
        },
        {
          'name': 'Spanish',
          'key': 'es-MX'
        },
        {
          'name': 'Portuguese',
          'key': 'pt-BR'
        }, 
        {
          'name': 'French',
          'key': 'fr-CA'
        },
        {
          'name': 'Italian',
          'key': 'it-IT'
        },
        {
          'name': 'German',
          'key': 'de-DE'
        },
        {
          'name': 'Dutch',
          'key': 'nl-NL'
        },
        {
          'name': 'Czech',
          'key': 'cs-CZ'
        },
        {
          'name': 'Japanese',
          'key': 'ja-JP'
        },
        {
          'name': 'Korean',
          'key': 'ko-KR'
        },
        {
          'name': 'Chinese (Simplified)',
          'key': 'zh-CN'
        },
        {
          'name': 'Chinese (Traditional)',
          'key': 'zh-TW'
        },
        {
          'name': 'Vietnamese',
          'key': 'vi-VN'
        }
      ]
    }
    this.handleChange = this.handleChange.bind(this);
  }
  

  updateWorker = async (language) => {
    const newAttr = { ...manager.workerClient.attributes, language};
    console.log('Updated worker attributes: ', newAttr )
    await manager.workerClient.setAttributes(newAttr);
  }

  handleChange = async (e) => {
    console.log('Selected language: ', e.target.value );
    let data = await LanguageUtil.getLanguageStrings(e.target.value);
    if (data) { 
      manager.strings = { ...manager.strings, ...data};    
      this.props.setLanguage(e.target.value);
      //Update worker
      this.updateWorker(e.target.value);
    }
  }

  render() {
    return (
      this.state.languages && this.state.languages.length > 1 ? (
        <Container>
          
          <StyledSelect
            key="language-picker"
            value={this.props.currentLanguage}
            onChange={this.handleChange}
          >
            {this.state.languages.map((lang) => (
              <MenuItem key={lang.key} value={lang.key}>
                {lang.name}
              </MenuItem>
            ))}
          </StyledSelect>
        </Container>
      ) : null
    )
  }
}

const mapStateToProps = state => {
  return {
    currentLanguage: state['select-language']?.language?.id || 'en-US'
  };
}

const mapDispatchToProps = (dispatch) => ({
  setLanguage: bindActionCreators(LanguageActions.setLanguage, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTaskContext(LanguageSelect));
