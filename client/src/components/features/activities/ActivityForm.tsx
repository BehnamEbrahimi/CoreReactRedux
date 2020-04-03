import React, { useState, useEffect, FormEvent } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Segment, Form, Button } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';

import { IActivity } from '../../../models/activity';
import {
  loadActivity,
  ILoadActivity,
  createActivity,
  ICreateActivity,
  editActivity,
  IEditActivity,
  clearActivity,
  IClearActivity
} from '../../../actions';
import { IStore } from '../../../reducers';

interface IProps {
  loadActivity: ILoadActivity;
  createActivity: ICreateActivity;
  editActivity: IEditActivity;
  clearActivity: IClearActivity;
  activity: IActivity | undefined;
  submitting: boolean;
  target: string;
}

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<IProps & RouteComponentProps<DetailParams>> = ({
  loadActivity,
  clearActivity,
  createActivity,
  editActivity,
  activity,
  submitting,
  target,
  match,
  history
}) => {
  const emptyForm = {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  };
  const [formData, setFormData] = useState<IActivity>(emptyForm);

  useEffect(() => {
    if (match.params.id && !activity) {
      loadActivity(match.params.id);
    }

    if (!match.params.id) {
      setFormData(emptyForm);
    }

    // when this component is unmounted, the activity will be cleared
    return () => clearActivity();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (match.params.id && activity) {
      setFormData(activity);
    }
  }, [activity, match.params.id]);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (formData.id.length === 0) {
      let newActivity = {
        ...formData,
        id: uuid()
      };
      createActivity(newActivity, history);
    } else {
      editActivity(formData.id, formData, history);
    }
  };
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="title"
          placeholder="Title"
          value={formData.title}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          rows={2}
          placeholder="Description"
          value={formData.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name="category"
          placeholder="Category"
          value={formData.category}
        />
        <Form.Input
          onChange={handleInputChange}
          name="date"
          type="datetime-local"
          placeholder="Date"
          value={formData.date}
        />
        <Form.Input
          onChange={handleInputChange}
          name="city"
          placeholder="City"
          value={formData.city}
        />
        <Form.Input
          onChange={handleInputChange}
          name="venue"
          placeholder="Venue"
          value={formData.venue}
        />
        <Button
          floated="right"
          positive
          type="submit"
          content="Submit"
          loading={submitting && target === 'submit'}
        />
        <Button
          as={Link}
          to={'/activities'}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

const mapStateToProps = ({
  activity: { activity, submitting, target }
}: IStore): {
  activity: IActivity | undefined;
  submitting: boolean;
  target: string;
} => {
  return { activity, submitting, target };
};

export default connect(mapStateToProps, {
  loadActivity,
  createActivity,
  editActivity,
  clearActivity
})(ActivityForm);
