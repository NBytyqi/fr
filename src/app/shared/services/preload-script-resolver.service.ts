import { LazyloaderService } from './lazyloader.service';
import { Injectable } from '@angular/core';
import { ScriptModel } from './script-model';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PreloadScriptResolver {

  constructor(private lls: LazyloaderService) { }
  preload(...scripts: Array<{ name: string; type: string; }>) {
    const promises = scripts.map(script => this.loadScript(script.name, script.type));
    return Promise.all(promises);
  }

  preloadAll() {
    const allscripts = <any>this.lls.scripts.map(script => { return { name: script.name, type: script.type }; });
    return this.preload(...allscripts);
  }

  async loadScript(name: string, type: string): Promise<ScriptModel> {
    const script = this.lls.getScript(name, type);

    if (script.loaded) {
      return script;
    } else {
      return this.lls.load(script);
    }
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    if (route.routeConfig.data.preloadAllScripts) {
      return this.preloadAll();
    } else {
      if (route.routeConfig.data.preloadScripts) {
        return this.preload(...route.routeConfig.data.preloadScripts);
      }

    }

  }

}
