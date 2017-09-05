package com.gifthanks;

import android.app.Application;

import com.facebook.react.ReactApplication;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.reactlibrary.googlesignin.RNGoogleSignInPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import com.magus.fblogin.FacebookLoginPackage;
import com.chirag.RNMail.RNMail;
import com.lynxit.contactswrapper.ContactsWrapperPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.joshblour.reactnativepermissions.ReactNativePermissionsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNGoogleSigninPackage(),
            new RNGoogleSignInPackage(),
            new RNFirebasePackage(),
            new RNFirebaseAnalyticsPackage(),
            new FacebookLoginPackage(),
            new RNMail(),
            new ContactsWrapperPackage(),
            new ImageResizerPackage(),
            new ReactNativePermissionsPackage(),
            new VectorIconsPackage(),
            new RNFetchBlobPackage(),
            new ImagePickerPackage()

      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
