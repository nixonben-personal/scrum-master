import { Component, inject } from '@angular/core';
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
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SharedService } from '../../../../core/service/shared.service';
import { ModalHeaderComponent } from '../../../../shared/modal-header/modal-header.component';
import { StoryService } from '../../../../core/service/story.service';

@Component({
  selector: 'app-create-story',
  standalone: true,
  imports: [
    ScrumInputComponent,
    ReactiveFormsModule,
    ToastrModule,
    ModalHeaderComponent,
  ],
  templateUrl: './create-story.component.html',
})
export class CreateStoryComponent {
  allStoryList: any[] = [];
  storyForm!: FormGroup;
  activeModal = inject(NgbActiveModal);
  tostrService = inject(ToastrService);
  sharedService = inject(SharedService);
  storyService = inject(StoryService);
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.storyForm = this.fb.group<StoryForm>({
      story_name: new FormControl('', Validators.required),
      story_point: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  save() {
    if (this.storyForm.invalid) {
      return;
    }

    this.storyService.getAllStoryList().subscribe({
      next: (response: any) => {
        this.allStoryList = response;
        const storyName = this.storyForm.get('story_name')?.value;
        const isDuplicate = this.allStoryList?.filter(
          (res) =>
            res?.story_name.toLowerCase().trim() ===
            storyName.toLowerCase().trim()
        );
        if (isDuplicate.length) {
          this.tostrService.warning('Story with same name exist', 'Warning');
          return;
        }
        this.allStoryList.push({
          story_name: this.storyForm.get('story_name')?.value.trim(),
          story_point: this.storyForm.get('story_point')?.value.trim(),
          description: this.storyForm.get('description')?.value.trim(),
        });
        this.storyService.postStory(this.allStoryList).subscribe({
          next: (response: any) => {
            this.tostrService.success(response, 'Success');
            this.activeModal.close(true);
            this.sharedService.getTotalCount();
          },
          error:(error:any)=>{
            this.tostrService.error(error,'Error')
          }
        });
      },
    });
  }
}
