import '../styles/index.scss';
import PrintDeliveryMethod from '../components/googlemerchant';
import initGooglePay from '../components/googlepay';
import {initMerchant} from '../components/googlemerchant';

console.log('webpack starterkit');


const main = async () => {
    console.log("Main function");
    //PrintDeliveryMethod();
    initMerchant();
    initGooglePay();
};


main().then(()=>{
    console.log("have fun after Main got resolved");
});
