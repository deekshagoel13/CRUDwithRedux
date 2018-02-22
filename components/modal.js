import React from 'react';
import Form from '../containers/form';
const Modal =()=>{
        return(
            <div className={'modal fade'} id={'myModal'}>
                <div className={'modal-dialog'}>
                    <div className={'modal-content'}>
                        <div className={'modal-body'}>
                            <Form/>
                        </div>
                    </div>
                </div>
            </div>
        )
}
export default Modal;