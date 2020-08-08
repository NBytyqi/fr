import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ScriptModel } from './script-model';



@Injectable({
  providedIn: 'root'
})
export class LazyloaderService {

  // setup scripts
  public scripts: ScriptModel[] = [
    { name: 'bootstrap.min.css', src: '/bootstrap.min.css', type: 'css', loaded: false },
    { name: 'theme.css', src: '/theme.css', type: 'css', loaded: false },
    { name: 'primeng.min.css', src: '/primeng.min.css', type: 'css', loaded: false },
    { name: 'primeicons.css', src: '/primeicons.css', type: 'css', loaded: false },
    { name: 'font-awesome.min.css', src: '/font-awesome.min.css', type: 'css', loaded: false },
    { name: 'ui-switch.component.css', src: '/ui-switch.component.css', type: 'css', loaded: false },
    { name: 'plugins.css', src: '/plugins.css', type: 'css', loaded: false },
    { name: 'animate.min.css', src: '/animate.min.css', type: 'css', loaded: false },
    { name: 'styles.css', src: '/styles.css', type: 'css', loaded: false },
    { name: 'lyt2-theme-1.css', src: '/lyt2-theme-1.css', type: 'css', loaded: false },
    { name: 'hls.min.js', src: '/hls.min.js', type: 'js', loaded: false }

  ];

  getScript(sname: string, stype: string) {
    return this.scripts.find(s => s.name === sname && s.type === stype);
  }

 async load(script: ScriptModel): Promise<ScriptModel> {
      const existingScript = this.getScript(script.name, script.type);

      // Complete if already loaded
      if (existingScript && existingScript.loaded) {
        return existingScript;
      } else {
        // Add the script if not there
        if (!existingScript) {
          this.scripts = [...this.scripts, script];
        }

        // Load the script
        let scriptPath = script.src;
        try {
          if (script.type === 'js') {
            scriptPath += '.js'; // dev builds bundle as js
            await this.loadScript(scriptPath);
          } else {
            if (!environment.production) {
              scriptPath += '.js'; // dev builds bundle as js
              await this.loadScript(scriptPath);
            } else {
              scriptPath += '.css'; // dev builds bundle as js
              await this.loadStyle(scriptPath);
            }
          }

          script.loaded = true;
          return script;

        } catch (error) {
          return new error(`Couldn't lazy load script ${script.src}`);
        }

      }
  }

  public loadStyle(styleUrl: string) {
    return new Promise((resolve, reject) => {
      const styleElement = document.createElement('link');
      styleElement.rel = 'stylesheet';
      styleElement.type = 'text/css';
      styleElement.href = styleUrl;
      styleElement.onload = resolve;
      styleElement.onerror = reject;
      document.head.appendChild(styleElement);
    });
  }

  public loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.type = 'text/javascript';
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      scriptElement.onerror = reject;
      document.body.appendChild(scriptElement);
    });
  }


}





