import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmMailService } from 'src/app/services/confirmMail/confirm-mail.service';
import { MyNotificationsService } from 'src/app/services/notifications/notifications.service';
import { ResponsesCodes } from 'src/app/services/helpers/responsesCodesEnum';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-confirm-mail',
  templateUrl: './confirm-mail.component.html',
  styleUrls: ['./confirm-mail.component.scss']
})
export class ConfirmMailComponent implements OnInit {

  constructor(private router: Router,
    private confirmMailService: ConfirmMailService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private notification: MyNotificationsService) { }

  ngOnInit() {
    const token = this.route.snapshot.paramMap.get('token');
    this.confirmMailService.confirmMail(token).subscribe(
      (response) => {
        console.log(response);
        this.notification.showSuccess();
        this.router.navigate(['Login']);
      },
      (error) => {
        console.log(error);

        if (error.error.error == ResponsesCodes.INVALID_CONFIRM_MAIL_TOKEN) {
          this.notification.showErrorResetPassword();
        } else {
          this.notification.showErrorNotification(error);
        }
      });
  }

}
