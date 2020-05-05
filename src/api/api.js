const axios = require('axios');

export async function getDeliveryMethod(){
    const response = await axios.get('http://localhost:3000/delivery');

    return response;
}


async function getPaymentDetails(){

}


async function getTax(){

}


async function getSubtotal(){

}


