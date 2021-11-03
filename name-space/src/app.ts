/// <reference path="models/interfaces.ts" />
/// <reference path="models/models.ts" />
/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />
/// <reference path="" />

namespace APP {
 
  
  
  const prjInput = new ProjectInput();
  new ProjectList('active');
  new ProjectList('finished');

}
