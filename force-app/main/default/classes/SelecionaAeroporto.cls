public with sharing class SelecionaAeroporto {
    
    
    @AuraEnabled(cacheable=true)
    public static List<ObjAeroporto__c> getIATA(){
        List <ObjAeroporto__c> aeroporto = new List<ObjAeroporto__c>([SELECT Aeroporto__c, IATA__c from ObjAeroporto__c]);
        return aeroporto;
 }    
    @AuraEnabled(cacheable=true)
    public static List<ObjAeroporto__c> latitude (String iata){
        List <ObjAeroporto__c> latitude = new List<ObjAeroporto__c>([SELECT Latitude__c from ObjAeroporto__c WHERE IATA__c =: iata]);
        return latitude;
} 

    @AuraEnabled(cacheable=true)
    public static List<ObjAeroporto__c> longitude (String iata){
        List <ObjAeroporto__c> longitude = new List<ObjAeroporto__c>([SELECT Longitude__c from ObjAeroporto__c WHERE IATA__c =: iata]);
        return longitude;
} 
}