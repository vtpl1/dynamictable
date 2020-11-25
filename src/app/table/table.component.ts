import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AnprEventsResponse } from '../swagger/models/anprEventsResponse';
import { Job } from '../swagger/models/job';
import { Meta } from '../swagger/models/meta';
import { TableAJAXService } from '../swagger/services/table-ajax.service';
import {AccordionModule} from 'primeng/accordion';  

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  public job: Job = {
    _id: "5fbccb167ff5c3eee84e1267",
    jobType: "anpr",
    submissionTime: new Date().getTime(),
    videoFileNames: []
  };

  public eventList: any = [];
  public searching: boolean = false;
  public meta: Meta = {
    page: 1,
    maxResults: 100,
    total: 0
  };

  headElements = ['Video Name', 'Captured Image', 'ANPR', 'Vehicle Type', 'Vehicle Make', 'Vehicle Model', 'Vehicle Color', 
  'Count Of Helmet', 'Count Of No Helmet', 'Count Of Triple Ride',
  'Time of Detection', 'Time of Detection in Video File'];

  constructor(private anprService: TableAJAXService) { }

  ngOnInit(): void {
    //ng serve --host 0.0.0.0 --disableHostCheck
    this.findOccurances();
  }

  public findOccurances(page?: number): void {

    this.eventList = [];
    this.meta.page = page ? page : 1;
    let sort: string = '-eventDetails.startTimeStamp';
    let embeded: string = '{"eventSnaps":1}';
    let where: any = {
      "eventDetails.jobId": this.job != null ? "#"+this.job._id : null
    };
    this.searching = true;
    this.anprService.anprEventsGet(this.meta.page, JSON.stringify(where), sort, this.meta.maxResults, embeded)
      .subscribe((response: AnprEventsResponse) => {
      console.log("attributeEventsGet success: ", response);

      this.createEventList(response.items);
      if (response.meta.total == 0) {
        this.meta.page = 1;
      } else {
        this.meta = response.meta;
      }
    }, (error: HttpErrorResponse) => {
      console.debug("attributeEventsGet failed, error: ", error);
    }, () => {
      console.debug("attributeEventsGet completed...");
      this.searching = false;
    });
  }

  createEventList(currentEvents: any): void {
    for (let currentEvent of currentEvents) {

      let eventObj: any = {
        "id": (currentEvent._id && currentEvent._id.length > 0) ? currentEvent._id : "",
        "eventSnap": (currentEvent.eventSnaps && currentEvent.eventSnaps.length > 0) ? currentEvent.eventSnaps[0].snap : "",
        "videoFile": (currentEvent.metaAnprEvent.videoFileName && currentEvent.metaAnprEvent.videoFileName.length > 0) ? currentEvent.metaAnprEvent.videoFileName : "",
        "anpr": (currentEvent.metaAnprEvent.vehicleNumber && currentEvent.metaAnprEvent.vehicleNumber.length > 0) ? currentEvent.metaAnprEvent.vehicleNumber.toUpperCase() : "", 
        "vehicleType": (currentEvent.metaAnprEvent.vehicleType && currentEvent.metaAnprEvent.vehicleType.length > 0) ? currentEvent.metaAnprEvent.vehicleType.charAt(0).toUpperCase() + currentEvent.metaAnprEvent.vehicleType.slice(1) : "",
        "vehicleMake": (currentEvent.metaAnprEvent.vehicleMake && currentEvent.metaAnprEvent.vehicleMake.length > 0) ? currentEvent.metaAnprEvent.vehicleMake.charAt(0).toUpperCase() + currentEvent.metaAnprEvent.vehicleMake.slice(1) : "",
        "vehicleModel": (currentEvent.metaAnprEvent.vehicleModel && currentEvent.metaAnprEvent.vehicleModel.length > 0) ? currentEvent.metaAnprEvent.vehicleModel.charAt(0).toUpperCase() + currentEvent.metaAnprEvent.vehicleModel.slice(1) : "",
        "vehicleColor": (currentEvent.metaAnprEvent.vehicleColor && currentEvent.metaAnprEvent.vehicleColor.length > 0) ? currentEvent.metaAnprEvent.vehicleColor.charAt(0).toUpperCase() + currentEvent.metaAnprEvent.vehicleColor.slice(1) : "",

        "countOfHelmet": (currentEvent.metaAnprEvent.countOfHelmet != undefined) ? currentEvent.metaAnprEvent.countOfHelmet : "NIL",
        "countOfNoHelmet": (currentEvent.metaAnprEvent.countOfNoHelmet != undefined) ? currentEvent.metaAnprEvent.countOfNoHelmet : "NIL",
        "countOfTripleRide": (currentEvent.metaAnprEvent.countOfTripleRide != undefined) ? currentEvent.metaAnprEvent.countOfTripleRide : "NIL",

        "captureTime": (currentEvent.eventDetails.startTimeStamp > 0) ? currentEvent.eventDetails.startTimeStamp : "",
        "captureTimeInVideo": (currentEvent.metaAnprEvent.captureTimeInVideo && currentEvent.metaAnprEvent.captureTimeInVideo > 0) ? currentEvent.metaAnprEvent.captureTimeInVideo : "",
        "videoDuration": (currentEvent.metaAnprEvent.videoDuration && currentEvent.metaAnprEvent.videoDuration > 0) ? currentEvent.metaAnprEvent.videoDuration : ""
        
      };
      this.eventList.push(eventObj);
    }
  };

  msToHMS(ms: number): string {
    // 1- Convert to seconds:
    let seconds: number = ms / 1000;
    // 2- Extract hours:
    let hours = Math.floor(seconds / 3600); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    let minutes = Math.floor(seconds / 60); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = Math.floor(seconds % 60);
    return (hours<10?'0'+hours:hours)+":"+(minutes<10?'0'+minutes:minutes)+":"+(seconds<10?'0'+seconds:seconds);
  };

}
