import {Observable} from "data/observable";

export class HelloWorldModel extends Observable {

  public message: string;
  
  private _videoSrc: string;

  private _onComplete: any;

  private _onError: any;

  set videoSrc(val: string) {
    if (val !== this._videoSrc) {
      this._videoSrc = val;
      this.notifyPropertyChange('videoSrc', val);
    }
  }

  get videoSrc(): string {
    return this._videoSrc;
  }

  set onComplete(val) {
    if (val !== this._onComplete) {
      this._onComplete = val;
      this.notifyPropertyChange('onComplete', val);
    }
  }

  get onComplete() {
    return this._onComplete;
  }

  set onError(val) {
    if (val !== this._onError) {
      this._onError = val;
      this.notifyPropertyChange('onError', val);
    }
  }

  get onError() {
    return this._onError;
  }

}