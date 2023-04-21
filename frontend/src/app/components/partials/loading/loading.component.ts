import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent {

  isLoading$: Observable<boolean>;

  constructor(loadingService: LoadingService) {
    this.isLoading$ = loadingService.isLoading;
  }
}
