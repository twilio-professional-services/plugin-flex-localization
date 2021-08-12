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
        }
      ]
    }
    this.handleChange = this.handleChange.bind(this);
  }
  

  handleChange = async (e) => {
    console.log('Selected language: ', e.target.value );
    let data = await LanguageUtil.getLanguageStrings(e.target.value);
    if (data) { 
      manager.strings = { ...manager.strings, ...data};    
      this.props.setLanguage(e.target.value);
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
