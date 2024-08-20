import { BASEURL } from "./baseurl";
import { commonRequest } from "./commonStructure";

export const getWidgets=async()=>{
  return await commonRequest('GET',`${BASEURL}/categories`)
}
export const getWidgetsCategory=async(cat)=>{
  return await commonRequest('GET',`${BASEURL}/categories/?category=${cat}`)
}