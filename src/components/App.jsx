import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import Form from './Form/Form';

export class App extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
  };

  nameInputId = nanoid();
  numberInputId = nanoid();

  handleNameChange = e => {
    // console.log(e.currentTarget);
    // console.log('name:', e.currentTarget.name);
    // console.log('value:', e.currentTarget.value);
    // this.setState({ name: e.currentTarget.value });

    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  addContact = e => {
    e.preventDefault();

    const newContact = {
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    };

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <>
        <div>
          <form
            onSubmit={this.addContact}
            style={{ display: 'flex', baclgroundColor: 'teal' }}
          >
            <label htmlFor={this.nameInputId}>
              Name
              <input
                id={this.nameInputId}
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleNameChange}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
              />
            </label>
            <label htmlFor={this.numberInputId}>
              Number
              <input
                id={this.numberInputId}
                type="tel"
                name="number"
                value={this.state.number}
                onChange={this.handleNameChange}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
              />
            </label>

            <button type="submit">Add contact</button>
          </form>
        </div>

        {/* <Form onSubmit={this.addContact} /> */}
        <ul>
          {this.state.contacts.length !== 0 ? (
            this.state.contacts.map((item, index) => (
              <li key={index}>
                {item.name}: {item.number}
              </li>
            ))
          ) : (
            <p>There is no contacts</p>
          )}
        </ul>
      </>
    );
  }
}
