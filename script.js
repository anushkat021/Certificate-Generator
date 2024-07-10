document.getElementById('certificateForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    var logoInput = document.getElementById('logo').files[0];
    var companyName = document.getElementById('companyName').value;
    var recipientName = document.getElementById('recipientName').value;
    var eventName = document.getElementById('eventName').value;
    var date = document.getElementById('date').value;
    var message = document.getElementById('message').value;

    var reader = new FileReader();
    reader.onload = function(event) {
        var logoURL = event.target.result;
        var certificateContent = `
          <img src="${logoURL}" alt="Logo">
          <h2>${companyName}</h2>
          <p>This is to certify that</p>
          <h1>${recipientName}</h1>
          <p>has successfully participated in</p>
          <h3>${eventName}</h3>
          <p>on</p>
          <h3>${date}</h3>
          <p>${message}</p>
        `;
        
        document.getElementById('certificateContent').innerHTML = certificateContent;
        document.getElementById('certificateOutput').classList.remove('hidden');
        document.getElementById('downloadBtn').classList.remove('hidden');
    };
    reader.readAsDataURL(logoInput);
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    html2canvas(document.getElementById('certificateContent')).then(function(canvas) {
        var imgData = canvas.toDataURL('image/jpeg');
        var link = document.createElement('a');
        link.href = imgData;
        link.download = 'certificate.jpg';
        link.click();
    });
});