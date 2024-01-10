import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

interface ExcelData {
  header: string[];
  rows: { [key: string]: any }[];
}

@Component({
  selector: 'app-body-user-list',
  templateUrl: './body-user-list.component.html',
  styleUrls: ['./body-user-list.component.css']
})

export class BodyUserListComponent {

  data: ExcelData = { header: [], rows: [] }; // Object to store Excel data
  name: string = ""; // Variable to store the name   
  displayedColumns: string[] = ['Name', 'Surname', 'CheckIn']; // Adjust to include only the desired columns
  result: any[] = []; // Array to store search result

  loadFile(event: any) {
    let file = event.target.files[0]; // Get the selected file
    console.log(file);
    let reader = new FileReader(); // Create a file reader
    
    reader.onload = (e) => { // Function that runs when the file is loaded
      let data = (<any>e.target).result; // Get the file data
      console.log(data);
      let workbook = XLSX.read(data, { type: 'binary' }); // Read the Excel file
      let sheet = workbook.Sheets[workbook.SheetNames[0]]; // Get the first sheet of the Excel
  
      // Convert the sheet into an object with header and rows
      const sheetData: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    this.data = {
      header: Object.keys(sheetData[0] || {}),
      rows: sheetData.slice(1) as { [key: string]: any }[] // Explicitly cast to the correct type
    };
      console.log(this.data);
    };
  
    reader.readAsBinaryString(file); // Read the file as a binary string
  }
  

  searchName() {
    this.result = this.data.rows.filter(person => 
      // Filter data by searching in all columns
      this.data.header.some(column => 
        person[column].toString().toLowerCase().includes(this.name.toLowerCase())
      )
    );
  }
}
