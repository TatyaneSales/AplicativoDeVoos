public with sharing class SalvarVoo {
   
     @AuraEnabled (cacheable=true)
    
     public static List<Lista_de_Voos__c> inserir (String aero1, String aero2, Decimal dist){
        List <Lista_de_Voos__c> lista1 = new List<Lista_de_Voos__c>();
        lista1.add(new Lista_de_Voos__c(Aeroporto_de_partida__c= aero1, 
        Aeroporto_de_chegada__c= aero2, Distancia_entre_voos__c= dist));
        insert lista1;
        return lista1;
    }
}