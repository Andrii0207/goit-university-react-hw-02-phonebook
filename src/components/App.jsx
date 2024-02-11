import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import Notificalion from './Notification/Notification';
import Filter from './ContactList/Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    contacts.find(
      item =>
        item.name.toLowerCase().trim() === newContact.name.toLowerCase().trim()
    )
      ? alert('You already have that name')
      : this.setState(prevState => ({
          contacts: [newContact, ...prevState.contacts],
        }));
  };

  handlerFilter = e => {
    const { value } = e.currentTarget;
    this.setState({ filter: value });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(item => item.id !== id),
    }));
  };

  render() {
    const normalizedFilter = this.state.filter.toLowerCase();

    const filteredContacts = this.state.contacts.filter(item =>
      item.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.handlerFilter} />
        <>
          {this.state.contacts.length !== 0 ? (
            <ContactList
              contacts={filteredContacts}
              onDelete={this.deleteContact}
            />
          ) : (
            <Notificalion />
          )}
        </>
      </div>
    );
  }
}
