var nodemailer = require("nodemailer");
var connect = require('connect');
var akismet = require('akismet').client({ blog: 'http://gaya.ninja', apiKey: '7a03b4068f58' });

akismet.verifyKey(function(err, verified) {
    if (verified)
        console.log('API key successfully verified.');
    else
        console.log('Unable to verify API key.');
});

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "gaya.kessler@gmail.com",
        pass: "tfpfbbzpgczanmlr"
    }
});

var mailOptions = {
    from: "Gaya Kessler <hi@gaya.ninja>",
    to: "gaya.kessler@gmail.com",
    subject: "",
    text: "",
    html: ""
};

function sendMail(req) {
    var name = "Not found";
    if (typeof req.body.name != "undefined") {
        name = req.body.name;
    }

    var email = "unknown@what.com";
    if (typeof req.body.email != "undefined") {
        email = req.body.email;
    }

    var message = "Empty message";
    if (typeof req.body.message != "undefined") {
        message = req.body.message;
    }

    var subject = "New NinjaMail from " + name;
    var text = name + " (" + email + ")\n\r" + message;
    var html = "<p>" + name + " (" + email + ")</p><p>" + message + "</p>";

    mailOptions.subject = subject;
    mailOptions.text = text;
    mailOptions.html = html;

    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }
    });
};

function handleMailRequest (req, res, next) {
    if (req.method == 'POST') {
        akismet.checkSpam({
            user_ip: req.connection.remoteAddress,
            permalink: 'http://gaya.ninja',
            comment_author: (typeof req.body.name != "undefined" ? req.body.name : "" ),
            comment_content: (typeof req.body.message != "undefined" ? req.body.message : "" )
        }, function(err, spam) {
            if(spam) {
                console.log('Spam caught.');
            } else {
                console.log('No spam, sent mail.');
                sendMail(req);
            }
        });

        res.end(JSON.stringify({ send: true }));
    } else {
        res.end(JSON.stringify({ send: false }));
    }
}

connect().use(connect.bodyParser()).use(
    '/sendmail', handleMailRequest
).use(connect.static(__dirname)).listen(process.env.PORT || 5000);
