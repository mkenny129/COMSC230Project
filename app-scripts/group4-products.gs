//------------------- Write Products Data to Firestore ----------------

function writeProductsDataToFirebase() {
  var email = "** Paste email here **";
  var key = "** Paste private key here **";
  var projectId = "** Paste project id here **";
  var firestore = FirestoreApp.getFirestore(email, key, projectId);
  // var url = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  
  // Products
  // ProductID	ProductName	SupplierID	CategoryID	QuantityPerUnit	UnitPrice	UnitsInStock	UnitsOnOrder	ReorderLevel	Discontinued
  
  var sheetName = 'products';
  var url = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  var ss = SpreadsheetApp.openByUrl(url);
  var sheet = activateSheetByName(sheetName);
Logger.log(sheetName);
  
  var data = sheet.getDataRange().getValues();
  var dataToImport = {};
  
// Logger.log(data.length); // the number of rows in the sheet
  
  // Use this loop code if you want all rows in the sheet: 
  //   for(var i = 1; i < data.length; i++) {
  
for(var i = 1; i < 10; i++) { 
 var ProductID = data[i][0];
 var ProductName = data[i][1];
Logger.log(ProductID + '-' + ProductName);
 dataToImport[ProductID + '-' + ProductName] = {

   ProductID:data[i][0],
   ProductName:data[i][1],
   SupplierID:data[i][2],
   CategoryID:data[i][3],
   QuantityPerUnit:data[i][4],
   UnitPrice:data[i][5],
   UnitsInStock:data[i][6],
   UnitsOnOrder:data[i][7],
   ReorderLevel:data[i][8],
   Discontinued:data[i][9]
  
};

firestore.createDocument("Products/", dataToImport[ProductID + '-' + ProductName]);
// Logger.log(dataToImport);
}
}
