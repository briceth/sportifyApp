package com.sportifyapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
<<<<<<< HEAD
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import org.reactnative.camera.RNCameraPackage;
=======
import com.github.wumke.RNImmediatePhoneCall.RNImmediatePhoneCallPackage;
>>>>>>> 1f7722026fc6e0f701cb1b53db5d99d9f1fdf942
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import org.reactnative.camera.RNCameraPackage;
import com.horcrux.svg.SvgPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

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
<<<<<<< HEAD
            new VectorIconsPackage(),
            new SvgPackage(),
            new SplashScreenReactPackage(),
            new RNCameraPackage(),
=======
            new RNImmediatePhoneCallPackage(),
>>>>>>> 1f7722026fc6e0f701cb1b53db5d99d9f1fdf942
            new SplashScreenReactPackage(),
            new RNCameraPackage(),
            new SvgPackage(),
            new VectorIconsPackage(),
            new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
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
