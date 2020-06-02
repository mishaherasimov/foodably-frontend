import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from './../shared/auth.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Injectable({
    providedIn: 'root'
  })

  editBioForm:FormGroup;
  currentUser:Object={};
  name:'';
  firstLetter:any;
  bio:any;
  updBio:any;
  id:any;
  isEditClicked:boolean;
  //isLogin=false
  
  constructor(
    public fb: FormBuilder,
    public authService:AuthService,
    private actRoute:ActivatedRoute,
    private route: Router) {

      this.editBioForm=this.fb.group({
        editBio:['']
      })
      this.id=sessionStorage.getItem('id');
      console.log(this.id);


      //let id = this.actRoute.snapshot.paramMap.get('id');
      
     }

  ngOnInit() {
     //this.id=this.authService.id;
      this.authService.getUserProfile(this.id).subscribe(res => {
      console.log(res);
      this.isEditClicked=false;
      this.currentUser = res.msg;
        this.name=res.msg.name;
        
        this.bio=res.msg.bio;

        this.firstLetter=this.name.charAt(0);
    })
  }
  onEdit(){
    //this.updBio=value;
    this.isEditClicked=true;
    

   


  }
  update():void{

    
    
    this.authService.updateBio(this.id,this.updBio).subscribe(res=>{
      console.log(res);
      if(res!=null){
        this.authService.getUserProfile(this.id).subscribe(res => {
          console.log(res);
          this.isEditClicked=false;
          this.currentUser = res.msg;
            
            
            this.bio=res.msg.bio;
            console.log(this.bio);
        })
      }
    },
    (error)=>{

      console.log(error);
      
    }
    )
    this.isEditClicked=false;
  }
  delete():void{
    this.authService.deleteProfile(this.id).subscribe(res=>{
      window.alert("Please Confirm that you are deleting your profile");
      this.route.navigate(['']);
    })
  }
  
 

  


}
