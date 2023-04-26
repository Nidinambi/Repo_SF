import { LightningElement, wire} from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import Name from '@salesforce/schema/ETST_Student__c.Name';
import Parent from '@salesforce/schema/ETST_Student__c.ETST_Account_Name__c';
import Emirate from '@salesforce/schema/ETST_Student__c.ETST_Emirates_Id__c';
import School from '@salesforce/schema/ETST_Student__c.ETST_School__c';


export default class StudentDetail extends LightningElement {

    
    parentId;
    studentName;
    studentEid;
    
        @wire(getRecord, { recordId: '$parentId', fields: [School] })
        school;
    
        @wire(getRecord, { recordId: '$studentId', fields: [Name,Parent, Emirate] })
        student;
    
        handleParentStudentChange(event) {
            this.parentId= event.detail.value;
        }
    
        fetchStudentData() {
            this.studentId = getFieldValue(this.school.data, School);
        }
    
        get hasStudentData() {
          return this.student.data != null;
     
      }
}