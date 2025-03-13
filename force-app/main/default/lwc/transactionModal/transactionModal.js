import { LightningElement, api } from 'lwc';

export default class TransactionModal extends LightningElement {
    @api showModal = false;
    @api transactions = [];
    @api error;

    handleClose() {
        this.dispatchEvent(new CustomEvent('close'));
    }
}
