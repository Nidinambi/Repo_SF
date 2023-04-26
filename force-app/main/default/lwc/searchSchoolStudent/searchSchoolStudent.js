import { LightningElement, api, track } from 'lwc';

export default class StudentList extends LightningElement {
    @api studentList = [];

    addAccountRecord() {
        this.studentList.push({
            'Name': '',
            'STUDENT_NAME__c': '',
            'PARENT__c': '',
            'EMIRATES_ID__c': '',
            'Start_Date__c': '',
            'End_Date__c': '',
            'Is_Checked__c': false
        });
        this.studentList = [...this.studentList];
    }

    validateAccountList() {
        let isValid = true;
        let studentList = JSON.parse(JSON.stringify(this.studentList));
        studentList.forEach((student, i) => {
            if (!student.STUDENT_NAME__c || !student.Is_Checked__c) {
                isValid = false;
                alert('School Name and IsActive checkbox cannot be blank on row number ' + (i + 1));
            }
        });
        return isValid;
    }

    saveAccountList1() {
        const isChecked = this.template.querySelector('[data-id="checkbox"]').checked;
        if (!isChecked) {
            // Display a message to the user
            const toastEvent = new ShowToastEvent({
                title: 'Error',
                message: 'Please check the box to save the data.',
                variant: 'error',
            });
            this.dispatchEvent(toastEvent);
            return;
        }
        // Save the data here
    }

    saveAccountList() {
        console.log('Inside SaveAccountList..');
        let action = component.get('c.saveStudents');
        let listData = JSON.stringify(this.studentList);
        console.log('listData ', listData);
        action.setParams({
            stList: listData
        });
        action.setCallback(this, (response) => {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let scid = response.getReturnValue();
                this.studentList = [];
                this.studentList = scid;
                //window.open("/" + scid);
                //alert('vehcile reg records saved successfully');
                const toastEvent = new ShowToastEvent({
                    title: 'Success',
                    message: 'Record has been saved successfully.',
                    duration: '5000',
                    key: 'info_alt',
                    variant: 'success',
                    mode: 'pester'
                });
                this.dispatchEvent(toastEvent);
            } else if (state === 'INCOMPLETE') {
                alert('Incomplete Action');
            } else if (state === 'ERROR') {
                let errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                        alert('errors[0].message : ' + errors[0].message);
                    }
                } else {
                    alert('Unknown error');
                }
            }
            this.dispatchEvent(new CustomEvent('close'));
            this.dispatchEvent(new CustomEvent('refresh'));
        });
        this.dispatchEvent(action);
    }
}