import React, { PureComponent } from 'react';
import { CSSTransition } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';

import Container from './components/Container';
import Header from './components/Header';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';
import Sorter from './components/Sorter';
import Modal from './components/UI/Modal/Modal';
import Notice from './components/Notice';
import './Fade.css';
import './ModalAppear.css';
import './NoticeAppear.css';
import './ContactListAppear.css';

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
    error: false,
    text: ''
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
      this.setState({
        text: `${name} is already in contacts!`,
        error: true,
        showModal: false,
      });

      setTimeout(() => {
        this.setState({ error: false, })
      }, 2000);

      return
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
    const { filter, contacts, sortBy, showModal, error, text } = this.state;
    const visibleContacts = this.getVisibleContacts();
    const sortedContacts = this.getSortContacts(visibleContacts);

    return (
      <Container>
        <Header onClick={this.toggleModal} />
        
        <CSSTransition
          in={error}
          unmountOnExit
          classNames="notice"
          timeout={250}
        >
          <Notice text={text} />
        </CSSTransition>
        

        <CSSTransition
          in={showModal}
          unmountOnExit
          classNames="modal"
          timeout={500}
        >
          <Modal onClose={this.toggleModal}>
            <ContactForm onAddContact={this.addContact} />
          </Modal>
        </CSSTransition>

        <CSSTransition
          in={contacts.length > 1}
          unmountOnExit
          classNames="fade"
          timeout={250}
        >
          <div>
            <Filter value={filter} onChangeFilter={this.changeFilter} />
            <Sorter value={sortBy} onRadioChange={this.handleRadioChange} />
          </div>
        </CSSTransition>
        

        <CSSTransition
          in={true}
          appear={true}
          unmountOnExit
          classNames="item-fade"
          timeout={500}
        >
          <ContactList
          contacts={sortedContacts}
          onDeleteContact={this.deleteContact}
        />
        </CSSTransition>
        
      </Container>
    );
  }
}

export default App;
