import { Component } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: '../../views/employer/offer.component.html',
  styles: []
})
export class EmployerOfferComponent implements AfterViewInit {
  title = 'app works!';

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
}
