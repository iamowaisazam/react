import { useSelector, useDispatch } from 'react-redux';
import { closeReportPopup } from '../../../../store/slices/reportpopupslice';

const ReportPopup = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.popup.isReportPopupOpen);

    if (!isOpen) return null;

    const handleSubmit = () => {
        alert("Report submitted!");
        dispatch(closeReportPopup());
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                <button
                    style={styles.closeBtn}
                    onClick={() => dispatch(closeReportPopup())}>
                    ×
                </button>
                <h4 style={styles.header}>Report Content</h4>
                <textarea
                    style={styles.textarea}
                    rows="5"
                    placeholder="Write your report message here..."
                ></textarea>
                <div style={styles.buttonContainer}>
                    <button
                        style={styles.cancelBtn}
                        onClick={() => dispatch(closeReportPopup())}>
                        Cancel
                    </button>
                    <button
                        style={styles.submitBtn}
                        onClick={handleSubmit}>
                        Submit Report
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        backgroundColor: '#222',
        padding: '30px',
        width: '90%',
        maxWidth: '500px',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
        position: 'relative',
        animation: 'fadeIn 0.3s ease',
        color: '#fff',
    },
    closeBtn: {
        position: 'absolute',
        top: '10px',
        right: '15px',
        background: 'transparent',
        border: 'none',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#f1f1f1',
        cursor: 'pointer',
    },
    header: {
        marginBottom: '20px',
        textAlign: 'center',
        color: '#ff4d4d',
    },
    textarea: {
        width: '100%',
        padding: '12px',
        marginBottom: '15px',
        borderRadius: '8px',
        border: '1px solid #444',
        fontSize: '1rem',
        resize: 'vertical',
        backgroundColor: '#333',
        color: '#fff',
        placeholder: {
            color: '#bbb',
        },
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    cancelBtn: {
        backgroundColor: '#444',
        border: '1px solid #555',
        padding: '10px 20px',
        borderRadius: '8px',
        marginRight: '10px',
        cursor: 'pointer',
        color: '#fff',
    },
    submitBtn: {
        backgroundColor: '#ff4d4d',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
    },
};

export default ReportPopup;
