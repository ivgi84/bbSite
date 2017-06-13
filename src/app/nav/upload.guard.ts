import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { UploadComponent } from '../pages/upload/upload.component';

export class CanDeactivateUpload implements CanDeactivate<UploadComponent>{
  canDeactivate(component: UploadComponent,currentRoute: ActivatedRouteSnapshot,currentState: RouterStateSnapshot) {
        if(component.uploadStatus.uploadFinished)
            return component.uploadStatus.uploadFinished;
  }

}