
const allowedCardNetworks = ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"];
const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];

const supportedTypes = [
    'credit',
    'debit',
    'prepaid'
];

const paymentOptions = {
    requestPayerEmail: true,
    requestPayerName: true,
    requestPayerPhone: true,
    requestShipping: true,
    shippingType: 'delivery'
};

const config = {
    debug: true, 
    namespace: '[GOOGLE PAY]',
    endpoint: {
        shipping: '',
        tax: '',
        session: ''
    },
    csrf: ''
};

const state = {
    init: false
};


//google pay request/session 
const session = {

}


function getGooglePaymentsConfiguration(){
    return{
        environment: 'TEST',
        apiVersion: 2,
        apiVersionMinor: 0,
        merchantInfo: {
          // A merchant ID is available after approval by Google.
          // 'merchantId':'01234567890123456789',
          merchantName: 'Example Merchant'
        },
        allowedPaymentMethods: [{
          type: 'CARD',
          parameters: {
            allowedAuthMethods: allowedCardAuthMethods,
            allowedCardNetworks: allowedCardNetworks
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            // Check with your payment gateway on the parameters to pass.
            // @see {@link https://developers.google.com/pay/api/web/reference/request-objects#gateway}
            parameters: {
              'gateway': 'cybersource',
              'gatewayMerchantId': '123456789'
            }
          }
        }]
    }
};



const methodData = [{
    supportedMethods: 'https://google.com/pay',
    data: getGooglePaymentsConfiguration()
}]

methodData.push(
{
    supportedMethods: 'basic-card',
    data: {
        supportedNetworks:
            Array.from(allowedCardNetworks, (network) => network.toLowerCase()),
        supportedTypes: supportedTypes
    }
})
        



//remove payement datails to Ajax call later

const shippingOptions = [
    {
        id: 'economy',
        selected: true,
        label: 'Standard Shipping(5-7 days)',
        amount:{
          currency: 'USD',
          value: '0'
        }
    },
    {
        id: 'express',
        label: 'Express(2-3 days)',
        amount:{
            currency: 'USD',
            value: '5'
        }
    },
    {
        id: 'overnight',
        label: 'Next Day delivery',
        amount:{
            currency: 'USD',
            value: '12'
        }
    }
]


const paymentDetails = {
    displayItems:[{
        label: 'Alpha 3 backpack',
        amount: {
          currency:'USD', 
          value: '12345'
        }
      },
      {
        label: 'Carry-on luggage',
        amount: {
          currency: 'USD',
          value: '321'
        }
      },
      {
        label: 'Subtal',
        amount: {
          currency: 'USD',
          value: '431'
        }
      },
      {
        label: 'Tax',
        pending: true,
        amount: {
          currency: 'USD',
          value: 0.75
        }
      }
      ],
      total: {
        label: 'Total', 
        amount: {currency: 'USD', value: '43212.00'}
      },

      shippingOptions: shippingOptions
 
}



export {
    methodData,
    paymentOptions,
    paymentDetails,
    shippingOptions,
    config
}