import API from '../env'
const API_BASE = API.ENDPOINT.BASE;
import { asyncGet,asyncRemove } from '../utils/asyncStore'
import store from '../store/configureStore'
import { NavigationActions } from "react-navigation";
import { SESSION_EXPIRED } from '../constants'

async function requestAPI(url, options = {},dispatch) {

      let headers = options.headers||{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      };

    const unsubscribe = store.subscribe(() => store.getState())
    let token = store.getState().event.userToken.token ? 
            store.getState().event.userToken.token:
            await asyncGet('token');
    if(token){
        headers.Authorization = `Bearer ${token}`
    }

    let reqBody = {
      method: options.method || "POST",
      headers: headers
    };

    if(options.method.toLowerCase() !== 'get') {
        if(options.headers){
            reqBody['body'] = options.payload
        }
        else{
            reqBody['body'] = JSON.stringify(options.payload || {})
        }

    }
    console.log('url: ', url);
    console.log('req Body: ', reqBody);
    return fetch(url, reqBody)
    .then(function(resp){
        if(resp.status===401){
            asyncRemove('token');
            asyncRemove('userDetail');
            store.dispatch({
                type: SESSION_EXPIRED,
                payload: false
            })
        }else{
            return resp.json();
        }
    })
    .catch(function(err){
        console.log('Error:', err);
    })
}

export function getEventList(dispatch,option={}){
  let { url , method } = API.ENDPOINT.AUTH.LOGIN;
  let URL = `${API_BASE + url}`;
  option.method = method;
  return requestAPI(URL, option,dispatch)
}

export function postEventList(dispatch,option={}){
    let { url , method } = API.ENDPOINT.AUTH.AUTH_LOGIN;
    let URL = `${API_BASE + url}`;
    option.method = method;
    return requestAPI(URL, option,dispatch);
}

export function getArrivalList(dispatch,option={}) {
    let { url , method } = API.ENDPOINT.ARRIVAL.DETAIL;
    let URL = `${API_BASE + url + option.param}`;
    option.method = method;
    return requestAPI(URL, option,dispatch)
}

export function getArrivalTicketList(dispatch,option={}) {
    let { url , method } = API.ENDPOINT.ARRIVAL.TICKET;
    let URL = `${API_BASE + url}`;
    option.method = method;
    return requestAPI(URL, option,dispatch)
}

export function getDepartureList(dispatch,option={}) {
    let { url , method } = API.ENDPOINT.DEPARTURE.DETAIL;
    let URL = `${API_BASE + url + option.param}`;
    option.method = method;
    return requestAPI(URL, option,dispatch)
}

export function getDepartureTicektList(dispatch,option={}) {
    let { url , method } = API.ENDPOINT.DEPARTURE.TICKET;
    let URL = `${API_BASE + url}`;
    option.method = method;
    return requestAPI(URL, option,dispatch)
}

export function getStayList(dispatch,option={}) {
    let { url , method } = API.ENDPOINT.STAY.DETAIL;
    let URL = `${API_BASE + url + option.param}`;
    option.method = method;
    return requestAPI(URL, option,dispatch)
}

export function getVideoUrl(dispatch,option={}) {
    let { url , method } = API.ENDPOINT.VIDEO.DETAIL;
    let URL = `${API_BASE + url}`;
    option.method = method;
    return requestAPI(URL, option,dispatch)
}

export function uploadIdProofEventList(dispatch,option={}){
    let { url , method } = API.ENDPOINT.USER.UPLOAD_ID_PROOF;
    let URL = `${API_BASE + url}`;
    option.method = method;
    return requestAPI(URL, option,dispatch);
}

export function postNotificationToken(dispatch,option={}){
    let { url , method } = API.ENDPOINT.NOTIFICATION.POST_TOKEN;
    let URL = `${API_BASE + url +option.params}`;
    option.method = method;
    return requestAPI(URL, option,dispatch);
}

export function getdownloadIdProofEventList(dispatch,option={}) {
    let { url , method } = API.ENDPOINT.USER.DOWNLOAD_ID_PROOF;
    let URL = `${API_BASE + url+ option.param}`;
    option.method = method;
    return requestAPI(URL, option,dispatch)
}

export function deletedownloadIdProofEventList(dispatch,option={}) {
    let { url , method } = API.ENDPOINT.USER.DELETE_ID_PROOF;
    let URL = `${API_BASE + url+ option.param}`;
    option.method = method;
    return requestAPI(URL, option,dispatch)
}


export function getNotifCount(dispatch,option={}) {
    let { url , method } = API.ENDPOINT.NOTIFICATION.NOTIFICATION_COUNT;
    let URL = `${API_BASE + url}`;
    option.method = method;
    return requestAPI(URL, option,dispatch)
}

export function getAllNotif(dispatch,option={}) {
    let { url , method } = API.ENDPOINT.NOTIFICATION.GET_NOTIFICATION;
    let URL = `${API_BASE + url}`;
    option.method = method;
    return requestAPI(URL, option,dispatch)
}

export function readAllNotif(dispatch,option={}) {
    let { url , method } = API.ENDPOINT.NOTIFICATION.READ_NOTIFICATION;
    let URL = `${API_BASE + url}`;
    option.method = method;
    return requestAPI(URL, option ,dispatch)
}

export function deleteNotif(dispatch,option={}) {
    let { url , method } = API.ENDPOINT.NOTIFICATION.DELETE_NOTIFICATION;
    let URL = `${API_BASE + url +option.params}`;
    option.method = method;
    return requestAPI(URL, option,dispatch)
}

export function getAllComments(dispatch,option={}) {
    let { url,method } = API.ENDPOINT.COMMENTS.GET_COMMENTS;
    let URL = `${API_BASE + url}`;
    option.method = method;
    return requestAPI(URL,option,dispatch)
}

export function postComm(dispatch,option={}) {
    let { url , method } = API.ENDPOINT.COMMENTS.POST_COMMENTS;
    let URL = `${API_BASE + url }`;
    option.method = method;
    return requestAPI(URL, option,dispatch);
}

export function getAllUnapprovedComments(dispatch,option={}) {
    let { url,method } = API.ENDPOINT.COMMENTS.GET_UNAPPROVED_COMMENTS;
    let URL = `${API_BASE + url}`;
    option.method = method;
    return requestAPI(URL,option,dispatch)
}

export function approveComm(dispatch,option={}) {
    let { url,method } = API.ENDPOINT.COMMENTS.APPROVED_COMMENTS;
    let URL = `${API_BASE + url}`;
    option.method = method;
    return requestAPI(URL,option,dispatch)
}

export function getAgendaList(dispatch,option={}) {
    let { url , method } = API.ENDPOINT.AGENDA.DETAIL;
    let URL = `${API_BASE + url + option.param+'/'+option.day}`;
    option.method = method;
    return requestAPI(URL, option,dispatch)
}

export function getExperienceCornerFlag(dispatch,option={}) {
    let { url , method } = API.ENDPOINT.EXPERIENCE_CORNER.DETAIL;
    let URL = `${API_BASE + url}`;
    option.method = method;
    return requestAPI(URL,option,dispatch)
}

export function sendNotificationMail(dispatch,option={}) {
    let { url , method } = API.ENDPOINT.MAIL_NOTIF.DETAIL;
    let URL = `${API_BASE + url}`;
    option.method = method;
    return requestAPI(URL,option,dispatch)
}

export function getEmergencyContactFlag(dispatch,option={}) {
    let { url , method } = API.ENDPOINT.EMERGENCY_CONTACT.DETAIL;
    let URL = `${API_BASE + url}`;
    option.method = method;
    return requestAPI(URL,option,dispatch)
}