let API = {
    ENDPOINT: {
        BASE: 'http://hilti.tothenew.net:8080',
        AUTH: {
            LOGIN: {url: '/api/user-details/me', method: 'GET'},
            AUTH_LOGIN: {url: '/auth/local', method: 'POST'}
        },
        ARRIVAL: {
            DETAIL: {url: `/api/arrivals/detail/`, method: 'GET'}, //get arrival details for code:88210
            TICKET: {url:'/api/arrivals/ticket/download',method: 'GET'}
        },
        DEPARTURE: {
            DETAIL: {url: `/api/departures/detail/`,method:'GET'}, //departure details for code:88210
            TICKET: {url: '/api/departures/ticket/download', method: 'GET'}
        },
        USER: {
            UPLOAD_ID_PROOF: {url:'/api/user-ids/upload',method: 'POST'},
            DOWNLOAD_ID_PROOF: {url:'/api/user-ids/', method: 'GET'},
            DELETE_ID_PROOF: {url:'/api/user-ids/delete/',method: 'GET'}
        },
        STAY: {
            DETAIL:{url: `/api/user-details/stay/`,method:'GET'} // get stay details for code 88210
        },
        VIDEO:{
            DETAIL:{url:`/api/documents/welcome-video`,method:'GET'} // get vide url
        },
        NOTIFICATION : {
            POST_TOKEN: {url: '/api/device-tokens/',method: 'PUT'},//set notification token for each user
            NOTIFICATION_COUNT: {url: '/api/notifications/unread',method: 'GET'},
            GET_NOTIFICATION: {url: '/api/notifications',method: 'GET'},
            READ_NOTIFICATION: {url: '/api/notifications/readall',method: 'GET'},
            DELETE_NOTIFICATION: {url: '/api/notifications/',method: 'DELETE'},
        },
        COMMENTS : {
            GET_COMMENTS: {url: '/api/comments',method: 'GET'},
            POST_COMMENTS: {url: '/api/comments',method: 'POST'},
            GET_UNAPPROVED_COMMENTS:{url:'/api/comments/unapproved',method:'GET'},
            APPROVED_COMMENTS:{url:'/api/comments/approveComments',method:'POST'}
        },
        AGENDA: {
            DETAIL: {url:'/api/agendas/', method:'GET'}
        },
        EXPERIENCE_CORNER:{
            DETAIL:{ url:'/api/statics/experienceCorner',method:'GET'}
        },
        MAIL_NOTIF:{
            DETAIL:{ url:'/api/notifications/needAssistance/send', method:'POST' }
        },
        EMERGENCY_CONTACT:{
            DETAIL:{ url:'/api/statics/emergencyContact',method:'GET' }
        }
    }
};
export default Object.assign({}, API);