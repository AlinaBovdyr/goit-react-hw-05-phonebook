import React, { PureComponent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as AddIcon } from './icons/plus.svg';

import Container from './components/Container';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';
import Sorter from './components/Sorter';
import IconButton from './components/UI/IconButton';
import Modal from './components/UI/Modal/Modal';
import './App.css';

class App extends PureComponent {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    sortBy: 'id',
    showModal: false,
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevContacts = prevState.contacts;
    const currentContacts = this.state.contacts;

    if (currentContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(currentContacts));
    }
  }

  addContact = (name, number, photo) => {
    const { contacts } = this.state;
    const contact = {
      id: uuidv4(),
      photo,
      name,
      number,
      completed: false,
    };

    if (contacts.some(contact => contact.name === name)) {
      return alert(`${name} is already in contacts`);
    }

    this.setState(({ contacts }) => {
      return { contacts: [...contacts, contact] };
    });

    this.toggleModal();
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => {
      return {
        contacts: contacts.filter(({ id }) => id !== contactId),
      };
    });

    this.setState({
      filter: '',
    });
  };

  changeFilter = filter => {
    this.setState({ filter });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  handleRadioChange = event => {
    const { value } = event.target;

    this.setState({
      sortBy: value,
    });
  };

  getSortContacts = contactsList => {
    const { sortBy } = this.state;

    if (sortBy === 'abc') {
      return contactsList.sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        if (aName < bName) {
          return -1;
        }
        if (aName > bName) {
          return 1;
        }

        return 0;
      });
    }

    if (sortBy === 'id') {
      return contactsList.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }

        return 0;
      });
    }
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { filter, contacts, sortBy, showModal } = this.state;
    const visibleContacts = this.getVisibleContacts();
    const sortedContacts = this.getSortContacts(visibleContacts);

    return (
      <Container>
        <div className="wrapper">
          <h2 className="wrapper-title">Contacts</h2>
          <IconButton
            className="add-btn"
            onClick={this.toggleModal}
            aria-label="Add contact"
            title="Add contact"
          >
            <AddIcon width="16" height="16" fill="#fff" />
          </IconButton>
        </div>

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <ContactForm onAddContact={this.addContact} />
          </Modal>
        )}

        {contacts.length > 1 && (
          <>
            <Filter value={filter} onChangeFilter={this.changeFilter} />
            <Sorter value={sortBy} onRadioChange={this.handleRadioChange} />
          </>
        )}
        <ContactList
          contacts={sortedContacts}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}

export default App;
