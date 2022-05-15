export async function sendNotification(to, title, body) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "key=");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "registration_ids": to,
        "notification": {
            "title": title,
            "body": body
        },
        "android": {
            "notification": {
                "icon": "stock_ticker_update",
                "color": "#7e55c3"
            }
        }
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}