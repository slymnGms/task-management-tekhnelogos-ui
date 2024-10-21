import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { TaskWithUsers } from '../../../models/response/task-with-users.response';
import { User } from '../../../models/response/user.response';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-user-task-graph',
  templateUrl: './user-task-graph.component.html',
  styleUrls: ['./user-task-graph.component.css']
})
export class UserTaskGraphComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') private canvasRef!: ElementRef;
  private usersWithTasks: TaskWithUsers[] = [];
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls: any;
  private nodeGeometry = new THREE.SphereGeometry(1);
  private userMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  private taskMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  private edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
  constructor(private taskService: TaskService) { }
  ngOnInit() {
    this.taskService.getUsersWithTasks().subscribe(
      data => {
        this.usersWithTasks = data;
        this.initThreeJS();
        this.createGraph();
        this.animate();
      },
      error => {
        console.error('Error fetching users with tasks', error);
      }
    );
  }
  ngAfterViewInit() {
    // The canvas is now available
  }
  private initThreeJS() {
    this.scene = new THREE.Scene();
    const width = this.canvasRef.nativeElement.clientWidth;
    const height = this.canvasRef.nativeElement.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 50;
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasRef.nativeElement });
    this.renderer.setSize(width, height);
  }
  private createGraph() {
    const userNodes: { [key: number]: THREE.Object3D } = {};
    const taskNodes: { [key: number]: THREE.Object3D } = {};
    const allUsers: { [key: number]: User } = {};
    this.usersWithTasks.forEach((task, index) => {
      const taskNode = new THREE.Mesh(this.nodeGeometry, this.taskMaterial);
      taskNode.position.x = Math.cos((index / this.usersWithTasks.length) * Math.PI * 2) * 20;
      taskNode.position.y = Math.sin((index / this.usersWithTasks.length) * Math.PI * 2) * 20;
      taskNode.name = `Task: ${task.title}`;
      this.scene.add(taskNode);
      taskNodes[task.taskId] = taskNode;


      const taskLabel = this.createTextSprite(task.title);
      taskLabel.position.set(taskNode.position.x, taskNode.position.y + 1.5, taskNode.position.z);
      this.scene.add(taskLabel);

      task.users.forEach(user => {
        allUsers[user.id] = user;
      });
    });
    let userIndex = 0;
    const userIds = Object.keys(allUsers).map(id => parseInt(id));
    userIds.forEach(userId => {
      const user = allUsers[userId];
      const userNode = new THREE.Mesh(this.nodeGeometry, this.userMaterial);
      userNode.position.x = Math.cos((userIndex / userIds.length) * Math.PI * 2) * 10;
      userNode.position.y = Math.sin((userIndex / userIds.length) * Math.PI * 2) * 10;
      userNode.name = `User: ${user.username}`;
      this.scene.add(userNode);
      userNodes[userId] = userNode;
      console.log(user);
      const userLabel = this.createTextSprite(user.username);
      userLabel.position.set(userNode.position.x, userNode.position.y + 1.5, userNode.position.z);
      this.scene.add(userLabel);

      userIndex++;
    });
    this.usersWithTasks.forEach(task => {
      const taskNode = taskNodes[task.taskId];
      task.users.forEach(user => {
        const userNode = userNodes[user.id];
        const edgeGeometry = new THREE.BufferGeometry().setFromPoints([
          taskNode.position,
          userNode.position
        ]);
        const edge = new THREE.Line(edgeGeometry, this.edgeMaterial);
        this.scene.add(edge);
      });
    });
  }
  private animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }
  private createTextSprite(message: string): THREE.Sprite {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    const fontSize = 24;

    context.font = `${fontSize}px Arial`;

    // Set canvas size based on text metrics
    const metrics = context.measureText(message);
    const textWidth = metrics.width;
    canvas.width = textWidth;
    canvas.height = fontSize * 1.2; // Slightly larger to accommodate the text height

    // Redefine context after changing canvas size
    context.font = `${fontSize}px Arial`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = 'white';

    // Draw text
    context.fillText(message, canvas.width / 2, canvas.height / 2);

    // Create texture
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    // Create sprite material
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });

    // Create sprite
    const sprite = new THREE.Sprite(spriteMaterial);

    // Adjust the scale of the sprite
    const scaleFactor = 0.1; // Adjust as needed
    sprite.scale.set(canvas.width * scaleFactor, canvas.height * scaleFactor, 1);

    return sprite;
  }
}
