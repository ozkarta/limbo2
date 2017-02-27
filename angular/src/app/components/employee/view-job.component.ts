import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import * as $ from 'jquery';

import { Proposal } from '../../modules/models/proposal';
import { Duration } from '../../modules/models/duration';
import { Currency } from '../../modules/models/currency';
import { GenericService } from '../../modules/http/generic.service';

@Component({
    selector: 'app-root',
    templateUrl: '../../views/employee/view-job.component.html',
    styles: []
})
export class EmployeeViewWJobComponent  extends OnInit implements AfterViewInit{
    title = 'app works!';

    proposal: Proposal;
    currencyList: Currency[];
    durationList: Duration[];

    constructor(private genericService: GenericService ){
        super();

        this.proposal = new Proposal();
        console.dir(this.proposal);


        this.currencyList =[];
        this.durationList = [];
    }

    ngAfterViewInit() {

        console.log('jquery must be there');

        $('.taboz ul li:first').addClass('active');
        $('.tab-content:not(:first)').hide();
        $('.taboz ul li a').click(function (event) {
            event.preventDefault();
            var content = $(this).attr('href');
            $(this).parent().addClass('active');
            $(this).parent().siblings().removeClass('active');
            $(content).show();
            $(content).siblings('.tab-content').hide();
        });
    }

    ngOnInit(){
        this.genericService.getCurrencyList()
            .subscribe(
                (cur) =>{
                    
                    this.currencyList = cur;
                    console.dir(this.currencyList);
                    this.proposal.currency = this.currencyList[0].id;
                   },
                (err) =>{
                    console.dir(err);
                }
            );

        this.genericService.getDurationList()
            .subscribe(
                (dur) =>{
                    console.dir(dur);
                    this.durationList = dur;
                    this.proposal.duration = this.durationList[0].id;
                },
                (err) =>{
                    console.dir(err);
                }
            ) 

    }


    sendProposal(){
        let user = JSON.parse(localStorage.getItem('currentUser'));
        this.proposal.candidateID = user._id;

        console.log('proposal sent');
        
        console.dir(this.proposal);
    }

    durationChanged(val){
        console.log(val);
        if(val){
            this.proposal.duration = val;
        }
    }
    currencyChanged(val){
        console.log(val);
        if(val){
            this.proposal.currency = val;
        }
    }
}
