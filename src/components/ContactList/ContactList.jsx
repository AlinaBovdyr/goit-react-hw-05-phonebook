import React from 'react';
import PropTypes from 'prop-types';
import ContactListItem from './ContactListItem';

function ContactList({ contacts, onDeleteContact }) {
  return (
    <ol>
      {contacts.map(({ id, name, number }) => {
        return (
          <ContactListItem
            key={id}
            name={name}
            number={number}
            onDelete={() => onDeleteContact(id)}
          />
        );
      })}
    </ol>
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
