/// <reference path="nativescript-screen-orientation.d.ts" />
import * as common from "./vidplayer.common";
export declare class Vidplayer extends common.VidPlayer {
    onComplete: any;
    onError: any;
    autoPlay: boolean;
    private _vidPlayer;
    private _android;
    private _ios;
    private _portraitWidth;
    private _portraitHeight;
    android: any;
    vidPlayer: any;
    _createUI(): void;
    private goFullScreen(isFullScreen);
}
