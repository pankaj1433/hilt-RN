import {getEventList, postEventList,getArrivalList,getDepartureList,getStayList,getVideoUrl,uploadIdProofEventList,getdownloadIdProofEventList, deletedownloadIdProofEventList, postNotificationToken, getNotifCount, getAllNotif, readAllNotif, deleteNotif, getArrivalTicketList, getDepartureTicektList, getAllComments, postComm, getAllUnapprovedComments, approveComm,getAgendaList, getExperienceCornerFlag, sendNotificationMail,getEmergencyContactFlag} from '../service/APIservice';
import { EVENT_LIST, EVENT_LOGIN_LIST,ARRIVAL_LIST,DEPARTURE_LIST,STAY_LIST,VIDEO_URL ,USER_DETAIL,UPLOAD_ID_PROOF_LIST, DOWNLOAD_ID_PROOF_LIST, DELETE_ID_PROOF_LIST, NOTIFICATION_TOKEN, NOTIF_COUNT, GET_NOTIF, READ_NOTIF, DELETE_NOTIF , ARRIVAL_TICKET, DEPARTURE_TICKET,GET_COMMENTS,POST_COMMENTS,GET_UNAPPROVED_COMMENTS,APPROVE_COMMENTS,AGENDA_LIST,USER_TOKEN,GET_FLAG_EXP_COR,GET_FLAG_CONTACT,ASSISTANCE_NOTIF,SESSION_EXPIRED} from '../constants'

export function setSession() {
    return function (dispatch) {
        dispatch({
            type:SESSION_EXPIRED,
            payload:true
        })
    }
}

export function getEvent() {
  return function (dispatch) {
    return getEventList(dispatch).then(function (response) {
      dispatch({
        type: EVENT_LIST,
        payload: response
      });
      return response;
    });
  };
}

export function postEvent(empLoginInfo) {
    return function (dispatch) {
        return postEventList(dispatch,empLoginInfo).then(function (response) {
            dispatch({
                type: EVENT_LOGIN_LIST,
                payload: response
            });
            return response;
        }, function(err){
          console.log(' error', err)
        }).catch(function(err){
          console.log('catch error', err)
        });
    };
}

export function getArrivals(data) {
    return function (dispatch) {
        return getArrivalList(dispatch,data).then(function (response) {
            dispatch({
                type: ARRIVAL_LIST,
                payload: response
            });
            return response;
        });
    };
}

export function getArrivalTicket() {
    return function (dispatch) {
        return getArrivalTicketList(dispatch).then(function (response) {
            dispatch({
                type: ARRIVAL_TICKET,
                payload: response
            })
            return response;
        });
    };
}

export function getStay(data) {
    return function (dispatch) {
        return getStayList(dispatch,data).then(function (response) {
            dispatch({
                type: STAY_LIST,
                payload: response
            });
            return response;
        })
    }
}

export function getDepartures(data) {
    return function (dispatch) {
        return getDepartureList(dispatch,data).then(function (response) {
            dispatch({
                type: DEPARTURE_LIST,
                payload: response
            });
            return response;
        });
    };
}

export function getDepartureTicket() {
    return function (dispatch) {
        return getDepartureTicektList(dispatch).then(function (response) {
            dispatch({
                type: DEPARTURE_TICKET,
                payload: response
            });
            return response;
        });
    };
}

export function getVideo() {
    return function (dispatch) {
        return getVideoUrl(dispatch).then(function (response) {
            dispatch({
                type: VIDEO_URL,
                payload: response
            });
            return response;
        });
    };
}

export function setUserDetail(userInfo) {
    return function (dispatch) {
        dispatch({
            type:USER_DETAIL,
            payload:userInfo
        });
        return;
    }

}

export function uploadIdProofEvent(uploadObj) {
    return function (dispatch) {
        return uploadIdProofEventList(dispatch,uploadObj).then(function (response) {
            dispatch({
                type: UPLOAD_ID_PROOF_LIST,
                payload: response
            });
            return response;
        }, function(err){
            console.log(' error', err)
        }).catch(function(err){
            console.log('catch error', err)
        });
    };
}


export function getdownloadIdProofEvent(data) {
    return function (dispatch) {
        return getdownloadIdProofEventList(dispatch,data).then(function (response) {
            dispatch({
                type: DOWNLOAD_ID_PROOF_LIST,
                payload: response
            });
            return response;
        });
    };
}

export function deletedownloadIdProofEvent(data) {
    return function (dispatch) {
        return deletedownloadIdProofEventList(dispatch,data).then(function (response) {
            dispatch({
                type: DELETE_ID_PROOF_LIST,
                payload: response
            });
            return response;
        });
    };
}
export function postUserNotificationToken (data) {
    return function (dispatch) {
        return postNotificationToken(dispatch,data).then(function (response) {
            dispatch({
                type: NOTIFICATION_TOKEN,
                payload: response
            });
            return response;
        }, function(err){
          console.log('notification error', err)
        }).catch(function(err){
          console.log('notification catch error', err)
        })
    }
}
export function getNotificationCount(data) {
    return function (dispatch) {
        return getNotifCount(dispatch,data).then(function (response) {
            dispatch({
                type: NOTIF_COUNT,
                payload: response
            });
            return response;
        });
    };
}
export function getAllNotification(data) {
    return function (dispatch) {
        return getAllNotif(dispatch,data).then(function (response) {
            dispatch({
                type: GET_NOTIF,
                payload: response
            });
            return response;
        });
    };
}
export function readAllNotification(data) {
    return function (dispatch) {
        return readAllNotif(dispatch,data).then(function (response) {
            dispatch({
                type: READ_NOTIF,
                payload: response
            });
            return response;
        });
    };
}

export function getComments() {
    return function (dispatch) {
        return getAllComments(dispatch).then(function (response) {
            dispatch({
                type: GET_COMMENTS,
                payload: response
            });
            return response;
        })
    }
}

export function postComment(data) {
    return function (dispatch) {
        return postComm(dispatch,data).then(function (response) {
            dispatch({
                type: POST_COMMENTS,
                payload: response
            });
            return response;
        })
    }
}

export function deleteNotification (data) {
    return function (dispatch) {
        return deleteNotif(dispatch,data).then(function (response) {
            dispatch({
                type: DELETE_NOTIF,
                payload: response
            });
            return response;
        }, function(err){
          console.log('notification error', err)
        }).catch(function(err){
          console.log('notification catch error', err)
        })
    }
}
export function getUnapprovedComments() {
    return function (dispatch) {
        return getAllUnapprovedComments(dispatch).then(function (response) {
            dispatch({
                type: GET_UNAPPROVED_COMMENTS,
                payload: response
            });
            return response;
        })
    }
}

export function approveComment(data) {
    return function (dispatch) {
        return approveComm(dispatch,data).then(function (response) {
            dispatch({
                type: APPROVE_COMMENTS,
                payload: response
            });
            return response;
        })
    }

}

export function getAgendaData(data) {
    return function (dispatch) {
        return getAgendaList(dispatch,data).then(function (response) {
            dispatch({
                type: AGENDA_LIST,
                payload: response
            });
            return response;
        });
    };
}

export function setToken(userToken) {
    return function (dispatch) {
        dispatch({
            type:USER_TOKEN,
            payload:userToken
        });
        return;
    }
}

export function getFlag(data) {
    return function (dispatch) {
        if(data === 'experienceCorner'){
            return getExperienceCornerFlag(dispatch).then(function (response) {
                dispatch({
                    type: GET_FLAG_EXP_COR,
                    payload: response
                });
                return response;
            });
        }else{
            return getEmergencyContactFlag(dispatch).then(function (response) {
                dispatch({
                    type: GET_FLAG_CONTACT,
                    payload: response
                });
                return response;
            })
        }
    };
}

export function sendNotif(data) {
    return function (dispatch) {
        return sendNotificationMail(dispatch,data).then(function (response) {
            dispatch({
                type: ASSISTANCE_NOTIF,
                payload: response
            });
            return response;
        });
    };
}