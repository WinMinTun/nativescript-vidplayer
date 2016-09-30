/**
 * @author Win Min Tun (sawrochelais@gmail.com)
 */

import { View } from 'ui/core/view';
import dependencyObservable = require("ui/core/dependency-observable");
import proxy = require("ui/core/proxy");

export class VidPlayer extends View {

    // static (prototype) properties
    public static srcProperty: dependencyObservable.Property = new dependencyObservable.Property("src", "VidPlayer", new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None));

    constructor() {
      super();
    }

    set src(val) {
      this._setValue(VidPlayer.srcProperty, val)
    }

    get src() {
      return this._getValue(VidPlayer.srcProperty);
    }
}

