import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { JobCategory } from '../../models/job-category';

@Injectable()
export class CategoryService{

    categoryList: JobCategory[];

    constructor(){
        this.categoryList = [];
    }
}