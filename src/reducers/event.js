import { EVENT_LIST, EVENT_LOGIN_LIST ,UPLOAD_ID_PROOF_LIST, DOWNLOAD_ID_PROOF_LIST, DELETE_ID_PROOF_LIST, ARRIVAL_TICKET, DEPARTURE_TICKET } from '../constants'
import {
    ARRIVAL_LIST, DEPARTURE_LIST, STAY_LIST, VIDEO_URL, USER_DETAIL, NOTIF_COUNT, GET_NOTIF, READ_NOTIF,
    GET_COMMENTS, POST_COMMENTS,GET_UNAPPROVED_COMMENTS,APPROVE_COMMENTS,AGENDA_LIST, USER_TOKEN,GET_FLAG_EXP_COR,GET_FLAG_CONTACT,SESSION_EXPIRED
} from "../constants/index";

const initialState = {
    // eventList: [],
    eventLoginList:{},
    arrivalList:[],
    departureList:[],
    stayList:[],
    uploadIdProofEvent:{},
    downloadIdProofEvent:[],
    deleteIdProofEvent:[],
    video:{},
    userDetail:{},
    notificationCount: {},
    allNotifications: {},
    arrivalTicket:{},
    departureTicket: {},
    commentList:[],
    unapprovedCommentList:[],
    agendaList:{},
    userToken:{},
    statics:'',
    staticsContact:'',
    isLogged:true
};

export function event (state = initialState, action) {
    switch (action.type) {
        case SESSION_EXPIRED: {
            let isLogged = action.payload;
            return Object.assign({}, state,{isLogged});
        }
        case EVENT_LOGIN_LIST: {
            let eventLoginList = action.payload;
            return Object.assign({}, state, eventLoginList);
        }
        case ARRIVAL_LIST:{
            let arrivalList = action.payload;
            return Object.assign({}, state, {arrivalList});
        }
        case ARRIVAL_TICKET:{
            let arrivalTicket = action.payload;
            return Object.assign({}, state, {arrivalTicket});
        }
        case DEPARTURE_LIST: {
            let departureList = action.payload;
            return Object.assign({}, state, {departureList});
        }
        case DEPARTURE_TICKET:{
            let departureTicket = action.payload;
            return Object.assign({}, state, {departureTicket});
        }
        case STAY_LIST:{
            let stayList = action.payload;
            return Object.assign({},state,{stayList})
        }
        case VIDEO_URL:{
            let video = action.payload;
            return Object.assign({},state,{video})
        }
        case USER_DETAIL:{
            let userDetail = action.payload;
            return Object.assign({}, state, {userDetail});
        }
        case NOTIF_COUNT:{
            let notificationCount = action.payload;
            return Object.assign({}, state, {notificationCount});
        }
        case GET_NOTIF: {
            let allNotifications = action.payload;
            return Object.assign({}, state, {allNotifications});
        }
        case READ_NOTIF: {
            let notificationCount = {count: 0};
            return Object.assign({}, state, {notificationCount});
        }
        case UPLOAD_ID_PROOF_LIST: {
            let uploadIdProofEvent = action.payload;
            return Object.assign({}, state, uploadIdProofEvent);
        }
        case DOWNLOAD_ID_PROOF_LIST: {
            let downloadIdProofEvent = action.payload;
            return Object.assign({}, state, {downloadIdProofEvent});
        }
        case DELETE_ID_PROOF_LIST: {
            let downloadIdProofEvent = [];
            return Object.assign({},state,{downloadIdProofEvent});
        }
        case GET_COMMENTS: {
            let commentList = action.payload;
            return Object.assign({},state,{commentList})
        }
        case POST_COMMENTS: {
            let commentList = JSON.parse(JSON.stringify(state.commentList));
            commentList.unshift(action.payload);
            return Object.assign({},state,{commentList});
        }
        case GET_UNAPPROVED_COMMENTS : {
            let unapprovedCommentList = action.payload;
            return Object.assign({},state,{unapprovedCommentList})
        }
        case APPROVE_COMMENTS : {
            let unapprovedCommentList = JSON.parse(JSON.stringify(state.unapprovedCommentList));
            return Object.assign({},state,{unapprovedCommentList});
        }
        case AGENDA_LIST:{
            let agendaList = action.payload;
            return Object.assign({}, state, {agendaList});
        }
        case USER_TOKEN: {
            let userToken = action.payload;
            return Object.assign({}, state, {userToken});
        }
        case GET_FLAG_EXP_COR:{
            let statics = action.payload[0];
            return Object.assign({},state,{statics});
        }
        case GET_FLAG_CONTACT:{
            let staticsContact = action.payload[0];
            return Object.assign({},state,{staticsContact})
        }
        default:
            return state;
    }
}