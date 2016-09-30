import * as observable from "data/observable";
import * as pages from "ui/page";
import {HelloWorldModel} from "./main-view-model";

let videos: string[] = ['http://2449.vod.myqcloud.com/2449_22ca37a6ea9011e5acaaf51d105342e3.f20.mp4', 
'http://192.168.0.74:8080/nmnl_social_v2/talentFiles/20160928102019.mov', 
'http://192.168.0.74:8080/nmnl_social_v2/talentFiles/20160906050140.mp3'];

let currentVideoIndx = 0;
let model = new HelloWorldModel();    

// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
    // Get the event sender
    let page = <pages.Page>args.object;
    
    model.videoSrc = "http://2449.vod.myqcloud.com/2449_22ca37a6ea9011e5acaaf51d105342e3.f20.mp4";
    model.message = 'FullscreenVideoView';
    model.onComplete = onComplete;
    model.onError = onError;

    page.bindingContext = model;
}

function onComplete() {
    console.log('on completed');
}

function onError() {
    alert('Media cannot be played');
}