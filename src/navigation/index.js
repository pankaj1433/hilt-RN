import { StackNavigator } from "react-navigation";
import Main from "../views/main.js";
import Login from "../views/screens/login"
import HomeScreen from "../views/screens/homeScreen";
import TravelNavigation from "../views/screens/travelNavigation"
import AgendaNavigation from "../views/screens/agendaNavigation"
import TravelOverview from '../views/screens/travelOverview'
import AgendaDay1 from "../views/screens/agendaDay"
import MyArrivals from "../views/screens/myArrivals"
import MyDeparture from '../views/screens/myDeparture'
import VenueNavigation from '../views/screens/venueNavigation'
import Venue from '../views/screens/venue'
import VenueLayout from '../views/screens/venueLayout'
import DressCodeNavigation from '../views/screens/dressCodeNavigation'
import DressCodeDay from '../views/screens/dressCodeDay'
import StayNavigation from '../views/screens/stayNavigation'
import OrgInfoNavigation from '../views/screens/orgInfoNavigation'
import DosDonts from '../views/screens/dosDonts'
import Faqs from '../views/screens/faqs'
import MyStay from '../views/screens/myStay'
import Profile from '../views/screens/profile'
import SubmitId from '../views/screens/submitId'
import StayOverview from '../views/screens/stayOverview'
import NavigationContainer from '../views/common/navigationContainer'
import AssistanceNavigation from '../views/screens/assistanceNavigation'
import TravelAssistance from '../views/screens/travelAssistance'
import HotelAssistance from '../views/screens/hotelAssistance'
import Comments from '../views/screens/comments'
import AdminComment from '../views/screens/adminComment'
import Notifications from '../views/screens/notifications'
import ExperienceCorner from '../views/screens/experienceCorner'
import OrgInfo from '../views/screens/orgInfo'
import ApproveComments from '../views/screens/approveComments'
import PreKickOff from '../views/screens/preKickOff'
import EmergencyContact from '../views/screens/emergencyContactNo'

const routes = {
    Main:{
      screen: Main
    },
    Login:{
      screen: Login
    },
    HomeScreen:{
      screen: HomeScreen
    },
    TravelNavigation:{
        screen: TravelNavigation
    },
    TravelOverview:{
        screen:TravelOverview,
    },
    MyArrivals:{
        screen:MyArrivals,
    },
    MyDeparture:{
        screen:MyDeparture,
    },
    AgendaNavigation:{
        screen: AgendaNavigation
    },
    PreKickOff: {
        screen: PreKickOff
    },
    AgendaDay1:{
        screen: AgendaDay1
    },
    VenueNavigation:{
        screen: VenueNavigation
    },
    Venue:{
        screen:Venue
    },
    VenueLayout:{
        screen: VenueLayout
    },
    DressCodeNavigation: {
        screen: DressCodeNavigation
    },
    DressCodeDay: {
        screen: DressCodeDay
    },
    StayNavigation: {
        screen: StayNavigation
    },
    MyStay:{
        screen: MyStay
    },
    SubmitId: {
        screen: SubmitId
    },
    StayOverview: {
        screen: StayOverview
    },
    OrgInfoNavigation: {
        screen: OrgInfoNavigation
    },
    DosDonts: {
        screen: DosDonts
    },
    Faqs: {
        screen: Faqs
    },
    Profile:{
        screen: Profile
    },
    AssistanceNavigation: {
        screen: AssistanceNavigation
    },
    TravelAssistance: {
        screen: TravelAssistance
    },
    HotelAssistance: {
        screen: HotelAssistance
    },
    Comments: {
        screen: Comments
    },
    Notifications: {
        screen: Notifications
    },
    ExperienceCorner: {
        screen: ExperienceCorner
    },
    OrgInfo:{
        screen: OrgInfo
    },
    AdminComment:{
        screen: AdminComment
    },
    ApproveComments:{
        screen: ApproveComments
    },
    EmergencyContact:{
        screen:EmergencyContact
    }
};


export default StackNavigator(routes,{
  initialRouteName : 'Main',
    navigationOptions :{
        header:null,
    }
})