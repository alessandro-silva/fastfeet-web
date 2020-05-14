import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Courier from '../pages/Courier';
import CreateCourier from '../pages/Courier/Crud/Create';
import UpdateCourier from '../pages/Courier/Crud/Update';
import Order from '../pages/Order';
import CreateOrder from '../pages/Order/Crud/Create';
import UpdateOrder from '../pages/Order/Crud/Update';
import Recipient from '../pages/Recipient';
import CreateRecipient from '../pages/Recipient/Crud/Create';
import UpdateRecipient from '../pages/Recipient/Crud/Update';
import Problem from '../pages/Problem';

// import { Container } from './styles';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/order" component={Order} isPrivate />
      <Route path="/ordercreate" component={CreateOrder} isPrivate />
      <Route path="/orderupdate" component={UpdateOrder} isPrivate />

      <Route path="/courier" component={Courier} isPrivate />
      <Route path="/couriercreate" component={CreateCourier} isPrivate />
      <Route path="/courierupdate" component={UpdateCourier} isPrivate />

      <Route path="/recipient" component={Recipient} isPrivate />
      <Route path="/recipientcreate" component={CreateRecipient} isPrivate />
      <Route path="/recipientupdate" component={UpdateRecipient} isPrivate />

      <Route path="/problem" component={Problem} isPrivate />
    </Switch>
  );
}
