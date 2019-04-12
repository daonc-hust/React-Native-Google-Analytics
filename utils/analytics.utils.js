import {GoogleAnalyticsSettings, GoogleAnalyticsTracker} from 'react-native-google-analytics-bridge';
import gaRouteMap from '../config/gaRouteMap.config';
import gaConstants from '../constants'


/* setDryRun when enabled the native library prevents any data from being sent to Google Analytics.
   This allows you to test or debug the implementation, without your test data appearing in your Google Analytics reports.
*/
GoogleAnalyticsSettings.setDryRun(false);

// setDispatchInterval allows you to configure how often (in seconds) the batches are sent to your tracker.
GoogleAnalyticsSettings.setDispatchInterval(20);

GoogleAnalyticsSettings.setOptOut(true);

// Google Analytics Tracker object
export const tracker = new GoogleAnalyticsTracker("UA-137996839-1",{CD_A: 1, CD_B: 2});

// Google Analytics custom dimensions
let customDimensions = {
  CD_A: 'aaa',
  CD_B: 'bbb'
};

// setter function for custom dimension
export const setDimension = (dimension) => {
  customDimensions = {...customDimensions, ...dimension};
};

// Google Analytics Tracker Methods

export const setUser = (userId) => {
  tracker.setUser(userId);
};

export const setAppName = (appName) => {
  tracker.setAppName(appName);
};

export const trackScreenView = (screenName) => {
  tracker.trackScreenView(screenName);
};

export const setAppVersion = (appVersion) => {
  tracker.setAppVersion(appVersion);
};

/**
category (required): String, category of event
  action (required): String, name of action
  optionalValues: Object
      label: String
      value: Number
*/
export const trackEvent = (category, action, optionalValues = {}) => {
  tracker.trackEventWithCustomDimensionValues(category, action, optionalValues, customDimensions);
};

export const trackTiming = (category, value, optionalValues = {}) => {
  tracker.trackTiming(category, value, optionalValues);
};

// Enable tracking of uncaught exceptions
export const setTrackUncaughtExceptions = (enabled = true) => {
  tracker.setTrackUncaughtExceptions(enabled);
};

/**
error: String, a description of the exception (up to 100 characters), accepts nil
fatal (required): Boolean, indicates whether the exception was fatal, defaults to false
*/
export const trackException = (error, fatal = false) => {
  tracker.trackException(error, fatal);
};

/**
product (required): Object
    id (required): String
    name (required): String
    category (optional): String
    brand (optional): String
    variant (optional): String
    price (optional): Number
    quantity (optional): Number
    couponCode (optional): String

transaction (required): Object
    id (required): String
    affiliation (optional): String, an entity with which the transaction should be affiliated (e.g. a particular store)
    revenue (optional): Number
    tax (optional): Number
    shipping (optional): Number
    couponCode (optional): String
*/
export const trackPurchaseEvent = (product = {id: '', name: ''}, transaction = {id: ''}, eventCategory = 'Ecommerce', eventAction = 'Purchase') => {
  tracker.trackPurchaseEvent(product, transaction, eventCategory, eventAction);
};

export const trackMultiProductsPurchaseEvent = (products = [], transaction = {}, eventCategory = 'Ecommerce', eventAction = 'Purchase') => {
  tracker.trackMultiProductsPurchaseEventWithCustomDimensionValues(products, transaction, eventCategory, eventAction, customDimensions);
};

// Config for screen tracking
export const getScreenTrackingConfig = () => ({
  tracker,
  navStoreKey: 'nav',
  navActions: ['Navigation/NAVIGATE', 'Navigation/BACK', 'Navigation/RESET'],
  gaRouteMap,
  customDimensions
});
