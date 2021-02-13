import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactListItem from './ContactListItem';
import './ContactListAnim.css'

function ContactList({ contacts, onDeleteContact }) {
  return (
    <TransitionGroup component="ol">
      {contacts.map(({ id, name, number }) => (
          <CSSTransition key={id} timeout={250} classNames="item-fade">
            <ContactListItem
              name={name}
              number={number}
              onDelete={() => onDeleteContact(id)}
            />
          </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
  onDeleteContact: PropTypes.func,
};

export default ContactList;
