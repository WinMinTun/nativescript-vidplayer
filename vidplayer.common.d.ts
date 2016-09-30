import { View } from 'ui/core/view';
import dependencyObservable = require("ui/core/dependency-observable");
export declare class VidPlayer extends View {
    static srcProperty: dependencyObservable.Property;
    constructor();
    src: any;
}
