import { Component, OnInit } from '@angular/core';
import { Customer, Representative } from '../domain/customer';
import { CustomerService } from '../service/customer-service.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-table-filter-demo',
  templateUrl: './table-filter-demo.component.html',
  styleUrls: ['./table-filter-demo.component.scss'],
})
export class TableFilterDemo implements OnInit {
  customers: Customer[];

  head1 = [
    [
      'Name',
      'Country',
      'Agent',
      'Date',
      'Balance',
      'Status',
      'Activity',
      'Verfied',
    ],
  ];
  customers1: [[1, 'IT', 2, 1, 0, 1, 7, 8], [2, 'COMP', 2, 1, 0, 1, 7, 8]];
  head = [['ID', 'Country', 'Index', 'Capital']];
  data = [
    [1, 'Finland', 7.632, 'Helsinki'],
    [2, 'Norway', 7.594, 'Oslo'],
    [3, 'Denmark', 7.555, 'Copenhagen'],
    [4, 'Iceland', 7.495, 'Reykjavík'],
    [5, 'Switzerland', 7.487, 'Bern'],
    [9, 'Sweden', 7.314, 'Stockholm'],
    [73, 'Belarus', 5.483, 'Minsk'],
  ];

  representatives: Representative[];

  statuses: any[];

  cols: any[];

  exportColumns: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.customerService.getCustomersLarge().then((customers) => {
      this.customers = customers;
      this.loading = false;

      this.customers.forEach(
        (customer) => (customer.date = new Date(customer.date))
      );
    });

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'country', header: 'Country' },
      { field: 'agent', header: 'Agent' },
      { field: 'date', header: 'Date' },
      { field: 'balance', header: 'Balance' },
      { field: 'status', header: 'Status' },
      { field: 'activity', header: 'Activity' },
      { field: 'verified', header: 'Verified' },
    ];
    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
    this.representatives = [
      { name: 'Amy Elsner', image: 'amyelsner.png' },
      { name: 'Anna Fali', image: 'annafali.png' },
      { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
      { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
      { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
      { name: 'Onyama Limba', image: 'onyamalimba.png' },
      { name: 'Stephen Shaw', image: 'stephenshaw.png' },
      { name: 'XuXue Feng', image: 'xuxuefeng.png' },
    ];

    this.statuses = [
      { label: 'Unqualified', value: 'unqualified' },
      { label: 'Qualified', value: 'qualified' },
      { label: 'New', value: 'new' },
      { label: 'Negotiation', value: 'negotiation' },
      { label: 'Renewal', value: 'renewal' },
      { label: 'Proposal', value: 'proposal' },
    ];
  }
  exportPdf() {
    const doc = new jsPDF('portrait');
    autoTable(doc, {
      bodyStyles: {minCellHeight: 25},
      head: this.head1,
      body: this.data,

      didDrawCell: (data) => {
        if (data.column.index === 5 && data.cell.section === 'body') {
          let td = data.cell.raw;
          let dim = data.cell.height - data.cell.padding('vertical');
          let textPos = data.cell.getTextPos();
          let img_url = 'assets/images/no_image_available.png';
          doc.addImage(img_url, textPos.x, textPos.y, dim, dim);
          console.log(dim)
        }
      },
    });
    doc.save('products.pdf');
  }
  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.customers);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'customers');
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then((FileSaver) => {
      const EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(
        data,
        fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }
}
