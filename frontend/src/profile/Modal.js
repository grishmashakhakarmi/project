import React, {useState} from 'react';

const Modal = () => {
 return (
    <div className="modal" id="staticTableBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
             <h5 className="modal-title" id="staticBackdropLabel">Edit post</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            ...
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Ok</button>
        </div>
        </div>
    </div>
    </div>
 )
}
export default Modal;
