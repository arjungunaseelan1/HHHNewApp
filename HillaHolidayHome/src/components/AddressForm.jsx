import React from "react";
import styles from "./AddressForm.module.css";

function AddressForm({ setFormData }) {

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // ✅ Handle file upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        setFormData(prev => ({
            ...prev,
            idProof: file
        }));
    };

    return (
        <div className={styles['address-container']} >
            <h2>Address</h2>

            <div className={styles['address-grid']} >

                {/* Street */}
                <div className={[styles['form-group'], styles['full-width']].join(' ')}>
                    <label>Street</label>
                    <input
                        type="text"
                        name="street"
                        onChange={handleChange}
                    />
                </div>

                {/* City */}
                <div className={styles['form-group']} >
                    <label>City</label>
                    <input
                        type="text"
                        name="city"
                        onChange={handleChange}
                    />
                </div>

                {/* State */}
                <div className={styles['form-group']} >
                    <label>State</label>
                    <input
                        type="text"
                        name="state"
                        onChange={handleChange}
                    />
                </div>

                {/* Zip */}
                <div className={styles['form-group']} >
                    <label>Zip Code</label>
                    <input
                        type="text"
                        name="zipcode"
                        onChange={handleChange}
                    />
                </div>

                {/* Country */}
                <div className={styles['form-group']} >
                    <label>Country</label>
                    <input
                        type="text"
                        name="country"
                        onChange={handleChange}
                    />
                </div>

                {/* ID Proof Upload */}
                <div className={styles['form-group']} >
                    <label>ID Proof</label>

                    <div className={styles['file-upload']} >
                        <input
                            type="file"
                            id="fileInput"
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor="fileInput"
                            className={styles['upload-label']}
                        >
                            📄 Upload File
                        </label>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AddressForm;