import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addImage, explainBillAI } from '../../features/image/imageAction';
// import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Image = () => {
    const { loading, image, error, message, aiResult, aiLoading, aiError } = useSelector(state => state.image);
    const dispatch = useDispatch();

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [uploadedURL, setUploadedURL] = useState();

    const handleFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }
        if (e.target.files[0].size > 5000000) {
            alert("File size is too large");
            return;
        }
        setSelectedFile(e.target.files[0]);
    };

    useEffect(() => {
        if (selectedFile) {
            setPreview(URL.createObjectURL(selectedFile));
        }
    }, [selectedFile]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("billImage", selectedFile);

        const uploadResult = await dispatch(addImage(formData));
        const payload = uploadResult.payload;

        if (payload?.billImage) {
            setUploadedURL(payload.billImage);
        }

        if (payload?.aiResult) {
            toast.success("AI explanation ready!", { theme: 'colored' });
        }
    };

    //   useEffect(() => {
    //     if (message) {
    //       toast.success(message, { theme: 'colored' });
    //     }
    //     if (error) {
    //       toast.error(error, { theme: 'colored' });
    //     }
    //   }, [message, error]);

    return (
        <div className=" sellForm">
            <Link className='link' to='/Home'>&lt;&nbsp;Back to Home</Link>
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <h1 className="manual-h head-1">Add Bill Image</h1>
                    <input
                        type="file"
                        name='billImage'
                        className='input signIn-input sell-input'
                        placeholder='billImage'
                        onChange={handleFile}
                        accept='image/*'
                        required
                    />
                    <br />
                    {selectedFile && <img src={preview} alt="" width='70px' height='70px' />}

                    <button className='btn signIn-btn' type='submit'>{loading ? "Explaining..." : "Upload and Explain My Bill"}</button>
                </form>

                {aiResult && (
                    <div className="result">
                        {aiResult}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Image;

