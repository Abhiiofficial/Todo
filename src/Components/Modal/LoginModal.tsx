import ReactModal from 'react-modal';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const LoginModal: React.FC<ModalProps> = ({ isOpen, onClose ,children}) => {
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
                    minWidth: '250px', // Adjusted width for responsive view
                    maxWidth: '800px', // Adjusted max-width for desktop view
                    maxHeight: '350px',
                    // minHeight:'100px',
                    margin: 'auto',
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    background: '#fff',
                    overflow:'hidden'
                },
            }}
        >
             {children}
            
        </ReactModal>
    );
};

export default LoginModal;
