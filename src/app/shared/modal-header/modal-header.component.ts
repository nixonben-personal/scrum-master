import { Component, inject, input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-header',
  standalone: true,
  imports: [],
  templateUrl: './modal-header.component.html',
})
export class ModalHeaderComponent {
  activeModal = inject(NgbActiveModal);
  title=input<string>()
}
