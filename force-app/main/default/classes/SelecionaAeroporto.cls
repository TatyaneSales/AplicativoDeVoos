public with sharing class SelecionaAeroporto {
    
    
    @AuraEnabled(cacheable=true)
    public static List<ObjAeroporto__c> getIATA(){
        List <ObjAeroporto__c> aeroporto = new List<ObjAeroporto__c>([SELECT Id, Aeroporto__c, IATA__c, Latitude__c, Longitude__c from ObjAeroporto__c]);
        return aeroporto;
    }    
    @AuraEnabled(cacheable=true)
    public static List<ObjAeroporto__c> latitude (String iata){
        return [SELECT Latitude__c from ObjAeroporto__c WHERE IATA__c =: iata];
    } 

    @AuraEnabled(cacheable=true)
    public static List<ObjAeroporto__c> longitude (String iata){
        return [SELECT Longitude__c from ObjAeroporto__c WHERE IATA__c =: iata];
    }
    @AuraEnabled (cacheable=true)
    public static List<ObjAeroporto__c> aeroporto (String iata){
            return [SELECT Aeroporto__c, Id from ObjAeroporto__c WHERE IATA__c =: iata];
    }
}