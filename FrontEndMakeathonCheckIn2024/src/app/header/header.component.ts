import { Component } from "@angular/core";

@Component({
    selector:'app-header',
    /* when I used template, the path file need to be a mix between.ts and HTML code
    template: '<h3> Makeathon </h3>',*/ 
    /* when I used template, the path file need to be a .html file*/  
    templateUrl :'./header.component.html',
    styleUrls: ['./header.component.css']

})
export class HeaderComponent{


}

