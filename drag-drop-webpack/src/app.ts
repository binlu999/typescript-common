import {ProjectInput} from "./components/project-input"
import { ProjectList } from "./components/project-list";

console.log("Application is starting now");

new ProjectInput();
new ProjectList('active');
new ProjectList('finished');

