import styled from 'react-emotion';
import Select from "@material-ui/core/Select";

export const Container = styled('div')`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  font-size: 10px;
  margin-bottom: auto;
  margin-right: 4px;
  margin-top: auto;
  text-align: center;
`;

export const Title = styled('span')`
  font-size: 12px;
  font-weight: bold;
  margin: 1px 0px;
`;

export const StyledSelect = styled(Select)`
    margin-top: 2px;
    background-color: white;
`;