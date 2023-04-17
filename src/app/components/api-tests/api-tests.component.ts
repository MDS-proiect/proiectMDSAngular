import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Post } from '../../models/post.model';
import { SessionUser } from '../../models/session-user.model';
import { UserService } from 'app/core/services/user.service';
import { tap } from 'rxjs';

@Component({
  selector: 'mds-api-tests',
  templateUrl: './api-tests.component.html',
  styleUrls: ['./api-tests.component.scss']
})
export class ApiTestsComponent {
  title = 'proiectMDSAngular';

  post?: Post;
  userInfo?: SessionUser;
  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  signupForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  postForm = this.formBuilder.group({
    description: undefined,
    picturesURLs: ''
  });

  deletePostForm = this.formBuilder.group({
    id: ''
  });

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    // this.http.get<UserInfo>('/api/whoami', { withCredentials: true }).subscribe((x) => {
    //   this.userInfo = x;
    //   this.loginForm.reset();
    // });
  }

  onSubmit(): void {
    this.http
      .post('/api/login', this.loginForm.value, { responseType: 'text', withCredentials: true })
      .subscribe((x) => {
        console.log(x);
        this.ngOnInit();
      });
  }

  onSignUp(): void {
    this.http.post<SessionUser>('/api/signup', this.signupForm.value, { withCredentials: true }).subscribe((x) => {
      console.log(x);
      this.ngOnInit();
    });
  }

  onLogOut(): void {
    this.http.get('/api/logout', { responseType: 'text', withCredentials: true }).subscribe((x) => {
      this.ngOnInit();
    });
  }

  onCreatePost(): void {
    this.http.post<Post>('/api/posts', this.postForm.value, { withCredentials: true }).subscribe((x) => {
      console.log(x);
      this.post = x;
      this.ngOnInit();
    });
  }

  onDeletePost(): void {
    let url: string = '/api/posts/' + this.deletePostForm.value.id;
    this.http.delete(url, { withCredentials: true }).subscribe((x) => {
      console.log(x);
      this.post = undefined;
      this.ngOnInit();
    });
  }

  public whoAmI(): void {
    this.userService
      .whoAmI()
      .pipe(tap((user) => console.log('whoAmI:', user)))
      .subscribe();
  }

  public logout(): void {
    this.userService.logout().subscribe();
  }
}
