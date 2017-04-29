
import { ErrorHandler, NgModule, OpaqueToken, Injectable, InjectionToken } from '@angular/core';


export interface Gallery {

  load(): Promise<string>

}
