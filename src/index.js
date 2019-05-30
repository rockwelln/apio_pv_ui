import React, { Component } from "react";
import ReactDOM from "react-dom";
import { CookiesProvider, withCookies } from "react-cookie";
import { IntlProvider, addLocaleData } from "react-intl";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./App";
import { unregister } from "./registerServiceWorker";
import Tenants from "./components/Tenants";

import mainReducer from "./store/reducers";

import en from "react-intl/locale-data/en";
import fr from "react-intl/locale-data/fr";
import nl from "react-intl/locale-data/nl";

addLocaleData(en);
addLocaleData(fr);
addLocaleData(nl);

function getMessages(locale) {
  switch (locale) {
    default:
      if (locale !== undefined && locale.length > 2) {
        return getMessages(locale.substr(0, 2));
      }
      console.error("the language " + locale + " is not handled (yet?)");
      return {};
  }
}

class AppWithIntl extends Component {
  constructor(props) {
    super(props);
    this._getLocale = this._getLocale.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.state = { locale: this._getLocale() };
  }

  _getLocale() {
    let locale = this.state ? this.state.locale : undefined;
    if (locale === undefined) {
      locale = this.props.cookies.get("user_language");
    }
    if (locale === undefined || locale === "undefined") {
      locale = navigator.language.substr(0, 2);
    }
    return locale;
  }

  changeLanguage(locale) {
    console.log("change lang");
    if (locale !== this.state.locale) {
      this.setState({ locale: locale });
      if (locale === undefined) this.props.cookies.remove("user_language");
      else this.props.cookies.set("user_language", locale);
    }
  }

  render() {
    let locale = this._getLocale();
    let messages = getMessages(locale);

    console.log("locale: " + locale);
    return (
      <IntlProvider locale={locale} key={locale} messages={messages}>
        <App onLanguageUpdate={this.changeLanguage} />
      </IntlProvider>
    );
  }
}
let AppWithIntlAndCookies = withCookies(AppWithIntl);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  mainReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <AppWithIntlAndCookies />
      {/*<Tenants />*/}
    </CookiesProvider>
  </Provider>,
  document.getElementById("root")
);
unregister();
