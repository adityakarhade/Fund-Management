import { LightningElement, wire, track } from 'lwc';
import getBudgetAllocations from '@salesforce/apex/HierarchicalViewController.getBudgetAllocations';
import getStrategies from '@salesforce/apex/HierarchicalViewController.getStrategies';
import getInvestments from '@salesforce/apex/HierarchicalViewController.getInvestments';
import getTransactions from '@salesforce/apex/HierarchicalViewController.getTransactions';

export default class InvestmentHierarchy extends LightningElement {
    @track budgetAllocations;
    @track showStrategyModal = false;
    @track showInvestmentModal = false;
    @track strategies = [];
    @track investments = [];
    @track treeGridColumns = [
        { label: 'Name', fieldName: 'Name', type: 'text' },
        { label: 'Investment Type', fieldName: 'Investment_Type__c', type: 'text' },
        { label: 'Investment Amount', fieldName: 'Invested_Amount__c', type: 'currency' },
        { label: 'Transaction Amount', fieldName: 'Transaction_Amount__c', type: 'currency' },
    ];

    @wire(getBudgetAllocations)
    wiredBudgetAllocations({ error, data }) {
        if (data) {
            this.budgetAllocations = data.map(ba => ({
                ...ba,
                _children: []
            }));
        } else if (error) {
            this.budgetAllocations = undefined;
            console.error('Error fetching budget allocations', error);
        }
    }

    handleStrategiesClick(event) {
        const baId = event.target.dataset.recordid;
        this.loadStrategies(baId);
    }

    loadStrategies(budgetAllocationId) {
        getStrategies({ budgetAllocationId })
            .then(result => {
                this.strategies = result.map(strategy => ({
                    ...strategy,
                    _children: []
                }));
                this.showStrategyModal = true;
            })
            .catch(error => {
                console.error('Error loading strategies', error);
            });
    }

    handleCloseStrategyModal() {
        this.showStrategyModal = false;
    }

    handleInvestmentsClick(event) {
        const baId = event.target.dataset.recordid;
        this.loadInvestments(baId); // Pass baId to loadInvestments function
    }

    loadInvestments(budgetAllocationId) {
        getInvestments({ budgetAllocationId })
            .then(result => {
                this.investments = result.map(investment => ({
                    ...investment,
                    _children: []
                }));
                this.showInvestmentModal = true;
            })
            .catch(error => {
                console.error('Error loading investments', error);
            });
    }

    handleCloseInvestmentModal() {
        this.showInvestmentModal = false;
    }

    handleTransactionsClick(event) {
        const baId = event.target.dataset.recordid;
        this.loadTransactions(baId);
    }

    loadTransactions(budgetAllocationId) {
        getTransactions({ budgetAllocationId })
            .then(result => {
                // Handle transactions
            })
            .catch(error => {
                console.error('Error loading transactions', error);
            });
    }
}
