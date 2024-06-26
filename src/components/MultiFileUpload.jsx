import React, { useRef, useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import axios from 'axios';
import { useProject } from './ProjectContext';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function MultiFileUpload({ onComplete }) {
    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const [fileContents, setFileContents] = useState([]);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ open: false, severity: '', message: '' });
    const fileUploadRef = useRef(null);
    const { project } = useProject();

    const formatSize = (size) => {
        if (size === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const updateTotalSize = (fileList) => {
        const total = fileList.reduce((acc, file) => acc + file.size, 0);
        setTotalSize(total);
    };

    const onTemplateSelect = (e) => {
        const selectedFiles = Array.from(e.files);
        setFiles((prevFiles) => {
            const newFiles = [...prevFiles, ...selectedFiles];
            updateTotalSize(newFiles);
            return newFiles;
        });
    };

    const handleUploadAsDataURL = async () => {
        if (!files.length) return;

        const promises = files.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    resolve({ name: file.name, type: file.type, content: reader.result });
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        setLoading(true);
        try {
            const results = await Promise.all(promises);
            setFileContents(results);
            toast.current.show({ severity: 'info', summary: 'Success', detail: 'Files uploaded as Data URL' });

            // Send the data to the dummy API
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', { files: results, project: project.name });
            console.log(response.data);
            toast.current.show({ severity: 'success', summary: 'API Success', detail: 'Files submitted successfully' });
            setAlert({ open: true, severity: 'success', message: 'Files submitted successfully' });
        } catch (error) {
            console.error('Error reading files', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to upload files' });
            setAlert({ open: true, severity: 'error', message: 'Failed to upload files' });
        } finally {
            setLoading(false);
        }
    };

    const handleUploadAsText = async () => {
        if (!files.length) return;

        const promises = files.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    resolve({ name: file.name, type: file.type, content: reader.result });
                };
                reader.onerror = reject;
                reader.readAsText(file);
            });
        });

        setLoading(true);
        try {
            const results = await Promise.all(promises);
            setFileContents(results);
            toast.current.show({ severity: 'info', summary: 'Success', detail: 'Files uploaded as Text' });

            // Send the data to the dummy API
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', { files: results, project: project.name });
            console.log(response.data);
            toast.current.show({ severity: 'success', summary: 'API Success', detail: 'Files submitted successfully' });
            setAlert({ open: true, severity: 'success', message: 'Files submitted successfully' });
        } catch (error) {
            console.error('Error reading files', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to upload files' });
            setAlert({ open: true, severity: 'error', message: 'Failed to upload files' });
        } finally {
            setLoading(false);
        }
    };

    const onTemplateUpload = (e) => {
        let _totalSize = totalSize;

        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const onTemplateRemove = (file, callback) => {
        setFiles((prevFiles) => {
            const newFiles = prevFiles.filter(f => f !== file);
            updateTotalSize(newFiles);
            return newFiles;
        });
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
        setFiles([]);
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, cancelButton } = options;
        const formattedValue = totalSize > 0 ? formatSize(totalSize) : '0 B';
        const totalFiles = files.length;

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #ddd', background: '#fff', zIndex: 1000 }}>
                {chooseButton}
                {cancelButton}
                <div className="flex align-items-center gap-2 ml-auto mr-2" style={{ padding: '0.5rem', backgroundColor: '#f4f4f4', borderRadius: '0.5rem' }}>
                    <span style={{ fontWeight: 'bold' }}>Total Files:</span>
                    <span>{totalFiles}</span>
                </div>
                <div className="flex align-items-center gap-2" style={{ padding: '0.5rem', backgroundColor: '#f4f4f4', borderRadius: '0.5rem' }}>
                    <span style={{ fontWeight: 'bold' }}>Total Size:</span>
                    <span>{formattedValue}</span>
                </div>
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        return (
            <div style={{ width: '100%' }}>
                <div className="flex align-items-center flex-wrap" style={{ padding: '0.25rem 0' }}>
                    <div className="flex align-items-center" style={{ width: '5%' }}>
                        <span>{props.index + 1}.</span>
                    </div>
                    <div className="flex align-items-center" style={{ width: '40%' }}>
                        {file.type.startsWith('image/') ? (
                            <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                        ) : (
                            <span className="pi pi-file" style={{ fontSize: '2em', marginRight: '1em' }}></span>
                        )}
                        <span className="flex flex-column text-left ml-3">
                            {file.name}
                            <small>{new Date().toLocaleDateString()}</small>
                        </span>
                    </div>
                    <Tag value={formatSize(file.size)} severity="warning" className="px-3 py-2" />
                    <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
                </div>
                <Divider />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-file-arrow-up mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Drag and drop your files here
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-file-plus', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

    // Hide the main scrollbar
    // useEffect(() => {
    //     document.body.style.overflow = 'hidden';
    //     return () => {
    //         document.body.style.overflow = 'auto';
    //     };
    // }, []);

    const hasFiles = files.length > 0;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Toast ref={toast}></Toast>

            <Tooltip target=".custom-choose-btn" content="Add Files" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

            <div style={{ flexGrow: 1, overflowY: 'auto' }}>
                <div className="p-card" style={{ background: '#fff', borderRadius: '2px' }}>
                    <FileUpload ref={fileUploadRef} name="demo[]" multiple accept="*" maxFileSize={10000000}
                        onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                        headerTemplate={headerTemplate} itemTemplate={(file, props) => itemTemplate(file, { ...props, index: files.indexOf(file) })} emptyTemplate={emptyTemplate}
                        chooseOptions={chooseOptions} cancelOptions={cancelOptions} />
                </div>
            </div>

            <div style={{ width: '100%', background: '#fff', borderTop: '1px solid #ddd', zIndex: 1000, padding: '1rem' }}>
                <div className="footer" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        label="Upload Files"
                        icon="pi pi-cloud-upload"
                        className="p-button-success p-3"
                        onClick={() => { handleUploadAsText(); onComplete(); }}
                        disabled={!hasFiles || !project || loading}
                        startIcon={loading ? <CircularProgress size={24} /> : null}
                    >
                        {loading ? 'Uploading...' : 'Upload Files'}
                    </Button>
                </div>
            </div>

            <Snackbar open={alert.open} autoHideDuration={6000} onClose={() => setAlert({ ...alert, open: false })}>
                <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </div>
    );
}
