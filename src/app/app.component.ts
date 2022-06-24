import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // document.getElementById("apiBtn").onclick = function() {request()};

    // function request(){
      // !Getting a resource
      // fetch('https://jsonplaceholder.typicode.com/posts')
      //   .then((response) => response.json())
      //   .then((json) => console.log(json));

      // !Creating a resource
      // fetch('https://jsonplaceholder.typicode.com/posts', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     title: 'nivi test',
      //     body: 'testing',
      //     userId: 7,
      //   }),
      //   headers: {
      //     'Content-type': 'application/json; charset=UTF-8',
      //   },
      // })
      //  .then((response) => response.json())
      //  .then((json) => console.log(json));

      // !Updating a resource - entire resource
      // fetch('https://jsonplaceholder.typicode.com/posts/1', {
      //   method: 'PUT',
      //   body: JSON.stringify({
      //     id: 1,
      //     title: 'new update',
      //     body: 'testing',
      //     userId: 1,
      //   }),
      //   headers: {
      //     'Content-type': 'application/json; charset=UTF-8',
      //   },
      // })
      //   .then((response) => response.json())
      //   .then((json) => console.log(json));

      // !Patching a resource - partial resource
      // fetch('https://jsonplaceholder.typicode.com/posts/1', {
      //   method: 'PATCH',
      //   body: JSON.stringify({
      //     title: 'testtest',
      //   }),
      //   headers: {
      //     'Content-type': 'application/json; charset=UTF-8',
      //   },
      // })
      //   .then((response) => response.json())
      //   .then((json) => console.log(json));
    // }
  }
}