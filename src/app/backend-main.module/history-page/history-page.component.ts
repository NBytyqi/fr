import { AuthService } from 'app/shared/modules/data-service/auth.service';
import { EventApi } from './../../shared/modules/data-service/EventApi.service';
import { LoggerService } from './../../shared/modules/data-service/logger.service';
import { Events } from './../../shared/modules/data-service/events';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel/overlaypanel';


@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {

  public items: Array<Events> = [];
  public filteredItems: Array<Events> = [];
  selectedItem: Events;
  selectedEvents: Events[] = [];

  loading = false;
  showVideoDialog = false;
  videoSrc = '';
  plateImageUrl = '';
  fromDate: Date;
  toDate: Date;

  cols: any[];

  @ViewChild('plateImageOverlay', { static: true }) plateImageOverlay;

  ///////////////////////////////////
  // options form editor
  showEditor = false;
  formTitle = 'Event';
  formModel = Events;
  showFormReset = false;
  showFormDelete = false;
  showFormClear = false;
  showFormCancel = false;
  showFormSpinner = false;
  // end options for form editor
  /////////////////////////////////

  constructor(private logger: LoggerService, private eventApi: EventApi, public authService: AuthService) { }

  ngOnInit() {
    const d = new Date;

    const cd = this.authService.user.permission;

    this.cols = [
      { field: 'snapshot', header: 'Img' },
      { field: 'startDate', header: 'Date' },
      { field: 'gateName', header: 'Gate' },
      { field: 'plate', header: 'Plate' },
      { field: 'color', header: 'Color' },
      { field: 'userstr', header: 'User' },
      { field: 'isBlacklisted', header: 'Blacklisted' },
      { field: 'isOverride', header: 'Override' },
      { field: 'isApproved', header: 'Approve' },
      { field: 'isDenied', header: 'Deny' },
      { field: 'duration', header: 'Duration' },
    ];

    this.getItems();
  }

  viewImage(event, data) {
    this.plateImageUrl = '/api/history/snapshotlarge/' + data.snapshotId + '?token=' + this.authService.token;
    this.plateImageOverlay.toggle(event); // open panel relative to click
  }

  viewVideo(event: Events) {
    this.videoSrc = `/api/video/${event.recordingId}?token=${this.authService.token}`;
    this.showVideoDialog = true;
  }

  onRowCheckboxChanged(eventId: Events) {
   
    const eventPosition = this.selectedEvents.indexOf(eventId);
    if(eventPosition === -1) {
      this.selectedEvents.push(eventId);
      
     
    } else {
      this.selectedEvents = this.selectedEvents.filter((eventi) => {
        return eventi !== eventId;
      });

      
    }
  }

  printShortPDF() {

    if(this.selectedEvents?.length == 0) {
      this.selectedEvents = this.items;
    }

    const sortedEvents = this.selectedEvents.sort((a, b) => {
      var dateA = new Date(a.startDate).getMilliseconds(), dateB = new Date(b.startDate).getMilliseconds();
      return dateA - dateB;
    });

    const eventsFrom: Date = sortedEvents[0].startDate;
    const eventsTo: Date = sortedEvents[sortedEvents.length-1].startDate;
    
    this.eventApi.printShortPDF(sortedEvents, eventsFrom, eventsTo, this.items?.length).toPromise().then(() => {
      this.eventApi.downloadReport();
    });
  }

  printDetailedPDF() {
    if(this.selectedEvents?.length == 0) {
      this.selectedEvents = this.items;
    }

    const sortedEvents = this.selectedEvents.sort((a, b) => {
      var dateA = new Date(a.startDate).getMilliseconds(), dateB = new Date(b.startDate).getMilliseconds();
      return dateA - dateB;
    });

    const eventsFrom: Date = sortedEvents[0].startDate;
    const eventsTo: Date = sortedEvents[sortedEvents.length-1].startDate;

    this.eventApi.printDetailedPDF(sortedEvents, eventsFrom, eventsTo, this.items?.length).toPromise().then(() => {
      this.eventApi.downloadReport();
    });

  }

  async downloadVideo(event: Events) {
    await this.eventApi.downloadVideo(event.recordingId).toPromise();
  }

  async videoDialogClosed(event) {
    this.videoSrc = '';
  }


  async getItems() {
    this.loading = true;
    try {
      this.items = await this.eventApi.getItems().toPromise();
     
      this.items = <any>this.items.map(item => {
        if (item.gate) {
          // add virtual props for searching
          (<any>item).gateName = item.gate.name;
          (<any>item).dateTimeStr = new Date(item.startDate).toLocaleString();
          (<any>item).durationStr = this.msToHMS(item.duration);
          (<any>item).userstr = item.user ? item.user.firstname + ' ' + item.user.lastname : 'admin';

          // analyze plate info
          (<any>item) = {
            ...(<any>item),
            ...this.analyzePlate(item.plate)
          }
        }
        return item;
      });
    } catch (error) {
      this.logger.error(error);
    } finally {
      this.loading = false;
    }

    this.searchDates();
  }

  async edit(data) {
    this.showFormClear = false;
    this.showFormCancel = true;
    this.showFormReset = true;
    this.showFormDelete = true;
    this.formTitle = `Edit Gate ${data.name}`;
    this.selectedItem = data;
    this.showEditor = true;
  }

  async save(data) {


  }

  async delete(data) {
    try {
      this.loading = true;
      await this.eventApi.deleteItem(data.id).toPromise();
      this.getItems();
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }


  onCancelClicked(data) {
    this.showEditor = false;
  }

  async onDeleteClicked(data) {
    this.showFormSpinner = true;
    try {
      await this.eventApi.deleteItem(data.id).toPromise();

      // update item in list
      this.getItems();
    } catch (error) {

    } finally {
      this.showFormSpinner = false;
      this.showEditor = false;
    }
  }
  //////////////////////////////////


  msToHMS(duration: number) {

    // tslint:disable-next-line:radix
    const milliseconds = parseInt(<any>((duration % 1000) / 100));
    // tslint:disable-next-line:radix
    let seconds = parseInt(<any>((duration / 1000) % 60));
    // tslint:disable-next-line:radix
    let minutes = parseInt(<any>((duration / (1000 * 60)) % 60));
    // tslint:disable-next-line:radix
    let hours = parseInt(<any>((duration / (1000 * 60 * 60)) % 24));

    hours = <any>(((hours < 10) ? '0' + hours : hours));
    minutes = <any>((minutes < 10) ? '0' + minutes : minutes);
    seconds = <any>((seconds < 10) ? '0' + seconds : seconds);

    return hours + ':' + minutes + ':' + seconds;
  }

  onSelectFrom(date) {
    this.searchDates();
  }

  onSelectTo(data) {
    this.searchDates();
  }


  clearDates() {
    this.fromDate = null;
    this.toDate = null;
    this.searchDates();
  }

  searchDates() {
    this.filteredItems = this.items.filter(item => {
      const sd = new Date(item.startDate);

      let incf = false;

      let inc = false;

      if (this.fromDate) {
        if (sd >= this.fromDate) {
          incf = true;
        }
      } else {
        incf = true;
      }

      if (this.toDate) {
        if (sd <= this.toDate && incf || sd <= this.toDate && !this.fromDate) {
          inc = true;
        } else {
          inc = false;
        }
      } else {
        if (incf) {
          inc = true;
        }

      }

      return inc;

    });
  }

  /**
   * Convert lpr output to object
   * @param plateInfo string from lpr output
   */
  analyzePlate(plateInfo: string) {

    // define class info
    const licenseClass = {
      '#ff8000': 'Taxi',
      '#0000ff': 'Private',
      '#ff0000': 'Trucks'
    }

    // process plate number
    const [plate, country, color] = plateInfo.split(',');
    const spaced = str => str.split('').join(' ')

    let literal, number;
    const splitIndex = plate.split('')
      .findIndex((x, i) => plate.charCodeAt(i) > 1641 || plate.charCodeAt(i) < 1632);
    if (splitIndex !== -1) {
      number = plate.substring(0, splitIndex);
      literal = plate.substring(splitIndex);
    }

    return {
      country: country,
      literal: spaced(literal),
      number: spaced(number),
      color: color,
      class: licenseClass[color]
    }
  }

}

