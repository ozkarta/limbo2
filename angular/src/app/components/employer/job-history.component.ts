import { Component, OnInit } from '@angular/core';

import { JobService} from '../../modules/http/employer/employer.service';
import {  JobPost } from '../../modules/models/job';


@Component({
  selector: 'app-root',
  templateUrl: '../../views/employer/job-history.component.html',
  styles: []
})
export class EmployerJobHistoryComponent implements OnInit{
  title = 'app works!';
  jobPostList: JobPost[];
  constructor(private jobService: JobService){
    this.jobPostList = [];
  }

  ngOnInit(){
     this.jobService.getEmployerPostedJobs().subscribe(
       res =>{
         console.log('subscribing....');
        this.jobPostList = res;
       },
       err =>{
        console.dir(err);
       }
     )
  }

}
