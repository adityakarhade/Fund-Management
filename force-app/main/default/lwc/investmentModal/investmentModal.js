import { LightningElement, api, track } from 'lwc';

export default class InvestmentModal extends LightningElement {
    @api investments;
    @api treeGridColumns;

    closeModal() {
        this.dispatchEvent(new CustomEvent('close'));
    }
}
