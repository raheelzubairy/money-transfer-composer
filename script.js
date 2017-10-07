/**
* Sample transaction processor function.
* @param {org.acme.sample.transfermoney} transfermoney The sample transaction instance.
* @transaction
*/
function transfermoney(transfermoney){
   if(transfermoney.from.balance < transfermoney.amount) {
      throw new Error('insufficient funds');
   }
   transfermoney.from.balance -= transfermoney.amount;
   transfermoney.to.balance += transfermoney.amount;
   return getAssetRegistry('org.acme.sample.account')
   .then(function (assetRegistry){
             return assetRegistry.update(transfermoney.from);
   })
         .then(function (){
             return getAssetRegistry('org.acme.sample.account');
    })                 
      .then(function (assetRegistry){
             return assetRegistry.update(transfermoney.to);
    })                 
  }          
  