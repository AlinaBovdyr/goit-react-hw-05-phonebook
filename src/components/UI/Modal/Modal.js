import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as CloseIcon } from '../../../icons/cross.svg';
import IconButton from '../IconButton';
import s from './Modal.module.css';
import './ContentAppear.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  handleCloseBtnClick = () => {
    this.props.onClose();
  };

  render() {
    return createPortal(
      <div className={s.backdrop} onClick={this.handleBackdropClick}>
        <CSSTransition in={true} appear={true} timeout={250} classNames="content" unmountOnExit>
          <div className={s.content}>
          {this.props.children}
          <IconButton
            className={s.closeBtn}
            onClick={this.handleCloseBtnClick}
            aria-label="Close modal"
            title="Close modal"
          >
            <CloseIcon width="12" height="12" fill="#fff" />
          </IconButton>
        </div>
        </CSSTransition>
      </div>,
      modalRoot,
    );
  }
}
