import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Header, Icon, List } from 'semantic-ui-react';
import { IValue } from '../models/value';
import { fetchValues, deleteValue } from '../actions';
import { IStore } from '../reducers';

interface IProps {
  values: IValue[];
  fetchValues: Function;
  deleteValue: Function;
}

const App: React.FC<IProps> = ({ values, fetchValues, deleteValue }) => {
  useEffect(() => {
    fetchValues();
  }, [fetchValues]);

  return (
    <div>
      <Header as="h2">
        <Icon name="users" />
        <Header.Content>CRR</Header.Content>
      </Header>
      <List>
        {values.map(value => (
          <List.Item key={value.id} onClick={() => deleteValue(value.id)}>
            {value.name}
          </List.Item>
        ))}
      </List>
    </div>
  );
};

const mapStateToProps = ({ values }: IStore): { values: IValue[] } => {
  return { values };
};

export default connect(mapStateToProps, { fetchValues, deleteValue })(App);
