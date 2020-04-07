import React from "react";
import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { closeModal, ICloseModal } from "../../actions";
import { IStore } from "../../reducers";

interface IProps {
  closeModal: ICloseModal;
  open: boolean;
  body: any;
}

const ModalContainer: React.FC<IProps> = ({ closeModal, open, body }) => {
  return (
    <Modal open={open} onClose={closeModal} size="mini">
      <Modal.Content>{body}</Modal.Content>
    </Modal>
  );
};

const mapStateToProps = ({ modal: { open, body } }: IStore) => ({ open, body });

export default connect(mapStateToProps, {
  closeModal,
})(ModalContainer);
