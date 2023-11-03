const to_do_input =  document.querySelector('#todo');
const to_do_form = document.querySelector('#to-do-form'); 
const list = document.querySelector('#list');
const sc_feedback = document.querySelector('#sc-feedback');
const heading = document.querySelector('#heading');

/*window.onload = localStorage.getItem('toDoData');*/
to_do_form.addEventListener('submit', function (event)
{
	event.preventDefault();
	
	let task = to_do_input.value.trim();
	if (task === '') {
		alert('Please enter a task.');
		return;
	}


          addTaskToDOM(task);

          saveData();

          removeValue(to_do_input);

          screenReaderFeedback(task, 'added');

      });

function addTaskToDOM(task)
{
	//console.log(task);
	let newID =  generateID();
	console.log(newID);
	
	let taskItem = createElm('li','', list);

	let checkBox = createElm('input', null, taskItem);
	checkBox.setAttribute('type', 'checkBox');
	checkBox.setAttribute('id', newID);
	
//	checkBox.setAttribute('onclick', 'toggleTask()');
checkBox.setAttribute('class' , 'taskChecked');

let label = createElm('label', task, taskItem);
label.setAttribute('for', newID);
//label.setAttribute('class', 'whenChecked')

	/*checkBox.setAttribute('class' , 'whenChecked');

	*/

	let deleteButton = createElm('button', 'Delete', taskItem, );
	deleteButton.setAttribute('class', 'delete-task')
}


function createElm(tagname, textNode, parent, )
{
	let node = document.createElement(tagname);


	node.innerHTML = textNode;
	parent.appendChild(node);
	return node;

}

list.addEventListener('click', function(event){
	if (event.target.classList.contains('delete-task'))
	{
		
		const li = event.target.closest('li');
		list.removeChild(li);
		const taskName = event.target.previousElementSibling.textContent;
		//console.log('removed');
		heading.focus();
		screenReaderFeedback(taskName, 'removed');
		saveData();
	}

	if (event.target.classList.contains('taskChecked'))
	{

		console.log("task done");

		if (event.target.classList.contains('whenChecked')) {

			event.target.classList.remove('whenChecked');
			console.log("rmeove reached");


		} else {

			event.target.classList.add('whenChecked');
			console.log("add reached");
		}
	}

});


function generateID()
{
	let idPrefix = 'task_num_'
	tasks = document.querySelectorAll('#list > li');
	if (tasks.length == 0)
	{
		return `${idPrefix}0`;
	}
	return idPrefix + tasks.length;
}

function screenReaderFeedback(task , feedback)
{
	sc_feedback.textContent = `${task} ${feedback}`;
}

function removeValue(input)
{
	input.value = '';
}

//const toDoTasks = JSON.parse(localStorage.getItem('toDoData')) || [];

function saveData()
{
	localStorage.setItem('toDoData', list.innerHTML);

}
function showData()
{
	list.innerHTML = localStorage.getItem('toDoData')
}

showData();