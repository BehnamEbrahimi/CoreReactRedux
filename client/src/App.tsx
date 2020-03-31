import React, { useState, useEffect } from 'react';
import { Header, Icon, List } from 'semantic-ui-react';
import axios from 'axios';

const App: React.FC = () => {
  const [values, setValues] = useState<any[]>([]);

  useEffect(() => {
    const exec = async () => {
      const { data: values } = await axios.get(
        'http://localhost:5000/api/values'
      );

      setValues(values);
    };

    exec();
  }, []);

  return (
    <div>
      <Header as="h2">
        <Icon name="users" />
        <Header.Content>CRR</Header.Content>
      </Header>
      <List>
        {values.map(value => (
          <List.Item key={value.id}>{value.name}</List.Item>
        ))}
      </List>
    </div>
  );
};

export default App;
