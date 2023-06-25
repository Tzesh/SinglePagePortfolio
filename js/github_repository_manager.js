// ugurdindar.com - github repository manager
// a basic javascript function to process github repository information then display repositories of given user

// username of the profile
const USER = 'tzesh';

// api repository link
const apiRepository = `https://api.github.com/users/${USER}`;

$(function () {
	$.getJSON(apiRepository + '/repos', function (data) {
		// console.log('data now', data); -> used to debug

		// before sorting data we must define how we'll compare them
		function compare(a, b) {
			if (a.watchers > b.watchers) {
				return -1;
			}
			if (a.watchers < b.watchers) {
				return 1;
			}
			return 0;
		}

		data.sort(compare); // sorting data according to watchers of repositories

		data.forEach(v => { // processing every repository data and adding them into github container using DOM

			// creating repository div which will be used for each div to store its information
			var repositoryDiv = document.createElement('div');
			repositoryDiv.className = 'col-sm-12 col-xl-4 align-self-stretch'; // setting classes of div
			repositoryDiv.id = 'repository-card'; // setting id which will be used in styling the page
			document.getElementById('github-container').appendChild(repositoryDiv); // adding div into the github section of the page

			// repository header section (h2 element) = <h2><a><i></i></a></h2>
			var repositoryHeader = document.createElement('h2'); // creating h2 element
			var repositoryLink = document.createElement('a'); // creating a element
			var repositoryIcon = document.createElement('i'); // creating i element
			repositoryIcon.id = 'repository-icon'; // setting id which will be used to styling icon
			repositoryIcon.className = 'fa-solid fa-arrow-up-right-from-square'; // applying classes according to font awesome
			repositoryLink.href = v.html_url; // referencing href of repository link according to its link
			repositoryLink.textContent += '   ' + `${v.name}`; // adjusting inner text of a element as name of the repository
			repositoryLink.rel = 'noreferrer noopener'; // make sure that link is going to be opened in new tab
			repositoryLink.target = '_blank'; // make sure that link is going to be opened in new tab
			repositoryHeader.id = 'repository-header'; // changing id of the header which will be used in styling the page
			repositoryHeader.appendChild(repositoryIcon); // adding icon as a child of header (h2)
			repositoryHeader.appendChild(repositoryLink); // adding link as a child of header (h2)
			repositoryDiv.appendChild(repositoryHeader); // adding header as a child of repository div

			// repository description section (p element)
			var repositoryDescription = document.createElement('p'); // creating p element
			repositoryDescription.textContent = `${v.description}`; // getting the description and passing it as a text into p element
			repositoryDescription.id = 'repository-description'; // setting the id of the p element
			repositoryDiv.appendChild(repositoryDescription); // adding repository description (p element) as a child of repository div

			// repository information container = language section + stargazers section + forks section
			var repositoryInformationContainer = document.createElement('div'); // creating div element which will be used for storing repository information
			repositoryInformationContainer.className = 'd-flex justify-content-around'; // adding necesssary bootstrap classes
			repositoryInformationContainer.id = 'repository-information'; // adding an id to add styling in css

			// language section
			var language = document.createElement('p'); // creating p element
			var languageCircle = document.createElement('i'); // creating i element
			languageCircle.className = 'fas fa-circle'; // adding font awesome classes to make icon as it should be
			language.appendChild(languageCircle); // adding circle icon to language 'p' element
			language.append(' ' + `${v.language}`); // adding language name into 'p' element
			if (v.language != null) { // if language is not null language information will be displayed
				language.id = v.language.match('#') ? v.language.replace('#', 'sharp') : `${v.language}`; // to avoid not properly named '#C#' selector name
				repositoryInformationContainer.appendChild(language); // adding language section (p element) as a child of repository information container
			}

			// stargazers section
			var stargazersContainer = document.createElement('p'); // creating p element
			var stargazers = document.createElement('i'); // creating i element
			stargazers.className = 'far fa-star'; // making i element to display as it should be
			var stargazersCount = ' ' + v.stargazers_count; // getting stargazers count information
			if (stargazersCount > 0) { // if it's greater than 0 it should be represented
				stargazers.textContent = stargazersCount; // adding stargazers number into forks 'i' element
				stargazersContainer.appendChild(stargazers); // adding stargazers as a child of stargazers container
				repositoryInformationContainer.appendChild(stargazersContainer); // adding stargazers container as a child of repository information container
			}

			// forks section
			var forksContainer = document.createElement('p'); // creating p element
			var forks = document.createElement('i'); // creating i element
			forks.className = 'fas fa-code-branch'; // adding font awesome classes to make icon as it should be
			var forksCount = ' ' + v.forks_count; // getting forks count information
			if (forksCount > 0) { // if it's greater than 0 it should be represented
				forks.textContent = forksCount; // adding forks number into forks 'i' element
				forksContainer.appendChild(forks); // adding forks as a child of container
				repositoryInformationContainer.appendChild(forksContainer); // adding forks container as a child of repository information container
			}

			repositoryDiv.appendChild(repositoryInformationContainer); // lastly and finally adding repository information container as a child of repository div
		});
	});
});