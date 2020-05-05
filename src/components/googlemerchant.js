import {getDeliveryMethod} from '../api/api';
import {shippingOptions, paymentDetails} from '../api/config'
import log from '../api/util';


/* 
 * This is to update all the Endpoint data to align with Google Pay API, 
 * also calculate and update all the product, price, tax
*/


async function updateDeliveryMethod(){
    const deliveryMethods = await getDeliveryMethod();
    let updatedShippingOptions;

    log('get into update delivery Method ');
    
    if(!deliveryMethods || !paymentDetails) return;

     //updatedShippingOptions = [...shippingOptions,...deliveryMethods.data];
    updatedShippingOptions = Object.assign([],shippingOptions, deliveryMethods.data);
    updatedShippingOptions[0].selected = true;

    paymentDetails["shippingOptions"] = updatedShippingOptions;
    
}



async function PrintDeliveryMethod(){
    console.log("i am in the print Delivery Method function1");
    const div = document.createElement('div');  
    const h1 = document.createElement('h1');
    const h1Text = document.createTextNode("Google pay Demo");

    div.className = 'main';

    h1.appendChild(h1Text);
    document.body.appendChild(div);
    div.appendChild(h1);

    const deliveryMethod = await getDeliveryMethod();
    const text = document.createTextNode(JSON.stringify(deliveryMethod));
    //console.log(deliveryMethod);
    const p = document.createElement('p');
    div.appendChild(p);
    p.appendChild(text);
    log("i am in the print Delivery Method function3");

}






function initMerchant(){
    updateDeliveryMethod()
}



export {
    PrintDeliveryMethod,
    initMerchant
};




