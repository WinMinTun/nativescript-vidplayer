# NativeScript Video Player with Fullscreen support
NativeScript Video Player with Fullscreen, auto-play, on complete and on error callbacks. Tested with mp4, mp3, mov

## Platform Support

Currently only support Android. Any collaborator for iOS support is welcomed!

##Android side
![alt tag](https://bytebucket.org/win_min_tun/nativescript-tag/raw/ae7c2b070de75c81898493d4b5d26892321612c9/demo/screenshots/Android.png)

## Usage

The plugin is developed using nativescript plugin seed (https://github.com/NathanWalker/nativescript-plugin-seed). Pls see `demo` for full example. 
###
```XML
    <Video:Vidplayer id="video" src="{{ videoSrc }}" autoPlay="true" onComplete="{{ onComplete }}" onError="{{ onError }}" />

```

## Attributes

- **src** - *required*

Video source (online or local)

- **autoPlay** - *optional*

Auto play true/false

- **onComplete** - *optional*

on complete callback

- **onError** - *optional*

on error (when video cannot be played) callback

## Credit

Credit goes to the native android library (https://github.com/rtoshiro/FullscreenVideoView) by Toshiro (https://github.com/rtoshiro)

## Contributing - Support for iOS?

Currently there is no support for iOS. Any suggestion (iOS library, etc) and/or contribution is welcomed!
