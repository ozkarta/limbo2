import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: '../../views/employer/post-job.component.html',
  styles: []
})
export class EmployerPostJobComponent {
  title = 'app works!';


  onSubmit(){
      console.log('submitted');
  }
}
