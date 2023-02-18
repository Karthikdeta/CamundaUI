import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { RestapiService } from './restapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'CamundaUI';
  private gridApi!: GridApi;
  public rowData: any;
  public fileName!: String;

  constructor(private restApiService: RestapiService, private router: Router) {}

  ngOnInit() {
    console.log('component has been initialized!');
    this.restApiService.getFileInformation().subscribe((data) => {
      this.rowData = data;
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    //this.gridApi.sizeColumnsToFit();
  }

  defaultColDef = {
    resizable: true,
    filter: true,
    sortable: true,
  };

  columnDefs: any[] = [
    { field: 'fileId', headerName: 'Id', width: 80 },
    { field: 'fileName', headerName: 'File Name', width: 270 },
    { field: 'fileStatus', headerName: 'File Status', width: 180 },
    {
      field: 'fileInfo',
      headerName: 'More Info',
      cellRenderer: (params: any) => {
        return `<a href="/#/fileInformation/${params.data.fileId}" class="justify-content-center" >Click Here</a>`;
      },
    },
  ];

  fileUpload() {
    this.restApiService.fileUpload(this.fileName).subscribe((data) => {
      this.router.navigate(['fileInformation', data.fileId]);
    });
  }
}
