/**
 * @author Win Min Tun (sawrochelais@gmail.com)
 */
/// <reference path="./nativescript-screen-orientation.d.ts" />

import * as common from "./vidplayer.common";
import app = require("application");
import proxy = require("ui/core/proxy");
import platform = require("platform");
import screenOrientation = require("nativescript-screen-orientation");

declare var com;
declare var Array;

function onSrcPropertyChanged(data) {
    var player: Vidplayer = data.object;
    if (!player.android) {
        return;
    }

    // if auto auto play
    if (player.autoPlay) {
        player.vidPlayer.setShouldAutoplay(true);
    }

    // set the src natively
    player.vidPlayer.setVideoURI(android.net.Uri.parse(data.newValue));
        
}

// common.VidPlayer.srcProperty.metadata.onSetNativeValue = onSrcPropertyChanged;
// register callback to natively change tags when change at TagGroup.src property occurs (e.g. binding)
(<proxy.PropertyMetadata>common.VidPlayer.srcProperty.metadata).onSetNativeValue = onSrcPropertyChanged;

require("utils/module-merge").merge(common, module.exports);

declare var WindowManager: any;
declare var android: any;

export class Vidplayer extends common.VidPlayer {

    // on complete callback
    onComplete: any;

    // on error callback
    onError: any;

    autoPlay: boolean = false; // auto start or not

    private _vidPlayer;

    private _android: any;
    private _ios: any;

    private _portraitWidth: number;
    private _portraitHeight: number;

    get android() {
        return this._android;
    }

    get vidPlayer() {
        return this._vidPlayer;
    }

    // create native ui
    _createUI() {
        let context = app.android.currentContext;

        let FullscreenVideoLayout = com.github.rtoshiro.view.video.FullscreenVideoLayout;

        this._vidPlayer = new FullscreenVideoLayout(context);
        this._vidPlayer.setActivity(context);
        
        let f = this._vidPlayer.getClass().getDeclaredField("imgfullscreen"); //NoSuchFieldException
        f.setAccessible(true);
        let fullScreenBtn = f.get(this._vidPlayer);
        fullScreenBtn.setOnClickListener(new android.view.View.OnClickListener({
            onClick: (view) => {

                // hide other elements
                this._vidPlayer.setFullscreen(!this._vidPlayer.isFullscreen());

                // rotate to landscape, hide status bar, nav bar and enter immersive sticky         
                this.goFullScreen(this._vidPlayer.isFullscreen());
            }
        }));

        // set on completion listener
        this._vidPlayer.setOnCompletionListener(new android.media.MediaPlayer.OnCompletionListener({
            onCompletion: (mp) => {
                if (typeof(this.onComplete) === 'function') {
                    this.onComplete(); // call on completion callback
                }
            }
        }));

        // set on error listener
        this._vidPlayer.setOnErrorListener(new android.media.MediaPlayer.OnErrorListener({
            onError: (mp, what, extra) => {
                if (typeof(this.onError) === 'function') {
                    this.onError(); // call on error callback
                    return true;
                }
                return false;
            }
        }));


        this._android = this._vidPlayer;
    }

    private goFullScreen(isFullScreen: boolean) {

        var View = android.view.View;

        if (isFullScreen) {

            if (app.android && platform.device.sdkVersion < '16') {
                // Hide the status bar only
                app.android.foregroundActivity.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                            WindowManager.LayoutParams.FLAG_FULLSCREEN);
            } else if (app.android && platform.device.sdkVersion >= '21') {
                var window = app.android.foregroundActivity.getWindow();
                var decorView = window.getDecorView();
                // Hide the status bar, navigation bar, and enter immersive sticky.
                let uiOptions = View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                    | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // hide nav bar
                    | View.SYSTEM_UI_FLAG_FULLSCREEN // hide status bar
                    | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY;
                decorView.setSystemUiVisibility(uiOptions);
            } else {
                var window = app.android.foregroundActivity.getWindow();
                var decorView = window.getDecorView();
                // Hide the status bar only
                let uiOptions = View.SYSTEM_UI_FLAG_FULLSCREEN;
                decorView.setSystemUiVisibility(uiOptions);
            }

            // change to landscape
            screenOrientation.setCurrentOrientation("landscape", () => {
                // save WH to be set back when fullscreen exits
                this._portraitWidth = this.width;
                this._portraitHeight = this.height;

                this.height = platform.screen.mainScreen.widthDIPs;
                this.width = platform.screen.mainScreen.heightDIPs;
            });

        } else {

            if (app.android && platform.device.sdkVersion < '16') {
                // Hide the status bar only
                app.android.foregroundActivity.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
            } else if (app.android && platform.device.sdkVersion >= '21') {
                var window = app.android.foregroundActivity.getWindow();
                var decorView = window.getDecorView();
                // Hide the status bar, navigation bar, and enter immersive sticky.
                let uiOptions = View.SYSTEM_UI_FLAG_LAYOUT_STABLE;
                decorView.setSystemUiVisibility(uiOptions);
            }

            // change to portrait
            screenOrientation.setCurrentOrientation("portrait", () => {

                // set WH back when fullscreen exits
                this.height = this._portraitHeight;
                this.width = this._portraitWidth;
            });
        }
    }

}