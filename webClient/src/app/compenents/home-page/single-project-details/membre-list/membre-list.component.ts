import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { User } from 'src/app/entity/user';

@Component({
  selector: 'app-membre-list',
  templateUrl: './membre-list.component.html',
  styleUrls: ['./membre-list.component.scss']
})
export class MembreListComponent implements OnInit {
  membersList : User[];

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    console.log(this.membersList);
  }

}
