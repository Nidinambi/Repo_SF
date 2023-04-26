import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getStudents from '@salesforce/apex/fetch_Details.getStudents';

export default class FetchStudents extends NavigationMixin(LightningElement) {
    @api recordId;
    studentName = '';
  
    handleInputChange(event) {
      this.studentName = event.target.value;
    }
  
    handleSearchClick() {
      getStudents({ schoolId: this.recordId, studentName: this.studentName })
        .then(result => {
          this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
              componentName: 'c__StudentDetails'
            },
            state: {
              students: result
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }