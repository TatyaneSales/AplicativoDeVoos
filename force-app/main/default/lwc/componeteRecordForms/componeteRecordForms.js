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


export default class ComponentedeVoos extends LightningElement {
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
           
    handleClick(event){ 
                getLatitude({iata: this.value}).then(result => {
                    this.lat1 = result;
                });
        
                getLatitude({iata: this.value2}).then(result => {
                    this.lat2 = result;
                });
        
                getLongitude({iata: this.value}).then(result => {
                    this.long1 = result;
                });
        
                getLongitude({iata: this.value2}).then(result => {
                    this.long2 = result;
                });
        
                calculateDistance({latitude1: this.lat1, longitude1: this.long1, 
                                   latitude2: this.lat2, longitude2: this.long2})
                    .then(result => {
                        this.distancia = result;
                    });
        
                this.clickedButtonLabel = event.target.value;  
    }
}
