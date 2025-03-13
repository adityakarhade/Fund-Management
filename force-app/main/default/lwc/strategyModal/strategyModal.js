import { LightningElement, api, track } from 'lwc';

export default class StrategyModal extends LightningElement {
    @api strategies;
    @api treeGridColumns;

    closeModal() {
        this.dispatchEvent(new CustomEvent('close'));
    }
}
