/**
 * Engine api
 * Engine APIs
 *
 * OpenAPI spec version: 1.0.2
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */import { Event } from './event';
import { MetaAnprEvent } from './metaAnprEvent';


export interface AnprEvent extends Event { 
    metaAnprEvent?: MetaAnprEvent;
}