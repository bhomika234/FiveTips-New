import { Splash } from "./auth/splash";
import { GettingStart } from "./auth/gettingstart";
import { Terms } from "./auth/terms";
import { Trial } from "./auth/trial";
import { ForgotPassword } from "./auth/forgotpassword";
import { ResetPassword } from "./auth/resetpassword";
import { CreateAccount } from "./auth/createaccount";
import { LoginScreen } from "./auth/login";
import { Payment } from "./auth/payment";
import { Home } from "./home"; // Aapne yahan 'Home' import kiya hai
import { History } from "./history";
import { Profile } from "./profile";
import Details from "./details";
import { ContactSupport } from "./contactsupport";
import { TCS } from "./auth/tcs";
import { PrivacyPolicy } from "./privacypolicy";
import { TermsConditions } from "./termsconditions";
import { Subscription } from "./subscription";
import { Intro } from "./auth/inro";

export {
  Splash,
  Splash as SplashScreen,
  GettingStart,
  Terms,
  Trial,
  ForgotPassword,
  ResetPassword,
  CreateAccount,
  LoginScreen,
  Intro,
  Payment,
  Home as HomeScreen, // 'Home' ko 'HomeScreen' ke naam se export karein
  History,
  Profile,
  Details,
  ContactSupport,
  PrivacyPolicy,
  TermsConditions,
  Subscription,
};
