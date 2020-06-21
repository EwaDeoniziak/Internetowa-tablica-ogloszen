import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Notice, Category } from 'src/app/shared/api-models';
import { Router } from '@angular/router';
import { MatSidenav, MatPaginator, MatTableDataSource } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { FilterByPricePipe } from 'src/app/shared/pipes/filter-by-price.pipe';
import { SearchPipe } from 'src/app/shared/pipes/search.pipe';
import { SearchByLocationPipe } from 'src/app/shared/pipes/search-by-location.pipe';
import { FilterByTypePipe } from 'src/app/shared/pipes/filter-by-type.pipe';

@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.scss']
})
export class NoticeBoardComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;

  notices: Notice[];
  category: Category = null;
  categories: Category[];
  type = '';
  spinnerActive = false;

  // pager
  public array: any;
  public displayedColumns = ['', '', '', '', ''];
  public dataSource: any;

  public pageSize = 12;
  public currentPage = 0;
  public totalSize = 0;

  searchInput: string;
  location: string;
  price1: number;
  price2: number;
  //category: string;
  filteredItems: Notice[];

  constructor(
    private http: HttpService,
    private router: Router,
    private _DomSanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private appService: AppService,
    private filter: FilterPipe,
    private filter_by_price: FilterByPricePipe,
    private search: SearchPipe,
    private searchLocation: SearchByLocationPipe,
    private filterType: FilterByTypePipe) {
    // this.http.getNotices().subscribe(el => this.notices = el );

    // get page number from route and show items
    this.route.params.subscribe(params => {
      this.currentPage = +params.page - 1;
      this.iterator();
    });
    this.appService.category.subscribe(el => {
      this.category = el;
    //console.log(this.category);
    })

    this.http.getCategories().subscribe(res => this.categories = res)
  }
  ngOnInit() {
    this.getArray();
    this.appService.categoriesVisible.next(true);
  }

  ngOnDestroy() {
    this.appService.categoriesVisible.next(false);
  }

  //click on Add Notice
  addNewNotice(){
    const token = localStorage.getItem('token');
    if(!!token){
      this.router.navigate(['../../../../user-panel/add-notice']);
    } else {
      this.router.navigate(['../../../../main-page/auth']);
    }
  }

  // show notice after click on card

  showNotice(notice: Notice, router: Router) {
    const token = localStorage.getItem('token');
    if(!!token){
      this.router.navigate(['/../../user-panel/notice-board/', notice._id]);
    } else{
    this.router.navigate(['/../../main-page/notice-board/', notice._id]);
    }
  }

  // show modified text on card

  // getShortDescription(descripton: string): string {
  //   if (descripton.length < 40) {
  //     return descripton;
  //   } else {
  //     return descripton.slice(0, 10) + '...';
  //   }
  // }

  // getCategories(categories: Category[]): string {
  //   let categoriesString = '';
  //   categories.forEach(el => categoriesString += el.name + ' ');
  //   return categoriesString;
  // }

  // pagination functions

  public handlePage(e: any) {
    // this.currentPage = e.pageIndex;
    this.router.navigate(['/../../main-page/notice-board/page/', (e.pageIndex + 1)]);
    this.pageSize = e.pageSize;
    // this.iterator();
  }
  getArray() {
    this.spinnerActive = true;
    this.http.getNotices()
      .subscribe((response) => {
        this.spinnerActive = false;
        this.notices = response;
        this.filteredItems = response;
        this.category = null;
        this.filterItemsByPriceL(this.notices);
        this.filterItemsByPriceM(this.notices);
        this.filterItemsBySearch(this.notices);
        this.filterItemsByCategory(this.notices);
        this.filterItemsBySearchLocation(this.notices);
        this.updateItems();
      });
    this.route.params.subscribe(params => {
        this.currentPage = +params.page - 1;
        this.iterator();
      });
  }

  updateItems(){
    this.dataSource = new MatTableDataSource<Notice>(this.filteredItems);
    this.dataSource.paginator = this.paginator;
    this.array = this.filteredItems;
    this.totalSize = this.array.length;
    this.iterator();
  }

  iterator() {
    if (this.array) {
      // this.route.params.subscribe(params => {
      //   this.currentPage = +params['page'] - 1;
        const end = (this.currentPage + 1) * this.pageSize;
        const start = this.currentPage * this.pageSize;
        const part = this.array.slice(start, end);
        this.dataSource = part;
        window.scroll(0, 0);
      // });
    }
  }

  //filter functions
  filterItemsByPriceM(array: Notice[]){
    this.filteredItems = this.filter_by_price.transform(array, this.price1, 'more');
    this.updateItems();
    //console.log(this.filter_by_price.transform(this.notices, this.price1, 'more'));
  }
  filterItemsByPriceL(array: Notice[]){
    this.filteredItems = this.filter_by_price.transform(array, this.price2, 'less');
    this.updateItems();
    //console.log(this.filter_by_price.transform(this.notices, this.price2, 'less'));
  }
  filterItemsBySearch(array: Notice[]){
    this.filteredItems = this.search.transform(array, this.searchInput);
    this.updateItems();
  }
  filterItemsBySearchLocation(array: Notice[]){
    this.filteredItems = this.searchLocation.transform(array, this.location);
    this.updateItems();
  }
  filterItemsByCategory(array: Notice[]){
    this.filteredItems = this.filter.transform(array, 'categories', this.category);
    //console.log(this.category);
    //console.log(this.filteredItems = this.filter.transform(array, 'categories', this.category));

    this.updateItems();
  }
  filterItemsByType(array: Notice[]){
    const type = parseInt(this.type, 10);
    this.filteredItems = this.filterType.transform(array, 'type', type);
    //console.log(this.filteredItems = this.filterType.transform(array, 'type', type));
    this.updateItems();
  }

  filterByAll(array: Notice[]){
    this.filteredItems = array;
    this.filterItemsBySearchLocation(this.filteredItems);
    this.filterItemsBySearch(this.filteredItems);
    this.filterItemsByPriceL(this.filteredItems);
    this.filterItemsByPriceM(this.filteredItems);
    this.filterItemsByCategory(this.filteredItems);
    this.filterItemsByType(this.filteredItems);
    //console.log(this.category);
    //console.log(this.filteredItems);
    //console.log(this.location);
    //console.log(this.type);
  }


  getCategoryRightName(category: Category){
    return this.appService.getCategoryRightName(category);
  }

  getCategoryIcon(category: Category){
    return this.appService.getCategoryIcon(category);
  }

  changeCategory(category: Category){
    this.appService.category.next(category);
    //console.log(category);
    //console.log(this.category);
    this.filterByAll(this.notices);
    this.sidenav.toggle();
  }

  selectAll(){
    this.appService.category.next(null);
    this.filterByAll(this.notices);
    this.sidenav.toggle();
  }
}
