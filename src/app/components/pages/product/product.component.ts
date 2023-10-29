import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  images: string[] = [];

  ngOnInit(): void {
    this.images = [
      'https://th.bing.com/th/id/OIP.QhBC1iv9OSV2tN2OFmGb2AHaEo?pid=ImgDet&rs=1',
      'https://wallpapercave.com/wp/wp9384511.jpg',
      'https://th.bing.com/th/id/OIP.myISToIroJNoSvTdnMTw2AHaEK?pid=ImgDet&rs=1',
      'https://i.pinimg.com/originals/dc/ce/1f/dcce1fdad76826f14218f7911b935dfd.jpg',
      'https://th.bing.com/th/id/R.e18ca28729c06f66612f04af40dbfba9?rik=J0psD%2bbcAAS%2fnw&pid=ImgRaw&r=0',
    ];   
  }
}
