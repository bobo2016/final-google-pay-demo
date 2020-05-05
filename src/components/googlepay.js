import {config, methodData, paymentOptions, paymentDetails, shippingOptions} from '../api/config'
import log from '../api/util';


//Use Promise.All to wrap all the promise

function createAndAddBtn(){
    const $btn = document.createElement('BUTTON');
    $btn.id = 'google-pay-btn';
    $btn.classList.add('button-google-pay');

    const $googlepayCtnr = document.getElementById('google-pay-ctnr');
    $googlepayCtnr.appendChild($btn);
}


async function attachBtnToCart(request){
    let canMakePaymentPromise = Promise.resolve(true);
    let result;

    try{
        if(request.canMakePayment){
            canMakePaymentPromise = request.canMakePayment();
            result = await canMakePaymentPromise;
            log(result);

            if(!result) return;

            createAndAddBtn();

            document.getElementById('google-pay-btn')
                    .addEventListener('click',onBuyClicked);  
        } 
    }catch(e){
        log('Error:' + e);
    }
}


async function onBuyClicked(){
    const request  = createPaymentRequest(methodData, paymentDetails, paymentOptions);
    //request.addEventListener('shippingaddresschange',onShippingAddressChange);
    request.addEventListener('shippingoptionchange',onShippingOptionChange);

    try{
        const response = await request.show();

        //Need to add a callback to complete this UI dialog
        response.complete('success');
        handlePaymentResponse(response);

    }catch(err){
        log('Show Error' + err.name + ' Error:' + err.message);
    }
    
}

function handlePaymentResponse(response){
    log('handle payment response');
    log(response);
}


function createPaymentRequest(methodData, paymentDetails,paymentOptions){

    if(!methodData) return;

    if(!paymentDetails) return;

    if(!paymentOptions) return;

    log(methodData);

    return new PaymentRequest(methodData, paymentDetails,paymentOptions)
}

function onShippingAddressChange(e){
    const request = e.target;
    log('on shipping address change');
    log(request.shippingAddress);

    event.updateWith({
        total: {
            label: 'Total',
            amount: {
                currency: 'USD',
                value: '0'
            }
        },
        shippingOption: shippingOptions
    })
}


function onShippingOptionChange(e){
    const request = e.target;
    log('shipping option change');

    const selectedId = request.shippingOption;

    shippingOptions.map((option)=>{
        option.selected = option.id === selectedId
        log(option.selected);
    })

    e.updateWith({
        total: {
            label: 'Total',
            amount: {
                currency: 'USD',
                value: '111111'
            }
        },
        shippingOptions: shippingOptions
    })
}


function initGooglePay() {
    if(window.PaymentRequest){
        const request  = createPaymentRequest(methodData, paymentDetails, paymentOptions);
        log(request);
        
        attachBtnToCart(request);
        
    }else{
        log('PaymentRequest API is not avaiable')
    }
}






export default initGooglePay