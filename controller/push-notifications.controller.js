var admin = require('firebase-admin');
var fcm = require('../lib/fcm.js');

var serviceAccount = require("../config/push-notification-key.json");
const certPath = admin.credential.cert(serviceAccount);
var FCM = new fcm(certPath);

exports.sendPushNotification = (req, res, next) => {
    try {
        let messages = {
            notification: {
                title: req.body.title,
                body: req.body.message
            },
            data: {
                orderId: "123456",
                orderDate: "2022-10-28"
            },
           
        };
        // Sử dụng phương thức sendToMultipleToken với mảng tokens
        FCM.sendToMultipleToken(messages, req.body.tokens, function(err, response) {
            if (err) {
                return res.status(500).send({
                    message: err
                });
            } else {
                return res.status(200).send({
                    status: 200,
                    message: "Gửi thông báo thành công"
                });
            }
        });
    } catch (err) {
        next(err);
    }
};
