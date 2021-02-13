import React, { Component } from 'react';
import s from './ContactForm.module.css';
import PhotoInput from '../UI/PhotoInput';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;

    this.props.onAddContact(name, number);

    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <>
        <form className={s.container} onSubmit={this.handleSubmit}>
          <label className={s.field}>
            <span className={s.label}>Name</span>
            <input
              className={s.input}
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              required
            />
          </label>
          <label className={s.field}>
            <span className={s.label}>Number</span>
            <input
              className={s.input}
              type="tel"
              name="number"
              value={number}
              onChange={this.handleChange}
              required
            />
          </label>
          <button className={s.button} type="submit">
            Add contact
          </button>
        </form>
      </>
    );
  }
}

export default ContactForm;
