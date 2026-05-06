import React from "react";
import styles from "./AddressForm.module.css";

function AddressForm() {
    return (
        <div className={styles['address-container']} >
            <h2>Address</h2>

            <div className={styles['address-grid']} >
                {/* Street */}
                <div className={[styles['form-group'], styles['full-width']].join(' ')}>
                    <label>Street</label>
                    <input type="text" />
                </div>

                {/* City */}
                <div className={styles['form-group']} >
                    <label>City</label>
                    <input type="text" />
                </div>

                {/* State */}
                <div className={styles['form-group']} >
                    <label>State</label>
                    <input type="text" />
                </div>

                {/* Zip */}
                <div className={styles['form-group']} >
                    <label>Zip Code</label>
                    <input type="text" />
                </div>

                {/* Country */}
                <div className={styles['form-group']} >
                    <label>Country</label>
                    <input type="text" />
                </div>

                {/* ID Proof Upload */}
                <div className={styles['form-group']} >
                    <label>ID Proof</label>

                    <div className={styles['file-upload']} >
                        <input type="file" id="fileInput" />
                        <label htmlFor="fileInput" className={styles['upload-label']} >
                            📄 Upload File
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddressForm;