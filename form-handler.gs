// Google Apps Script — Arveo Form Handler
// Déployer en tant que Web App (Anyone, Execute as me)
// L'URL du déploiement va dans le formulaire HTML

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    // Envoyer email
    MailApp.sendEmail({
      to: "theodore.marescaux@gmail.com",
      subject: "🎯 Nouvelle demande ACRS — " + data.url,
      htmlBody: "<h2>Nouvelle demande d'audit Arveo</h2>" +
                "<p><strong>URL:</strong> " + data.url + "</p>" +
                "<p><strong>Email:</strong> " + data.email + "</p>" +
                "<p><strong>Date:</strong> " + new Date().toISOString() + "</p>" +
                "<hr><p>— Arveo ACRS</p>"
    });
    
    // Logger dans un spreadsheet (optionnel)
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss) {
      var sheet = ss.getActiveSheet();
      sheet.appendRow([new Date(), data.url, data.email]);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
