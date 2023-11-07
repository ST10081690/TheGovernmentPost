import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login/login.component';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { PostDisplayComponent } from './post/post-display/post-display.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
    {path:'allposts', component:PostDisplayComponent},
    {path:'', component:LoginComponent},
    {path:'add', component:PostCreateComponent},
    {path:'login', component:LoginComponent},
    {path:'signup', component:SignupComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}