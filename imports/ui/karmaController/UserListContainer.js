import { userKarma } from "../../api/userKarma";
import { withTracker } from 'meteor/react-meteor-data';

import UserList from './UserList';

const UserListContainer = withTracker(({}) => {
    return {
        userKarmaList:  userKarma.find().fetch()
    };
})(UserList);

export default UserListContainer;