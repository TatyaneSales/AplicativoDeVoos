import { LightningElement, track, wire, api} from 'lwc';
import getcode from '@salesforce/apex/SelecionaAeroporto.getIATA';
import calculateDistance from '@salesforce/apex/CalculaDistancia.calculateDistance';
import getLatitude from '@salesforce/apex/SelecionaAeroporto.latitude';
import getLongitude from '@salesforce/apex/SelecionaAeroporto.longitude';
import { getRecord} from "lightning/uiRecordApi";
import IATA_FIELD  from "@salesforce/schema/ObjAeroporto__c.IATA__c"
import LATITUDE_FIELD from "@salesforce/schema/ObjAeroporto__c.Latitude__c"
import LONGITUDE_FIELD  from "@salesforce/schema/ObjAeroporto__c.Longitude__c"
import AEROPORTO_FIELD from "@salesforce/schema/ObjAeroporto__c.Aeroporto__c"


//const colums = [
   //{label: 'Aeroporto', fieldName: 'Aeroporto__c'},
   //{label: 'Latitude', fieldName: 'Latitude__c'},
   //{label: 'Longitude', fieldName: 'Longitude__c'},
   //{label: 'IATA', fieldName: 'IATA__c'}
//]


export default class ComponentedeVoos extends LightningElement {
    colums;
    value = '';
    @track selecao=[];
    value2 = '';
    @track selecao2 =[];
    @track lat1= '';
    @track lat2= '';
    @track long1='';
    @track long2='';
    distancia= '';
    
    get options(){
        return this.selecao;
    }   

    get options2(){
        return this.selecao2;
    } 

    connectedCallback(){
        getcode().then(result =>{
            let arr=[];
            let arr2=[];
            for(var i=0; i<result.length; i++){
                arr.push({label: result[i].Aeroporto__c, value: result[i].IATA__c});
                arr2.push({label: result[i].Aeroporto__c, value: result[i].IATA__c})
            }
            this.selecao=arr;
            this.selecao2=arr2;
        });
    }
     
    handleChangeAeroporto1(event) {
        this.value = event.detail.value;
        }

    handleChangeAeroporto2(event) {
            this.value2 = event.detail.value;
            }  


   @api recordId;
    @wire(getLatitude, {iata: '$value'})
    lat1({data}){
        this.lat1 = data;
    }

    @wire(getLatitude, {iata: '$value2'})
    lat2({data}){
        this.lat2 = data;
    } 

    @wire(getLongitude, {iata: '$value'})
    long1({data}){
        this.long1 = data;
    }

    @wire(getLongitude, {iata: '$value2'})
    long2({data}){
        this.long2 = data;
    }

    @wire( calculateDistance, { latitude1: '$lat1', longitude1:'$long1', latitude2: '$lat2', longitude2: '$long2' })
    distancia({data}){
        this.distancia = data;
    }
    
    get campo() {
        const distanciaValue = this.distancia && this.distancia.data ? this.distancia.data : '';
        return distanciaValue;
    }
    
    handleClick(event) {
        this.distancia= event.detail.value; 
        this.clickedButtonLabel = event.target.value;
        }  
       
}

            

        
    
            
            
            