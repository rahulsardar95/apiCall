import {OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from '../api.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-home-table',
  templateUrl: './home-table.component.html',
  styleUrls: ['./home-table.component.scss']
})
export class HomeTableComponent implements OnInit {
  title = 'Project';
  selected = 'option2';
  accounts = false;
  records = false;
  Month=false;
  week=false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  arrow="keyboard_arrow_down";
  show=false;

  apiResponce:any=[];

  displayedColumns: string[] = ['payee','child', 'threeWeek','twoWeek','OneWeek','Current','PendingAmount','OverPayment','PendingCreditNote', 'TotalPendingAmount'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api : ApiService){

  }
  ngOnInit(): void {
  this.getAllProducts();  
  }

  getAllProducts()
  {
    this.api.getProduct()
    .subscribe
    ({
      next:(res)=>{
        this.apiResponce=res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    error:(err)=>{
      alert("Error while Fetching records")
    }  
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
  changeArrow(){
    this.arrow==="keyboard_arrow_down"?this.arrow="keyboard_arrow_up":this.arrow="keyboard_arrow_down";
    this.arrow==="keyboard_arrow_up"?this.show=true:this.show=false;
    console.log("hii",this.show)
  }

  filter1($event:any)
  {
    let filterData=_.filter(this.apiResponce,(item:any)=>{
       return item.child.toLowerCase() ==$event.value.toLowerCase();
    })
    this.dataSource =new MatTableDataSource(filterData);
  }

  filter2($event:any)
  {
    let filterData=_.filter(this.apiResponce,(item:any)=>{
       return item.payee.toLowerCase() ==$event.value.toLowerCase();
    })
    this.dataSource =new MatTableDataSource(filterData);
  }

}

