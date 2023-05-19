import ReactModal from 'react-modal';


type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const ErrorModal: React.FC<ModalProps> = ({ isOpen, onClose ,children}) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            ariaHideApp={false}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.59)',
                },
                content: {
                    width: '350px',
                    height: '150px',
                    margin: 'auto',
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    background: '#fff',
                },
            }}
        >
             {children}
            
        </ReactModal>
    );
};

export default ErrorModal;
