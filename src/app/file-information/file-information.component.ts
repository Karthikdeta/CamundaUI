import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { RestapiService } from '../restapi.service';

@Component({
  selector: 'app-file-information',
  templateUrl: './file-information.component.html',
  styleUrls: ['./file-information.component.scss'],
})
export class FileInformationComponent implements OnInit {
  public fileId!: number;
  public fileName!: String;
  public fileStatus!: String;
  public isCollapsed = true;
  private gridApi!: GridApi;
  public rowData: any = [];

  constructor(
    private route: ActivatedRoute,
    private restApiService: RestapiService,
    private location: Location
  ) {
    this.route.params.subscribe((params: any) => {
      this.fileId = params.Id;
    });
  }

  ngOnInit(): void {
    this.getFileInformationById();
    this.getProcessActivityInfo();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  defaultColDef = {
    resizable: true,
    filter: true,
    sortable: true,
  };

  columnDefs: any[] = [
    { field: 'id', headerName: 'Id', width: 60 },
    { field: 'fileId', headerName: 'File Id', width: 80 },
    {
      field: 'processInstanceId',
      headerName: 'Process Instance Id',
      width: 270,
    },
    { field: 'status', headerName: 'Status', width: 230 },
    {
      field: 'activityTimeStamp',
      headerName: 'Activity TimeStamp',
      width: 230,
    },
    { field: 'recUpdatedUser', headerName: 'Rec Updated User', width: 200 },
  ];

  onDataRefresh() {
    this.getFileInformationById();
    this.getProcessActivityInfo();
  }

  getFileInformationById() {
    this.restApiService
      .getFileInformationById(this.fileId)
      .subscribe((data) => {
        this.fileName = data.fileName;
        this.fileStatus = data.fileStatus;
      });
  }

  goBackToPrevPage(): void {
    this.location.back();
  }

  completeUserTask(taskName: String) {
    this.restApiService
      .completeUserTask(this.fileId, taskName)
      .subscribe((data) => {
        this.getFileInformationById();
        this.getProcessActivityInfo();
      });
  }

  getProcessActivityInfo() {
    this.restApiService
      .getProcessActivityInfo(this.fileId)
      .subscribe((data) => (this.rowData = data));
  }
}
