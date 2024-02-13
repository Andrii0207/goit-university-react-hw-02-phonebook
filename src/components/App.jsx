import { Component } from 'react';
import { FaAddressBook } from 'react-icons/fa6';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import Notificalion from './Notification/Notification';
import Filter from './Filter/Filter';
import { ContactListTitle, Title, Wrapper } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
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
      ? alert(`${name} already is in contacts`)
      : this.setState(prevState => ({
          contacts: [newContact, ...prevState.contacts],
        }));
  };

  handlerFilter = e => {
    const { value } = e.currentTarget;
    this.setState({ filter: value });
  };

  deleteContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(item => item.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(item =>
      item.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <Wrapper>
        <Title>
          Phonebook
          <FaAddressBook />
        </Title>
        <ContactForm onSubmit={this.addContact} />

        <ContactListTitle>Contacts</ContactListTitle>
        <Filter value={filter} onChange={this.handlerFilter} />
        <>
          {contacts.length !== 0 ? (
            <ContactList
              contacts={filteredContacts}
              onDelete={this.deleteContact}
            />
          ) : (
            <Notificalion message="There are no any contacts" />
          )}
        </>
      </Wrapper>
    );
  }
}
