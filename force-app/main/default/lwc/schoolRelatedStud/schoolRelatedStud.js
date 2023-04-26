import { LightningElement, api } from 'lwc';

import { NavigationMixin } from 'lightning/navigation';

export default class SchoolRelatedStud extends NavigationMixin( LightningElement ){
    
    

@api recordId ;


ViewStudents() {



this[ NavigationMixin.Navigate ]( {

type: 'standard__recordRelationshipPage',

attributes: {

recordId: this.recordId,

objectApiName: 'ETST_School__c',

relationshipApiName: 'Students__r',
actionName: 'view'

}

} );

}

}