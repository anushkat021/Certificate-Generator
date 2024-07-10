// script.js

document.getElementById('certificateForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var logoInput = document.getElementById('logo').files[0];
    var backgroundInput = document.getElementById('background').files[0];
    var companyName = document.getElementById('companyName').value;
    var recipientName = document.getElementById('recipientName').value;
    var eventName = document.getElementById('eventName').value;
    var date = document.getElementById('date').value;
    var message = document.getElementById('message').value;
    var margin = document.getElementById('margin').value;

    var readerLogo = new FileReader();
    var readerBackground = new FileReader();

    readerLogo.onload = function(event) {
        var logoURL = event.target.result;

        readerBackground.onload = function(event) {
            var backgroundURL = event.target.result;

            var certificateContent = `
                <div style="background-image: url('${backgroundURL}'); background-size: cover; padding: ${margin}px;">
                    <img src="${logoURL}" alt="Logo" class="logo">
                    <h2>${companyName}</h2>
                    <p>This is to certify that</p>
                    <h1>${recipientName}</h1>
                    <p>has successfully participated in</p>
                    <h3>${eventName}</h3>
                    <p>on</p>
                    <h3>${date}</h3>
                    <p>${message}</p>
                </div>
            `;

            document.getElementById('certificateContent').innerHTML = certificateContent;
            document.getElementById('certificateOutput').classList.remove('hidden');
            document.getElementById('downloadBtn').classList.remove('hidden');
        };
        readerBackground.readAsDataURL(backgroundInput);
    };
    readerLogo.readAsDataURL(logoInput);
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
