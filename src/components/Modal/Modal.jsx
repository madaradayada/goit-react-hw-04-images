import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Overlay, ModalStyled } from './ModalStyled';

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    onClose: PropTypes.func,
    children: PropTypes.node.isRequired,
  };
  //hang the listener on keydown
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }
  //unsubscribe from the listener
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }
  //close the modal when you click on Overlay or the Escape key
  closeModal = ({ currentTarget, target, code }) => {
    if (currentTarget === target || code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.closeModal}>
        <ModalStyled>{this.props.children}</ModalStyled>
      </Overlay>,
      modalRoot
    );
  }
}
