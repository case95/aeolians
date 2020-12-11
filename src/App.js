import React from "react";
import "./App.css";

//Pages for router
import Home from "./components/pages/Home/Home";
import Accommodations from "./components/pages/Accommodations/Accommodations";
import RentalServices from "./components/pages/RentalServices/RentalServices";
import DailyTours from "./components/pages/DailyTours/DailyTours";
import ContactUs from "./components/pages/ContactUs/ContactUs";
import AccommodationPage from "./components/pages/AccommodationPage/AccommodationPage";
import EditAccommodation from "./components/pages/EditAccommodation/EditAccommodation";
import NotFound from "./components/pages/NotFound/NotFound";
import Login from "./components/pages/Login/Login";
import NewsletterPage from "./components/pages/NewsletterPage/NewsletterPage";
import AdminPanel from "./components/pages/AdminPanel/AdminPanel";

//Private Route
import PrivateRoute from "./components/PrivateRoute";

//Admin pages
import ManageAccommodations from "./components/pages/ManageAccommodations/ManageAccommodations";
import AddAccommodation from "./components/pages/AddAccommodation/AddAccommodation";

//Custom components
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";

//Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Redux imports
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import store from "./store";
import rrfProps from "./config/rrfProps";

//General CSS
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <div className="App my-content">
          <Router>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/accommodations" component={Accommodations} />
              <Route
                exact
                path="/accommodations/:id"
                component={AccommodationPage}
              />
              <Route exact path="/rentals" component={RentalServices} />
              <Route exact path="/tours" component={DailyTours} />
              <Route exact path="/contacts" component={ContactUs} />
              <Route exact path="/aeolians_admin" component={Login} />
              <PrivateRoute exact path="/adminpanel" component={AdminPanel} />
              <PrivateRoute
                exact
                path="/manageaccommodations"
                component={ManageAccommodations}
              />
              <PrivateRoute
                exact
                path="/addaccommodation"
                component={AddAccommodation}
              />
              <PrivateRoute
                exact
                path="/editaccommodation/:id"
                component={EditAccommodation}
              />
              <PrivateRoute
                exact
                path="/newsletter"
                component={NewsletterPage}
              />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </Router>
        </div>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
