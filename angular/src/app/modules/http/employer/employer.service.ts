import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { JobCategory } from '../../models/job-category';
import { JobPost } from '../../models/job';


@Injectable()
export class CategoryService{

    url: string;
    //categoryList: JobCategory[];

    constructor(private http: Http){
        this.url = 'http://localhost:3311/api/category';
        //this.categoryList = [];
    }


    getCategoryList(): Observable<JobCategory[]>{
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});
        
        return this.http.get(this.url)
                        .map(this.extractData)
                        .catch(this.handleError);

    }

    private extractData(res: Response){
        console.log('response for Get Category......');
        //console.dir(res);

        let body = res.json();

        console.dir(body);
        let categoryList: JobCategory[] = [];


        for ( let cat of body.category ){
            let newCategory = new JobCategory();
            newCategory.id = cat._id;
            newCategory.categoryVarName = cat.categoryVarName;
            newCategory.type = cat.type;

            for (let subCat of cat.subCategory){
                let newSubCategory = new JobCategory();
                
                newSubCategory.id = subCat._id;
                newSubCategory.categoryVarName = subCat.categoryVarName;
                newSubCategory.type = subCat.type;

                newCategory.subCategory.push(newSubCategory);
            }
            categoryList.push(newCategory);
        }



        return categoryList;
    }

     private handleError(error: Response | any){
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}

@Injectable()
export class JobService{
    url: string;

    constructor(private http: Http){
        this.url = 'http://localhost:3311/api/employer/job';
    }

   

    postNewJob(newJobPost: JobPost): Observable<any>{
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.post(this.url,{newJobPost},options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    updateJob(newJobPost: JobPost): Observable<JobPost>{
        let headers = new Headers({'Content-Type':'application/json'});
        
        
        let options = new RequestOptions({headers:headers});

        return this.http.post('http://localhost:3311/api/employer/job/update',{newJobPost},options)
                        .map(this.extractDataAndCreateJob)
                        .catch(this.handleError);
    }


    getEmployerPostedJobs(): Observable<JobPost[]>{
        
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        let user = JSON.parse(localStorage.getItem('currentUser'));

        if (user){
            return this.http.post('http://localhost:3311/api/employer/userpostedjoblist',{ owner:user._id },options)
                        .map(this.extractPostedJobsData)
                        .catch(this.handleError);
        }else{
            return Observable.throw('No User Presented');
        }
        
        
    }

    getEmployerPosterJobWithId(id: string): Observable<JobPost[]>{
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        let user = JSON.parse(localStorage.getItem('currentUser'));

        if (user){
            return this.http.post('http://localhost:3311/api/employer/userpostedjob',{owner:user._id,jobID:id},options)
                            .map(this.extractPostedJobsData)
                            .catch(this.handleError);
        }else{
            return Observable.throw('No User Presented');
        }
        
    }

    private extractPostedJobsData(res: Response){
        let body = res.json();

        let jobList: JobPost [] = [];
        //console.dir(body);
        console.log('server responded ....');
        console.dir(body.PostList);
        if (body.PostList){
            for (let post of body.PostList){
                console.dir(post);
                let newPost: JobPost = new JobPost();

                newPost.id = post._id;
                newPost.jobCategory = post.jobCategory;
                newPost.jobSubCategory = post.jobSubCategory;
                newPost.owner = post.owner;
                newPost.jobTitle = post.jobTitle;
                newPost.jobDescription = post.jobDescription;
                newPost.deadline = post.deadLine;
                newPost.budget = post.budget;
                newPost.paymentType = post.paymentType;
                newPost.projectType = post.projectType;
                newPost.status = post.status;
                newPost.requirements = post.requirements;
                newPost.candidates = post.candidates;
                newPost.imageURLList = post.imageURLList;
                newPost.atachmentList = post.atachmentList;
                newPost.currency = post.currency;

                newPost.createdAt = post.createdAt;
                newPost.updatedAt = post.updatedAt;

                jobList.push(newPost);
            }
            console.dir(jobList);
            return jobList;
        }else{
            console.log('!!!!!!!!');
            return null;
        }
    }
    extractDataAndCreateJob(res: Response){
        let body = res.json();

        console.dir(body);
        if (body.post){
             let newPost: JobPost = new JobPost();

                newPost.id = body.post._id;
                newPost.jobCategory = body.post.jobCategory;
                newPost.jobSubCategory = body.post.jobSubCategory;
                newPost.owner = body.post.owner;
                newPost.jobTitle = body.post.jobTitle;
                newPost.jobDescription = body.post.jobDescription;
                newPost.deadline = body.post.deadLine;
                newPost.budget = body.post.budget;
                newPost.paymentType = body.post.paymentType;
                newPost.projectType = body.post.projectType;
                newPost.status = body.post.status;
                newPost.requirements = body.post.requirements;
                newPost.candidates = body.post.candidates;
                newPost.imageURLList = body.post.imageURLList;
                newPost.atachmentList = body.post.atachmentList;
                newPost.currency = body.post.currency;

                newPost.createdAt = body.post.createdAt;
                newPost.updatedAt = body.post.updatedAt;

                console.dir(newPost);
                return newPost;
        }
        return null;
    }

     private extractData(res: Response){
        return res.json();
     }  

    private handleError(error: Response | any){
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}