import {config} from './config'


function log(){
    let logger = console;
    if(!config.debug) return;

    //set Defined logger
    if(typeof config.logger !== 'undefined'){
        logger = config.logger;
    }
    
    Array.prototype.splice.call(arguments,0,0,config.namespace);
    logger.log.apply(logger,arguments);
    
}


export default log;