import { Component, inject, input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ScrumInputComponent } from '../../../../shared/custom/scrum-input/scrum-input.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StoryForm } from '../../../../core/model/common.model';
import { StorageService } from '../../../../core/service/storage.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SharedService } from '../../../../core/service/shared.service';
import { ModalHeaderComponent } from '../../../../shared/modal-header/modal-header.component';

@Component({
  selector: 'app-create-story',
  standalone: true,
  imports: [ScrumInputComponent, ReactiveFormsModule, ToastrModule,ModalHeaderComponent],
  templateUrl: './create-story.component.html',
})
export class CreateStoryComponent {
  storyForm!: FormGroup;
  activeModal = inject(NgbActiveModal);
  storageService = inject(StorageService);
  tostrService = inject(ToastrService);
  sharedService=inject(SharedService)
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.storyForm = this.fb.group<StoryForm>({
      story_name: new FormControl('', Validators.required),
      story_point: new FormControl('', Validators.required),
    });
  }

  save() {
    if (this.storyForm.invalid) {
      return;
    }

    let data: any[] = [];
    data = this.storageService.getLocalStorageItem('storyData')
      ? this.storageService.getLocalStorageItem('storyData')
      : [];
    const storyName = this.storyForm.get('story_name')?.value;
    const isDuplicate = data?.filter(
      (res) => res?.story_name.toLowerCase().trim() === storyName.toLowerCase().trim()
    );
    if (isDuplicate.length) {
      this.tostrService.warning('Story with same name exist', 'Warning');
      return;
    }
    data.push({
      story_name:this.storyForm.get('story_name')?.value.trim(),
      story_point:this.storyForm.get('story_point')?.value.trim(),
    });
    this.storageService.setLocalStorageItem('storyData', data);
    this.tostrService.success('Story Added Successfully', 'Success');
    this.activeModal.close();
    this.sharedService.getTotalCount()
  }
}