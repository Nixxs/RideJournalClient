import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const MediaModal = ({ isOpen, onClose, imageURL, imageTitle }) => {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="media-modal-title"
            aria-describedby="media-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                maxHeight: "90%",
                boxShadow: 24,
                minWidth: {xs: '90%', sm:"90%", md:"auto"},
                p: { xs: 1, sm: 2, md: 4 },
                display: 'flex',
            }}>
                <img
                    src={`${imageURL}`}
                    alt={`${imageTitle}`}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: "contain"
                    }}
                />
            </Box>
        </Modal>
    );
}

export default MediaModal;
