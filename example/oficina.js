var https = require('http');
const FindCookie = require('FindCookie');

const UseApi = {
    api(params, body) {
        return new Promise((resolve) => { 
            const callbackApi = function (res) {
                    let data = '';
                    res.setEncoding('utf8');
                    res.on('data', function (chunk) {
                        data += chunk;
                    });
                    res.on('end', function () {
                        resolve({status: res.statusCode, data: data});
                    });
                    res.on('error', function (err) {
                        throw new Error("Error: API Call: " + err);
                    });
                };
                const req = https.request(params, callbackApi)
                if (body) {
                    req.write(body);
                }
                req.end();
            });
    }
};
​// VARIÁVEIS DE AMBIENTE
const HOST_MAGENTO = process.env.HOST_MAGENTO;
const HOST_MS_CRYPTO = process.env.HOST_MS_CRYPTO;
​
const URI_CARTS_MINE = '/rest/V1/carts/mine?fields=id';
const URI_CUSTOMERS_ME = '/rest/V1/customers/me?fields=id,firstname';
​
const URI_MS_CRYPTO = '/crypto';
​
const Handler = function (event, context, callback) {
    
    // setar o valor do origin no response header access-control-allow-origin
    const ORIGIN = event.headers['origin'] ? event.headers['origin'] : event.headers['Origin'];
    
    var customerToken = '';
    var statusCode = 500;
    var responseMagento = {};
    //console.log('###### headers - '+ JSON.stringify(event.headers));
    var customer_token_from_cookie = FindCookie.GetCustomerToken(event.headers['Cookie']);
    customer_token_from_cookie
    .then((data)=>{
        //console.log('#### data ##### ' + data);
        if (!data) {
            statusCode = 403;
            throw new Error("Cliente não autorizado");
        }
​
        //DECRYPT DO CUSTOMER TOKEN
        var payload = { 'type': 'decrypt', 'data': data };
        var params = {
            host: HOST_MS_CRYPTO,
            path: URI_MS_CRYPTO,
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Content-Length': Buffer.byteLength(JSON.stringify(payload))
            }
        };
​
        return UseApi.api(params, JSON.stringify(payload));
    })
    .then((c) => {
        //console.log(JSON.stringify(c));
        if (c.status != 200) {
            throw new Error ("Decrypt failed!" + c.data);
        }
        customerToken = JSON.parse(c.data)['data'];
        
        statusCode = 500;
        responseMagento.message = "Api Generic Error";
        
        var params = {
            host: HOST_MAGENTO,
            path: URI_CUSTOMERS_ME,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + customerToken,
                "Content-Type": "application/json"
            }
        };
        
        return UseApi.api(params);
    })
    .then((searchCustomer) => {
        if (searchCustomer.status != 200) {
            statusCode = searchCustomer.status;
            responseMagento.message = "Cliente não encontrado";
            throw new Error(responseMagento.message);
        }
        statusCode = searchCustomer.status;
        responseMagento.message = "Cliente encontrado";
        const customer = JSON.parse(searchCustomer.data);
​
        responseMagento.data = {
            id: customer.id,
            firstname: customer.firstname,
            quoteId: null
        };
​
        var params = {
            host: HOST_MAGENTO,
            path: URI_CARTS_MINE,
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + customerToken,
                "Content-Type": "application/json"
            }
        };
        return UseApi.api(params);
    })
    .then((searchCart) => {
        try {
            const getQuoteResponse = JSON.parse(searchCart.data);
            responseMagento.data['quoteId'] = getQuoteResponse.id;
        } catch (e) {
            console.log(' Cart mine return: ' + e.message);
        }
        
​
        let responseFunction = {
            "statusCode": statusCode,
            "isBase64Encoded": false,
            "body": JSON.stringify(responseMagento),
        	"headers": {
        		"Access-Control-Allow-Origin": ORIGIN,
        		"Access-Control-Allow-Credentials": "true",
        		"Access-Control-Allow-Headers": "x-api-key,x-app-token,Content-Type,X-Amz-Date,Authorization,X-Amz-Security-Token",
        		"Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        		"Content-Type": "application/json"
        	}
        };
        callback(null, responseFunction);
    })
    .catch((error)=>{
        const errorResponse = {
            "isBase64Encoded": false,
            "statusCode": statusCode,
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify({ message: error.message })
        }
        callback(null,errorResponse);
    });
​
}

const events = {
    "headers": {
        "origin": "localhost",
        "Cookie": ""
    }
}