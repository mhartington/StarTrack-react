import { from } from 'rxjs';
class MusickitConfig {
  musicKit: any;
  configure() {
    // return new Promise(resolve => {
      (window as any).MusicKit.configure({
        developerToken: process.env.react_app_musickittoken,
        app: {
          name: 'Star Track',
          build: '1.0'
        }
      });
      this.musicKit = (window as any).MusicKit.getInstance();
    //   resolve();
    // });
  }

  authorize(): void {
    from(this.musicKit.authorize()).subscribe();
  }

  unauthorize(): void {
    from(this.musicKit.unauthorize()).subscribe();
  }

  get isAuthorized() {
    if (this.musicKit) {
      return this.musicKit.isAuthorized;
    }
    return false;
  }
}
export const musickitConfig = new MusickitConfig();
