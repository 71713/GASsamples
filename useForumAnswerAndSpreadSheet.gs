function onFormSubmit(e){
  var nowDate = new Date();
  var id = uuid();
  var mySheet=SpreadsheetApp.openById('/* URLにあるながいid */'); 

  Logger.log("わーい");

  var itemResponses = e.response.getItemResponses();
  var username = itemResponses[0].getResponse();
  var iOSList=[];
  var androidList=[];
  var otherList=[];

  var listSheet = mySheet.getSheetByName('AllList');  
  
  for (var i = 1; i < itemResponses.length; i++) {
    var item = itemResponses[i].getResponse();
    switch (true) {
      case item >= 'iOS':
        iOSList = item.toString().split(",");
        for (var j = 0; j < iOSList.length; j++) {
          var num = findRow(listSheet,iOSList[j],1);
          listSheet.getRange(num, 2).setValue(username);
          listSheet.getRange(num, 3).setValue(id);
        }
        break
      case item >= 'Android':
        androidList = item.toString().split(",");
        for (var j = 0; j < androidList.length; j++) {
          var num = findRow(listSheet,androidList[j],1);
          listSheet.getRange(num, 2).setValue(username);
          listSheet.getRange(num, 3).setValue(id);
        }
        break
      case item >= 'Other':
        otherList = item.toString().split(",");
        for (var j = 0; j < otherList.length; j++) {
          var num = findRow(listSheet,otherList[j],1);
          listSheet.getRange(num, 2).setValue(username);
          listSheet.getRange(num, 3).setValue(id);
        }
        break
      default:
        break
    }
  }  
 
  var logsheet = mySheet.getSheetByName('out-log');  
  logsheet.appendRow(
    [
      nowDate,
      id,
      username,
      iOSList.toString(),
      androidList.toString(),
      otherList.toString()
    ]
  );
  
}

function findRow(sheet,val,col){
  var lastRow=sheet.getDataRange().getLastRow();
  for(var i=1;i<=lastRow;i++){
    if(sheet.getRange(i,col).getValue() === val){
      return i;
    }
  }
  return 0;
}

function uuid() {
  var uuid = "", i, random;
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;

    if (i == 8 || i == 12 || i == 16 || i == 20) {
      uuid += "-"
    }
    uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}
