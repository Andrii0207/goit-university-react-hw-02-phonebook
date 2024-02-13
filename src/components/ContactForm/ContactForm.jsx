import PropTypes from 'prop-types';
import { IoPersonAdd } from 'react-icons/io5';
import { nanoid } from 'nanoid';
import { Component } from 'react';
import { Button, Form, Input, LabelName } from './ContactForm.styled';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = nanoid();
  numberInputId = nanoid();

  handleNameChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  onSubmitForm = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <Form onSubmit={this.onSubmitForm}>
        <LabelName htmlFor={this.nameInputId}>Name</LabelName>
        <Input
          id={this.nameInputId}
          type="text"
          name="name"
          value={name}
          onChange={this.handleNameChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />

        <LabelName htmlFor={this.numberInputId}>Number</LabelName>
        <Input
          id={this.numberInputId}
          type="tel"
          name="number"
          value={number}
          onChange={this.handleNameChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />

        <Button type="submit">
          Add contact
          <IoPersonAdd style={{ paddingLeft: '10px' }} />
        </Button>
      </Form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
